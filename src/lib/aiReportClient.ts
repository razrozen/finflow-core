// זהו קובץ שירות להתחברות ל-API של GPT או AI אחר
export async function getAiBusinessReport(userInput: string): Promise<string> {
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
            content: "אתה יועץ עסקי מומחה עם ניסיון של 20 שנה. צור דוח אסטרטגי מפורט בעברית בהתבסס על הנתונים שהוזנו על העסק. הדוח צריך לכלול: ניתוח מצב נוכחי, תובנות עסקיות, זיהוי סיכונים, המלצות מעשיות לשיפור ותחזיות עתידיות. כתב בצורה מקצועית, ברורה ומעשית.",
          },
          {
            role: "user",
            content: `צור דוח עסקי מקצועי על הנתונים הבאים:\n\n${userInput}\n\nהדוח צריך לכלול:\n1. 🔍 ניתוח מצב נוכחי\n2. 💡 תובנות עסקיות מרכזיות\n3. ⚠️ זיהוי סיכונים עיקריים\n4. 📈 המלצות מעשיות לשיפור\n5. 🎯 תחזיות והזדמנויות עתידיות`,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || "שגיאה ב-API");
    }
    
    return data.choices?.[0]?.message?.content || "לא התקבלה תשובה מה-AI";
  } catch (err) {
    console.error("שגיאה ביצירת דוח:", err);
    
    if (err instanceof Error) {
      if (err.message.includes("401")) {
        return "שגיאה: מפתח API לא תקין. אנא בדוק את הגדרות ה-API.";
      } else if (err.message.includes("429")) {
        return "שגיאה: הושג מגבלת השימוש ב-API. אנא נסה שוב מאוחר יותר.";
      } else if (err.message.includes("network") || err.message.includes("fetch")) {
        return "שגיאה: בעיית חיבור לאינטרנט. אנא בדוק את החיבור שלך.";
      }
    }
    
    return "אירעה שגיאה בלתי צפויה בעת הפקת הדוח. אנא נסה שוב.";
  }
}

// פונקציה עזר לבדיקת תקינות המפתח
export function validateApiKey(): boolean {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return typeof apiKey === 'string' && apiKey.length > 0 && apiKey.startsWith('sk-');
}

// פונקציה לקבלת דוח לדוגמה (fallback)
export function getSampleReport(userInput: string): string {
  return `🔍 דוח עסקי לדוגמה עבור: "${userInput.substring(0, 50)}..."

📊 ניתוח מצב נוכחי:
בהתבסס על הנתונים שסופקו, העסק מציג ביצועים בסיסיים עם פוטנציאל לשיפור.

💡 תובנות עסקיות:
• יש מקום לשיפור ביעילות התפעולית
• הכנסות יציבות אך ללא צמיחה משמעותית
• מבנה עלויות דורש בחינה מחודשת

⚠️ סיכונים עיקריים:
• תלות יתר בלקוחות מסוימים
• תחרות גוברת בשוק
• אתגרים בשמירה על מרגין רווח

📈 המלצות לשיפור:
• פיתוח אסטרטגיית שיווק דיגיטלית
• השקעה בטכנולוגיה לייעול תהליכים
• גיוון מקורות הכנסה

🎯 תחזיות עתידיות:
עם יישום ההמלצות, צפוי שיפור של 15-25% ברווחיות תוך 12 חודשים.

📝 הערה: זהו דוח לדוגמה. לניתוח מפורט יותר, יש צורך בנתונים נוספים.`;
}
