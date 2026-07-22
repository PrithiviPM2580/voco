"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import NewAgentDialog from "./new-agent-dialog"
import { useState } from "react"
import useAgentsFilters from "../hooks/use-agents-filters"
import AgentsSearchFilter from "./agents-search-filter"
import { DEFAULT_PAGE } from "@/lib/constants"

export default function AgentsListHeader() {
  const [filters, setFilters] = useAgentsFilters()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const isAnyFieldModified = !!filters.search

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 p-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFieldModified && (
            <Button variant="outline" onClick={onClearFilters} size="sm">
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
