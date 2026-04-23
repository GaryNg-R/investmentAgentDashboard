<script setup lang="ts">
import { ref } from 'vue'
import type { Education } from '../types/data'

defineProps<{ briefing: string | null; education: Education | null }>()

const showContext = ref(false)
</script>

<template>
  <div class="bg-white rounded-xl shadow-md border-l-4 border-amber-400 p-5 mb-3">
    <p class="text-sm font-semibold text-slate-700 mb-2">Claude's Briefing</p>
    <p class="text-sm text-slate-600 leading-relaxed">{{ briefing ?? 'No briefing available today.' }}</p>

    <template v-if="education?.daily_lesson">
      <div class="mt-4 border-t border-slate-100 pt-4">
        <p class="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Daily Lesson</p>
        <p class="font-semibold text-slate-800">{{ education.daily_lesson.term }}</p>
        <p class="text-sm text-slate-600 mt-1">{{ education.daily_lesson.explanation_en }}</p>
        <p class="text-xs text-slate-400 mt-1">{{ education.daily_lesson.explanation_zh }}</p>
      </div>
    </template>

    <template v-if="education?.market_education">
      <div class="mt-3">
        <button
          class="text-xs text-amber-600 hover:underline"
          @click="showContext = !showContext"
        >{{ showContext ? 'Hide' : 'Show' }} market context</button>
        <div v-if="showContext" class="mt-2 space-y-2">
          <p class="text-xs text-slate-600">{{ education.market_education.summary_en }}</p>
          <p class="text-xs text-slate-400">{{ education.market_education.summary_zh }}</p>
        </div>
      </div>
    </template>
  </div>
</template>
