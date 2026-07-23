import EmptyState from "@/components/empty-state"

export default function ProcessingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-background px-4 py-5">
      <EmptyState
        image="/processing.svg"
        title="Meeting processing"
        description="This meeting was completed, a summary will appear soon."
      />
    </div>
  )
}
