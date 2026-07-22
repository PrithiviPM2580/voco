import ResponsiveDialog from "@/components/responsive-dialog"
import AgentsForm from "./agents-form"

interface UpdateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpdateAgentDialog({
  open,
  onOpenChange,
}: UpdateAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}
