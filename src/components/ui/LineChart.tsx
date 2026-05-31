import React from 'react'
import styles from './LineChart.module.css'

export interface ChartPoint { label: string; value: number }

interface LineChartProps {
  data: ChartPoint[]
  height?: number
  title?: string
  color?: string
  formatY?: (v: number) => string
}

export function LineChart({ data, height = 200, title, color = 'var(--color-primary)', formatY }: LineChartProps) {
  const W = 560
  const H = height
  const padL = 52
  const padR = 16
  const padT = 12
  const padB = 32
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const values = data.map(d => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const px = (i: number) => padL + (i / (data.length - 1)) * innerW
  const py = (v: number) => padT + (1 - (v - min) / range) * innerH

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(i)} ${py(d.value)}`).join(' ')
  const areaPath = `${linePath} L ${px(data.length - 1)} ${padT + innerH} L ${padL} ${padT + innerH} Z`

  const yTicks = 4
  const gridId = `lg-${Math.random().toString(36).slice(2, 7)}`

  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg} aria-label={title}>
        <defs>
          <linearGradient id={gridId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis grid + labels */}
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const ratio = i / yTicks
          const y = padT + ratio * innerH
          const val = max - ratio * range
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="var(--color-neutral-200)" strokeWidth="1" />
              <text x={padL - 6} y={y + 4} textAnchor="end" className={styles.tick}>
                {formatY ? formatY(val) : Math.round(val).toLocaleString()}
              </text>
            </g>
          )
        })}

        {/* Area + line */}
        <path d={areaPath} fill={`url(#${gridId})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* X-axis labels */}
        {data.map((d, i) => {
          const every = Math.ceil(data.length / 8)
          if (i % every !== 0 && i !== data.length - 1) return null
          return (
            <text key={i} x={px(i)} y={H - 8} textAnchor="middle" className={styles.tick}>
              {d.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
