import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { db } from "@/db"
import { meetings } from "@/db/schema"
import { TRPCError } from "@trpc/server"
import {
  meetingsFiltersSchema,
  meetingsInsertSchema,
  meetingsParamsSchema,
  meetingsUpdateSchema,
} from "../schema"
import { and, desc, eq, getColumns, ilike, count } from "drizzle-orm"

export const meetingsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(meetingsParamsSchema)
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          ...getColumns(meetings),
        })
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )

      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        })
      }
      return existingMeeting
    }),
  getMany: protectedProcedure
    .input(meetingsFiltersSchema)
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input

      const data = await db
        .select({
          ...getColumns(meetings),
        })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )

      const totalPages = Math.ceil(total.count / pageSize)

      return {
        items: data,
        total: total.count,
        totalPages,
      }
    }),
  create: protectedProcedure
    .input(meetingsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning()

      return createdMeeting
    }),
  update: protectedProcedure
    .input(meetingsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const [updatedMeeting] = await db
        .update(meetings)
        .set({
          ...input,
          userId: ctx.auth.user.id,
        })
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        )
        .returning()

      if (!updatedMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        })
      }

      return updatedMeeting
    }),
})
