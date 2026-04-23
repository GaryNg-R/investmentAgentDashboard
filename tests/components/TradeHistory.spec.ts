import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TradeHistory from '../../src/components/TradeHistory.vue'
import { validData } from '../fixtures/data.valid'
import * as csv from '../../src/utils/csv'

const trades = validData.trades
const perTickerRealized = validData.stats.per_ticker_realized

// All trades are in April 2026 — use a fixed "now" in April 2026 for month filter
const NOW = new Date(2026, 3, 22) // April 22 2026

describe('TradeHistory', () => {
  it('default filter is month and shows April trades', () => {
    const wrapper = mount(TradeHistory, { props: { trades, perTickerRealized, now: NOW } })
    // All 7 trades are in April 2026 so all should show
    expect(wrapper.text()).toContain('MSTR')
    expect(wrapper.text()).toContain('TSLA')
  })

  it('all time filter shows all trades', async () => {
    const wrapper = mount(TradeHistory, { props: { trades, perTickerRealized, now: NOW } })
    const buttons = wrapper.findAll('button.rounded-full')
    const allBtn = buttons.find(b => b.text() === 'All Time')
    await allBtn?.trigger('click')
    expect(wrapper.findAll('.border-b').length).toBe(trades.length)
  })

  it('by-ticker filter shows grouped sections', async () => {
    const wrapper = mount(TradeHistory, { props: { trades, perTickerRealized, now: NOW } })
    const buttons = wrapper.findAll('button.rounded-full')
    const tickerBtn = buttons.find(b => b.text() === 'By Ticker')
    await tickerBtn?.trigger('click')
    // Should show group headers for tickers
    const text = wrapper.text()
    expect(text).toContain('MSTR')
    expect(text).toContain('TSLA')
  })

  it('export CSV button calls downloadCSV', async () => {
    const spy = vi.spyOn(csv, 'downloadCSV').mockImplementation(() => {})
    const wrapper = mount(TradeHistory, { props: { trades, perTickerRealized, now: NOW } })
    await wrapper.find('button[class*="border"]').trigger('click')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
