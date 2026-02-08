import { useEffect, useRef } from "react"

import type { HookEvent } from "@/types"

interface PulseChartProps {
  events: HookEvent[]
}

const CHART_POINTS = 60
const CHART_HEIGHT = 60

export function PulseChart({ events }: PulseChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.offsetWidth
    canvas.width = width * window.devicePixelRatio
    canvas.height = CHART_HEIGHT * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Count events per time bucket (last 5 minutes, 60 buckets = 5s each)
    const now = Date.now()
    const bucketSize = 5000 // 5 seconds
    const buckets = new Array<number>(CHART_POINTS).fill(0)

    for (const event of events) {
      const eventTime = new Date(event.timestamp).getTime()
      const age = now - eventTime
      const bucketIndex = CHART_POINTS - 1 - Math.floor(age / bucketSize)
      if (bucketIndex >= 0 && bucketIndex < CHART_POINTS) {
        buckets[bucketIndex]++
      }
    }

    const maxCount = Math.max(...buckets, 1)
    const barWidth = width / CHART_POINTS

    // Clear
    ctx.clearRect(0, 0, width, CHART_HEIGHT)

    // Draw bars
    for (let i = 0; i < CHART_POINTS; i++) {
      const barHeight = (buckets[i] / maxCount) * (CHART_HEIGHT - 4)
      const x = i * barWidth
      const y = CHART_HEIGHT - barHeight

      ctx.fillStyle =
        buckets[i] > 0
          ? "rgba(59, 130, 246, 0.6)" // blue-500
          : "rgba(115, 115, 115, 0.15)" // neutral
      ctx.fillRect(x + 1, y, barWidth - 2, barHeight)
    }
  }, [events])

  return (
    <canvas
      ref={canvasRef}
      className="h-[60px] w-full"
      style={{ height: CHART_HEIGHT }}
    />
  )
}
