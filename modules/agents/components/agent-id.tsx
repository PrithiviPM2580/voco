"use client"

import ErrorState from "@/components/error-state"
import LoadingState from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import AgentIdHeader from "./agent-id-header"
import GeneratedAvatar from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"

interface AgentIdProps {
  agentId: string
}

export default function AgentId({ agentId }: AgentIdProps) {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  )
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentIdHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />

      <div className="rounded-lg border">
        <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              seed={data.name}
              variant="botttsNeutral"
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon />
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "meeting" : "meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium">Instructions</p>
            <p className="text-slate-600 dark:text-gray-400">
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AgentIdLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="Please wait while we load the agent."
    />
  )
}

export const AgentIdError = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="Something went wrong."
    />
  )
}
