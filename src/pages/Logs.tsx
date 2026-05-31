import React from 'react'
import { LogTable, Card, Badge } from '@/components/ui'
import { mockLogs } from '@/data/mockLogs'
import styles from './Logs.module.css'

const errorCount = mockLogs.filter(l => l.level === 'ERROR').length
const warnCount  = mockLogs.filter(l => l.level === 'WARN').length

export function LogsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Log Analyzer</h1>
          <p className={styles.subtitle}>Showing last 15 entries · Click a row with details to expand</p>
        </div>
        <div className={styles.summary}>
          <Badge variant="danger">{errorCount} errors</Badge>
          <Badge variant="warning">{warnCount} warnings</Badge>
        </div>
      </div>

      <Card padding="sm">
        <LogTable entries={mockLogs} />
      </Card>
    </div>
  )
}
