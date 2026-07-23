import { Avatar, Style } from "@dicebear/core"
import initials from "@dicebear/styles/initials.json" with { type: "json" }
import botttsNeutral from "@dicebear/styles/bottts-neutral.json" with { type: "json" }

interface GeneratedAvatarUriProps {
  seed: string
  variant: "botttsNeutral" | "initials"
}

const initialsStyle = new Style(initials)
const botttsNeutralStyle = new Style(botttsNeutral)

export default function generateAvatarUri({
  seed,
  variant,
}: GeneratedAvatarUriProps) {
  let avatar: string

  if (variant === "botttsNeutral") {
    avatar = new Avatar(botttsNeutralStyle, {
      seed,
    }).toDataUri()
  } else {
    avatar = new Avatar(initialsStyle, {
      seed,
      fontWeight: 500,
      size: 42,
    }).toDataUri()
  }
  return avatar
}
