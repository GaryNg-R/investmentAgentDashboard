<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Trade } from '../types/data'
import { tradesToCSV, downloadCSV } from '../utils/csv'
import FilterTabs from './FilterTabs.vue'
import TradeRow from './TradeRow.vue'
import PerTickerGroup from './PerTickerGroup.vue'

const props = defineProps<{
  trades: Trade[]
  perTickerRealized: Record<string, number>
  now?: Date
}>()

const FILTERS = [
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'quarter', label: 'This Quarter' },
  { key: 'year', label: 'This Year' },
  { key: 'all', label: 'All Time' },
  { key: 'ticker', label: 'By Ticker' },
]

const activeFilter = ref('month')

function inWindow(ts: string, filter: string, now: Date): boolean {
  const d = new Date(ts.replace(' ', 'T'))
  if (isNaN(d.getTime())) return true
  const y = now.getFullYear(), m = now.getMonth()
  if (filter === 'week') {
    const start = new Date(now); start.setDate(now.getDate() - 7)
    return d >= start
  }
  if (filter === 'month') return d.getFullYear() === y && d.getMonth() === m
  if (filter === 'quarter') {
    const q = Math.floor(m / 3)
    return d.getFullYear() === y && Math.floor(d.getMonth() / 3) === q
  }
  if (filter === 'year') return d.getFullYear() === y
  return true
}

const filtered = computed(() => {
  const now = props.now ?? new Date()
  if (activeFilter.value === 'ticker') return props.trades
  return props.trades.filter(t => inWindow(t.timestamp, activeFilter.value, now))
})

const grouped = computed(() => {
  const byTicker: Record<string, Trade[]> = {}
  for (const t of props.trades) {
    if (!byTicker[t.ticker]) byTicker[t.ticker] = []
    byTicker[t.ticker].push(t)
  }
  return Object.entries(byTicker).map(([ticker, trades]) => ({
    ticker,
    trades,
    realized_profit: props.perTickerRealized[ticker] ?? 0,
    trade_count: trades.length,
  })).sort((a, b) => b.realized_profit - a.realized_profit)
})

function exportCSV() {
  downloadCSV('trades.csv', tradesToCSV(filtered.value))
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 mb-3">
    <div class="flex items-center justify-between mb-3">
      <p class="text-sm font-semibold text-slate-700">
        Trade History
        <span class="text-slate-400 font-normal ml-1">({{ activeFilter === 'ticker' ? trades.length : filtered.length }})</span>
      </p>
      <button
        class="text-xs text-accent-600 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50"
        @click="exportCSV"
      >Export CSV</button>
    </div>
    <FilterTabs v-model="activeFilter" :options="FILTERS" class="mb-3" />

    <div v-if="activeFilter !== 'ticker'">
      <TradeRow v-for="t in filtered" :key="t.id" :trade="t" />
      <p v-if="filtered.length === 0" class="text-slate-400 text-sm text-center py-4">No trades in this period.</p>
    </div>
    <div v-else>
      <PerTickerGroup v-for="g in grouped" :key="g.ticker" :group="g" />
    </div>
  </div>
</template>
