import { EntitySchema } from "typeorm";

export class MediaAsset {
  id!: string;
  name!: string;
  cloudinaryPublicId!: string;
  url!: string;
  secureUrl!: string;
  resourceType!: string; // 'image' | 'video' | 'raw'
  format!: string;
  width!: number;
  height!: number;
  bytes!: number;
  folder!: string; // e.g. 'hero', 'units', 'blog', 'brochure'
  altText!: string;
  createdAt!: Date;
}

export const MediaAssetSchema = new EntitySchema<MediaAsset>({
  target: MediaAsset,
  name: "MediaAsset",
  tableName: "media_assets",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    name: { type: "varchar", length: 255, default: "" },
    cloudinaryPublicId: { type: "varchar", length: 500 },
    url: { type: "varchar", length: 1000 },
    secureUrl: { type: "varchar", length: 1000 },
    resourceType: { type: "varchar", length: 50, default: "image" },
    format: { type: "varchar", length: 20, default: "" },
    width: { type: "int", default: 0 },
    height: { type: "int", default: 0 },
    bytes: { type: "int", default: 0 },
    folder: { type: "varchar", length: 100, default: "general" },
    altText: { type: "varchar", length: 255, default: "" },
    createdAt: { type: "timestamp with time zone", createDate: true },
  },
});
