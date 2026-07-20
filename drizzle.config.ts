import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"
import { ENV } from "./lib/env"

config({ path: ".env" })

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
})
