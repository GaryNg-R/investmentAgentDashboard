<script setup lang="ts">
defineProps<{ dateEt: string; generatedAt: string }>()

function shortTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  } catch {
    return iso
  }
}
</script>

<template>
  <header class="flex items-center justify-between py-4">
    <span class="text-accent font-semibold tracking-tight text-lg">Investment Agent</span>
    <div class="text-sm text-slate-500 text-right">
      <span class="font-medium text-slate-700">{{ dateEt }}</span>
      <span class="ml-3">Updated {{ shortTime(generatedAt) }}</span>
    </div>
  </header>
</template>
