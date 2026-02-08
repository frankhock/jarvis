# frozen_string_literal: true

class EventsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "events"
    transmit({type: "initial_events", events: HookEvent.recent.as_json})
  end

  def unsubscribed
    # Cleanup if needed
  end

  def self.broadcast_event(event)
    ActionCable.server.broadcast("events", {type: "new_event", event: event.as_json})
  end
end
