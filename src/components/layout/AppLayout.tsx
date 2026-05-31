import React from 'react'
import { Header } from './Header'
import styles from './AppLayout.module.css'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Built with React + Vite + TypeScript</p>
      </footer>
    </div>
  )
}
