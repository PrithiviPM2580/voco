import {
  parseAsString,
  parseAsInteger,
  createLoader,
  parseAsStringEnum,
} from "nuqs/server"
import { DEFAULT_PAGE } from "@/lib/constants"
import { MeetingStatus } from "./types"

export const filtersSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  status: parseAsStringEnum(Object.values(MeetingStatus)),
}

export const loadSearchParams = createLoader(filtersSearchParams)
