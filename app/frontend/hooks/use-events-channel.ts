import { useCallback, useEffect, useRef, useState } from "react"

import cable from "@/lib/cable"
import type { HookEvent } from "@/types"

const MAX_EVENTS = 100

interface EventsChannelData {
  type: "initial_events" | "new_event"
  events?: HookEvent[]
  event?: HookEvent
}

export function useEventsChannel() {
  const [events, setEvents] = useState<HookEvent[]>([])
  const [connected, setConnected] = useState(false)
  const subscriptionRef = useRef<ReturnType<
    typeof cable.subscriptions.create
  > | null>(null)

  useEffect(() => {
    const subscription = cable.subscriptions.create("EventsChannel", {
      connected() {
        setConnected(true)
      },
      disconnected() {
        setConnected(false)
      },
      received(data: EventsChannelData) {
        if (data.type === "initial_events" && data.events) {
          setEvents(data.events)
        } else if (data.type === "new_event" && data.event) {
          setEvents((prev) => {
            const next = [data.event!, ...prev]
            return next.slice(0, MAX_EVENTS)
          })
        }
      },
    })

    subscriptionRef.current = subscription

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const clearEvents = useCallback(async () => {
    await fetch("/api/hook_events/destroy_all", { method: "DELETE" })
    setEvents([])
  }, [])

  return { events, connected, clearEvents }
}
