export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'

export interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  source: string
  message: string
  details?: Record<string, unknown>
}

export const mockLogs: LogEntry[] = [
  { id: '1',  timestamp: '2026-05-31 11:42:03', level: 'ERROR', source: 'api/payments', message: 'Stripe webhook signature verification failed', details: { code: 400, trace: 'WebhookSignatureVerificationError' } },
  { id: '2',  timestamp: '2026-05-31 11:41:58', level: 'WARN',  source: 'api/auth',     message: 'Rate limit approaching threshold (87%)' },
  { id: '3',  timestamp: '2026-05-31 11:41:45', level: 'INFO',  source: 'worker/email',  message: 'Batch email job completed — 1 240 messages sent' },
  { id: '4',  timestamp: '2026-05-31 11:41:30', level: 'DEBUG', source: 'db/pool',       message: 'Connection pool resized: 10 → 14' },
  { id: '5',  timestamp: '2026-05-31 11:41:22', level: 'ERROR', source: 'api/upload',    message: 'S3 PutObject timeout after 30 000 ms', details: { bucket: 'user-assets', key: 'avatars/u892.png' } },
  { id: '6',  timestamp: '2026-05-31 11:41:10', level: 'INFO',  source: 'api/users',     message: 'GET /users responded in 42 ms (cache HIT)' },
  { id: '7',  timestamp: '2026-05-31 11:40:59', level: 'WARN',  source: 'scheduler',     message: 'Job "cleanup-old-sessions" exceeded soft deadline by 2 s' },
  { id: '8',  timestamp: '2026-05-31 11:40:44', level: 'INFO',  source: 'api/users',     message: 'POST /users/login — user #4421 authenticated' },
  { id: '9',  timestamp: '2026-05-31 11:40:31', level: 'DEBUG', source: 'cache',         message: 'LRU eviction: 32 entries removed (memory pressure)' },
  { id: '10', timestamp: '2026-05-31 11:40:18', level: 'ERROR', source: 'api/payments',  message: 'Charge failed: card_declined', details: { user: 4399, amount: 4900 } },
  { id: '11', timestamp: '2026-05-31 11:40:05', level: 'INFO',  source: 'api/search',    message: 'Search index rebuilt — 98 204 documents indexed' },
  { id: '12', timestamp: '2026-05-31 11:39:52', level: 'WARN',  source: 'api/auth',      message: 'JWT expiry within 5 min for session sess_aBc123' },
  { id: '13', timestamp: '2026-05-31 11:39:40', level: 'INFO',  source: 'worker/report', message: 'Monthly report generated for org #77' },
  { id: '14', timestamp: '2026-05-31 11:39:28', level: 'DEBUG', source: 'db/query',      message: 'Slow query detected (1 240 ms): SELECT * FROM events WHERE …' },
  { id: '15', timestamp: '2026-05-31 11:39:14', level: 'ERROR', source: 'api/webhooks',  message: 'Delivery to https://partner.io/hook failed: ECONNREFUSED' },
]
