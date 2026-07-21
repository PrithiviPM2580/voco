import { Avatar, Style } from "@dicebear/core"
import initials from "@dicebear/styles/initials.json" with { type: "json" }
import botttsNeutral from "@dicebear/styles/bottts-neutral.json" with { type: "json" }

import {
  Avatar as BotAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface GeneratedAvatarProps {
  seed: string
  className?: string
  variant: "botttsNeutral" | "initials"
}

const initialsStyle = new Style(initials)
const botttsNeutralStyle = new Style(botttsNeutral)

export default function GeneratedAvatar({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) {
  let avatar: string

  if (variant === "botttsNeutral") {
    avatar = new Avatar(botttsNeutralStyle, {
      seed,
    }).toDataUri()
  } else {
    avatar = new Avatar(initialsStyle, {
      seed,
      fontWeight: 500,
    }).toDataUri()
  }

  return (
    <BotAvatar className={cn(className)}>
      <AvatarImage src={avatar} alt="Generated avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </BotAvatar>
  )
}
