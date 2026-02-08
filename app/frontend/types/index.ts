import type { LucideIcon } from "lucide-react"

export interface Auth {
  user: User
  session: Pick<Session, "id">
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon | null
  isActive?: boolean
}

export interface FlashData {
  alert?: string
  notice?: string
}

export interface SharedData {
  auth: Auth
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  verified: boolean
  created_at: string
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
}

export interface Session {
  id: string
  user_agent: string
  ip_address: string
  created_at: string
}

export const HOOK_EVENT_TYPES = [
  "session_start",
  "session_end",
  "user_prompt_submit",
  "pre_tool_use",
  "post_tool_use",
  "notification",
  "stop",
  "subagent_stop",
  "pre_compact",
] as const

export type HookEventType = (typeof HOOK_EVENT_TYPES)[number]

export interface HookEvent {
  id: number
  source_app: string
  session_id: string
  hook_event_type: HookEventType
  payload: Record<string, unknown>
  chat: Record<string, unknown> | null
  summary: string | null
  ai_model: string | null
  timestamp: string
  created_at: string
  updated_at: string
}
