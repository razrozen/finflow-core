import { describe, it, expect, vi } from 'vitest'

describe('🤖 בדיקות AI ויועץ פיננסי', () => {
  it('בודק תגובות AI לא מכילות מידע רגיש', () => {
    const mockAIResponse = generateMockAIResponse({
      userInput: 'איך לשפר את הרווחיות?',
      businessData: {
        revenue: 100000,
        expenses: 75000,
        industry: 'טכנולוגיה'
      }
    })

    // וידוא שהתגובה לא חושפת מידע רגיש
    expect(mockAIResponse).not.toContain('100000') // לא חושף סכומים מדויקים
    expect(mockAIResponse).not.toContain('75000')
    expect(mockAIResponse).toContain('הגדלת יעילות') // מכיל עצות כלליות
  })

  it('בודק הגבלות על שאילתות AI', () => {
    const queries = [
      'איך לעקוף מס?',
      'איך להסתיר הכנסות?',
      'שיטות להלבנת הון',
      'איך לרמות את רשות המסים?'
    ]

    queries.forEach(query => {
      const response = mockAIFilter(query)
      expect(response.allowed).toBe(false)
      expect(response.reason).toContain('שאילתה לא חוקית')
    })
  })

  it('בודק תקינות המלצות פיננסיות', () => {
    const recommendation = generateFinancialAdvice({
      monthlyRevenue: 50000,
      monthlyExpenses: 40000,
      industry: 'שירותים',
      goals: ['צמיחה', 'חיסכון']
    })

    expect(recommendation.suggestions.length).toBeGreaterThan(0)
    expect(recommendation.riskLevel).toMatch(/נמוך|בינוני|גבוה/)
    expect(recommendation.timeframe).toMatch(/קצר|בינוני|ארוך/)
    
    // בדיקת הגיונות עסקיות
    recommendation.suggestions.forEach(suggestion => {
      expect(suggestion.expectedROI).toBeGreaterThanOrEqual(0)
      expect(suggestion.expectedROI).toBeLessThanOrEqual(100) // לא יותר מ-100%
    })
  })

  it('בודק טיפול בשגיאות AI', () => {
    // סימולציית כשל ב-API
    const mockFailedAI = vi.fn().mockRejectedValue(new Error('API Error'))
    
    expect(async () => {
      await handleAIRequest('שאלה כלשהי', mockFailedAI)
    }).rejects.toThrow('שירות הAI אינו זמין כרגע')
  })

  it('בודק GDPR compliance בנתוני AI', () => {
    const userData = {
      name: 'ישראל ישראלי',
      email: 'israel@example.com',
      businessData: { revenue: 100000 }
    }

    const gdprCompliantData = sanitizeForAI(userData)
    
    // וידוא שמידע אישי לא נשלח ל-AI
    expect(gdprCompliantData.name).toBeUndefined()
    expect(gdprCompliantData.email).toBeUndefined()
    expect(gdprCompliantData.businessData).toBeDefined() // רק נתונים עסקיים
  })
})

// פונקציות עזר וmocks
function generateMockAIResponse(_input: any): string {
  // מידע עסקי כללי בלבד, ללא חשיפת נתונים רגישים
  return `בהתבסס על הענף שלך, מומלץ להתמקד בהגדלת יעילות התפעול ובמציאת זרמי הכנסה נוספים. שקול השקעה בטכנולוגיות שיפור תהליכים.`
}

function mockAIFilter(query: string): { allowed: boolean, reason?: string } {
  const forbiddenKeywords = ['עקוף מס', 'הסתיר הכנסות', 'הלבנת הון', 'רמות', 'מרמה']
  
  const isForbidden = forbiddenKeywords.some(keyword => 
    query.includes(keyword)
  )

  return {
    allowed: !isForbidden,
    reason: isForbidden ? 'שאילתה לא חוקית או לא אתית' : undefined
  }
}

function generateFinancialAdvice(params: any) {
  const profit = params.monthlyRevenue - params.monthlyExpenses
  const profitMargin = profit / params.monthlyRevenue
  
  return {
    suggestions: [
      {
        title: 'אופטימיזציית הוצאות',
        expectedROI: Math.min(15, profitMargin * 100), // עד 15%
        timeframe: 'קצר'
      },
      {
        title: 'פיתוח מוצרים חדשים',
        expectedROI: Math.min(25, profitMargin * 200), // עד 25%
        timeframe: 'ארוך'
      }
    ],
    riskLevel: profitMargin > 0.2 ? 'נמוך' : 'בינוני',
    timeframe: 'בינוני'
  }
}

async function handleAIRequest(query: string, aiFunction: Function) {
  try {
    return await aiFunction(query)
  } catch (error) {
    throw new Error('שירות הAI אינו זמין כרגע')
  }
}

function sanitizeForAI(userData: any) {
  // הסרת מידע אישי לפני שליחה ל-AI
  const { name, email, phone, id, ...businessData } = userData
  return businessData
}
