export interface Metadata {
  schema_version: number
  generated_at: string
  date_et: string
  run_id: string
}

export interface AccountSummary {
  total_value: number
  cash: number
  starting_cash: number
  profit_dollars: number
  profit_percent: number
  vs_voo_dollars: number | null
  vs_voo_percent: number | null
}

export interface Position {
  ticker: string
  shares: number
  avg_cost: number
  current_price: number | null
  market_value: number | null
  profit_dollars: number | null
  profit_percent: number | null
  portfolio_pct: number | null
}

export interface AllocationSlice {
  label: string
  pct: number
}

export interface Snapshot {
  date: string
  total_value: number
  cash: number
  profit_percent: number
}

export interface BenchmarkSnapshot {
  date: string
  voo_shares: number
  voo_price: number
  total_value: number
}

export interface Benchmark {
  voo_shares: number | null
  voo_price: number | null
  total_value: number | null
  total_deposited: number | null
  snapshots: BenchmarkSnapshot[]
}

export interface Trade {
  id: number
  timestamp: string
  action: 'BUY' | 'SELL'
  ticker: string
  shares: number
  price: number
  total: number
  reasoning: string
  realized_profit: number | null
}

export interface PlanDecision {
  action: string
  ticker: string
  shares: number | null
  conviction: string | null
  reasoning: string
}

export interface TodayPlan {
  decisions: PlanDecision[]
  skip_new_buys: boolean
  market_direction: string | null
  briefing: string | null
}

export interface MarketEducation {
  summary_en: string
  summary_zh: string
  sources: string[]
}

export interface DailyLesson {
  term: string
  explanation_en: string
  explanation_zh: string
}

export interface Education {
  market_education: MarketEducation | null
  daily_lesson: DailyLesson | null
}

export interface RealizedTrade {
  ticker: string
  realized_profit: number
}

export interface Stats {
  win_rate: number | null
  winners_count: number
  losers_count: number
  avg_winner: number | null
  avg_loser: number | null
  best_trade: RealizedTrade | null
  worst_trade: RealizedTrade | null
  max_drawdown_percent: number | null
  daily_volatility: number | null
  total_realized_profit: number
  per_ticker_realized: Record<string, number>
}

export interface DividendEvent {
  date: string
  ticker: string
  shares_held: number
  div_per_share: number
  shares_added: number
}

export interface DashboardData {
  metadata: Metadata
  account: AccountSummary
  positions: Position[]
  allocation: AllocationSlice[]
  snapshots: Snapshot[]
  benchmark: Benchmark
  trades: Trade[]
  today_plan: TodayPlan | null
  education: Education
  stats: Stats
  dividends: DividendEvent[]
}
