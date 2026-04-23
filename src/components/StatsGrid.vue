<script setup lang="ts">
import type { Stats } from '../types/data'
import { formatCurrency, formatPercent, formatSignedPercent } from '../utils/format'

defineProps<{ stats: Stats }>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-5 mb-3">
    <p class="text-sm font-semibold text-slate-700 mb-3">Performance</p>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
      <div class="bg-slate-50 rounded-lg p-3">
        <p class="text-xs text-slate-400">Win Rate</p>
        <p class="text-lg font-semibold tabular text-slate-800">{{ formatPercent(stats.win_rate) }}</p>
        <p class="text-xs text-slate-400">{{ stats.winners_count }}W / {{ stats.losers_count }}L</p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3">
        <p class="text-xs text-slate-400">Avg Winner / Loser</p>
        <p class="text-sm font-semibold tabular">
          <span class="text-positive-600">{{ formatCurrency(stats.avg_winner) }}</span>
          <span class="text-slate-300 mx-1">/</span>
          <span class="text-negative-600">{{ formatCurrency(stats.avg_loser) }}</span>
        </p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3">
        <p class="text-xs text-slate-400">Max Drawdown</p>
        <p class="text-lg font-semibold tabular text-negative-600">
          {{ stats.max_drawdown_percent !== null ? '−' + formatPercent(stats.max_drawdown_percent) : '—' }}
        </p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3">
        <p class="text-xs text-slate-400">Daily Volatility</p>
        <p class="text-lg font-semibold tabular text-slate-800">{{ formatPercent(stats.daily_volatility) }}</p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3">
        <p class="text-xs text-slate-400">Best Trade</p>
        <p v-if="stats.best_trade" class="text-sm font-semibold">
          <span class="text-slate-600">{{ stats.best_trade.ticker }}</span>
          <span class="text-positive-600 tabular ml-1">+{{ formatCurrency(stats.best_trade.realized_profit) }}</span>
        </p>
        <p v-else class="text-slate-400">—</p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3">
        <p class="text-xs text-slate-400">Total Realized P&amp;L</p>
        <p class="text-lg font-semibold tabular"
           :class="stats.total_realized_profit >= 0 ? 'text-positive-600' : 'text-negative-600'">
          {{ formatSignedPercent(null) === '—' ? formatCurrency(stats.total_realized_profit) : formatCurrency(stats.total_realized_profit) }}
        </p>
      </div>
    </div>
  </div>
</template>
