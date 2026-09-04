// @ts-expect-error - prisma/config is resolved by Prisma CLI but not by default TS setup
import { definePrismaConfig } from "prisma/config";
import { PrismaClient } from './generated/client'

export default definePrismaConfig({
  orm: {
    schema: "prisma/schema.prisma",
  },
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
