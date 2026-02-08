import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { HookEvent } from "@/types"
import { HOOK_EVENT_TYPES } from "@/types"

export interface Filters {
  sourceApp: string
  sessionId: string
  eventType: string
}

interface FilterPanelProps {
  events: HookEvent[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

function uniqueStringValues(
  events: HookEvent[],
  key: "source_app" | "session_id",
): string[] {
  return [...new Set(events.map((e) => e[key]))].sort()
}

export function FilterPanel({
  events,
  filters,
  onFiltersChange,
}: FilterPanelProps) {
  const sourceApps = uniqueStringValues(events, "source_app")
  const sessionIds = uniqueStringValues(events, "session_id")

  return (
    <div className="flex items-center gap-2">
      <Select
        value={filters.sourceApp}
        onValueChange={(v) => onFiltersChange({ ...filters, sourceApp: v })}
      >
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue placeholder="Source App" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {sourceApps.map((app) => (
            <SelectItem key={app} value={app}>
              {app}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sessionId}
        onValueChange={(v) => onFiltersChange({ ...filters, sessionId: v })}
      >
        <SelectTrigger className="h-8 w-[160px]">
          <SelectValue placeholder="Session" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sessions</SelectItem>
          {sessionIds.map((id) => (
            <SelectItem key={id} value={id}>
              {id.slice(0, 12)}...
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.eventType}
        onValueChange={(v) => onFiltersChange({ ...filters, eventType: v })}
      >
        <SelectTrigger className="h-8 w-[140px]">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {HOOK_EVENT_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
