import React from 'react'
import { Sparkline } from './Sparkline'
import styles from './MetricCard.module.css'

interface MetricCardProps {
  label: string
  value: string | number
  trend?: number
  sparkline?: number[]
  className?: string
}

function TrendArrow({ value }: { value: number }) {
  const up = value >= 0
  const cls = up ? styles.trendUp : styles.trendDown
  return (
    <span className={[styles.trend, cls].join(' ')}>
      {up ? '↑' : '↓'} {Math.abs(value).toFixed(1)}%
    </span>
  )
}

export function MetricCard({ label, value, trend, sparkline, className = '' }: MetricCardProps) {
  return (
    <div className={[styles.card, className].join(' ')}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {trend !== undefined && <TrendArrow value={trend} />}
      </div>
      <div className={styles.body}>
        <span className={styles.value}>{value}</span>
        {sparkline && <Sparkline data={sparkline} width={80} height={36} />}
      </div>
    </div>
  )
}
