import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroCard from '../../src/components/HeroCard.vue'
import { validData } from '../fixtures/data.valid'

const account = validData.account

describe('HeroCard', () => {
  it('renders total portfolio value', () => {
    const wrapper = mount(HeroCard, { props: { account, positionsCount: 3 } })
    expect(wrapper.text()).toContain('$10,409.92')
  })

  it('shows profit pill with signed percent', () => {
    const wrapper = mount(HeroCard, { props: { account, positionsCount: 3 } })
    expect(wrapper.text()).toContain('+4.10%')
  })

  it('shows positions count', () => {
    const wrapper = mount(HeroCard, { props: { account, positionsCount: 3 } })
    expect(wrapper.text()).toContain('3')
  })

  it('applies positive class when profit is positive', () => {
    const wrapper = mount(HeroCard, { props: { account, positionsCount: 3 } })
    const pill = wrapper.find('span.rounded-full')
    expect(pill.classes()).toContain('bg-positive-50')
  })

  it('applies negative class when profit is negative', () => {
    const negAccount = { ...account, profit_dollars: -100, profit_percent: -1.0 }
    const wrapper = mount(HeroCard, { props: { account: negAccount, positionsCount: 0 } })
    const pill = wrapper.find('span.rounded-full')
    expect(pill.classes()).toContain('bg-negative-50')
  })
})
