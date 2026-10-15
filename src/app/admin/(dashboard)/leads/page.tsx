import { getLeadsList } from "@/app/actions/admin-dashboard";
import { AdminLeadsClient } from "@/components/admin/admin-leads-client";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const initialLeads = await getLeadsList();

  return <AdminLeadsClient initialLeads={initialLeads} />;
}
