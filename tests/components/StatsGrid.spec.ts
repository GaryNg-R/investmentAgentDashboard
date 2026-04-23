import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsGrid from '../../src/components/StatsGrid.vue'
import { validData } from '../fixtures/data.valid'

describe('StatsGrid', () => {
  it('renders win rate', () => {
    const wrapper = mount(StatsGrid, { props: { stats: validData.stats } })
    expect(wrapper.text()).toContain('50.00%')
  })

  it('renders best trade ticker', () => {
    const wrapper = mount(StatsGrid, { props: { stats: validData.stats } })
    expect(wrapper.text()).toContain('MSTR')
  })

  it('renders dash for null values', () => {
    const emptyStats = { ...validData.stats, win_rate: null, avg_winner: null, avg_loser: null, best_trade: null }
    const wrapper = mount(StatsGrid, { props: { stats: emptyStats } })
    expect(wrapper.text()).toContain('—')
  })

  it('win/loss counts visible', () => {
    const wrapper = mount(StatsGrid, { props: { stats: validData.stats } })
    expect(wrapper.text()).toContain('1W / 1L')
  })
})
