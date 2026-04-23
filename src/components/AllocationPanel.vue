<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import type { Position, AllocationSlice } from '../types/data'
import { formatCurrency } from '../utils/format'

Chart.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  positions: Position[]
  allocation: AllocationSlice[]
  cash: number
  totalValue: number
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const COLORS = ['#1e293b', '#10b981', '#ef4444', '#f59e0b', '#6366f1', '#06b6d4']

function buildChart() {
  if (!canvas.value) return
  if (chart) { chart.destroy(); chart = null }
  chart = new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels: props.allocation.map(a => a.label),
      datasets: [{
        data: props.allocation.map(a => a.pct),
        backgroundColor: props.allocation.map((_, i) => COLORS[i % COLORS.length]),
        borderWidth: 2,
        borderColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` } } },
    },
  })
}

onMounted(buildChart)
watch(() => [props.allocation], buildChart, { deep: true })
onBeforeUnmount(() => { if (chart) chart.destroy() })

const sorted = () => [...props.positions].sort((a, b) => (b.market_value ?? 0) - (a.market_value ?? 0))
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-5 mb-3">
    <p class="text-sm font-semibold text-slate-700 mb-3">Allocation & Positions</p>
    <div class="flex flex-col lg:flex-row gap-4">
      <div class="flex-shrink-0 w-40 h-40 mx-auto lg:mx-0">
        <canvas ref="canvas"></canvas>
      </div>
      <div class="flex-1 divide-y divide-slate-100">
        <div v-for="p in sorted()" :key="p.ticker" class="flex justify-between items-center py-2">
          <div>
            <span class="font-semibold text-slate-800">{{ p.ticker }}</span>
            <span class="text-xs text-slate-400 ml-2">{{ p.shares }} sh</span>
          </div>
          <div class="text-right tabular">
            <p class="text-sm font-medium text-slate-700">{{ p.market_value !== null ? formatCurrency(p.market_value) : '—' }}</p>
            <p class="text-xs text-slate-400">{{ p.portfolio_pct !== null ? p.portfolio_pct.toFixed(1) + '%' : '—' }}</p>
          </div>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-slate-500 text-sm">Cash</span>
          <span class="tabular text-sm font-medium text-slate-700">{{ formatCurrency(cash) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
