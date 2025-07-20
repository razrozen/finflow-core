import { describe, it, expect } from 'vitest'

function sanitizeInput(input: string): string {
  // הסרת תגי script
  let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, '')
  
  // הסרת תגי HTML מסוכנים נוספים
  sanitized = sanitized.replace(/<[^>]*>/g, '')
  
  // הסרת JavaScript events
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
  
  // הסרת javascript: URLs
  sanitized = sanitized.replace(/javascript\s*:/gi, '')
  
  // הסרת תווי SQL injection
  sanitized = sanitized.replace(/['";]/g, '')
  sanitized = sanitized.replace(/--/g, '')
  sanitized = sanitized.replace(/\b(DROP|DELETE|INSERT|UPDATE|SELECT)\b/gi, '')
  
  return sanitized.trim()
}

function validateFinancialAmount(amount: string): boolean {
  // בדיקת סכום פיננסי חוקי
  const numericRegex = /^\d+(\.\d{1,2})?$/
  return numericRegex.test(amount) && parseFloat(amount) >= 0
}

function validateBusinessName(name: string): boolean {
  // שם עסק חוקי - אותיות, מספרים, רווחים ותווים מסוימים
  const businessNameRegex = /^[א-ת\u0590-\u05FFa-zA-Z0-9\s\-&'".()]+$/
  return businessNameRegex.test(name) && name.length <= 100
}

describe('🛡️ ניקוי וולידציה של קלט ממשתמש', () => {
  it('מונע קוד זדוני XSS בסיסי', () => {
    const input = '<script>alert("XSS")</script>שלום'
    const safe = sanitizeInput(input)
    expect(safe).toBe('שלום')
  })

  it('מונע קוד JavaScript מתקדם', () => {
    const maliciousInputs = [
      'שלום<img src="x" onerror="alert(1)">',
      'טקסט<iframe src="javascript:alert(1)"></iframe>',
      'בדיקה<div onclick="malicious()">לחץ כאן</div>'
    ]

    maliciousInputs.forEach(input => {
      const safe = sanitizeInput(input)
      expect(safe).not.toContain('<')
      expect(safe).not.toContain('javascript:')
      expect(safe).not.toContain('onclick')
      expect(safe).not.toContain('onerror')
    })
  })

  it('שומר על טקסט עברי וחוקי', () => {
    const hebrewText = 'שלום עולם 123'
    const safe = sanitizeInput(hebrewText)
    expect(safe).toBe('שלום עולם 123')
  })

  it('מאמת סכומים פיננסיים', () => {
    // סכומים חוקיים
    expect(validateFinancialAmount('1000')).toBe(true)
    expect(validateFinancialAmount('1000.50')).toBe(true)
    expect(validateFinancialAmount('0')).toBe(true)
    
    // סכומים לא חוקיים
    expect(validateFinancialAmount('-100')).toBe(false)
    expect(validateFinancialAmount('abc')).toBe(false)
    expect(validateFinancialAmount('1000.123')).toBe(false) // יותר מ-2 ספרות אחרי הנקודה
    expect(validateFinancialAmount('<script>')).toBe(false)
  })

  it('מאמת שמות עסקים', () => {
    // שמות חוקיים
    expect(validateBusinessName('חברת ABC בע"מ')).toBe(true)
    expect(validateBusinessName('Tech Solutions Ltd.')).toBe(true)
    expect(validateBusinessName('קפה הבית (2023)')).toBe(true)
    
    // שמות לא חוקיים
    expect(validateBusinessName('<script>alert(1)</script>')).toBe(false)
    expect(validateBusinessName('שם ארוך מדי '.repeat(20))).toBe(false) // יותר מ-100 תווים
    expect(validateBusinessName('company@#$%^&*')).toBe(false) // תווים לא חוקיים
  })

  it('מונע SQL Injection בשאילתות', () => {
    const sqlInjectionAttempts = [
      "'; DROP TABLE users; --",
      "admin'/*",
      "1' OR '1'='1",
      "'; DELETE FROM businesses; --"
    ]

    sqlInjectionAttempts.forEach(attempt => {
      const safe = sanitizeInput(attempt)
      expect(safe).not.toContain("'")
      expect(safe).not.toContain("--")
      expect(safe).not.toContain("DROP")
      expect(safe).not.toContain("DELETE")
    })
  })
})
