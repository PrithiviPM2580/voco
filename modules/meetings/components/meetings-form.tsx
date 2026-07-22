import { useTRPC } from "@/trpc/client"
import { MeetingGetOne } from "../types"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { meetingsInsertSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import CommandSelect from "./command-select"
import GeneratedAvatar from "@/components/generated-avatar"
import NewAgentDialog from "@/modules/agents/components/new-agent-dialog"

interface MeetingsFormProps {
  onSuccess?: (id?: string) => void
  onCancel?: () => void
  initialValues?: MeetingGetOne
}

export default function MeetingsForm({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingsFormProps) {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState<boolean>(false)
  const [agentSearch, setAgentSearch] = useState<string>("")

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  )

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        )
        onSuccess?.(data.id)
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        )

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          )
        }
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  })

  const isEdit = !!initialValues?.id
  const isPending = createMeeting.isPending || updateMeeting.isPending

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues?.id })
    } else {
      createMeeting.mutate(values)
    }
  }

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Card className="w-full sm:max-w-md">
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="eg. Team Meeting"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="agentId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-agentId">
                      Agent
                    </FieldLabel>
                    <CommandSelect
                      options={(agents.data?.items ?? []).map((agent) => ({
                        id: agent.id,
                        value: agent.id,
                        children: (
                          <div className="flex items-center gap-x-2">
                            <GeneratedAvatar
                              seed={agent.name}
                              variant="botttsNeutral"
                              className="size-6 border"
                            />
                            <span>{agent.name}</span>
                          </div>
                        ),
                      }))}
                      onSelect={field.onChange}
                      onSearch={setAgentSearch}
                      value={field.value}
                      placeholder="Select an agent"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <FieldDescription className="text-xs">
                      Not found what you&apos;re looking for?{" "}
                      <Button
                        type="button"
                        variant="link"
                        className="inline text-xs text-primary hover:underline"
                        onClick={() => setOpenNewAgentDialog(true)}
                      >
                        Create new agent
                      </Button>
                    </FieldDescription>
                  </Field>
                )}
              />
              <div className="flex justify-between gap-x-2">
                {onCancel && (
                  <Button
                    variant="outline"
                    disabled={isPending}
                    type="button"
                    onClick={() => onCancel()}
                  >
                    Cancel
                  </Button>
                )}
                <Button disabled={isPending} type="submit">
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  )
}
