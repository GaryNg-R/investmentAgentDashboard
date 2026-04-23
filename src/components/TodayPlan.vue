<script setup lang="ts">
import type { TodayPlan } from '../types/data'

defineProps<{ plan: TodayPlan | null }>()

function actionClass(action: string) {
  if (action === 'BUY') return 'bg-positive-100 text-positive-700'
  if (action === 'SELL') return 'bg-negative-100 text-negative-700'
  return 'bg-slate-100 text-slate-600'
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-5 mb-3">
    <p class="text-sm font-semibold text-slate-700 mb-3">Today's Plan</p>

    <div v-if="!plan" class="text-slate-400 text-sm text-center py-4">No plan available for today.</div>

    <template v-else>
      <div v-if="plan.skip_new_buys" class="mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700 font-medium">
        Risk-off today — no new buys.
      </div>
      <div class="space-y-2">
        <div v-for="(d, i) in plan.decisions" :key="i" class="border border-slate-100 rounded-lg p-3">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-bold px-2 py-0.5 rounded" :class="actionClass(d.action)">{{ d.action }}</span>
            <span class="font-semibold text-slate-800">{{ d.ticker }}</span>
            <span v-if="d.shares" class="text-xs text-slate-400">{{ d.shares }} sh</span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">{{ d.reasoning }}</p>
        </div>
      </div>
    </template>
  </div>
</template>
