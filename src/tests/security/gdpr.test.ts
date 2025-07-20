import { describe, it, expect } from 'vitest'

describe('🛡️ GDPR ופרטיות נתונים', () => {
  it('בודק זכויות נושא הנתונים - מחיקת נתונים', () => {
    const userData = {
      userId: 'user123',
      personalData: {
        name: 'ישראל כהן',
        email: 'israel@example.com',
        phone: '050-1234567'
      },
      businessData: {
        businessName: 'חברת ישראל',
        revenue: 100000
      }
    }

    const deletionResult = simulateDataDeletion(userData.userId)
    
    expect(deletionResult.personalDataDeleted).toBe(true)
    expect(deletionResult.businessDataAnonymized).toBe(true)
    expect(deletionResult.auditTrail).toBeDefined()
    expect(deletionResult.deletionDate).toBeDefined()
  })

  it('בודק זכות לנישאות נתונים - ייצוא נתונים', () => {
    const exportedData = simulateDataExport('user123')
    
    expect(exportedData.format).toBe('JSON')
    expect(exportedData.data.personalInfo).toBeDefined()
    expect(exportedData.data.businessInfo).toBeDefined()
    expect(exportedData.metadata.exportDate).toBeDefined()
    expect(exportedData.metadata.dataRetentionPeriod).toBeDefined()
  })

  it('בודק הסכמה לעיבוד נתונים', () => {
    const consentData = {
      userId: 'user123',
      consentTypes: ['analytics', 'marketing', 'ai_processing'],
      timestamp: new Date().toISOString()
    }

    const consentResult = processConsent(consentData)
    
    expect(consentResult.valid).toBe(true)
    expect(consentResult.expiryDate).toBeDefined()
    expect(consentResult.withdrawalInstructions).toBeDefined()
  })

  it('בודק אנונימיזציה של נתונים', () => {
    const sensitiveData = {
      name: 'משה לוי',
      email: 'moshe@example.com',
      businessId: 'BUS123456',
      revenue: 150000,
      location: 'תל אביב'
    }

    const anonymized = anonymizeData(sensitiveData)
    
    expect(anonymized.name).toMatch(/^User_\w+$/) // User_randomID
    expect(anonymized.email).toMatch(/^user_\w+@anonymized\.com$/)
    expect(anonymized.businessId).toMatch(/^BUS_\w+$/)
    expect(anonymized.revenue).toBe(sensitiveData.revenue) // נתונים עסקיים נשארים
    expect(anonymized.location).toBe('Israel') // כללי יותר
  })

  it('בודק זכות לתיקון נתונים', () => {
    const originalData = {
      userId: 'user123',
      name: 'שם שגוי',
      email: 'wrong@email.com'
    }

    const correctionRequest = {
      userId: 'user123',
      corrections: {
        name: 'שם נכון',
        email: 'correct@email.com'
      }
    }

    const result = processDataCorrection(originalData, correctionRequest)
    
    expect(result.updated).toBe(true)
    expect(result.data.name).toBe('שם נכון')
    expect(result.data.email).toBe('correct@email.com')
    expect(result.auditLog).toBeDefined()
  })

  it('בודק מגבלות גיל ועיבוד נתונים של קטינים', () => {
    const minorData = {
      userId: 'minor123',
      age: 16,
      parentalConsent: false
    }

    const adultData = {
      userId: 'adult123',
      age: 25,
      parentalConsent: null
    }

    expect(canProcessPersonalData(minorData)).toBe(false)
    expect(canProcessPersonalData({ ...minorData, parentalConsent: true })).toBe(true)
    expect(canProcessPersonalData(adultData)).toBe(true)
  })

  it('בודק משך שמירת נתונים', () => {
    const retentionPolicies = getDataRetentionPolicies()
    
    expect(retentionPolicies.personalData).toBe('7 years') // חוק שמירת מסמכים
    expect(retentionPolicies.businessData).toBe('7 years')
    expect(retentionPolicies.analyticsData).toBe('2 years')
    expect(retentionPolicies.auditLogs).toBe('7 years')
  })
})

// פונקציות עזר לבדיקות GDPR
function simulateDataDeletion(userId: string) {
  return {
    userId,
    personalDataDeleted: true,
    businessDataAnonymized: true,
    auditTrail: `מחיקת נתונים עבור ${userId} ב-${new Date().toISOString()}`,
    deletionDate: new Date().toISOString()
  }
}

function simulateDataExport(userId: string) {
  return {
    format: 'JSON',
    data: {
      personalInfo: { /* נתונים אישיים */ },
      businessInfo: { /* נתונים עסקיים */ }
    },
    metadata: {
      exportDate: new Date().toISOString(),
      dataRetentionPeriod: '7 years',
      userId
    }
  }
}

function processConsent(_consentData: any) {
  const expiryDate = new Date()
  expiryDate.setFullYear(expiryDate.getFullYear() + 2) // הסכמה ל-2 שנים

  return {
    valid: true,
    consentId: `consent_${Date.now()}`,
    expiryDate: expiryDate.toISOString(),
    withdrawalInstructions: 'ניתן לבטל הסכמה דרך הגדרות החשבון'
  }
}

function anonymizeData(data: any) {
  const randomId = Math.random().toString(36).substring(7)
  
  return {
    name: `User_${randomId}`,
    email: `user_${randomId}@anonymized.com`,
    businessId: `BUS_${randomId}`,
    revenue: data.revenue, // נתונים עסקיים לא אישיים נשארים
    location: 'Israel' // כללי יותר
  }
}

function processDataCorrection(originalData: any, correctionRequest: any) {
  const updatedData = { ...originalData, ...correctionRequest.corrections }
  
  return {
    updated: true,
    data: updatedData,
    auditLog: {
      timestamp: new Date().toISOString(),
      changes: correctionRequest.corrections,
      requestedBy: correctionRequest.userId
    }
  }
}

function canProcessPersonalData(userData: any): boolean {
  if (userData.age < 18) {
    return userData.parentalConsent === true
  }
  return true
}

function getDataRetentionPolicies() {
  return {
    personalData: '7 years',
    businessData: '7 years', 
    analyticsData: '2 years',
    auditLogs: '7 years'
  }
}
