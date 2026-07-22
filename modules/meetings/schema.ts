import {
  DEFAULT_PAGE,
  MIN_PAGE_SIZE,
  MAX_PAGE_SIZE,
  DEFAULT_PAGE_SIZE,
} from "@/lib/constants"
import { z } from "zod"
import { MeetingStatus } from "./types"

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
  agentId: z.string().nullish(),
  status: z
    .enum([
      MeetingStatus.Upcoming,
      MeetingStatus.Active,
      MeetingStatus.Completed,
      MeetingStatus.Processing,
      MeetingStatus.Cancelled,
    ])
    .nullish(),
})

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, "Meeting name is required"),
  agentId: z.string().min(1, "Agent ID is required"),
})

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, "Meeting ID is required"),
})

export type MeetingsParamsSchema = z.infer<typeof meetingsParamsSchema>
export type MeetingsFiltersSchema = z.infer<typeof meetingsFiltersSchema>
export type MeetingsInsertSchema = z.infer<typeof meetingsInsertSchema>
export type MeetingsUpdateSchema = z.infer<typeof meetingsUpdateSchema>
