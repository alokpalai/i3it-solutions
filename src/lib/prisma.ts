import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires a driver adapter rather than reading DATABASE_URL
// implicitly (prisma/schema.prisma's datasource block no longer accepts
// `url` directly — see the comment there). No live database is
// provisioned yet; this file is correct and ready the moment a real
// DATABASE_URL is set in .env, but every query against it will fail with
// a connection error until then — that's expected, not a bug here.
//
// Standard Next.js dev-mode singleton: without this, every hot-reload
// would create a new PrismaClient (and a new connection pool) on top of
// the last one.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Prisma 7 requires an adapter instance unconditionally (no "adapter or
  // undefined" — the type doesn't allow it). PrismaPg/pg's Pool connects
  // lazily on first query, not at construction, so this is safe to create
  // even with an empty/placeholder connection string; the resulting error
  // only surfaces if and when a query actually runs.
  const connectionString = process.env.DATABASE_URL ?? "";
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
