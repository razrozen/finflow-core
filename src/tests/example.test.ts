import { describe, it, expect } from 'vitest'

describe('בדיקה בסיסית', () => {
  it('בודק שאמת היא אמת', () => {
    expect(true).toBe(true)
  })

  it('בודק פעולות מתמטיות פשוטות', () => {
    expect(2 + 2).toBe(4)
    expect(10 - 5).toBe(5)
  })

  it('בודק עבודה עם מחרוזות', () => {
    const message = 'FinFlow'
    expect(message).toContain('Flow')
    expect(message.length).toBe(7)
  })
})
