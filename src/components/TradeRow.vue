<script setup lang="ts">
import type { Trade } from '../types/data'
import { formatCurrency, formatDate } from '../utils/format'

defineProps<{ trade: Trade }>()
</script>

<template>
  <div class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
    <div class="flex items-center gap-2">
      <span
        class="text-xs font-bold w-10 text-center py-0.5 rounded"
        :class="trade.action === 'BUY' ? 'bg-positive-100 text-positive-700' : 'bg-negative-100 text-negative-700'"
      >{{ trade.action }}</span>
      <span class="font-semibold text-slate-800 text-sm">{{ trade.ticker }}</span>
      <span class="text-xs text-slate-400 tabular">{{ trade.shares }} @ {{ formatCurrency(trade.price) }}</span>
    </div>
    <div class="flex items-center gap-2">
      <span
        v-if="trade.realized_profit !== null"
        class="text-xs font-semibold px-2 py-0.5 rounded-full tabular"
        :class="trade.realized_profit >= 0 ? 'bg-positive-50 text-positive-700' : 'bg-negative-50 text-negative-700'"
      >{{ trade.realized_profit >= 0 ? '+' : '' }}{{ formatCurrency(trade.realized_profit) }}</span>
      <span class="text-xs text-slate-400">{{ formatDate(trade.timestamp.slice(0, 10)) }}</span>
    </div>
  </div>
</template>
