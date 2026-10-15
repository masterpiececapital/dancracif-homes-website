import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1710000000000 implements MigrationInterface {
  name = "InitialSchema1710000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid-ossp or pgcrypto extension for gen_random_uuid
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" VARCHAR(255) NOT NULL UNIQUE,
        "password" VARCHAR(255) NOT NULL,
        "name" VARCHAR(150) NOT NULL DEFAULT 'Admin',
        "role" VARCHAR(50) NOT NULL DEFAULT 'admin',
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Create property_units table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "property_units" (
        "id" VARCHAR(100) PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "unitsCount" INT NOT NULL DEFAULT 0,
        "availableUnits" INT NOT NULL DEFAULT 0,
        "description" TEXT NOT NULL DEFAULT '',
        "price" VARCHAR(100) NOT NULL,
        "numericPrice" BIGINT NOT NULL DEFAULT 0,
        "imageSrc" VARCHAR(500) NOT NULL DEFAULT '',
        "status" VARCHAR(50) NOT NULL DEFAULT 'available',
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Create lead_inquiries table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "lead_inquiries" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "type" VARCHAR(50) NOT NULL DEFAULT 'contact',
        "fullName" VARCHAR(255) NOT NULL,
        "phone" VARCHAR(100) NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "unitType" VARCHAR(100),
        "numberOfUnits" INT NOT NULL DEFAULT 1,
        "paymentOption" VARCHAR(100),
        "preferredDate" VARCHAR(100),
        "attendees" INT NOT NULL DEFAULT 1,
        "message" TEXT,
        "status" VARCHAR(50) NOT NULL DEFAULT 'new',
        "notes" TEXT,
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Create indexes for performance
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_leads_type" ON "lead_inquiries" ("type");
      CREATE INDEX IF NOT EXISTS "IDX_leads_status" ON "lead_inquiries" ("status");
      CREATE INDEX IF NOT EXISTS "IDX_leads_created_at" ON "lead_inquiries" ("createdAt" DESC);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_leads_created_at";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_leads_status";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_leads_type";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "lead_inquiries";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "property_units";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users";`);
  }
}
