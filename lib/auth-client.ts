import { createAuthClient } from "better-auth/react"
import { ENV } from "./env"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: ENV.BETTER_AUTH_URL,
})
