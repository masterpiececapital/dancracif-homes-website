import { EntitySchema } from "typeorm";

export class User {
  id!: string;
  email!: string;
  password!: string;
  name!: string;
  role!: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchema = new EntitySchema<User>({
  target: User,
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
    },
    name: {
      type: "varchar",
      length: 150,
      default: "Admin",
    },
    role: {
      type: "varchar",
      length: 50,
      default: "admin",
    },
    isActive: {
      type: "boolean",
      default: true,
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
