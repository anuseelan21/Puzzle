import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema";

// Next.js imports route modules during builds. Resolve the managed connection
// only when a request actually needs the database.
const createDatabase = () => drizzle({ schema });
let database: ReturnType<typeof createDatabase> | undefined;

export function getDb() {
  return database ??= createDatabase();
}
