import {
  parseAsString,
  parseAsInteger,
  useQueryStates,
  parseAsStringEnum,
} from "nuqs"
import { DEFAULT_PAGE } from "@/lib/constants"
import { MeetingStatus } from "../types"

export default function useMeetingsFilters() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    agentId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingStatus)),
  })
}
