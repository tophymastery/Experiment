import React from 'react'
import { Header } from './Header'
import styles from './AppLayout.module.css'
import type { Page } from '@/App'

interface AppLayoutProps {
  children: React.ReactNode
  page: Page
  onNavigate: (p: Page) => void
}

export function AppLayout({ children, page, onNavigate }: AppLayoutProps) {
  return (
    <div className={styles.root}>
      <Header page={page} onNavigate={onNavigate} />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Built with React + Vite + TypeScript</p>
      </footer>
    </div>
  )
}
