<script setup lang="ts">
defineProps<{ modelValue: string; options: { key: string; label: string }[] }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="opt in options"
      :key="opt.key"
      class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
      :class="modelValue === opt.key
        ? 'bg-accent text-white'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
      @click="$emit('update:modelValue', opt.key)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
