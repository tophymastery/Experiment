import React from 'react'
import { MetricCard, LineChart, BarChart, Card, Tabs } from '@/components/ui'
import { metrics, requestsOverTime, errorsByEndpoint, latencyPercentiles } from '@/data/mockAnalytics'
import styles from './Analytics.module.css'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'errors',   label: 'Errors' },
  { id: 'latency',  label: 'Latency' },
]

export function AnalyticsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics</h1>
          <p className={styles.subtitle}>Last 24 hours · Updated just now</p>
        </div>
      </div>

      <div className={styles.metrics}>
        {metrics.map(m => (
          <MetricCard
            key={m.id}
            label={m.label}
            value={m.value}
            trend={m.trend}
            sparkline={m.sparkline}
          />
        ))}
      </div>

      <Tabs tabs={tabs}>
        {active => (
          <>
            {active === 'overview' && (
              <div className={styles.charts}>
                <Card padding="lg">
                  <LineChart
                    data={requestsOverTime}
                    title="Requests over time (by hour)"
                    formatY={v => `${(v / 1000).toFixed(0)}k`}
                  />
                </Card>
                <Card padding="lg">
                  <BarChart
                    data={errorsByEndpoint}
                    title="Errors by endpoint"
                    horizontal
                    color="var(--color-danger)"
                  />
                </Card>
              </div>
            )}
            {active === 'errors' && (
              <div className={styles.charts}>
                <Card padding="lg">
                  <BarChart
                    data={errorsByEndpoint}
                    title="Error count by endpoint (last 24 h)"
                    horizontal
                    color="var(--color-danger)"
                  />
                </Card>
              </div>
            )}
            {active === 'latency' && (
              <div className={styles.charts}>
                <Card padding="lg">
                  <BarChart
                    data={latencyPercentiles}
                    title="Latency percentiles (ms)"
                    color="var(--color-primary)"
                    formatValue={v => `${v} ms`}
                  />
                </Card>
              </div>
            )}
          </>
        )}
      </Tabs>
    </div>
  )
}
