import EmptyState from "@/components/empty-state"

export default function CancelledState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-background px-4 py-5">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="This meeting has been cancelled."
      />
    </div>
  )
}
