import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { db } from "@/db"
import { agents } from "@/db/schema"
import { TRPCError } from "@trpc/server"
import {
  agentsFiltersSchema,
  agentsInsertSchema,
  agentsParamsSchema,
} from "../schema"
import { and, desc, eq, getColumns, ilike, sql, count } from "drizzle-orm"

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(agentsParamsSchema)
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getColumns(agents),
          meetingCount: sql<number>`6`,
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )

      if (!existingAgent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        })
      }
      return existingAgent
    }),
  getMany: protectedProcedure
    .input(agentsFiltersSchema)
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input

      const data = await db
        .select({
          ...getColumns(agents),
          meetingCount: sql<number>`6`,
        })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined
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
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning()

      return createdAgent
    }),
})
