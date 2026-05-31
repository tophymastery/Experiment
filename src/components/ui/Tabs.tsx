import React, { useState } from 'react'
import styles from './Tabs.module.css'

export interface Tab { id: string; label: string; count?: number }

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (id: string) => void
  children?: (activeId: string) => React.ReactNode
}

export function Tabs({ tabs, defaultTab, onChange, children }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)

  function select(id: string) {
    setActive(id)
    onChange?.(id)
  }

  return (
    <div className={styles.root}>
      <div className={styles.bar} role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={[styles.tab, active === tab.id ? styles.active : ''].join(' ')}
            onClick={() => select(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={styles.count}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>
      {children && (
        <div className={styles.panel} role="tabpanel">
          {children(active)}
        </div>
      )}
    </div>
  )
}
