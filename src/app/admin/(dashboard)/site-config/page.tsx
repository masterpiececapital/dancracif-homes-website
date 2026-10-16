import { getSiteConfigs } from "@/app/actions/admin-content";
import { AdminSiteConfigClient } from "@/components/admin/admin-site-config-client";

export const metadata = {
  title: "Site Configuration | Dangracif Homes Admin",
};

export default async function AdminSiteConfigPage() {
  const configs = await getSiteConfigs();
  return <AdminSiteConfigClient initialConfigs={configs} />;
}
