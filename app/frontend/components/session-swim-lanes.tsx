import { Badge } from "@/components/ui/badge"
import { getSessionColor } from "@/lib/session-colors"
import { cn } from "@/lib/utils"
import type { HookEvent } from "@/types"

interface SessionSwimLanesProps {
  events: HookEvent[]
}

function groupBySession(events: HookEvent[]): Map<string, HookEvent[]> {
  const map = new Map<string, HookEvent[]>()
  for (const event of events) {
    const list = map.get(event.session_id) ?? []
    list.push(event)
    map.set(event.session_id, list)
  }
  return map
}

function SwimLane({
  sessionId,
  events,
}: {
  sessionId: string
  events: HookEvent[]
}) {
  const color = getSessionColor(sessionId)
  const toolCount = events.filter(
    (e) =>
      e.hook_event_type === "pre_tool_use" ||
      e.hook_event_type === "post_tool_use",
  ).length

  return (
    <div
      className={cn(
        "flex min-w-[200px] flex-col rounded-lg border p-2",
        color.border,
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className={cn("size-2 rounded-full", color.dot)} />
        <span className={cn("truncate text-xs font-medium", color.text)}>
          {events[0]?.source_app ?? sessionId.slice(0, 8)}
        </span>
        <Badge variant="outline" className="ml-auto text-xs">
          {events.length}
        </Badge>
      </div>
      <div className="text-muted-foreground mb-2 flex gap-2 text-xs">
        <span>{toolCount} tools</span>
      </div>
      <div className="flex max-h-32 flex-col gap-0.5 overflow-y-auto">
        {events.slice(0, 20).map((event) => (
          <div
            key={event.id}
            className={cn(
              "truncate rounded px-1.5 py-0.5 text-xs",
              color.bg,
              event.payload?.blocked ? "ring-destructive ring-1" : "",
            )}
          >
            {event.hook_event_type.replace(/_/g, " ")}
            {typeof event.payload?.tool_name === "string"
              ? ` \u00b7 ${event.payload.tool_name}`
              : ""}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SessionSwimLanes({ events }: SessionSwimLanesProps) {
  const sessions = groupBySession(events)

  if (sessions.size === 0) {
    return null
  }

  return (
    <div className="flex gap-2 overflow-x-auto p-2">
      {[...sessions.entries()].map(([sessionId, sessionEvents]) => (
        <SwimLane
          key={sessionId}
          sessionId={sessionId}
          events={sessionEvents}
        />
      ))}
    </div>
  )
}
