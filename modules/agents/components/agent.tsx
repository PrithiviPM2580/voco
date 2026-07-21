"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import EmptyState from "@/components/empty-state"

export default function Agent() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({}))

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  )
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
