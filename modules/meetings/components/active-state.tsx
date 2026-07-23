import EmptyState from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { VideoIcon } from "lucide-react"
import Link from "next/link"

interface ActiveStateProps {
  meetingId: string
}

export default function ActiveState({ meetingId }: ActiveStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-background px-4 py-5">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        description="Meeting will end once all participants have left."
      />
      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
        <Button
          nativeButton={false}
          className="w-full lg:w-auto"
          render={
            <Link href="/meetings">
              <VideoIcon className="mr-2 h-4 w-4" />
              Join meeting
            </Link>
          }
        />
      </div>
    </div>
  )
}
