<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js'
import type { Snapshot, BenchmarkSnapshot } from '../types/data'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

const props = defineProps<{ snapshots: Snapshot[]; benchmarkSnapshots: BenchmarkSnapshot[] }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

function buildChart() {
  if (!canvas.value) return
  if (chart) { chart.destroy(); chart = null }
  const labels = props.snapshots.map(s => s.date.slice(5))
  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Portfolio',
          data: props.snapshots.map(s => s.total_value),
          borderColor: '#1e293b',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: 'VOO Benchmark',
          data: props.benchmarkSnapshots.map(s => s.total_value),
          borderColor: '#94a3b8',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.3,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { ticks: { callback: (v) => '$' + Number(v).toLocaleString() } } },
    },
  })
}

onMounted(buildChart)
watch(() => [props.snapshots, props.benchmarkSnapshots], buildChart, { deep: true })
onBeforeUnmount(() => { if (chart) chart.destroy() })
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-5 mb-3">
    <div class="flex items-center justify-between mb-3">
      <p class="text-sm font-semibold text-slate-700">Equity Curve</p>
      <div class="flex gap-4 text-xs text-slate-500">
        <span class="flex items-center gap-1"><span class="w-3 h-0.5 bg-accent-800 inline-block"></span> Portfolio</span>
        <span class="flex items-center gap-1"><span class="w-3 h-0.5 bg-slate-400 inline-block border-dashed"></span> VOO</span>
      </div>
    </div>
    <div class="relative h-52">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>
