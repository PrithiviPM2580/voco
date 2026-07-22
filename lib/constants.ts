import { BotIcon, StarIcon, VideoIcon, type LucideIcon } from "lucide-react"

interface SidebarLinks {
  id: number
  icon: LucideIcon
  label: string
  href: string
}

export const sidebarLinksFirstSection: SidebarLinks[] = [
  {
    id: 1,
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    id: 2,
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
]

export const sidebarLinksSecondSection: SidebarLinks[] = [
  {
    id: 1,
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
]

export const DEFAULT_PAGE = 1
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100
export const MIN_PAGE_SIZE = 1
