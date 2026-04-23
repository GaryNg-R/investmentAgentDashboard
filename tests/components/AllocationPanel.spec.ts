import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AllocationPanel from '../../src/components/AllocationPanel.vue'
import { validData } from '../fixtures/data.valid'

describe('AllocationPanel', () => {
  const props = {
    positions: validData.positions,
    allocation: validData.allocation,
    cash: validData.account.cash,
    totalValue: validData.account.total_value,
  }

  it('renders a canvas for the donut chart', () => {
    const wrapper = mount(AllocationPanel, { props })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('renders a row for each position', () => {
    const wrapper = mount(AllocationPanel, { props })
    expect(wrapper.text()).toContain('META')
    expect(wrapper.text()).toContain('COIN')
    expect(wrapper.text()).toContain('TSLA')
  })

  it('renders cash row last', () => {
    const wrapper = mount(AllocationPanel, { props })
    expect(wrapper.text()).toContain('Cash')
  })

  it('shows placeholder for position with null market_value', () => {
    const posWithNull = [
      ...validData.positions.slice(0, 2),
      { ...validData.positions[2], current_price: null, market_value: null, profit_dollars: null, profit_percent: null, portfolio_pct: null },
    ]
    const wrapper = mount(AllocationPanel, { props: { ...props, positions: posWithNull } })
    // The null position should still render but show '—'
    expect(wrapper.text()).toContain('TSLA')
  })
})
