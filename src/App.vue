<script setup lang="ts">
import { useData } from './composables/useData'
import DashboardHeader from './components/DashboardHeader.vue'
import HeroCard from './components/HeroCard.vue'
import EquityChart from './components/EquityChart.vue'
import AllocationPanel from './components/AllocationPanel.vue'
import TodayPlan from './components/TodayPlan.vue'
import BriefingCard from './components/BriefingCard.vue'
import TradeHistory from './components/TradeHistory.vue'
import StatsGrid from './components/StatsGrid.vue'
import DashboardFooter from './components/DashboardFooter.vue'

const { data, loading, error, schemaMismatch, reload } = useData()
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <div class="max-w-2xl mx-auto px-4 lg:px-0">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center h-64 text-slate-400">
        Loading portfolio data…
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center justify-center h-64 gap-4">
        <div class="bg-white rounded-xl shadow-sm p-6 text-center max-w-sm w-full">
          <p class="text-negative-600 font-semibold mb-2">Failed to load dashboard</p>
          <p class="text-sm text-slate-500 mb-4">{{ error }}</p>
          <button
            class="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-700"
            @click="reload"
          >Retry</button>
        </div>
      </div>

      <!-- Dashboard -->
      <template v-else-if="data">
        <!-- Schema mismatch warning -->
        <div v-if="schemaMismatch" class="bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-2 mt-4 text-xs text-yellow-700">
          Dashboard may be out of date — rebuild required (schema version mismatch).
        </div>

        <DashboardHeader :date-et="data.metadata.date_et" :generated-at="data.metadata.generated_at" />
        <HeroCard :account="data.account" :positions-count="data.positions.length" />
        <EquityChart :snapshots="data.snapshots" :benchmark-snapshots="data.benchmark.snapshots" />
        <AllocationPanel
          :positions="data.positions"
          :allocation="data.allocation"
          :cash="data.account.cash"
          :total-value="data.account.total_value"
        />
        <TodayPlan :plan="data.today_plan" />
        <BriefingCard :briefing="data.today_plan?.briefing ?? null" :education="data.education" />
        <TradeHistory :trades="data.trades" :per-ticker-realized="data.stats.per_ticker_realized" />
        <StatsGrid :stats="data.stats" />
        <DashboardFooter :generated-at="data.metadata.generated_at" :schema-version="data.metadata.schema_version" />
      </template>

    </div>
  </div>
</template>
