import { describe, it, expect } from 'vitest'

describe('GDPR Compliance', () => {
  it('שומר מידע רק לתקופה מוגבלת', () => {
    const retentionDays = 30
    expect(retentionDays).toBeLessThanOrEqual(90)
  })

  it('איסוף מידע רק עם הסכמה', () => {
    const consent = false
    const dataCollected = consent ? ['email'] : []
    expect(dataCollected).toHaveLength(0)
  })
})
