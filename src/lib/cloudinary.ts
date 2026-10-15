import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";
import path from "path";

// Initialize Cloudinary config
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resourceType: string;
}

export async function uploadMediaBuffer(
  buffer: Buffer,
  filename: string,
  folder: string = "dancracif"
): Promise<UploadResult> {
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `dancracif/${folder}`,
          resource_type: "auto",
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            reject(error || new Error("Cloudinary upload failed"));
            return;
          }
          resolve({
            url: result.url,
            secureUrl: result.secure_url,
            publicId: result.public_id,
            format: result.format || path.extname(filename).replace(".", "") || "jpg",
            width: result.width || 0,
            height: result.height || 0,
            bytes: result.bytes || buffer.length,
            resourceType: result.resource_type || "image",
          });
        }
      );
      uploadStream.end(buffer);
    });
  }

  // Graceful local development fallback when Cloudinary keys are not yet provided
  const cleanFileName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, cleanFileName);
  await fs.writeFile(filePath, buffer);

  const localUrl = `/uploads/${folder}/${cleanFileName}`;
  const ext = path.extname(filename).replace(".", "") || "jpg";

  return {
    url: localUrl,
    secureUrl: localUrl,
    publicId: `local_${cleanFileName}`,
    format: ext,
    width: 1200,
    height: 800,
    bytes: buffer.length,
    resourceType: ext === "mp4" || ext === "webm" ? "video" : "image",
  };
}

export async function deleteFromCloudinary(publicId: string) {
  if (isCloudinaryConfigured && !publicId.startsWith("local_")) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (e) {
      console.error("Failed to delete from Cloudinary:", e);
    }
  }
}
