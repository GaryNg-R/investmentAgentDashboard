const _currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const _pct = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatCurrency(value: number | null): string {
  if (value === null) return '—'
  if (value < 0) return '−' + _currency.format(-value)
  return _currency.format(value)
}

export function formatPercent(value: number | null): string {
  if (value === null) return '—'
  return _pct.format(value) + '%'
}

export function formatSignedPercent(value: number | null): string {
  if (value === null) return '—'
  const abs = _pct.format(Math.abs(value))
  if (value > 0) return '+' + abs + '%'
  if (value < 0) return '−' + abs + '%'
  return abs + '%'
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
