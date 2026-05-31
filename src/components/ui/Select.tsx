import React from 'react'
import styles from './Select.module.css'

interface SelectOption { value: string; label: string }

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (v: string) => void
  label?: string
  className?: string
}

export function Select({ options, value, onChange, label, className = '' }: SelectProps) {
  return (
    <div className={[styles.wrapper, className].join(' ')}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label={label}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg className={styles.chevron} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
