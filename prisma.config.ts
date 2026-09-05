// @ts-expect-error - prisma/config is resolved by Prisma CLI but not by default TS setup
import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  earlyAccess: true
});
