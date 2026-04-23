<script setup lang="ts">
import type { AccountSummary } from '../types/data'
import { formatCurrency, formatSignedPercent } from '../utils/format'

const props = defineProps<{ account: AccountSummary; positionsCount: number }>()

const isPositive = () => props.account.profit_dollars >= 0
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 mb-3">
    <p class="text-xs uppercase tracking-widest text-slate-400 mb-1">Total Portfolio</p>
    <p class="text-4xl font-bold tabular text-slate-900">{{ formatCurrency(account.total_value) }}</p>

    <span
      class="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm font-semibold tabular"
      :class="isPositive()
        ? 'bg-positive-50 text-positive-700'
        : 'bg-negative-50 text-negative-700'"
    >
      {{ isPositive() ? '▲' : '▼' }}
      {{ formatSignedPercent(account.profit_percent) }}
      ({{ formatCurrency(account.profit_dollars) }})
    </span>

    <div class="grid grid-cols-3 gap-3 mt-4">
      <div class="bg-slate-50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400">Cash</p>
        <p class="text-sm font-semibold tabular text-slate-700">{{ formatCurrency(account.cash) }}</p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400">vs VOO</p>
        <p class="text-sm font-semibold tabular"
           :class="(account.vs_voo_percent ?? 0) >= 0 ? 'text-positive-600' : 'text-negative-600'">
          {{ formatSignedPercent(account.vs_voo_percent) }}
        </p>
      </div>
      <div class="bg-slate-50 rounded-lg p-3 text-center">
        <p class="text-xs text-slate-400">Positions</p>
        <p class="text-sm font-semibold text-slate-700">{{ positionsCount }}</p>
      </div>
    </div>
  </div>
</template>
