import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export default function Page() {
  const session = authClient.getSession()
  return <div></div>
}
