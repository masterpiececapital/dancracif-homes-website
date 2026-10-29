import { getSiteConfigs } from "@/app/actions/admin-content";
import { AdminSiteConfigClient } from "@/components/admin/admin-site-config-client";

export const metadata = {
  title: "Site Configuration | Dangracif Homes Admin",
};

export default async function AdminSiteConfigPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const configs = await getSiteConfigs();
  const { tab } = await searchParams;
  return <AdminSiteConfigClient initialConfigs={configs} initialTab={tab} />;
}
