"use server";

import "reflect-metadata";
import { revalidatePath } from "next/cache";
import { getDatabaseConnection } from "@/lib/db/data-source";
import { LeadInquiry, LeadInquirySchema, InquiryType, InquiryStatus } from "@/lib/db/entities/LeadInquiry";
import { PropertyUnit, PropertyUnitSchema } from "@/lib/db/entities/PropertyUnit";
import { getAdminSession } from "@/lib/auth";
import { ILike } from "typeorm";

function toPlain<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized. Please log in.");
  }
  return session;
}

export async function getDashboardStats() {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const leadRepo = ds.getRepository(LeadInquirySchema);
  const unitRepo = ds.getRepository(PropertyUnitSchema);

  const [totalLeads, newLeads, scheduledInspections, closedLeads] = await Promise.all([
    leadRepo.count(),
    leadRepo.count({ where: { status: "new" } }),
    leadRepo.count({ where: { status: "scheduled" } }),
    leadRepo.count({ where: { status: "closed" } }),
  ]);

  const [inspections, reservations, buyRequests, openHouse, contacts] = await Promise.all([
    leadRepo.count({ where: { type: "inspection" } }),
    leadRepo.count({ where: { type: "reserve" } }),
    leadRepo.count({ where: { type: "buy" } }),
    leadRepo.count({ where: { type: "open-house" } }),
    leadRepo.count({ where: { type: "contact" } }),
  ]);

  const units = await unitRepo.find();
  const totalUnits = units.reduce((acc, u) => acc + (u.unitsCount || 0), 0);
  const availableUnits = units.reduce((acc, u) => acc + (u.availableUnits || 0), 0);
  const soldUnits = Math.max(0, totalUnits - availableUnits);

  // Calculate estimated pipeline value based on buy & reservation leads
  const highIntentLeads = await leadRepo.find({
    where: [{ type: "buy" }, { type: "reserve" }],
  });

  const unitPriceMap: Record<string, number> = {};
  units.forEach((u) => {
    unitPriceMap[u.id] = Number(u.numericPrice) || 0;
  });

  let estimatedPipeline = 0;
  highIntentLeads.forEach((lead) => {
    if (lead.status !== "archived") {
      const unitCost = lead.unitType ? unitPriceMap[lead.unitType] || 80000000 : 80000000;
      estimatedPipeline += unitCost * (lead.numberOfUnits || 1);
    }
  });

  const recentLeads = await leadRepo.find({
    order: { createdAt: "DESC" },
    take: 6,
  });

  return toPlain({
    overview: {
      totalLeads,
      newLeads,
      scheduledInspections,
      closedLeads,
      totalUnits,
      availableUnits,
      soldUnits,
      estimatedPipeline,
    },
    byType: {
      inspections,
      reservations,
      buyRequests,
      openHouse,
      contacts,
    },
    recentLeads,
    units,
  });
}

export async function getLeadsList(params?: {
  type?: string;
  status?: string;
  search?: string;
}) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const leadRepo = ds.getRepository(LeadInquirySchema);

  const whereClause: Record<string, unknown> = {};

  if (params?.type && params.type !== "all") {
    whereClause.type = params.type;
  }
  if (params?.status && params.status !== "all") {
    whereClause.status = params.status;
  }

  let leads: LeadInquiry[];
  if (params?.search && params.search.trim() !== "") {
    const q = `%${params.search.trim()}%`;
    leads = await leadRepo.find({
      where: [
        { ...whereClause, fullName: ILike(q) },
        { ...whereClause, email: ILike(q) },
        { ...whereClause, phone: ILike(q) },
      ],
      order: { createdAt: "DESC" },
    });
  } else {
    leads = await leadRepo.find({
      where: whereClause,
      order: { createdAt: "DESC" },
    });
  }

  return toPlain(leads);
}

export async function updateLeadStatusAction(id: string, status: InquiryStatus) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const leadRepo = ds.getRepository(LeadInquirySchema);

  await leadRepo.update(id, { status });
  revalidatePath("/admin");
  return { success: true };
}

export async function updateLeadNotesAction(id: string, notes: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const leadRepo = ds.getRepository(LeadInquirySchema);

  await leadRepo.update(id, { notes });
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteLeadAction(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const leadRepo = ds.getRepository(LeadInquirySchema);

  await leadRepo.delete(id);
  revalidatePath("/admin");
  return { success: true };
}

export async function getPropertyUnitsList() {
  const ds = await getDatabaseConnection();
  const unitRepo = ds.getRepository(PropertyUnitSchema);
  const units = await unitRepo.find({ order: { id: "ASC" } });
  return toPlain(units);
}

export async function updatePropertyUnitAction(
  id: string,
  data: Partial<PropertyUnit>
) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const unitRepo = ds.getRepository(PropertyUnitSchema);

  await unitRepo.update(id, data);
  revalidatePath("/admin");
  revalidatePath("/fideliscourts");
  revalidatePath("/fidelis-court");
  revalidatePath("/pricing");
  return { success: true };
}

// Public API for submitting inquiries directly to PostgreSQL
export async function submitLeadInquiry(data: {
  type: InquiryType;
  fullName: string;
  phone: string;
  email: string;
  unitType?: string;
  numberOfUnits?: number;
  paymentOption?: string;
  preferredDate?: string;
  attendees?: number;
  message?: string;
}) {
  try {
    const ds = await getDatabaseConnection();
    const leadRepo = ds.getRepository(LeadInquirySchema);

    const newLead = leadRepo.create({
      type: data.type || "contact",
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      unitType: data.unitType || null,
      numberOfUnits: data.numberOfUnits || 1,
      paymentOption: data.paymentOption || null,
      preferredDate: data.preferredDate || null,
      attendees: data.attendees || 1,
      message: data.message || null,
      status: "new",
    });

    const saved = await leadRepo.save(newLead);
    return { success: true, leadId: saved.id };
  } catch (err: unknown) {
    console.error("Failed to store lead inquiry:", err);
    return { success: false, error: "Database error saving inquiry" };
  }
}
