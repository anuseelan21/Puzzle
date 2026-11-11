import type { PrismaClient } from "@prisma/client";
import client from "../db/prisma.cjs";

export default client as PrismaClient;
