<script setup lang="ts">
defineProps<{ generatedAt: string; schemaVersion: number }>()

function shortTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  } catch {
    return iso
  }
}
</script>

<template>
  <footer class="text-center py-6 text-xs text-slate-400">
    Generated {{ shortTime(generatedAt) }} · schema v{{ schemaVersion }}
  </footer>
</template>
