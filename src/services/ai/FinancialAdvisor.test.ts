// src/services/ai/FinancialAdvisor.test.ts
import { describe, it, expect } from 'vitest'
import { generateFinancialStrategy } from './FinancialAdvisor'

describe('FinancialAdvisor', () => {
  it('should provide strategy for low revenue', () => {
    const strategy = generateFinancialStrategy(5000)
    expect(strategy).toContain('המלצה')
    expect(strategy).toContain('פרסום דיגיטלי')
  })

  it('should provide strategy for medium revenue', () => {
    const strategy = generateFinancialStrategy(25000)
    expect(strategy).toContain('המלצה')
    expect(strategy).toContain('תזרים המזומנים')
  })

  it('should provide strategy for high revenue', () => {
    const strategy = generateFinancialStrategy(75000)
    expect(strategy).toContain('המלצה')
    expect(strategy).toContain('השקעות לטווח ארוך')
  })
})
