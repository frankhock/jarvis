import { useMemo } from "react"

import type { Filters } from "@/components/filter-panel"
import type { HookEvent } from "@/types"

export function useFilteredEvents(
  events: HookEvent[],
  filters: Filters,
): HookEvent[] {
  return useMemo(() => {
    return events.filter((e) => {
      if (filters.sourceApp !== "all" && e.source_app !== filters.sourceApp)
        return false
      if (filters.sessionId !== "all" && e.session_id !== filters.sessionId)
        return false
      if (
        filters.eventType !== "all" &&
        e.hook_event_type !== filters.eventType
      )
        return false
      return true
    })
  }, [events, filters])
}
