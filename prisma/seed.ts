// Seeds Role/Permission/RolePermission from the single source of truth in
// src/lib/permissions.ts, plus one optional Super Admin user.
//
// NOT executed against a live database yet — there isn't one provisioned
// (see .env.example). Once DATABASE_URL points to a real Postgres
// instance and `prisma migrate dev` has run, this is ready via:
//   npx prisma db seed
//
// No admin credentials are hardcoded here (docs/DECISIONS.md A13 applies
// to internal tooling too, not just public site content) — the initial
// Super Admin is only created if SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD
// are both set in the environment running this script; otherwise it's
// skipped and logs that it was skipped.

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/lib/password";
import { RESOURCE_NAMES, PERMISSION_ACTIONS, DEFAULT_ROLE_PERMISSIONS } from "../src/lib/permissions";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set — configure .env before running the seed script.");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  console.log("Seeding permissions...");
  for (const resource of RESOURCE_NAMES) {
    for (const action of PERMISSION_ACTIONS) {
      await prisma.permission.upsert({
        where: { resource_action: { resource, action } },
        update: {},
        create: { resource, action },
      });
    }
  }

  console.log("Seeding roles...");
  for (const [roleName, permissionKeys] of Object.entries(DEFAULT_ROLE_PERMISSIONS)) {
    const role = await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName, isSystem: true },
    });

    for (const permissionKey of permissionKeys) {
      const [resource, action] = permissionKey.split(":");
      const permission = await prisma.permission.findUniqueOrThrow({
        where: { resource_action: { resource, action } },
      });
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id },
      });
    }
  }

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const superAdminRole = await prisma.role.findUniqueOrThrow({
      where: { name: "Super Admin" },
    });
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        passwordHash: await hashPassword(adminPassword),
        fullName: "Super Admin",
        roleId: superAdminRole.id,
      },
    });
    console.log(`Seeded initial Super Admin: ${adminEmail}`);
  } else {
    console.log(
      "SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping initial admin user creation.",
    );
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
