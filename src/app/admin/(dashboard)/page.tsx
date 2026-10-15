import Link from "next/link";
import {
  Users,
  Home,
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock,
  Phone,
  Mail,
  Building2,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { getDashboardStats } from "@/app/actions/admin-dashboard";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [stats, session] = await Promise.all([
    getDashboardStats(),
    getAdminSession(),
  ]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "reserve":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "buy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "inspection":
        return "bg-blue-50 text-[#0754C6] border-blue-200";
      case "open-house":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-[#0754C6] border-blue-200 font-bold";
      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "scheduled":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "archived":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const totalUnits = stats.overview.totalUnits || 18;
  const availableUnits = stats.overview.availableUnits;
  const soldUnits = stats.overview.soldUnits;
  const occupancyPercentage = Math.round(
    ((totalUnits - availableUnits) / totalUnits) * 100
  );

  return (
    <div className="space-y-8">
      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Inquiries */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0754C6] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">
              {stats.overview.totalLeads}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-[#0754C6] border border-blue-200/60">
                {stats.overview.newLeads} new
              </span>
              <span className="text-xs text-slate-500">awaiting response</span>
            </div>
          </div>
        </div>

        {/* Available Units */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Fidelis Court Units
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">
              {availableUnits}{" "}
              <span className="text-base font-normal text-slate-400">
                / {totalUnits} left
              </span>
            </div>
            <div className="mt-2.5">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full"
                  style={{ width: `${occupancyPercentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
                {soldUnits} units sold / reserved ({occupancyPercentage}%)
              </p>
            </div>
          </div>
        </div>

        {/* Scheduled Inspections */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Site Inspections
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">
              {stats.overview.scheduledInspections}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200/60">
                {stats.byType.inspections} total
              </span>
              <span className="text-xs text-slate-500">inspection requests</span>
            </div>
          </div>
        </div>

        {/* Estimated Pipeline Value */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pipeline Intent
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900 truncate">
              {formatPrice(stats.overview.estimatedPipeline)}
            </div>
            <div className="mt-2 text-xs text-slate-500 font-medium">
              Buy &amp; reservation pipeline value
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Pipeline Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Lead Activity by Category
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Distribution of incoming prospect requests
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-[#0754C6] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Unit Reservations
            </span>
            <div className="mt-2 text-2xl font-black text-purple-700">
              {stats.byType.reservations}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Site Inspections
            </span>
            <div className="mt-2 text-2xl font-black text-[#0754C6]">
              {stats.byType.inspections}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Direct Buy Requests
            </span>
            <div className="mt-2 text-2xl font-black text-emerald-700">
              {stats.byType.buyRequests}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Open House
            </span>
            <div className="mt-2 text-2xl font-black text-amber-700">
              {stats.byType.openHouse}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-500">
              General Inquiries
            </span>
            <div className="mt-2 text-2xl font-black text-slate-700">
              {stats.byType.contacts}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Estate Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent Inquiries
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest prospects requiring executive attention
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#0754C6] hover:underline flex items-center gap-1"
            >
              <span>See All Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {stats.recentLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No inquiries submitted yet.
              </div>
            ) : (
              stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
                      {lead.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900 truncate">
                          {lead.fullName}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${getTypeBadgeClass(
                            lead.type
                          )}`}
                        >
                          {lead.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{lead.email}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{lead.phone}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[11px] uppercase px-2.5 py-1 rounded-full border ${getStatusBadgeClass(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                    <Link
                      href="/admin/leads"
                      className="p-1.5 text-slate-400 hover:text-[#0754C6] rounded-lg hover:bg-slate-100 transition-colors"
                      title="Open in Leads"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Estate Inventory Summary (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Fidelis Court Units
              </h2>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                {availableUnits} Available
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Live status across all 4 unit types in Fidelis Court.
            </p>

            <div className="space-y-3.5">
              {stats.units.map((unit) => (
                <div
                  key={unit.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {unit.title}
                    </h3>
                    <p className="text-xs font-bold text-[#0754C6] mt-0.5">
                      {unit.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700">
                      {unit.availableUnits}{" "}
                      <span className="text-slate-400 font-normal">
                        / {unit.unitsCount}
                      </span>
                    </span>
                    <span className="block text-[10px] uppercase font-semibold text-slate-400">
                      {unit.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <Link
              href="/admin/units"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <span>Manage Unit Inventory &amp; Prices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
