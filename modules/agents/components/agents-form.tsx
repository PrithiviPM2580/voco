import { useTRPC } from "@/trpc/client"
import { AgentGetOne } from "../types"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, Controller } from "react-hook-form"
import { agentsInsertSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import GeneratedAvatar from "@/components/generated-avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AgentsFormProps {
  onSuccess: () => void
  onCancel: () => void
  initialValues?: AgentGetOne
}

export default function AgentsForm({
  onSuccess,
  onCancel,
  initialValues,
}: AgentsFormProps) {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions())

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          )
        }
        onSuccess?.()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  })

  const isEdit = !!initialValues?.id
  const isPending = createAgent.isPending

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("Todo: updateAgent")
    } else {
      createAgent.mutate(values)
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <GeneratedAvatar
            seed={form.watch("name")}
            variant="botttsNeutral"
            className="mb-4 size-12 border"
          />
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
                    placeholder="eg. Math Tutor"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="instructions"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-instructions">
                    Instructions
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-demo-instructions"
                    aria-invalid={fieldState.invalid}
                    placeholder="You are a math tutor. You will answer questions related to math."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
  )
}
