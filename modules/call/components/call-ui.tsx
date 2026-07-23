import { useState } from "react"
import { StreamTheme, useCall } from "@stream-io/video-react-sdk"
import { CallStateType } from "../types"
import CallLobby from "./call-lobby"
import CallActive from "./call-active"
import CallEndLobby from "./call-ended"

interface CallUIProps {
  meetingName: string
}

export default function CallUI({ meetingName }: CallUIProps) {
  const call = useCall()

  const [show, setShow] = useState<CallStateType>("lobby")

  const handleJoinCall = async () => {
    if (!call) return

    await call.join()
    setShow("call")
  }

  const handleLeaveCall = async () => {
    if (!call) return

    await call.endCall()
    setShow("ended")
  }
  return (
    <StreamTheme className="h-dvh">
      {show === "lobby" && <CallLobby onJoin={handleJoinCall} />}
      {show === "call" && (
        <CallActive onLeave={handleLeaveCall} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEndLobby />}
    </StreamTheme>
  )
}
