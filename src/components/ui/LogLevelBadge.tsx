import React from 'react'
import styles from './LogLevelBadge.module.css'
import type { LogLevel } from '@/data/mockLogs'

interface LogLevelBadgeProps { level: LogLevel }

export function LogLevelBadge({ level }: LogLevelBadgeProps) {
  return <span className={[styles.badge, styles[level.toLowerCase()]].join(' ')}>{level}</span>
}
