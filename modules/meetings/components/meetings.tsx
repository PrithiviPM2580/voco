"use client"

import { DataTable } from "@/components/data-table"
import ErrorState from "@/components/error-state"
import LoadingState from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { columns } from "./columns"
import EmptyState from "@/components/empty-state"

export default function Meetings() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
        />
      )}
    </div>
  )
}

export const MeetingLoading = () => {
  return (
    <LoadingState
      title="Meeting Agents"
      description="Please wait while we load the meetings"
    />
  )
}

export const MeetingError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong."
    />
  )
}
