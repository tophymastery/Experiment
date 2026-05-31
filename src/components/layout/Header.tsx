import styles from './Header.module.css'

interface HeaderProps {
  title?: string
}

export function Header({ title = 'Experiment' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">⬡</span>
          <span className={styles.title}>{title}</span>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#home" className={styles.navLink}>Home</a>
          <a href="#components" className={styles.navLink}>Components</a>
          <a href="#docs" className={styles.navLink}>Docs</a>
        </nav>
      </div>
    </header>
  )
}
