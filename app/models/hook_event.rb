# frozen_string_literal: true

class HookEvent < ApplicationRecord
  VALID_EVENT_TYPES = %w[
    session_start session_end user_prompt_submit
    pre_tool_use post_tool_use notification
    stop subagent_stop pre_compact
  ].freeze

  UUID_V4_REGEX = /\A[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\z/i

  validates :source_app, presence: true
  validates :session_id, presence: true, format: {with: UUID_V4_REGEX, message: "must be a valid v4 UUID"}
  validates :hook_event_type, presence: true, inclusion: {in: VALID_EVENT_TYPES}
  validates :timestamp, presence: true

  scope :recent, -> { order(timestamp: :desc).limit(100) }
  scope :by_source_app, ->(source_app) { where(source_app: source_app) if source_app.present? }
  scope :by_session_id, ->(session_id) { where(session_id: session_id) if session_id.present? }
  scope :by_event_type, ->(event_type) { where(hook_event_type: event_type) if event_type.present? }
end
