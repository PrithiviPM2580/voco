import Agent, {
  AgentError,
  AgentLoading,
} from "@/modules/agents/components/agent"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default async function Page() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentLoading />}>
        <ErrorBoundary fallback={<AgentError />}>
          <Agent />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}
