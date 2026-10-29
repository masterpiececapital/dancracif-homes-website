import Link from "next/link";
import { ArrowRight, CalendarDays, Home, Inbox, Users } from "lucide-react";
import { getDashboardStats } from "@/app/actions/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();

  const summaryItems = [
    { label: "Total inquiries", value: stats.overview.totalLeads, icon: Users },
    { label: "New inquiries", value: stats.overview.newLeads, icon: Inbox },
    {
      label: "Scheduled inspections",
      value: stats.overview.scheduledInspections,
      icon: CalendarDays,
    },
    {
      label: "Available units",
      value: stats.overview.availableUnits,
      icon: Home,
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-blue-700";
      case "contacted":
        return "bg-amber-50 text-amber-700";
      case "scheduled":
        return "bg-indigo-50 text-indigo-700";
      case "closed":
        return "bg-emerald-50 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      <section
        aria-label="Overview"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-slate-500">{item.label}</p>
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-5">
          <h2 className="font-semibold text-slate-900">Recent inquiries</h2>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#0754C6] hover:underline"
          >
            View all
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {stats.recentLeads.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No inquiries yet.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {stats.recentLeads.slice(0, 5).map((lead) => (
              <li
                key={lead.id}
                className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {lead.fullName}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {lead.type.replace("-", " ")} · {lead.email}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClass(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
