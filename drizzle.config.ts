import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Same file Next.js reads; falls back to .env
config({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
