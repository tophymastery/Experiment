import React from 'react'
import styles from './BarChart.module.css'

export interface ChartPoint { label: string; value: number }

interface BarChartProps {
  data: ChartPoint[]
  title?: string
  color?: string
  formatValue?: (v: number) => string
  horizontal?: boolean
}

export function BarChart({ data, title, color = 'var(--color-primary)', formatValue, horizontal = false }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value))

  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <div className={[styles.chart, horizontal ? styles.horizontal : styles.vertical].join(' ')}>
        {data.map((d) => {
          const pct = (d.value / max) * 100
          return (
            <div key={d.label} className={styles.item} title={`${d.label}: ${formatValue ? formatValue(d.value) : d.value}`}>
              {horizontal ? (
                <>
                  <span className={styles.labelH}>{d.label}</span>
                  <div className={styles.trackH}>
                    <div className={styles.barH} style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className={styles.valueH}>{formatValue ? formatValue(d.value) : d.value}</span>
                </>
              ) : (
                <>
                  <div className={styles.trackV}>
                    <div className={styles.barV} style={{ height: `${pct}%`, background: color }} />
                  </div>
                  <span className={styles.labelV}>{d.label}</span>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
