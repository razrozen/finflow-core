<!-- This file is part of the FinFlow Documentation Package - Owner: FinFlow Core Team -->

# FinFlow Core API Documentation

## 📋 סקירה כללית

מערכת FinFlow Core כוללת ממשקי API מלאים לניהול עסקים, משתמשים, וכל פעולות הליבה.

## 🏗️ מבנה התיקיות

```
src/api/
├── businessApi.ts              # API לניהול עסקים
├── businessApiExamples.ts      # דוגמאות שימוש מפורטות
├── index.ts                    # exports מרכזיים
└── [APIs עתידיים]
    ├── userApi.ts              # ניהול משתמשים
    ├── transactionApi.ts       # ניהול עסקאות
    ├── reportsApi.ts           # דוחות ואנליטיקה
    └── settingsApi.ts          # הגדרות מערכת
```

## 🚀 קיים כעת: Business API

### תכונות עיקריות:
- ✅ **CRUD מלא** לעסקים
- ✅ **חיפוש מתקדם** עם פילטרים
- ✅ **סטטיסטיקות ואנליטיקה**
- ✅ **העדפות משתמש**
- ✅ **Mock/API dual mode**
- ✅ **TypeScript מלא**

### קבצים זמינים:
1. **`businessApi.ts`** - הפונקציות הראשיות
2. **`businessApiExamples.ts`** - 15+ דוגמאות מעשיות
3. **`index.ts`** - ייבוא נוח
4. **`docs/BUSINESS_API_GUIDE.md`** - מדריך מפורט

## 📚 תיעוד מפורט

### Business API
📖 **[מדריך מלא: Business API](./BUSINESS_API_GUIDE.md)**

המדריך כולל:
- התחלה מהירה
- רשימת פונקציות מלאה
- דוגמאות קוד מעשיות
- הגדרת environment
- טיפול בשגיאות
- ביצועים ואבטחה
- Migration לפרודקשן

## 🔧 הגדרה בסיסית

### ייבוא:
```typescript
// ייבוא פונקציות ספציפיות
import { fetchBusinesses, createBusiness } from '@/api/businessApi';

// או ייבוא המודול המלא
import businessApi from '@/api/businessApi';

// ייבוא מהאינדקס הראשי
import { businessApi } from '@/api';
```

### שימוש בסיסי:
```typescript
// קבלת עסקים
const businesses = await fetchBusinesses(userId);

// יצירת עסק
const newBusiness = await createBusiness({
  name: 'העסק שלי',
  ownerId: userId,
  industry: 'טכנולוגיה'
});
```

## 🌍 Environment Setup

### Development (Mock Mode):
```bash
# .env.development
# אין צורך בהגדרות - Mock mode אוטומטי
```

### Production (API Mode):
```bash
# .env.production
VITE_API_URL=https://api.finflow.com
VITE_API_KEY=your_production_api_key
```

## 🔮 APIs עתידיים מתוכננים

### 1. User API
```typescript
// functions planned:
- fetchUsers()
- createUser()
- updateUser()
- deleteUser()
- getUserProfile()
- updateUserPreferences()
```

### 2. Transaction API
```typescript
// functions planned:
- fetchTransactions()
- createTransaction()
- updateTransaction()
- deleteTransaction()
- getTransactionSummary()
```

### 3. Reports API
```typescript
// functions planned:
- generateReport()
- fetchReportData()
- scheduleReport()
- getReportHistory()
```

### 4. Settings API
```typescript
// functions planned:
- getSystemSettings()
- updateSettings()
- getBusinessSettings()
- updateBusinessSettings()
```

## 🛡️ אבטחה ואימות

### Headers אוטומטיים:
```typescript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ${API_KEY}',
  'X-Client-Version': '1.0.0'
}
```

### טיפול בשגיאות:
```typescript
try {
  const result = await apiFunction();
} catch (error) {
  // שגיאות מובנות עם הודעות בעברית
  console.error('שגיאת API:', error.message);
}
```

## 📊 מעקב ולוגים

### Mock Mode Logs:
```
[BusinessAPI] Mock mode enabled
[BusinessAPI] fetchBusinesses: 150ms
[BusinessAPI] Found 3 businesses for user123
```

### Production Logs:
```
[BusinessAPI] API mode enabled
[BusinessAPI] Request: GET /api/businesses?userId=123
[BusinessAPI] Response: 200 OK (245ms)
```

## 🧪 בדיקות

### בדיקת תקינות API:
```typescript
import { checkApiHealth } from '@/api/businessApi';

const isHealthy = await checkApiHealth();
console.log('API Status:', isHealthy ? '✅ תקין' : '❌ לא זמין');
```

### בדיקת גרסה:
```typescript
import { getApiVersion } from '@/api/businessApi';

const version = await getApiVersion();
console.log('API Version:', version);
```

## 🔄 Integration עם הקומפוננטים

### עם BusinessContext:
```typescript
// BusinessContext כבר משתמש ב-API החדש
const { businesses, createBusiness, updateBusiness } = useBusiness();
```

### עם Components:
```typescript
// כל הקומפוננטים פועלים דרך BusinessContext
// שמשתמש ב-BusinessApiService
// שמשתמש ב-businessApi functions
```

## 📈 ביצועים

### Caching אוטומטי:
- תוצאות נשמרות ב-localStorage (Mock mode)
- Cache headers נשלחים לשרת (API mode)

### Optimization:
- Debounced search queries
- Lazy loading של נתונים
- Batch operations למספר פעולות

## 🚀 מוכן לשימוש!

המערכת כוללת:

✅ **Business API מלא** עם 15+ פונקציות  
✅ **דוגמאות מעשיות** מוכנות להעתקה  
✅ **תיעוד מפורט** בעברית  
✅ **TypeScript מלא** עם type safety  
✅ **Mock/Production dual mode**  
✅ **Integration עם כל המערכת**  

**📖 התחל עם [המדריך המפורט](./BUSINESS_API_GUIDE.md)**

---

*עודכן לאחרונה: ${new Date().toLocaleDateString('he-IL')}*
