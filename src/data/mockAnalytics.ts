export interface ChartPoint { label: string; value: number }
export interface Metric {
  id: string
  label: string
  value: string
  trend: number
  unit?: string
  sparkline: number[]
}

function pts(vals: number[]): ChartPoint[] {
  const hours = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22']
  return vals.map((value, i) => ({ label: hours[i], value }))
}

export const metrics: Metric[] = [
  { id: 'requests',  label: 'Total Requests',   value: '1 284 042', trend:  12.4, unit: 'req', sparkline: [410,390,430,480,510,490,530,560,520,580,610,590] },
  { id: 'errors',    label: 'Error Rate',        value: '0.38%',     trend:  -3.1, unit: '%',   sparkline: [0.6,0.5,0.7,0.4,0.5,0.3,0.4,0.4,0.3,0.4,0.4,0.38] },
  { id: 'latency',   label: 'Avg Latency',       value: '84 ms',     trend:  -8.7, unit: 'ms',  sparkline: [102,98,110,95,92,88,85,90,82,84,80,84] },
  { id: 'uptime',    label: 'Uptime',            value: '99.97%',    trend:   0.02, unit: '%',  sparkline: [100,100,100,100,99.9,100,100,100,100,100,99.9,100] },
]

export const requestsOverTime: ChartPoint[] = pts([41200, 38900, 29100, 22400, 31800, 67400, 98200, 112000, 107000, 95400, 88100, 74600])

export const errorsByEndpoint: ChartPoint[] = [
  { label: '/api/payments', value: 142 },
  { label: '/api/upload',   value: 98  },
  { label: '/api/webhooks', value: 76  },
  { label: '/api/auth',     value: 54  },
  { label: '/api/search',   value: 31  },
  { label: '/api/users',    value: 18  },
]

export const latencyPercentiles: ChartPoint[] = [
  { label: 'p50', value: 42  },
  { label: 'p75', value: 68  },
  { label: 'p90', value: 112 },
  { label: 'p95', value: 184 },
  { label: 'p99', value: 340 },
]
