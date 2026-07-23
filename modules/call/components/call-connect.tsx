"use client"

import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { useState, useEffect } from "react"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"
import { LoaderIcon } from "lucide-react"
import CallUI from "./call-ui"

interface CallConnectProps {
  meetingId: string
  meetingName: string
  userId: string
  userName: string
  userImage: string
}

export default function CallConnect({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: CallConnectProps) {
  const trpc = useTRPC()
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  )

  const [client, setClient] = useState<StreamVideoClient | null>(null)
  const [call, setCall] = useState<Call | null>(null)

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    })

    setClient(_client)

    return () => {
      _client.disconnectUser()
      setClient(null)
    }
  }, [userId, userName, userImage, generateToken])

  useEffect(() => {
    if (!client) return

    const _call = client.call("default", meetingId)
    _call.camera.disable()
    _call.microphone.disable()
    setCall(_call)

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave()
        _call.endCall()
        setCall(null)
      }
    }
  }, [client, meetingId])

  if (!client || !call) {
    return (
      <div className="flex h-dvh items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    )
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  )
}
