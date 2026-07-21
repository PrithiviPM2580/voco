"use client"

import { authClient } from "@/lib/auth-client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import GeneratedAvatar from "@/components/generated-avatar"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function DashboardUserButton() {
  const { data, isPending } = authClient.useSession()
  const router = useRouter()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully")
          router.push("/sign-in")
        },
      },
    })
  }

  if (isPending || !data?.user) {
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-border/10 bg-white/5 p-3 hover:bg-white/10">
        {data?.user.image ? (
          <Avatar>
            <AvatarImage src={data?.user.image}></AvatarImage>
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data?.user.name}
            variant="initials"
            className="mr-3 size-9"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm">{data?.user.name}</p>
          <p className="w-full truncate text-xs">{data?.user.email}</p>
        </div>
        <ChevronDownIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" side="right">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              <span className="font-medium">{data?.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {data?.user.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
            Billing
            <CreditCardIcon className="size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className="flex cursor-pointer items-center justify-between"
          >
            Logout
            <LogOutIcon className="size-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
