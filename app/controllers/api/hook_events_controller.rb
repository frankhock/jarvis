# frozen_string_literal: true

class Api::HookEventsController < ApplicationController
  skip_before_action :authenticate
  skip_forgery_protection

  def index
    events = HookEvent
      .by_source_app(params[:source_app])
      .by_session_id(params[:session_id])
      .by_event_type(params[:hook_event_type])
      .recent

    render json: events
  end

  def create
    event = HookEvent.new(hook_event_params)

    if event.save
      ::EventsChannel.broadcast_event(event)
      render json: event, status: :created
    else
      render json: {errors: event.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy_all
    HookEvent.delete_all
    head :no_content
  end

  private

  def hook_event_params
    params.permit(
      :source_app, :session_id, :hook_event_type,
      :summary, :ai_model, :timestamp,
      payload: {}, chat: {}
    )
  end
end
