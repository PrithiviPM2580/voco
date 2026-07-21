"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  if (!session) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome, {session?.user.name}!</h1>
      <p className="text-gray-600">
        You are logged in as {session?.user.email}.
      </p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in"),
            },
          })
        }
      >
        Signout
      </Button>
    </div>
  )
}
