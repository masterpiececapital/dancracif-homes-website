import { EntitySchema } from "typeorm";

export class SiteConfig {
  key!: string;
  value!: string; // JSON string for complex values
  updatedAt!: Date;
}

export const SiteConfigSchema = new EntitySchema<SiteConfig>({
  target: SiteConfig,
  name: "SiteConfig",
  tableName: "site_config",
  columns: {
    key: { type: "varchar", length: 100, primary: true },
    value: { type: "text", default: "" },
    updatedAt: { type: "timestamp with time zone", updateDate: true },
  },
});
