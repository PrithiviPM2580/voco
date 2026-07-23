"use client"

import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"
import { useTRPC } from "@/trpc/client"
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import MeetingIdHeader from "./meeting-id-header"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import useConfirm from "@/modules/agents/hooks/use-confirm"
import UpdateMeetingDialog from "./update-meeting-dialog"
import { useState } from "react"

interface MeetingIdProps {
  meetingId: string
}

export default function MeetingId({ meetingId }: MeetingIdProps) {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] =
    useState<boolean>(false)

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  )
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        router.push("/meetings")
      },
      onError: (error) => {
        toast.error(error.message || "Failed to remove meeting")
      },
    })
  )

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove()
    if (!ok) return

    await removeMeeting.mutateAsync({ id: meetingId })
  }
  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 p-4 md:px-8">
        <MeetingIdHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        <div>{JSON.stringify(data, null, 2)}</div>
      </div>
    </>
  )
}

export const MeetingIdLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take few seconds."
    />
  )
}

export const MeetingIdError = () => {
  return (
    <ErrorState title="Error Loading Meeting" description="Please try again." />
  )
}
