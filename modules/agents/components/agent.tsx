"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"

export default function Agent() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return <div>{JSON.stringify(data, null, 2)}</div>
}

export const AgentLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  )
}

export const AgentError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong."
    />
  )
}
