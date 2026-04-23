import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useData } from '../../src/composables/useData'

const validData = {
  metadata: { schema_version: 1, generated_at: '2026-04-22T20:00:00Z', date_et: '2026-04-22', run_id: 'x' },
  account: { total_value: 10409.92, cash: 5238.89, starting_cash: 10000, profit_dollars: 409.92, profit_percent: 4.1, vs_voo_dollars: 314, vs_voo_percent: 3.1 },
  positions: [], allocation: [], snapshots: [], benchmark: { voo_shares: 15, voo_price: 651, total_value: 9751, total_deposited: 10000, snapshots: [] },
  trades: [], today_plan: null,
  education: { market_education: null, daily_lesson: null },
  stats: { win_rate: null, winners_count: 0, losers_count: 0, avg_winner: null, avg_loser: null, best_trade: null, worst_trade: null, max_drawdown_percent: null, daily_volatility: null, total_realized_profit: 0, per_ticker_realized: {} },
  dividends: [],
}

function mockFetch(body: unknown, ok = true) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    json: () => Promise.resolve(body),
  }))
}

beforeEach(() => vi.unstubAllGlobals())

describe('useData', () => {
  it('starts with loading=true and data=null', () => {
    mockFetch(validData)
    const { data, loading } = useData()
    expect(loading.value).toBe(true)
    expect(data.value).toBeNull()
  })

  it('sets data after successful fetch', async () => {
    mockFetch(validData)
    const { data, loading, error } = useData()
    await new Promise(r => setTimeout(r, 10))
    expect(loading.value).toBe(false)
    expect(data.value).not.toBeNull()
    expect(error.value).toBeNull()
  })

  it('sets error when fetch returns malformed body', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error('invalid json')),
    }))
    const { error, loading } = useData()
    await new Promise(r => setTimeout(r, 10))
    expect(loading.value).toBe(false)
    expect(error.value).toBeTruthy()
  })

  it('sets schemaMismatch when schema_version is higher than expected', async () => {
    mockFetch({ ...validData, metadata: { ...validData.metadata, schema_version: 99 } })
    const { schemaMismatch } = useData()
    await new Promise(r => setTimeout(r, 10))
    expect(schemaMismatch.value).toBe(true)
  })

  it('sets error when payload has error field', async () => {
    mockFetch({ metadata: { schema_version: 1 }, error: 'export crashed' })
    const { error } = useData()
    await new Promise(r => setTimeout(r, 10))
    expect(error.value).toContain('export crashed')
  })
})
