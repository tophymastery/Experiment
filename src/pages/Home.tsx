import React, { useState } from 'react'
import { Button, Card, Badge } from '@/components/ui'
import styles from './Home.module.css'

export function HomePage() {
  const [loading, setLoading] = useState(false)

  function handleDemo() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Badge variant="info">v0.1.0</Badge>
        <h1 className={styles.heroTitle}>Design System Starter</h1>
        <p className={styles.heroSubtitle}>
          A clean React + Vite + TypeScript foundation with a ready-to-extend component library.
        </p>
        <div className={styles.heroActions}>
          <Button size="lg" onClick={handleDemo} loading={loading}>
            Try it out
          </Button>
          <Button size="lg" variant="secondary">
            View Docs
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Components</h2>

        <div className={styles.grid}>
          <Card
            title="Button"
            description="Supports primary, secondary, ghost, and danger variants with loading state."
            footer={
              <div className={styles.cardFooter}>
                <Badge variant="success">Stable</Badge>
              </div>
            }
          >
            <div className={styles.componentDemo}>
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="danger" size="sm">Danger</Button>
            </div>
          </Card>

          <Card
            title="Badge"
            description="Inline label for status, categories, or metadata."
            footer={
              <div className={styles.cardFooter}>
                <Badge variant="success">Stable</Badge>
              </div>
            }
          >
            <div className={styles.componentDemo}>
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </Card>

          <Card
            title="Card"
            description="Container with optional header, body, and footer slots."
            footer={
              <div className={styles.cardFooter}>
                <Badge variant="success">Stable</Badge>
              </div>
            }
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
              Cards support <code>sm</code>, <code>md</code>, and <code>lg</code> padding sizes.
            </p>
          </Card>
        </div>
      </section>
    </div>
  )
}
