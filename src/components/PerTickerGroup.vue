<script setup lang="ts">
import { ref } from 'vue'
import type { Trade } from '../types/data'
import { formatCurrency } from '../utils/format'
import TradeRow from './TradeRow.vue'

defineProps<{
  group: { ticker: string; trades: Trade[]; realized_profit: number; trade_count: number }
}>()

const open = ref(false)
</script>

<template>
  <div class="border border-slate-100 rounded-lg overflow-hidden mb-2">
    <button
      class="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
      @click="open = !open"
    >
      <div class="flex items-center gap-2">
        <span class="font-semibold text-slate-800">{{ group.ticker }}</span>
        <span class="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{{ group.trade_count }} trades</span>
      </div>
      <div class="flex items-center gap-2">
        <span
          class="text-sm font-semibold tabular"
          :class="group.realized_profit >= 0 ? 'text-positive-600' : 'text-negative-600'"
        >{{ group.realized_profit >= 0 ? '+' : '' }}{{ formatCurrency(group.realized_profit) }}</span>
        <span class="text-slate-400 text-xs">{{ open ? '▲' : '▼' }}</span>
      </div>
    </button>
    <div v-if="open" class="px-4">
      <TradeRow v-for="t in group.trades" :key="t.id" :trade="t" />
    </div>
  </div>
</template>
