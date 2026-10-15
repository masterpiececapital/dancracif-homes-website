import { EntitySchema } from "typeorm";

export class FaqItem {
  id!: string;
  question!: string;
  answer!: string;
  sortOrder!: number;
  published!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export const FaqItemSchema = new EntitySchema<FaqItem>({
  target: FaqItem,
  name: "FaqItem",
  tableName: "faq_items",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    question: { type: "text" },
    answer: { type: "text" },
    sortOrder: { type: "int", default: 0 },
    published: { type: "boolean", default: true },
    createdAt: { type: "timestamp with time zone", createDate: true },
    updatedAt: { type: "timestamp with time zone", updateDate: true },
  },
});
