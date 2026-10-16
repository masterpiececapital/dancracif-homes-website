import { getMediaAssets } from "@/app/actions/admin-content";
import { AdminMediaClient } from "@/components/admin/admin-media-client";

export const metadata = {
  title: "Media Library | Dangracif Homes Admin",
};

export default async function AdminMediaPage() {
  const assets = await getMediaAssets();
  return <AdminMediaClient initialAssets={assets} />;
}
