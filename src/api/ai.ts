// Mock AI API for development
// בעתיד ניתן להחליף עם שילוב אמיתי ל-OpenAI, Claude, וכו'

export interface AIRequest {
  prompt: string;
  context?: string;
}

export interface AIResponse {
  reply: string;
  status: 'success' | 'error';
}

// פונקציה שמדמה קריאה לשרת AI
export async function callAI(request: AIRequest): Promise<AIResponse> {
  // סימולציה של זמן המתנה לשרת
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const { prompt } = request;

  // תגובות חכמות בהתבסס על המילים במפתח
  let reply = generateSmartReply(prompt);

  return {
    reply,
    status: 'success'
  };
}

// פונקציה שמייצרת תגובות חכמות בהתבסס על הקלט
function generateSmartReply(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  // תגובות פיננסיות מותאמות
  if (lowerPrompt.includes('הכנסות') || lowerPrompt.includes('רווח')) {
    return `💰 לגבי הכנסות: מומלץ לנתח את המגמות החודשיות ולהשוות לתקופה המקבילה אשתקד. 
    כדאי לבחון: 
    • מקורות הכנסה עיקריים 
    • עונתיות במכירות 
    • יעדי רווח לחודשים הקרובים`;
  }

  if (lowerPrompt.includes('הוצאות') || lowerPrompt.includes('עלויות')) {
    return `📊 ניתוח הוצאות: מומלץ לחלק לקטגוריות:
    • הוצאות קבועות (שכר דירה, שכר עובדים)
    • הוצאות משתנות (חומרי גלם, שיווק)
    • השקעות חד-פעמיות
    איפה אתה רואה הכי הרבה בזבוז כרגע?`;
  }

  if (lowerPrompt.includes('לקוחות') || lowerPrompt.includes('שיווק')) {
    return `🎯 אסטרטגיית לקוחות:
    • פלח את הלקוחות לקבוצות (מקוריים/חוזרים)
    • חשב Customer Lifetime Value (CLV)
    • בדוק את עלות רכישת לקוח (CAC)
    איזה ערוץ שיווק הכי יעיל עבורך כרגע?`;
  }

  if (lowerPrompt.includes('תחזית') || lowerPrompt.includes('עתיד')) {
    return `🔮 תחזיות עסקיות:
    בהתבסס על הנתונים הנוכחיים, מומלץ:
    • לחזות 3-6 חודשים קדימה
    • לכלול תרחישים: אופטימי/ריאלי/פסימי
    • לעקוב אחרי KPIs מרכזיים
    איזה מדד הכי חשוב לעסק שלך?`;
  }

  if (lowerPrompt.includes('מס') || lowerPrompt.includes('מיסים')) {
    return `🧾 ייעוץ מס:
    • תכנן לתקופת המס מראש
    • שמור קבלות וחשבוניות מסודרות
    • בדוק זכאות להנחות והחזרים
    • שקול ייעוץ עם רואה חשבון
    האם אתה עובד עם רואה חשבון כרגע?`;
  }

  // תגובה כללית אם לא נמצאה התאמה ספציפית
  return `🤖 הבנתי את השאלה שלך: "${prompt}"
  
  כעוזר עסקי, אני יכול לעזור לך עם:
  • ניתוח פיננסי ותחזיות
  • אסטרטגיות לקוחות ושיווק  
  • אופטימיזציה של הוצאות
  • תכנון מס ומבנה עסקי
  
  איך אוכל לעזור לך באופן ספציפי יותר?`;
}

// פונקציה להתקנת Error Handling
export async function handleAIError(error: any): Promise<AIResponse> {
  console.error('AI API Error:', error);
  
  return {
    reply: `😔 מצטער, יש בעיה זמנית בשירות. בינתיים, אתה יכול:
    • לנסות שוב בעוד כמה דקות
    • לפנות אלינו בעיה דחופה: support@finflow.co.il
    • לעיין במאמרים שלנו למטה`,
    status: 'error'
  };
}
