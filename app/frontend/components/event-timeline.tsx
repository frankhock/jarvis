import { ChevronDown, ChevronRight, ShieldAlert } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { getSessionColor } from "@/lib/session-colors"
import { cn } from "@/lib/utils"
import type { HookEvent } from "@/types"

function EventTypeLabel({ type }: { type: string }) {
  const labels: Record<
    string,
    {
      label: string
      variant: "default" | "secondary" | "destructive" | "outline"
    }
  > = {
    session_start: { label: "Session Start", variant: "default" },
    session_end: { label: "Session End", variant: "secondary" },
    user_prompt_submit: { label: "Prompt", variant: "outline" },
    pre_tool_use: { label: "Pre Tool", variant: "outline" },
    post_tool_use: { label: "Post Tool", variant: "secondary" },
    notification: { label: "Notification", variant: "default" },
    stop: { label: "Stop", variant: "secondary" },
    subagent_stop: { label: "Subagent Stop", variant: "secondary" },
    pre_compact: { label: "Compact", variant: "outline" },
  }
  const config = labels[type] || { label: type, variant: "outline" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

function EventRow({ event }: { event: HookEvent }) {
  const [expanded, setExpanded] = useState(false)
  const color = getSessionColor(event.session_id)
  const isBlocked = event.payload?.blocked === true
  const time = new Date(event.timestamp).toLocaleTimeString()

  return (
    <div className={cn("border-b px-3 py-2", color.bg)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 text-left text-sm"
      >
        {expanded ? (
          <ChevronDown className="size-4 shrink-0" />
        ) : (
          <ChevronRight className="size-4 shrink-0" />
        )}
        <span className={cn("size-2 shrink-0 rounded-full", color.dot)} />
        <span className="text-muted-foreground shrink-0 font-mono text-xs">
          {time}
        </span>
        <EventTypeLabel type={event.hook_event_type} />
        {isBlocked && (
          <ShieldAlert className="text-destructive size-4 shrink-0" />
        )}
        {typeof event.payload?.tool_name === "string" ? (
          <span className="truncate font-mono text-xs">
            {event.payload.tool_name}
          </span>
        ) : null}
        <span className={cn("ml-auto shrink-0 truncate text-xs", color.text)}>
          {event.source_app}
        </span>
      </button>
      {expanded && (
        <pre className="mt-2 max-h-64 overflow-auto rounded bg-neutral-950 p-2 text-xs text-neutral-200">
          {JSON.stringify(event.payload, null, 2)}
        </pre>
      )}
    </div>
  )
}

interface EventTimelineProps {
  events: HookEvent[]
}

export function EventTimeline({ events }: EventTimelineProps) {
  return (
    <div className="flex flex-col overflow-y-auto">
      {events.length === 0 ? (
        <div className="text-muted-foreground p-8 text-center text-sm">
          No events yet. Start a Claude Code session with hooks configured.
        </div>
      ) : (
        events.map((event) => <EventRow key={event.id} event={event} />)
      )}
    </div>
  )
}
