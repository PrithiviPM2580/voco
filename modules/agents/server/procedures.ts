import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { db } from "@/db"
import { agents } from "@/db/schema"
import { TRPCError } from "@trpc/server"
import { agentsInsertSchema, agentsParamsSchema } from "../schema"
import { eq, getColumns } from "drizzle-orm"

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(agentsParamsSchema)
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, input.id))

      if (!existingAgent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        })
      }
      return existingAgent
    }),
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents)

    return data
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
