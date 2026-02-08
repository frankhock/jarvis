# frozen_string_literal: true

class CreateHookEvents < ActiveRecord::Migration[8.1]
  def change
    create_table :hook_events do |t|
      t.string :source_app, null: false
      t.uuid :session_id, null: false
      t.string :hook_event_type, null: false
      t.jsonb :payload, null: false, default: {}
      t.jsonb :chat
      t.text :summary
      t.string :ai_model
      t.datetime :timestamp, null: false

      t.timestamps
    end

    add_index :hook_events, :source_app
    add_index :hook_events, :session_id
    add_index :hook_events, :hook_event_type
    add_index :hook_events, :timestamp
  end
end
