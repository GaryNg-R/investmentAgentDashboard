import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, formatSignedPercent, formatDate } from '../../src/utils/format'

describe('formatCurrency', () => {
  it('formats positive', () => expect(formatCurrency(10409.92)).toBe('$10,409.92'))
  it('formats negative with minus sign', () => expect(formatCurrency(-234.56)).toBe('−$234.56'))
  it('returns dash for null', () => expect(formatCurrency(null)).toBe('—'))
})

describe('formatPercent', () => {
  it('formats to 2dp', () => expect(formatPercent(4.1)).toBe('4.10%'))
  it('returns dash for null', () => expect(formatPercent(null)).toBe('—'))
})

describe('formatSignedPercent', () => {
  it('formats positive with plus', () => expect(formatSignedPercent(4.1)).toBe('+4.10%'))
  it('formats negative with minus', () => expect(formatSignedPercent(-0.18)).toBe('−0.18%'))
  it('returns dash for null', () => expect(formatSignedPercent(null)).toBe('—'))
})

describe('formatDate', () => {
  it('formats YYYY-MM-DD to short form', () => expect(formatDate('2026-04-22')).toBe('Apr 22'))
})
