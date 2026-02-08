import type { SVGAttributes } from "react"
import { useId } from "react"

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
  const id = useId()
  const glowId = `${id}-arc-glow`
  const coreGlowId = `${id}-arc-core-glow`

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={coreGlowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring — dashed, rotating */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="18 12"
        opacity="0.6"
        className="arc-ring-outer"
      />

      {/* Middle ring — solid */}
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.8"
        filter={`url(#${glowId})`}
      />

      {/* Inner vanes — 3 at 120° intervals */}
      <g filter={`url(#${glowId})`} opacity="0.9">
        <path d="M50 22 L45 30 L55 30 Z" fill="currentColor" />
        <path
          d="M50 22 L45 30 L55 30 Z"
          fill="currentColor"
          transform="rotate(120 50 50)"
        />
        <path
          d="M50 22 L45 30 L55 30 Z"
          fill="currentColor"
          transform="rotate(240 50 50)"
        />
      </g>

      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Center core */}
      <circle
        cx="50"
        cy="50"
        r="10"
        fill="currentColor"
        opacity="0.9"
        filter={`url(#${coreGlowId})`}
        className="arc-core"
      />
    </svg>
  )
}
