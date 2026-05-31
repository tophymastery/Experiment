import React, { useState } from 'react'
import { LogLevelBadge } from './LogLevelBadge'
import { SearchInput } from './SearchInput'
import { Select } from './Select'
import styles from './LogTable.module.css'
import type { LogEntry, LogLevel } from '@/data/mockLogs'

const LEVEL_OPTIONS = [
  { value: 'ALL',   label: 'All levels' },
  { value: 'ERROR', label: 'ERROR' },
  { value: 'WARN',  label: 'WARN' },
  { value: 'INFO',  label: 'INFO' },
  { value: 'DEBUG', label: 'DEBUG' },
]

interface LogTableProps {
  entries: LogEntry[]
}

export function LogTable({ entries }: LogTableProps) {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('ALL')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = entries.filter(e => {
    const matchLevel = level === 'ALL' || e.level === level
    const q = search.toLowerCase()
    const matchSearch = !q || e.message.toLowerCase().includes(q) || e.source.toLowerCase().includes(q)
    return matchLevel && matchSearch
  })

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search logs…" className={styles.search} />
        <Select options={LEVEL_OPTIONS} value={level} onChange={v => setLevel(v as LogLevel | 'ALL')} />
        <span className={styles.count}>{filtered.length} entries</span>
      </div>

      <div className={styles.table} role="table" aria-label="Log entries">
        <div className={styles.head} role="row">
          <span>Timestamp</span>
          <span>Level</span>
          <span>Source</span>
          <span>Message</span>
        </div>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No matching log entries.</div>
        ) : (
          filtered.map(entry => (
            <React.Fragment key={entry.id}>
              <div
                className={[styles.row, styles[entry.level.toLowerCase()], entry.details ? styles.expandable : ''].join(' ')}
                role="row"
                onClick={() => entry.details && setExpanded(expanded === entry.id ? null : entry.id)}
                aria-expanded={entry.details ? expanded === entry.id : undefined}
              >
                <span className={styles.ts}>{entry.timestamp}</span>
                <span><LogLevelBadge level={entry.level} /></span>
                <span className={styles.source}>{entry.source}</span>
                <span className={styles.msg}>{entry.message}</span>
              </div>
              {expanded === entry.id && entry.details && (
                <div className={styles.details}>
                  <pre>{JSON.stringify(entry.details, null, 2)}</pre>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  )
}
