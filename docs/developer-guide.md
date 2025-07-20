# 👋 מדריך למפתחים חדשים - FinFlow

ברוכים הבאים לפרויקט FinFlow! מדריך זה יעזור לכם להתחיל לעבוד עם הקוד בצורה מהירה ויעילה.

## 🚀 התחלה מהירה

### 1. הכנת הסביבה
```bash
# שבטת הפרויקט
git clone https://github.com/razrozen/finflow-core.git
cd finflow-core

# התקנת dependencies
npm install

# הגדרת משתני סביבה
cp .env.example .env
# ערוך את .env עם המפתחות שלך
```

### 2. הרצה מקומית
```bash
# הפעלת שרת פיתוח
npm run dev

# הרצת טסטים
npm run test

# בדיקת איכות קוד
npm run lint
```

### 3. פתיחת הדפדפן
עבור ל-http://localhost:5173 כדי לראות את האפליקציה.

---

## 📁 מבנה הפרויקט

```
finflow-core/
├── src/
│   ├── components/        # רכיבי React
│   ├── pages/            # דפי האפליקציה
│   ├── ai/               # מודולי בינה מלאכותית
│   ├── services/         # שירותי API
│   ├── utils/            # כלי עזר
│   ├── tests/            # בדיקות
│   └── data/             # נתוני דוגמה
├── docs/                 # תיעוד
├── public/               # קבצים סטטיים
└── dist/                 # build לפרודקשן
```

---

## 🛠️ כלי הפיתוח

### עורכים מומלצים
- **VS Code** עם התוספים:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - ESLint

### דיבוג
```bash
# הפעלת מצב debug
npm run dev -- --debug

# בדיקת ביצועים
npm run build -- --analyze
```

---

## 🧩 עבודה עם רכיבים

### יצירת רכיב חדש
```typescript
// src/components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold">{title}</h3>
      {onAction && (
        <button onClick={onAction} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          פעולה
        </button>
      )}
    </div>
  );
}
```

### בדיקה לרכיב
```typescript
// src/tests/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

---

## 🤖 עבודה עם AI

### שימוש בשירותי AI
```typescript
import { FinancialAdvisor } from '@/services/ai/FinancialAdvisor';

const advisor = new FinancialAdvisor();
const advice = await advisor.getAdvice("שאלה עסקית");
```

### יצירת מודול AI חדש
```typescript
// src/ai/modules/MyExpert.ts
import { OpenAIClient } from '@/ai/core/openaiClient';

export class MyExpert {
  private client: OpenAIClient;

  constructor() {
    this.client = new OpenAIClient();
  }

  async getExpertAdvice(query: string) {
    const prompt = `אתה מומחה ב... ${query}`;
    return await this.client.generateResponse(prompt);
  }
}
```

---

## 🧪 כתיבת בדיקות

### בדיקות רכיבים
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '@/components/MyComponent';

test('component handles click', () => {
  const mockHandler = jest.fn();
  render(<MyComponent title="Test" onAction={mockHandler} />);
  
  fireEvent.click(screen.getByText('פעולה'));
  expect(mockHandler).toHaveBeenCalled();
});
```

### בדיקות AI
```typescript
import { FinancialAdvisor } from '@/services/ai/FinancialAdvisor';

describe('FinancialAdvisor', () => {
  it('provides relevant advice', async () => {
    const advisor = new FinancialAdvisor();
    const advice = await advisor.getAdvice('איך לחסוך כסף?');
    
    expect(advice.advice).toBeTruthy();
    expect(advice.recommendations).toHaveLength.greaterThan(0);
  });
});
```

---

## 🎨 עיצוב ו-Styling

### שימוש ב-Tailwind CSS
```jsx
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-4xl font-bold text-blue-600 mb-8">
    ברוכים הבאים ל-FinFlow
  </h1>
  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
    התחל עכשיו
  </button>
</div>
```

### רכיבי UI נפוצים
```typescript
// כפתור ראשי
<button className="btn-primary">
  טקסט הכפתור
</button>

// כרטיס מידע
<div className="card">
  <h3 className="card-title">כותרת</h3>
  <p className="card-content">תוכן</p>
</div>
```

---

## 🔧 פתרון בעיות נפוצות

### שגיאות TypeScript
```bash
# בדיקת שגיאות
npx tsc --noEmit

# תיקון אוטומטי
npm run lint -- --fix
```

### בעיות build
```bash
# ניקוי cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### בעיות AI API
- ודא שיש מפתח OpenAI תקין ב-.env
- בדוק את מגבלות ה-rate limiting
- וודא שהרשת מאפשרת גישה ל-OpenAI

---

## 📋 תהליך הפיתוח

### Git Workflow
```bash
# יצירת branch חדש
git checkout -b feature/my-feature

# עבודה על הקוד...

# commit השינויים
git add .
git commit -m "הוספת תכונה חדשה"

# push ל-GitHub
git push origin feature/my-feature

# יצירת Pull Request
```

### Code Review
- ודא שכל הטסטים עוברים
- בדוק שהקוד עוקב אחרי ה-style guide
- הוסף תיעוד לתכונות חדשות
- בדוק שאין בעיות אבטחה

---

## 🤝 תרומה לפרויקט

### הוספת תכונה חדשה
1. פתח issue ב-GitHub
2. צור branch חדש
3. כתוב את הקוד + בדיקות
4. עדכן את התיעוד
5. צור Pull Request

### דיווח על באגים
השתמש ב-issue template ב-GitHub וכלול:
- תיאור הבעיה
- שלבי שחזור
- סביבה (browser, OS)
- צילומי מסך אם רלוונטי

---

## 📞 עזרה ותמיכה

- 📚 תיעוד מלא: `/docs`
- 🐛 דיווח באגים: GitHub Issues
- 💬 שאלות: support@finflow.co.il
- 🌐 אתר: https://finflow-core.vercel.app

## 🎯 משימות מומלצות למפתחים חדשים

1. הריצו את כל הטסטים והבינו מה הם בודקים
2. תחקרו את מודולי ה-AI ותבינו איך הם עובדים
3. צרו רכיב UI חדש עם בדיקות
4. הוסיפו תכונה קטנה וצרו PR
5. קראו את כל התיעוד ב-`/docs`

**בהצלחה ותודה על ההצטרפות לצוות! 🚀**
