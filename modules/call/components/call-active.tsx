import Link from "next/link"
import Image from "next/image"
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk"

interface CallActiveProps {
  onLeave: () => void
  meetingName: string
}
export default function CallActive({ onLeave, meetingName }: CallActiveProps) {
  return (
    <div className="flex h-dvh flex-col justify-between p-4 text-white">
      <div className="flex items-center gap-4 rounded-full bg-[#101213] p-4">
        <Link
          href="/"
          className="flex w-fit items-center justify-center rounded-full bg-white/10 p-1"
        >
          <Image src="/logo.svg" width={22} height={22} alt="Logo Image" />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="rounded-full bg-[#101213] p-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  )
}
