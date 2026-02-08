const SESSION_COLORS = [
  {
    bg: "bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-500/30",
    dot: "bg-blue-500",
  },
  {
    bg: "bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  {
    bg: "bg-violet-500/15",
    text: "text-violet-700 dark:text-violet-400",
    border: "border-violet-500/30",
    dot: "bg-violet-500",
  },
  {
    bg: "bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-500",
  },
  {
    bg: "bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-400",
    border: "border-rose-500/30",
    dot: "bg-rose-500",
  },
  {
    bg: "bg-cyan-500/15",
    text: "text-cyan-700 dark:text-cyan-400",
    border: "border-cyan-500/30",
    dot: "bg-cyan-500",
  },
  {
    bg: "bg-pink-500/15",
    text: "text-pink-700 dark:text-pink-400",
    border: "border-pink-500/30",
    dot: "bg-pink-500",
  },
  {
    bg: "bg-teal-500/15",
    text: "text-teal-700 dark:text-teal-400",
    border: "border-teal-500/30",
    dot: "bg-teal-500",
  },
  {
    bg: "bg-orange-500/15",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-500/30",
    dot: "bg-orange-500",
  },
  {
    bg: "bg-indigo-500/15",
    text: "text-indigo-700 dark:text-indigo-400",
    border: "border-indigo-500/30",
    dot: "bg-indigo-500",
  },
] as const

export type SessionColor = (typeof SESSION_COLORS)[number]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return Math.abs(hash)
}

const colorCache = new Map<string, SessionColor>()

export function getSessionColor(sessionId: string): SessionColor {
  if (colorCache.has(sessionId)) {
    return colorCache.get(sessionId)!
  }
  const color = SESSION_COLORS[hashString(sessionId) % SESSION_COLORS.length]
  colorCache.set(sessionId, color)
  return color
}
