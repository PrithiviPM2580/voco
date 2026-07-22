import { auth } from "@/lib/auth"
import Meetings, {
  MeetingError,
  MeetingLoading,
} from "@/modules/meetings/components/meetings"
import MeetingsListHeader from "@/modules/meetings/components/meetings-list-header"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { redirect } from "next/navigation"
import { SearchParams } from "nuqs/server"
import { loadSearchParams } from "@/modules/meetings/params"

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const filters = await loadSearchParams(searchParams)
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  )

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingLoading />}>
          <ErrorBoundary fallback={<MeetingError />}>
            <Meetings />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}
