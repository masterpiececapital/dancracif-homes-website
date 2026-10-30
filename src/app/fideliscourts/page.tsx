import { SiteImagesProvider } from "@/components/common/site-images-provider";
import FidelisCourtPageClient from "@/components/fidelis-court/fidelis-court-page-client";
import { getPublicSiteOverrides } from "@/lib/site-images";

export const dynamic = "force-dynamic";

export default async function FidelisCourtPage() {
  const { images, brochureUrl, youtubeUrl } = await getPublicSiteOverrides();

  return (
    <SiteImagesProvider
      overrides={images}
      brochureUrl={brochureUrl}
      youtubeUrl={youtubeUrl}
    >
      <FidelisCourtPageClient />
    </SiteImagesProvider>
  );
}
