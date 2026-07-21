import { z } from "zod"

export const agentsParamsSchema = z.object({
  id: z.string("Agent ID must be a string").min(1, "Agent ID is required"),
})

export const agentsInsertSchema = z.object({
  name: z.string().min(1, "Name is required"),
  instructions: z.string().min(1, "Instructions are required"),
})

export type AgentsParams = z.infer<typeof agentsParamsSchema>
export type AgentsInsertInput = z.infer<typeof agentsInsertSchema>
