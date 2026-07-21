import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/lib/constants"
import { z } from "zod"

export const agentsParamsSchema = z.object({
  id: z.string("Agent ID must be a string").min(1, "Agent ID is required"),
})

export const agentsInsertSchema = z.object({
  name: z.string().min(1, "Name is required"),
  instructions: z.string().min(1, "Instructions are required"),
})

export const agentsFiltersSchema = z.object({
  page: z.number().min(1, "Page must be greater than 0").default(DEFAULT_PAGE),
  pageSize: z
    .number()
    .min(MIN_PAGE_SIZE, "Page size must be greater than 0")
    .max(
      MAX_PAGE_SIZE,
      `Page size must be less than or equal to ${MAX_PAGE_SIZE}`
    )
    .default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
})

export type AgentsParams = z.infer<typeof agentsParamsSchema>
export type AgentsInsertInput = z.infer<typeof agentsInsertSchema>
export type AgentsFilters = z.infer<typeof agentsFiltersSchema>
