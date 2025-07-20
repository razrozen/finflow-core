function aiAdvisor(input: string) {
  if (input.includes('תזרים')) return 'הפרד הוצאות קבועות ומשתנות'
  return 'אנא נסח שאלה ברורה'
}

import { describe, it, expect } from 'vitest'

describe('יועץ AI', () => {
  it('מציע פתרון לתזרים מזומנים', () => {
    expect(aiAdvisor('איך לנהל תזרים מזומנים?')).toContain('הפרד')
  })
})
