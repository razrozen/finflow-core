function sanitize(input: string) {
  return input.replace(/<script.*?>.*?<\/script>/gi, '')
}

import { describe, it, expect } from 'vitest'

describe('ניקוי קלט', () => {
  it('מסיר סקריפטים זדוניים', () => {
    const input = '<script>alert(1)</script>שלום'
    const clean = sanitize(input)
    expect(clean).toBe('שלום')
  })
})
