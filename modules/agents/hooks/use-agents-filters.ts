import { parseAsString, parseAsInteger, useQueryStates } from "nuqs"
import { DEFAULT_PAGE } from "@/lib/constants"

export default function useAgentsFilters() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  })
}
