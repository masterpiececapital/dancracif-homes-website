import { EntitySchema } from "typeorm";

export class PropertyUnit {
  id!: string;
  title!: string;
  unitsCount!: number;
  availableUnits!: number;
  description!: string;
  price!: string;
  numericPrice!: number;
  imageSrc!: string;
  status!: string; // 'available' | 'limited' | 'sold_out'
  createdAt!: Date;
  updatedAt!: Date;
}

export const PropertyUnitSchema = new EntitySchema<PropertyUnit>({
  target: PropertyUnit,
  name: "PropertyUnit",
  tableName: "property_units",
  columns: {
    id: {
      type: "varchar",
      length: 100,
      primary: true,
    },
    title: {
      type: "varchar",
      length: 255,
    },
    unitsCount: {
      type: "int",
      default: 0,
    },
    availableUnits: {
      type: "int",
      default: 0,
    },
    description: {
      type: "text",
      default: "",
    },
    price: {
      type: "varchar",
      length: 100,
    },
    numericPrice: {
      type: "bigint",
      default: 0,
    },
    imageSrc: {
      type: "varchar",
      length: 500,
      default: "",
    },
    status: {
      type: "varchar",
      length: 50,
      default: "available",
    },
    createdAt: {
      type: "timestamp with time zone",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp with time zone",
      updateDate: true,
    },
  },
});
