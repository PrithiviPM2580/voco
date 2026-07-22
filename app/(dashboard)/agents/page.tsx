import { auth } from "@/lib/auth"
import Agent, {
  AgentError,
  AgentLoading,
} from "@/modules/agents/components/agent"
import AgentsListHeader from "@/modules/agents/components/agents-list-header"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import type { SearchParams } from "nuqs"
import { loadSearchParams } from "@/modules/agents/params"

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const filters = await loadSearchParams(searchParams)
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  )

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentLoading />}>
          <ErrorBoundary fallback={<AgentError />}>
            <Agent />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}
