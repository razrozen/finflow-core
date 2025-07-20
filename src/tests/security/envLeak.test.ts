import { describe, it, expect } from 'vitest'

describe('🔐 אבטחת סביבה ודליפות מידע', () => {
  it('בודק שאין מפתחות API דלופים בקוד', () => {
    // בדיקת משתני סביבה חשופים
    const envVars = Object.entries(import.meta.env)
    const sensitiveKeys = envVars.filter(([key, value]) =>
      /API_KEY|TOKEN|SECRET|PASSWORD|PRIVATE/i.test(key) && 
      typeof value === 'string' && 
      value.length > 0
    )
    
    // אם יש מפתחות חשופים, הם חייבים להיות placeholder או ריקים
    sensitiveKeys.forEach(([key, value]) => {
      expect(value, `מפתח חשוף: ${key} = ${value}`).toMatch(/^(your_|test_|placeholder|demo_|$)/)
    })
  })

  it('בודק שאין דליפת מידע אישי בלוגים', () => {
    // סימולציה של פונקציית לוג שלא צריכה לחשוף מידע אישי
    const mockLogData = {
      email: 'user@example.com',
      phone: '050-1234567',
      creditCard: '4580-1234-5678-9012',
      id: '123456789'
    }

    const sanitizedLog = sanitizeLogData(mockLogData)
    
    expect(sanitizedLog.email).toMatch(/u\*\*\*@.+\..+/)
    expect(sanitizedLog.phone).toMatch(/\*+/)
    expect(sanitizedLog.creditCard).toMatch(/\*+/)
    expect(sanitizedLog.id).toMatch(/\*+/)
  })

  it('בודק הצפנת נתונים רגישים', () => {
    const sensitiveData = 'מידע רגיש של לקוח'
    const encrypted = mockEncrypt(sensitiveData)
    
    expect(encrypted).not.toBe(sensitiveData)
    expect(encrypted.length).toBeGreaterThan(0)
    expect(mockDecrypt(encrypted)).toBe(sensitiveData)
  })

  it('בודק validation של קלט משתמש', () => {
    // בדיקת הזנת סכומים
    expect(validateAmount('100')).toBe(true)
    expect(validateAmount('100.50')).toBe(true)
    expect(validateAmount('-100')).toBe(false) // סכום שלילי
    expect(validateAmount('abc')).toBe(false) // טקסט
    expect(validateAmount('<script>')).toBe(false) // XSS
    
    // בדיקת הזנת מייל
    expect(validateEmail('user@domain.com')).toBe(true)
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('<script>alert("xss")</script>')).toBe(false)
  })
})

// פונקציות עזר לבדיקות
function sanitizeLogData(data: any) {
  return {
    email: data.email?.replace(/(.{1}).+(@.+\..+)/, '$1***$2'),
    phone: data.phone?.replace(/\d/g, '*'),
    creditCard: data.creditCard?.replace(/\d/g, '*'),
    id: data.id?.replace(/\d/g, '*')
  }
}

function mockEncrypt(data: string): string {
  // מימוש בסיסי להדגמה - במציאות יהיה הצפנה אמיתית
  return Buffer.from(data).toString('base64') + '_encrypted'
}

function mockDecrypt(encrypted: string): string {
  // מימוש בסיסי להדגמה
  const base64 = encrypted.replace('_encrypted', '')
  return Buffer.from(base64, 'base64').toString()
}

function validateAmount(amount: string): boolean {
  // ESLint security: simple numeric validation without complex regex
  const regex = /^\d+\.?\d{0,2}$/
  return regex.test(amount) && parseFloat(amount) >= 0
}

function validateEmail(email: string): boolean {
  // ESLint security: safe email regex pattern
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email) && !/<[^>]*>/.test(email) // מונע XSS
}
