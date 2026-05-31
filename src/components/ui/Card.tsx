import React from 'react'
import styles from './Card.module.css'

interface CardProps {
  title?: string
  description?: string
  footer?: React.ReactNode
  children?: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({
  title,
  description,
  footer,
  children,
  className = '',
  padding = 'md',
}: CardProps) {
  return (
    <div className={[styles.card, styles[padding], className].filter(Boolean).join(' ')}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}
