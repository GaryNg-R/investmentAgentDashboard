import { describe, it, expect } from 'vitest'
import { tradesToCSV } from '../../src/utils/csv'
import type { Trade } from '../../src/types/data'

const oneTrade: Trade = {
  id: 1, timestamp: '2026-04-16 15:47:47', action: 'BUY', ticker: 'TSLA',
  shares: 6, price: 388.37, total: 2330.22, reasoning: 'initial buy', realized_profit: null,
}

const tradeWithComma: Trade = {
  id: 2, timestamp: '2026-04-17 14:34:54', action: 'SELL', ticker: 'MSTR',
  shares: 17, price: 168.86, total: 2870.62, reasoning: 'profit, great trade', realized_profit: 427.89,
}

describe('tradesToCSV', () => {
  it('returns just the header for empty array', () => {
    const csv = tradesToCSV([])
    expect(csv.trim()).toBe('id,timestamp,action,ticker,shares,price,total,reasoning')
  })

  it('produces correct columns for one trade', () => {
    const csv = tradesToCSV([oneTrade])
    const lines = csv.trim().split('\n')
    expect(lines).toHaveLength(2)
    expect(lines[0]).toBe('id,timestamp,action,ticker,shares,price,total,reasoning')
    expect(lines[1]).toContain('TSLA')
    expect(lines[1]).toContain('BUY')
  })

  it('quotes fields that contain commas', () => {
    const csv = tradesToCSV([tradeWithComma])
    expect(csv).toContain('"profit, great trade"')
  })
})
