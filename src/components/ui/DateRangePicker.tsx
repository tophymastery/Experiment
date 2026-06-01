import React, { useState, useRef } from 'react'
import styles from './DateRangePicker.module.css'

export type TimeUnit = '15m' | '30m' | '1h' | '2h'

const STEP_MS: Record<TimeUnit, number> = {
  '15m': 15 * 60_000,
  '30m': 30 * 60_000,
  '1h':  60 * 60_000,
  '2h':  120 * 60_000,
}

interface DateRangePickerProps {
  start?: Date
  end?: Date
  onChange?: (start: Date, end: Date) => void
  maxHours?: number
}

function snap(ms: number, step: number) {
  return Math.round(ms / step) * step
}

function fmtDateTime(d: Date) {
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  return { date, time }
}

function fmtDuration(ms: number) {
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

function toLocal(d: Date) {
  const z = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`
}

export function DateRangePicker({
  start: initStart,
  end: initEnd,
  onChange,
  maxHours = 5,
}: DateRangePickerProps) {
  const today = new Date()
  const defStart = initStart ?? new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0)
  const defEnd   = initEnd   ?? new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0)

  const [start, setStart] = useState(defStart)
  const [end,   setEnd  ] = useState(defEnd)
  const [unit,  setUnit ] = useState<TimeUnit>('1h')

  const maxMs  = maxHours * 3_600_000
  const stepMs = STEP_MS[unit]

  const dayStart = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()
  const dayEnd   = dayStart + 24 * 3_600_000
  const daySpan  = dayEnd - dayStart

  const leftPct  = ((start.getTime() - dayStart) / daySpan) * 100
  const rightPct = ((end.getTime()   - dayStart) / daySpan) * 100

  const trackRef = useRef<HTMLDivElement>(null)
  const drag     = useRef<string | null>(null)
  const dragOff  = useRef(0)

  function pctToMs(pct: number) {
    return dayStart + (pct / 100) * daySpan
  }
  function xToPct(clientX: number) {
    const r = trackRef.current!.getBoundingClientRect()
    return Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100))
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    trackRef.current!.setPointerCapture(e.pointerId)
    const posMs   = pctToMs(xToPct(e.clientX))
    const dStart  = Math.abs(posMs - start.getTime())
    const dEnd    = Math.abs(posMs - end.getTime())
    const rangeMs = end.getTime() - start.getTime()
    const inFill  = posMs > start.getTime() && posMs < end.getTime()
    if (inFill && dStart > rangeMs * 0.2 && dEnd > rangeMs * 0.2) {
      drag.current = 'range'; dragOff.current = posMs - start.getTime()
    } else {
      drag.current = dStart <= dEnd ? 'start' : 'end'
    }
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return
    const posMs = snap(pctToMs(xToPct(e.clientX)), stepMs)
    if (drag.current === 'start') {
      const ns = new Date(Math.max(dayStart, Math.max(end.getTime() - maxMs, Math.min(posMs, end.getTime() - stepMs))))
      setStart(ns); onChange?.(ns, end)
    } else if (drag.current === 'end') {
      const ne = new Date(Math.min(dayEnd, Math.min(start.getTime() + maxMs, Math.max(posMs, start.getTime() + stepMs))))
      setEnd(ne); onChange?.(start, ne)
    } else {
      const rangeMs = end.getTime() - start.getTime()
      const nsMs = Math.max(dayStart, Math.min(snap(posMs - dragOff.current, stepMs), dayEnd - rangeMs))
      const ns = new Date(nsMs); const ne = new Date(nsMs + rangeMs)
      setStart(ns); setEnd(ne); onChange?.(ns, ne)
    }
  }

  function onPointerUp() { drag.current = null }

  function handleStartChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return
    const ns = new Date(e.target.value)
    const ne = new Date(Math.min(end.getTime(), ns.getTime() + maxMs))
    setStart(ns); setEnd(ne); onChange?.(ns, ne)
  }
  function handleEndChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return
    const ne = new Date(e.target.value)
    const ns = new Date(Math.max(start.getTime(), ne.getTime() - maxMs))
    setStart(ns); setEnd(ne); onChange?.(ns, ne)
  }

  const durationMs = end.getTime() - start.getTime()
  const usedPct    = Math.min(100, (durationMs / maxMs) * 100)
  const gaugeColor = usedPct > 90 ? 'var(--color-danger)' : usedPct > 70 ? 'var(--color-warning)' : 'var(--color-primary)'

  const startFmt = fmtDateTime(start)
  const endFmt   = fmtDateTime(end)

  const TICKS = [0, 6, 12, 18, 24]

  return (
    <div className={styles.root}>

      {/* ── Single-line toolbar ── */}
      <div className={styles.toolbar}>

        {/* Start */}
        <label className={styles.bound}>
          <span className={styles.boundTag}>Start</span>
          <span className={styles.boundDate}>{startFmt.date}</span>
          <span className={styles.boundDot}>·</span>
          <span className={styles.boundTime}>{startFmt.time}</span>
          <input type="datetime-local" className={styles.nativeInput}
            value={toLocal(start)} onChange={handleStartChange} />
        </label>

        <span className={styles.arrow}>→</span>

        {/* End */}
        <label className={styles.bound}>
          <span className={styles.boundTag}>End</span>
          <span className={styles.boundDate}>{endFmt.date}</span>
          <span className={styles.boundDot}>·</span>
          <span className={styles.boundTime}>{endFmt.time}</span>
          <input type="datetime-local" className={styles.nativeInput}
            value={toLocal(end)} onChange={handleEndChange} />
        </label>

        <span className={styles.divider} />

        {/* Step buttons */}
        <div className={styles.steps} role="group" aria-label="Step size">
          {(Object.keys(STEP_MS) as TimeUnit[]).map(u => (
            <button
              key={u}
              className={[styles.stepBtn, unit === u ? styles.stepActive : ''].join(' ')}
              onClick={() => setUnit(u)}
            >{u}</button>
          ))}
        </div>

        <span className={styles.divider} />

        {/* Duration gauge inline */}
        <div className={styles.gauge}>
          <div className={styles.gaugeTrack}>
            <div className={styles.gaugeFill} style={{ width: `${usedPct}%`, background: gaugeColor }} />
          </div>
          <span className={styles.gaugeLbl} style={{ color: gaugeColor }}>
            {fmtDuration(durationMs)}
          </span>
          <span className={styles.gaugeMax}>/ {maxHours}h</span>
        </div>
      </div>

      {/* ── Slider ── */}
      <div className={styles.sliderArea}>
        <div
          ref={trackRef}
          className={styles.track}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className={styles.rail} />
          <div className={styles.fill} style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }} />
          <div className={[styles.thumb, styles.thumbL].join(' ')} style={{ left: `${leftPct}%` }}>
            <span className={styles.thumbLabel}>{fmtDateTime(start).time}</span>
          </div>
          <div className={[styles.thumb, styles.thumbR].join(' ')} style={{ left: `${rightPct}%` }}>
            <span className={[styles.thumbLabel, styles.thumbLabelR].join(' ')}>{fmtDateTime(end).time}</span>
          </div>
        </div>
        <div className={styles.ticks} aria-hidden="true">
          {TICKS.map(h => (
            <span key={h} className={styles.tick} style={{ left: `${(h / 24) * 100}%` }}>
              {String(h).padStart(2, '0')}:00
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
