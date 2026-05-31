import React, { useState } from 'react'
import { AppLayout } from '@/components/layout'
import { HomePage } from '@/pages/Home'
import { AnalyticsPage } from '@/pages/Analytics'
import { LogsPage } from '@/pages/Logs'

export type Page = 'home' | 'analytics' | 'logs'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <AppLayout page={page} onNavigate={setPage}>
      {page === 'home'      && <HomePage onNavigate={setPage} />}
      {page === 'analytics' && <AnalyticsPage />}
      {page === 'logs'      && <LogsPage />}
    </AppLayout>
  )
}
