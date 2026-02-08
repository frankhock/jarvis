import { cn } from "@/lib/utils"

interface ConnectionStatusProps {
  connected: boolean
}

export function ConnectionStatus({ connected }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          "size-2 rounded-full",
          connected ? "animate-pulse bg-emerald-500" : "bg-red-500",
        )}
      />
      <span className="text-muted-foreground text-xs">
        {connected ? "Live" : "Disconnected"}
      </span>
    </div>
  )
}
