import type { Trade } from '../types/data'

const HEADERS = ['id', 'timestamp', 'action', 'ticker', 'shares', 'price', 'total', 'reasoning']

function escapeField(v: string | number | null): string {
  const s = v === null ? '' : String(v)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

export function tradesToCSV(trades: Trade[]): string {
  const rows = [HEADERS.join(',')]
  for (const t of trades) {
    rows.push([t.id, t.timestamp, t.action, t.ticker, t.shares, t.price, t.total, t.reasoning].map(escapeField).join(','))
  }
  return rows.join('\n') + '\n'
}

export function downloadCSV(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
