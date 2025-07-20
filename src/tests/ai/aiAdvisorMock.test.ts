import { describe, it, expect } from 'vitest'

interface BusinessMetrics {
  monthlyRevenue: number
  monthlyExpenses: number
  industry: string
  employeeCount: number
}

function mockAiAdvisor(question: string, businessData?: BusinessMetrics): string {
  const lowerQuestion = question.toLowerCase()
  
  // תזרים מזומנים
  if (lowerQuestion.includes('תזרים מזומנים') || lowerQuestion.includes('cash flow')) {
    return 'מומלץ להפריד הוצאות משתנות וקבועות, לשמור רזרבה של 3-6 חודשים, ולבצע תחזיות תזרים שבועיות.'
  }
  
  // צמיחה עסקית
  if (lowerQuestion.includes('צמיחה') || lowerQuestion.includes('הגדלה') || lowerQuestion.includes('growth') || lowerQuestion.includes('לגדול')) {
    if (businessData && businessData.monthlyRevenue > 0) {
      const profitMargin = ((businessData.monthlyRevenue - businessData.monthlyExpenses) / businessData.monthlyRevenue) * 100
      if (profitMargin > 20) {
        return 'הרווחיות שלך חזקה! מומלץ להשקיע בשיווק דיגיטלי והרחבת צוות המכירות.'
      } else {
        return 'ראשית יש לשפר את הרווחיות על ידי אופטימיזציית הוצאות, ולאחר מכן להתמקד בצמיחה.'
      }
    }
    return 'לצמיחה מוצלחת מומלץ להתמקד בשביעות רצון לקוחות קיימים לפני הרחבה.'
  }
  
  // מיסוי וחשבונאות
  if (lowerQuestion.includes('מס') || lowerQuestion.includes('מע"ם') || lowerQuestion.includes('tax')) {
    return 'מומלץ לנהל רישומי הכנסות והוצאות מדויקים, לשמור קבלות, ולהתייעץ עם רואה חשבון מוסמך.'
  }
  
  // השקעות
  if (lowerQuestion.includes('השקעה') || lowerQuestion.includes('investment') || lowerQuestion.includes('להשקיע') || lowerQuestion.includes('כדאי לי')) {
    return 'לפני השקעות חדשות, ודא שיש לך רזרבת מזומנים יציבה ותכנית עסקית ברורה עם ROI צפוי.'
  }
  
  // בעיות פיננסיות
  if (lowerQuestion.includes('קושי') || lowerQuestion.includes('בעיה') || lowerQuestion.includes('הפסד')) {
    return 'בזמני קושי פיננסי: נתח מחדש את ההוצאות, דחה השקעות לא קריטיות, שפר גביית חובות, ושקול גיוס מימון חיצוני.'
  }
  
  return 'תודה על השאלה! המשך לשאול שאלות עסקיות ספציפיות כדי לקבל עצות מותאמות.'
}

function validateAiQuestion(question: string): { isValid: boolean, reason?: string } {
  // בדיקת אורך השאלה
  if (question.length < 5) {
    return { isValid: false, reason: 'השאלה קצרה מדי' }
  }
  
  if (question.length > 500) {
    return { isValid: false, reason: 'השאלה ארוכה מדי' }
  }
  
  // בדיקת תוכן לא מתאים
  const forbiddenTopics = [
    'הלבנת הון', 'עקיפת מס', 'מרמה', 'הונאה', 'עקוף מס', 'הסתיר הכנסות', 'רמות',
    'money laundering', 'tax evasion', 'fraud'
  ]
  
  const questionLower = question.toLowerCase()
  for (const topic of forbiddenTopics) {
    if (questionLower.includes(topic.toLowerCase())) {
      return { isValid: false, reason: 'השאלה מכילה תוכן לא מתאים' }
    }
  }
  
  return { isValid: true }
}

describe('🤖 יועץ עסקי AI - Mock ובדיקות', () => {
  it('נותן עצה על תזרים מזומנים', () => {
    const question = 'איך לנהל תזרים מזומנים?'
    const response = mockAiAdvisor(question)
    
    expect(response).toContain('מומלץ')
    expect(response).toContain('רזרבה')
    expect(response).toContain('תחזיות')
  })

  it('נותן עצות צמיחה מותאמות לנתונים עסקיים', () => {
    const goodBusinessData: BusinessMetrics = {
      monthlyRevenue: 100000,
      monthlyExpenses: 70000,
      industry: 'טכנולוגיה',
      employeeCount: 10
    }
    
    const strugglingBusinessData: BusinessMetrics = {
      monthlyRevenue: 50000,
      monthlyExpenses: 48000,
      industry: 'מסחר',
      employeeCount: 5
    }
    
    const goodAdvice = mockAiAdvisor('איך לגדול?', goodBusinessData)
    const strugglingAdvice = mockAiAdvisor('איך לגדול?', strugglingBusinessData)
    
    expect(goodAdvice).toContain('השקיע בשיווק')
    expect(strugglingAdvice).toContain('שפר את הרווחיות')
  })

  it('מטפל בשאלות מיסוי', () => {
    const taxQuestion = 'איך לנהל מע"ם נכון?'
    const response = mockAiAdvisor(taxQuestion)
    
    expect(response).toContain('רישומי הכנסות')
    expect(response).toContain('קבלות')
    expect(response).toContain('רואה חשבון')
  })

  it('מזהה ודוחה שאלות לא מתאימות', () => {
    const badQuestions = [
      'איך לעקוף מס?',
      'שיטות להלבנת הון',
      'איך לרמות את הלקוחות?',
      'a'.repeat(600) // שאלה ארוכה מדי
    ]
    
    badQuestions.forEach(question => {
      const validation = validateAiQuestion(question)
      expect(validation.isValid).toBe(false)
      expect(validation.reason).toBeDefined()
    })
  })

  it('מאשר שאלות חוקיות', () => {
    const goodQuestions = [
      'איך לשפר את הרווחיות?',
      'מה הדרך הטובה ביותר לגדול?',
      'איך לנהל תזרים מזומנים?',
      'כדאי לי להשקיע בפרסום?'
    ]
    
    goodQuestions.forEach(question => {
      const validation = validateAiQuestion(question)
      expect(validation.isValid).toBe(true)
      expect(validation.reason).toBeUndefined()
    })
  })

  it('מספק עצות השקעה זהירות', () => {
    const investmentQuestion = 'כדאי לי להשקיע בציוד חדש?'
    const response = mockAiAdvisor(investmentQuestion)
    
    expect(response).toContain('רזרבת מזומנים')
    expect(response).toContain('תכנית עסקית')
    expect(response).toContain('ROI')
  })

  it('מטפל בבעיות פיננסיות בצורה בונה', () => {
    const problemQuestion = 'יש לי קושי פיננסי, מה לעשות?'
    const response = mockAiAdvisor(problemQuestion)
    
    expect(response).toContain('נתח מחדש')
    expect(response).toContain('הוצאות')
    expect(response).toContain('גביית חובות')
    expect(response).not.toContain('פשיטת רגל') // לא מציע פתרונות קיצוניים
  })
})
