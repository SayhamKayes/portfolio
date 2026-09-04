import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["query", "error", "warn"]
});
export {
  prisma as p
};
