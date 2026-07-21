import "server-only"

import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.url("Database URL must be a valid URL"),
  BETTER_AUTH_SECRET: z.string().min(1, "Better Auth secret must be provided"),
  BETTER_AUTH_URL: z.url("Better Auth URL must be a valid URL"),
  GITHUB_CLIENT_ID: z.string().min(1, "GitHub Client ID must be provided"),
  GITHUB_CLIENT_SECRET: z
    .string()
    .min(1, "GitHub Client Secret must be provided"),
  GOOGLE_CLIENT_ID: z.string().min(1, "Google Client ID must be provided"),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, "Google Client Secret must be provided"),
})

const checkEnv = (env: Record<string, string | undefined>) => {
  const parsedEnv = envSchema.safeParse(env)

  if (!parsedEnv.success) {
    throw new Error(
      parsedEnv.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("\n")
    )
  }

  return parsedEnv.data
}

export const ENV = checkEnv(process.env)
