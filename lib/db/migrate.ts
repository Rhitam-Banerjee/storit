import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
// dotenv.config({ path: ".env.local" })
dotenv.config({ path: ".env" })
if (!process.env.DATABASE_URL) {
  // throw new Error("Database url is not set in .env.local")
  throw new Error("Database url is not set in .env")
}
async function runMigration() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const db = drizzle(sql)
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("Migration complete");

  } catch (error) {
    console.log("Migration error.\n", error);
    process.exit(1)
  }
}
runMigration()