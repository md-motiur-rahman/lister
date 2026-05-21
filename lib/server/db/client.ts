import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import * as schema from "@/lib/server/db/scema"


const databaseUrl = process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("NEON_DATABASE_URL environment variable is not set");
}

const sql = neon(databaseUrl);

export const db = drizzle({client: sql, schema});