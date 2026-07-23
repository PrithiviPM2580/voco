"use client"

import ErrorState from "@/components/error-state"
import LoadingState from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import CallProvider from "./call-provider"

interface CallProps {
  meetingId: string
}

export default function Call({ meetingId }: CallProps) {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  if (data.status === "completed") {
    return (
      <div className="flex h-dvh items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
      </div>
    )
  }
  return <CallProvider meetingId={meetingId} meetingName={data.name} />
}

export const CallLoading = () => {
  return (
    <div className="flex h-dvh items-center justify-center">
      <LoadingState
        title="Loading Call"
        description="Please wait while we load the call details"
      />
    </div>
  )
}

export const CallError = () => {
  return (
    <div className="flex h-dvh items-center justify-center">
      <ErrorState
        title="Error Loading Call"
        description="Something went wrong."
      />
    </div>
  )
}
