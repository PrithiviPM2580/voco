"use client"

import ErrorState from "@/components/error-state"
import LoadingState from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export default function Meetings() {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return <div>{JSON.stringify(data, null, 2)}</div>
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
