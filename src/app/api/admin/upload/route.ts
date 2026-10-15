import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDatabaseConnection } from "@/lib/db/data-source";
import { MediaAssetSchema } from "@/lib/db/entities/MediaAsset";
import { uploadMediaBuffer } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";
    const customName = (formData.get("name") as string) || "";
    const altText = (formData.get("altText") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await uploadMediaBuffer(buffer, file.name, folder);

    const ds = await getDatabaseConnection();
    const mediaRepo = ds.getRepository(MediaAssetSchema);

    const mediaAsset = mediaRepo.create({
      name: customName || file.name,
      cloudinaryPublicId: uploadResult.publicId,
      url: uploadResult.url,
      secureUrl: uploadResult.secureUrl,
      resourceType: uploadResult.resourceType,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      folder: folder,
      altText: altText || customName || file.name,
    });

    const savedAsset = await mediaRepo.save(mediaAsset);

    return NextResponse.json({
      success: true,
      asset: JSON.parse(JSON.stringify(savedAsset)),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    );
  }
}
