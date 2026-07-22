import Meetings, {
  MeetingError,
  MeetingLoading,
} from "@/modules/meetings/components/meetings"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

export default function Page() {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingLoading />}>
        <ErrorBoundary fallback={<MeetingError />}>
          <Meetings />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}
