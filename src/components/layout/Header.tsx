import React from 'react'
import styles from './Header.module.css'
import type { Page } from '@/App'

interface HeaderProps {
  page: Page
  onNavigate: (p: Page) => void
}

const NAV: { id: Page; label: string }[] = [
  { id: 'home',      label: 'Home' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'logs',      label: 'Logs' },
]

export function Header({ page, onNavigate }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.brand} onClick={() => onNavigate('home')}>
          <span className={styles.logo} aria-hidden="true">⬡</span>
          <span className={styles.title}>Experiment</span>
        </button>
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV.map(n => (
            <button
              key={n.id}
              className={[styles.navLink, page === n.id ? styles.active : ''].join(' ')}
              onClick={() => onNavigate(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
