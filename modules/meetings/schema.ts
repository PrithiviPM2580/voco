import {
  DEFAULT_PAGE,
  MIN_PAGE_SIZE,
  MAX_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
} from "@/lib/constants"
import { z } from "zod"

export const meetingsParamsSchema = z.object({
  id: z.string().min(1, "Meeting ID is required"),
})

export const meetingsFiltersSchema = z.object({
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

export type MeetingsParamsSchema = z.infer<typeof meetingsParamsSchema>
export type MeetingsFiltersSchema = z.infer<typeof meetingsFiltersSchema>
