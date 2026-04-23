import type { DashboardData } from '../../src/types/data'

export const emptyData: DashboardData = {
  metadata: { schema_version: 1, generated_at: '2026-04-22T10:00:00Z', date_et: '2026-04-22', run_id: 'empty_test' },
  account: { total_value: 10000.0, cash: 10000.0, starting_cash: 10000.0, profit_dollars: 0, profit_percent: 0, vs_voo_dollars: null, vs_voo_percent: null },
  positions: [],
  allocation: [{ label: 'Cash', pct: 100 }],
  snapshots: [],
  benchmark: { voo_shares: null, voo_price: null, total_value: null, total_deposited: null, snapshots: [] },
  trades: [],
  today_plan: null,
  education: { market_education: null, daily_lesson: null },
  stats: { win_rate: null, winners_count: 0, losers_count: 0, avg_winner: null, avg_loser: null, best_trade: null, worst_trade: null, max_drawdown_percent: null, daily_volatility: null, total_realized_profit: 0, per_ticker_realized: {} },
  dividends: [],
}
