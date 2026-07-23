import EmptyState from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { VideoIcon, BanIcon } from "lucide-react"

interface UpcomingStateProps {
  meetingId: string
  onCancelMeeting: () => void
  isCancelling: boolean
}

export default function UpcomingState({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: UpcomingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-background px-4 py-5">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here."
      />
      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
        <Button
          nativeButton={false}
          variant="secondary"
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
          render={
            <Link href="/meetings">
              <BanIcon className="mr-2 h-4 w-4" />
              Cancel meeting
            </Link>
          }
        />

        <Button
          nativeButton={false}
          variant="default"
          className="w-full lg:w-auto"
          disabled={isCancelling}
          render={
            <Link href={`/call/${meetingId}`}>
              <VideoIcon className="mr-2 h-4 w-4" />
              Start meeting
            </Link>
          }
        />
      </div>
    </div>
  )
}
