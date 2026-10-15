import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSettingsClient } from "@/components/admin/admin-settings-client";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminSettingsClient user={session} />;
}
