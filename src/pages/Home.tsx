import React, { useState } from 'react'
import { Button, Card, Badge, MetricCard, Tabs, SearchInput, Select, LogLevelBadge, EmptyState, DateRangePicker } from '@/components/ui'
import styles from './Home.module.css'
import type { Page } from '@/App'

interface HomePageProps {
  onNavigate: (p: Page) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectVal, setSelectVal] = useState('all')

  function handleDemo() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Badge variant="info">v0.2.0</Badge>
        <h1 className={styles.heroTitle}>Design System Starter</h1>
        <p className={styles.heroSubtitle}>
          A clean React + Vite + TypeScript foundation with a ready-to-extend component library.
          Includes analytics and log analyzer tools.
        </p>
        <div className={styles.heroActions}>
          <Button size="lg" onClick={() => onNavigate('analytics')}>View Analytics</Button>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('logs')}>Open Log Analyzer</Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Components</h2>
        <div className={styles.grid}>
          <Card title="Button" description="primary / secondary / ghost / danger, sizes, loading state."
            footer={<div className={styles.cardFooter}><Badge variant="success">Stable</Badge></div>}>
            <div className={styles.componentDemo}>
              <Button variant="primary" size="sm" onClick={handleDemo} loading={loading}>Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="danger" size="sm">Danger</Button>
            </div>
          </Card>

          <Card title="Badge" description="Inline status / category label."
            footer={<div className={styles.cardFooter}><Badge variant="success">Stable</Badge></div>}>
            <div className={styles.componentDemo}>
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Card>

          <Card title="Card" description="Header + body + footer slots, sm/md/lg padding."
            footer={<div className={styles.cardFooter}><Badge variant="success">Stable</Badge></div>}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
              Composable container with optional sections.
            </p>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Analytics Components</h2>
        <div className={styles.grid}>
          <MetricCard label="Total Requests" value="1 284 042" trend={12.4}
            sparkline={[410,390,430,480,510,490,530,560,520,580,610,590]} />
          <MetricCard label="Error Rate" value="0.38%" trend={-3.1}
            sparkline={[0.6,0.5,0.7,0.4,0.5,0.3,0.4,0.4,0.3,0.4,0.4,0.38]} />
          <MetricCard label="Avg Latency" value="84 ms" trend={-8.7}
            sparkline={[102,98,110,95,92,88,85,90,82,84,80,84]} />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Form &amp; Log Components</h2>
        <div className={styles.grid}>
          <Card title="SearchInput" description="Search input with clear button.">
            <SearchInput value={search} onChange={setSearch} placeholder="Search logs…" />
          </Card>
          <Card title="Select" description="Styled native select with chevron.">
            <Select
              value={selectVal}
              onChange={setSelectVal}
              options={[
                { value: 'all', label: 'All levels' },
                { value: 'error', label: 'ERROR' },
                { value: 'warn', label: 'WARN' },
                { value: 'info', label: 'INFO' },
              ]}
            />
          </Card>
          <Card title="LogLevelBadge" description="Coloured pill for ERROR / WARN / INFO / DEBUG.">
            <div className={styles.componentDemo}>
              <LogLevelBadge level="ERROR" />
              <LogLevelBadge level="WARN" />
              <LogLevelBadge level="INFO" />
              <LogLevelBadge level="DEBUG" />
            </div>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Navigation &amp; Layout</h2>
        <Tabs tabs={[
          { id: 'a', label: 'Overview', count: 3 },
          { id: 'b', label: 'Errors', count: 12 },
          { id: 'c', label: 'Latency' },
        ]}>
          {id => (
            <Card>
              <EmptyState
                icon={id === 'a' ? '📊' : id === 'b' ? '🚨' : '⏱'}
                title={id === 'a' ? 'Overview tab' : id === 'b' ? 'Errors tab' : 'Latency tab'}
                description="Switch tabs to see the active state change."
              />
            </Card>
          )}
        </Tabs>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Date Range Picker</h2>
        <p className={styles.sectionSubtitle}>
          Dual-handle slider · Step selector (15m / 30m / 1h / 2h) · 5-hour max · Click date or time to edit directly
        </p>
        <DateRangePicker maxHours={5} />
      </section>
    </div>
  )
}
