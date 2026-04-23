import { ref } from 'vue'
import type { DashboardData } from '../types/data'

const EXPECTED_SCHEMA_VERSION = 1

export function useData() {
  const data = ref<DashboardData | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const schemaMismatch = ref(false)

  async function load() {
    loading.value = true
    error.value = null
    schemaMismatch.value = false
    try {
      const res = await fetch('/data.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json() as Record<string, unknown>
      if ('error' in json && typeof json['error'] === 'string') {
        error.value = json['error'] as string
        loading.value = false
        return
      }
      if (!json['metadata'] || !json['account']) {
        throw new Error('Missing required sections in data.json')
      }
      const meta = json['metadata'] as { schema_version: number }
      if (meta.schema_version > EXPECTED_SCHEMA_VERSION) {
        schemaMismatch.value = true
      }
      data.value = json as unknown as DashboardData
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
    } finally {
      loading.value = false
    }
  }

  function reload() {
    return load()
  }

  load()

  return { data, loading, error, schemaMismatch, reload }
}
