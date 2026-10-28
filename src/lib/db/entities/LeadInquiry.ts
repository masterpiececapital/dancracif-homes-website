import { EntitySchema } from "typeorm";

export type InquiryType =
  | "inspection"
  | "reserve"
  | "buy"
  | "open-house"
  | "contact"
  | "agent";

export type InquiryStatus =
  | "new"
  | "contacted"
  | "scheduled"
  | "closed"
  | "archived";

export class LeadInquiry {
  id!: string;
  type!: InquiryType;
  fullName!: string;
  phone!: string;
  email!: string;
  unitType!: string | null;
  numberOfUnits!: number;
  paymentOption!: string | null;
  preferredDate!: string | null;
  attendees!: number;
  message!: string | null;
  status!: InquiryStatus;
  notes!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

export const LeadInquirySchema = new EntitySchema<LeadInquiry>({
  target: LeadInquiry,
  name: "LeadInquiry",
  tableName: "lead_inquiries",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    type: {
      type: "varchar",
      length: 50,
      default: "contact",
    },
    fullName: {
      type: "varchar",
      length: 255,
    },
    phone: {
      type: "varchar",
      length: 100,
    },
    email: {
      type: "varchar",
      length: 255,
    },
    unitType: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    numberOfUnits: {
      type: "int",
      default: 1,
    },
    paymentOption: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    preferredDate: {
      type: "varchar",
      length: 100,
      nullable: true,
    },
    attendees: {
      type: "int",
      default: 1,
    },
    message: {
      type: "text",
      nullable: true,
    },
    status: {
      type: "varchar",
      length: 50,
      default: "new",
    },
    notes: {
      type: "text",
      nullable: true,
    },
    createdAt: {
      type: "timestamp with time zone",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp with time zone",
      updateDate: true,
    },
  },
});
