import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import useMeetingsFilters from "../hooks/use-agents-filters"

export default function MeetingsSearchFilter() {
  const [filters, setFilters] = useMeetingsFilters()

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 w-50 bg-white pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}
