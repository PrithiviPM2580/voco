import { auth } from "@/lib/auth"
import SignUp from "@/modules/auth/components/sign-up"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!!session) {
    redirect("/")
  }
  return <SignUp />
}
