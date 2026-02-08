import { Head } from "@inertiajs/react"
import { Trash2 } from "lucide-react"
import { useState } from "react"

import { ConnectionStatus } from "@/components/connection-status"
import { EventTimeline } from "@/components/event-timeline"
import type { Filters } from "@/components/filter-panel"
import { FilterPanel } from "@/components/filter-panel"
import { PulseChart } from "@/components/pulse-chart"
import { SessionSwimLanes } from "@/components/session-swim-lanes"
import { Button } from "@/components/ui/button"
import { useEventsChannel } from "@/hooks/use-events-channel"
import { useFilteredEvents } from "@/hooks/use-filtered-events"
import AppLayout from "@/layouts/app-layout"
import { dashboardPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
  },
]

export default function Dashboard() {
  const { events, connected, clearEvents } = useEventsChannel()
  const [filters, setFilters] = useState<Filters>({
    sourceApp: "all",
    sessionId: "all",
    eventType: "all",
  })

  const filteredEvents = useFilteredEvents(events, filters)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={breadcrumbs[breadcrumbs.length - 1].title} />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">Agent Observability</h2>
            <ConnectionStatus connected={connected} />
            <span className="text-muted-foreground text-xs">
              {filteredEvents.length} events
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FilterPanel
              events={events}
              filters={filters}
              onFiltersChange={setFilters}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => void clearEvents()}
              className="h-8"
            >
              <Trash2 className="mr-1 size-3.5" />
              Clear
            </Button>
          </div>
        </div>

        {/* Pulse chart */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border overflow-hidden rounded-xl border">
          <PulseChart events={filteredEvents} />
        </div>

        {/* Session swim lanes */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border max-h-56 overflow-hidden rounded-xl border">
          <SessionSwimLanes events={filteredEvents} />
        </div>

        {/* Event timeline */}
        <div className="border-sidebar-border/70 dark:border-sidebar-border min-h-0 flex-1 overflow-hidden rounded-xl border">
          <EventTimeline events={filteredEvents} />
        </div>
      </div>
    </AppLayout>
  )
}
