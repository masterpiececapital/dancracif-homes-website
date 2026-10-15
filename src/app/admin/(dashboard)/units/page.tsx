import { getPropertyUnitsList } from "@/app/actions/admin-dashboard";
import { AdminUnitsClient } from "@/components/admin/admin-units-client";

export const dynamic = "force-dynamic";

export default async function AdminUnitsPage() {
  const initialUnits = await getPropertyUnitsList();

  return <AdminUnitsClient initialUnits={initialUnits} />;
}
