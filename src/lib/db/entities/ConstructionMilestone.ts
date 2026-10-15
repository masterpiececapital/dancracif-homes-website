import { EntitySchema } from "typeorm";

export class ConstructionMilestone {
  id!: string;
  phaseNumber!: number;
  date!: string;
  title!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export const ConstructionMilestoneSchema = new EntitySchema<ConstructionMilestone>({
  target: ConstructionMilestone,
  name: "ConstructionMilestone",
  tableName: "construction_milestones",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    phaseNumber: { type: "int", default: 0 },
    date: { type: "varchar", length: 100 },
    title: { type: "varchar", length: 255 },
    createdAt: { type: "timestamp with time zone", createDate: true },
    updatedAt: { type: "timestamp with time zone", updateDate: true },
  },
});
