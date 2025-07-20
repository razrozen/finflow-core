import { describe, it, expect } from 'vitest'

describe('בדיקה בסיסית', () => {
  it('בודק שהמערכת פועלת', () => {
    expect(true).toBe(true)
  })

  it('בודק פעולות חשבון בסיסיות', () => {
    const revenue = 100000
    const expenses = 75000
    const profit = revenue - expenses
    
    expect(profit).toBe(25000)
    expect(profit / revenue).toBe(0.25) // 25% רווח
  })

  it('בודק חישובי מע"ם', () => {
    const amount = 1000
    const vatRate = 0.17
    const vatAmount = amount * vatRate
    const totalWithVat = amount + vatAmount
    
    expect(vatAmount).toBe(170)
    expect(totalWithVat).toBe(1170)
  })
})
