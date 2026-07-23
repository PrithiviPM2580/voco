import ResponsiveDialog from "@/components/responsive-dialog"
import MeetingsForm from "./meetings-form"
import { MeetingGetOne } from "../types"

interface UpdateMeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues: MeetingGetOne
}

export default function UpdateMeetingDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the details of this meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={(id) => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}
