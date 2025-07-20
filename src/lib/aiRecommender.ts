// 🔍 Data Analyzer - ניתוח הקלטים מהמשתמש
interface BusinessData {
  revenue?: number;
  expenses?: number;
  customers?: number;
  sector?: string;
  challenges?: string;
  goals?: string;
}

function analyzeBusinessData(input: string): BusinessData {
  // ניתוח בסיסי של הטקסט לחילוץ נתונים
  const data: BusinessData = {};
  
  // חילוץ מספרים (הכנסות/הוצאות)
  const numbers = input.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    data.revenue = parseInt(numbers[0]);
    if (numbers.length > 1) {
      data.expenses = parseInt(numbers[1]);
    }
  }
  
  // זיהוי תחום עסקי
  if (input.includes('מסעדה') || input.includes('אוכל')) data.sector = 'מסעדנות';
  if (input.includes('טכנולוגיה') || input.includes('תוכנה')) data.sector = 'טכנולוגיה';
  if (input.includes('שירותים') || input.includes('ייעוץ')) data.sector = 'שירותים';
  
  return data;
}

// 📈 Pattern Matcher - השוואה מול תבניות הצלחה
function getSuccessPatterns(sector?: string): string[] {
  const patterns = {
    'מסעדנות': [
      'שיפור חוויית הלקוח',
      'אופטימיזציה של עלויות מלאי',
      'הגדלת מכירות דרך רשתות חברתיות'
    ],
    'טכנולוגיה': [
      'פיתוח מוצר מבוסס משוב לקוחות',
      'הרחבת בסיס הלקוחות דרך שיווק דיגיטלי',
      'שיפור זמני פיתוח וצמצום עלויות'
    ],
    'שירותים': [
      'בניית מערכות אוטומציה',
      'התמחות בנישה ספציפית',
      'הגדלת שביעות רצון הלקוחות'
    ]
  };
  
  return patterns[sector as keyof typeof patterns] || [
    'שיפור יעילות תפעולית',
    'הגדלת בסיס לקוחות',
    'אופטימיזציה פיננסית'
  ];
}

// 🎯 Recommendation Engine - מחולל המלצות אוטומטי
export async function generateBusinessRecommendations(businessInput: string): Promise<string> {
  // שלב 1: ניתוח הנתונים
  const businessData = analyzeBusinessData(businessInput);
  
  // שלב 2: זיהוי תבניות הצלחה
  const successPatterns = getSuccessPatterns(businessData.sector);
  
  // שלב 3: יצירת המלצות מותאמות
  const prompt = `
  אתה מערכת AI מומחית לייעוץ עסקי אסטרטגי.
  עליך לנתח את הקלט הבא מהמשתמש ולספק 3 המלצות אסטרטגיות ממוקדות לצמיחה.

  קלט עסקי:
  ${businessInput}

  נתונים שזוהו:
  - תחום עסקי: ${businessData.sector || 'לא זוהה'}
  - הכנסות משוערות: ${businessData.revenue ? `₪${businessData.revenue.toLocaleString()}` : 'לא זוהה'}
  - הוצאות משוערות: ${businessData.expenses ? `₪${businessData.expenses.toLocaleString()}` : 'לא זוהה'}

  תבניות הצלחה רלוונטיות:
  ${successPatterns.map((pattern, i) => `${i + 1}. ${pattern}`).join('\n')}

  המבנה המבוקש לכל המלצה:
  🎯 **המלצה [מספר]**: [כותרת ברורה]
  
  **🔍 הבעיה/האתגר שזוהה:**
  [תיאור הבעיה במשפט אחד]
  
  **📊 ניתוח:**
  [ניתוח קצר של המצב הנוכחי - 2-3 שורות]
  
  **⚡ פעולה מומלצת:**
  [המלצה פעולה ברורה וקונקרטית עם צעדים ראשונים]
  
  **📈 תוצאה צפויה:**
  [מה הרווח/השיפור הצפוי]

  ענה בעברית ברורה ובפורמט המבוקש.
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { 
            role: "system", 
            content: "אתה יועץ עסקי אסטרטגי ברמת על עם ניסיון של 20 שנה בגידול עסקים. אתה מתמחה בהמלצות מעשיות וקונקרטיות שמביאות תוצאות מדידות." 
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "לא נמצאה תשובה.";
  } catch (err) {
    console.error("שגיאה במנוע המלצות:", err);
    return `
🚨 **אירעה שגיאה במערכת ההמלצות**

אנו עובדים על פתרון הבעיה. בינתיים, הנה כמה המלצות כלליות:

🎯 **המלצה 1: ניתוח נתונים פיננסיים**
בדוק את היחס בין הכנסות להוצאות ובחן אפשרויות לאופטימיזציה.

🎯 **המלצה 2: שיפור שביעות רצון לקוחות**
בצע סקר לקוחות כדי לזהות נקודות שיפור בשירות.

🎯 **המלצה 3: פיתוח אסטרטגיית שיווק**
בחן ערוצי שיווק חדשים להגדלת בסיס הלקוחות.
    `;
  }
}
