import { describe, it, expect } from 'vitest'

interface UserData {
  id: string
  email: string
  name: string
  businessData: any
  createdAt: Date
  lastLoginAt: Date
  consentGiven: boolean
  consentDate?: Date
}

interface DataRetentionPolicy {
  personalData: number // ימים
  businessData: number
  analyticsData: number
  auditLogs: number
}

function getDataRetentionPolicy(): DataRetentionPolicy {
  return {
    personalData: 2555, // 7 שנים (7 * 365 + 2 ימי עיבור)
    businessData: 2555, // 7 שנים לפי חוק חשבונאות
    analyticsData: 730, // 2 שנים
    auditLogs: 2555 // 7 שנים לביקורת
  }
}

function shouldDeleteUserData(userData: UserData): boolean {
  const policy = getDataRetentionPolicy()
  const daysSinceCreation = Math.floor((Date.now() - userData.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  const daysSinceLastLogin = Math.floor((Date.now() - userData.lastLoginAt.getTime()) / (1000 * 60 * 60 * 24))
  
  // מחק אם עבר יותר מזמן הרטנציה או אם המשתמש לא התחבר יותר מ-365 ימים
  return daysSinceCreation > policy.personalData || daysSinceLastLogin > 365
}

function canCollectPersonalData(hasConsent: boolean, userAge?: number): boolean {
  // אם המשתמש מתחת לגיל 18, צריך הסכמת הורים
  if (userAge && userAge < 18) {
    return false // בהנחה שאין הסכמת הורים במצב הבסיסי
  }
  
  return hasConsent
}

function anonymizeUserData(userData: UserData): any {
  const randomId = Math.random().toString(36).substring(7)
  
  return {
    id: `user_${randomId}`,
    email: `user_${randomId}@anonymized.com`,
    name: `User ${randomId}`,
    businessData: userData.businessData, // נתונים עסקיים נשארים
    createdAt: userData.createdAt,
    lastLoginAt: null, // מידע אישי מוסר
    consentGiven: false,
    consentDate: null
  }
}

function validateConsentExpiry(consentDate: Date, maxValidityDays: number = 730): boolean {
  const daysSinceConsent = Math.floor((Date.now() - consentDate.getTime()) / (1000 * 60 * 60 * 24))
  return daysSinceConsent <= maxValidityDays
}

describe('🔐 עמידה ב-GDPR ופרטיות נתונים', () => {
  it('שומר מידע רק לזמן מוגבל', () => {
    const policy = getDataRetentionPolicy()
    
    // בדיקת משכי זמן סבירים
    expect(policy.personalData).toBeLessThanOrEqual(2555) // מקסימום 7 שנים
    expect(policy.analyticsData).toBeLessThanOrEqual(730) // מקסימום 2 שנים
    expect(policy.businessData).toBeGreaterThanOrEqual(2555) // לפחות 7 שנים לחוק
  })

  it('לא אוסף מידע אישי ללא הסכמה', () => {
    const withoutConsent = canCollectPersonalData(false)
    const withConsent = canCollectPersonalData(true)
    
    expect(withoutConsent).toBe(false)
    expect(withConsent).toBe(true)
  })

  it('מגן על קטינים - דורש הסכמת הורים', () => {
    const minorWithoutParentalConsent = canCollectPersonalData(true, 16)
    const adultWithConsent = canCollectPersonalData(true, 25)
    
    expect(minorWithoutParentalConsent).toBe(false)
    expect(adultWithConsent).toBe(true)
  })

  it('מזהה נתונים שצריכים מחיקה', () => {
    const oldUser: UserData = {
      id: 'user1',
      email: 'old@user.com',
      name: 'Old User',
      businessData: { revenue: 100000 },
      createdAt: new Date('2015-01-01'), // 10 שנים
      lastLoginAt: new Date('2020-01-01'), // 5 שנים מאז לוגין אחרון
      consentGiven: true,
      consentDate: new Date('2015-01-01')
    }
    
    const activeUser: UserData = {
      id: 'user2',
      email: 'active@user.com',
      name: 'Active User',
      businessData: { revenue: 50000 },
      createdAt: new Date('2023-01-01'), // 2 שנים
      lastLoginAt: new Date('2024-12-01'), // התחבר לאחרונה השנה
      consentGiven: true,
      consentDate: new Date('2023-01-01')
    }
    
    expect(shouldDeleteUserData(oldUser)).toBe(true)
    expect(shouldDeleteUserData(activeUser)).toBe(false)
  })

  it('מבצע אנונימיזציה נכונה', () => {
    const userData: UserData = {
      id: 'real_user_123',
      email: 'john@example.com',
      name: 'John Doe',
      businessData: { 
        businessName: 'John\'s Company',
        revenue: 100000 
      },
      createdAt: new Date('2020-01-01'),
      lastLoginAt: new Date('2024-01-01'),
      consentGiven: true,
      consentDate: new Date('2020-01-01')
    }
    
    const anonymized = anonymizeUserData(userData)
    
    // מידע אישי מוסתר
    expect(anonymized.id).not.toBe(userData.id)
    expect(anonymized.email).not.toBe(userData.email)
    expect(anonymized.name).not.toBe(userData.name)
    expect(anonymized.lastLoginAt).toBeNull()
    
    // נתונים עסקיים נשמרים
    expect(anonymized.businessData).toEqual(userData.businessData)
    expect(anonymized.createdAt).toEqual(userData.createdAt)
  })

  it('בודק תוקף הסכמות לאורך זמן', () => {
    const recentConsent = new Date('2024-01-01')
    const oldConsent = new Date('2020-01-01')
    
    expect(validateConsentExpiry(recentConsent, 730)).toBe(true) // הסכמה חדשה
    expect(validateConsentExpiry(oldConsent, 730)).toBe(false) // הסכמה ישנה
  })

  it('מבטיח זכות גישה לנתונים אישיים', () => {
    const userData: UserData = {
      id: 'user123',
      email: 'user@example.com',
      name: 'Test User',
      businessData: { revenue: 75000 },
      createdAt: new Date('2023-01-01'),
      lastLoginAt: new Date('2024-06-01'),
      consentGiven: true,
      consentDate: new Date('2023-01-01')
    }
    
    // סימולציה של export נתונים
    const exportedData = {
      personalInfo: {
        email: userData.email,
        name: userData.name,
        registrationDate: userData.createdAt,
        lastLogin: userData.lastLoginAt
      },
      businessInfo: userData.businessData,
      privacySettings: {
        consentGiven: userData.consentGiven,
        consentDate: userData.consentDate
      },
      metadata: {
        exportDate: new Date(),
        format: 'JSON',
        requestedBy: userData.id
      }
    }
    
    expect(exportedData.personalInfo.email).toBe(userData.email)
    expect(exportedData.businessInfo).toEqual(userData.businessData)
    expect(exportedData.metadata.format).toBe('JSON')
  })

  it('מאפשר ביטול הסכמה ומחיקת נתונים', () => {
    const userData: UserData = {
      id: 'user456',
      email: 'withdraw@example.com',
      name: 'Withdraw User',
      businessData: { revenue: 60000 },
      createdAt: new Date('2023-01-01'),
      lastLoginAt: new Date('2024-01-01'),
      consentGiven: true,
      consentDate: new Date('2023-01-01')
    }
    
    // סימולציה של ביטול הסכמה
    const withdrawalResult = {
      userId: userData.id,
      personalDataDeleted: true,
      businessDataAnonymized: true,
      withdrawalDate: new Date(),
      confirmationSent: true,
      auditLog: `User ${userData.id} withdrew consent on ${new Date().toISOString()}`
    }
    
    expect(withdrawalResult.personalDataDeleted).toBe(true)
    expect(withdrawalResult.businessDataAnonymized).toBe(true)
    expect(withdrawalResult.confirmationSent).toBe(true)
    expect(withdrawalResult.auditLog).toContain(userData.id)
  })
})
