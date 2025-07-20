# 📡 Business API - מדריך שימוש

## סקירה כללית

קובץ `businessApi.ts` מספק ממשק מלא לניהול עסקים דרך HTTP API או mock data במצב פיתוח.

## 🏗️ מבנה הקבצים

```
src/api/
├── businessApi.ts          # הפונקציות הראשיות
├── businessApiExamples.ts  # דוגמאות שימוש מפורטות
└── index.ts                # exports מרכזיים
```

## 🚀 התחלה מהירה

### ייבוא בסיסי:
```typescript
import { fetchBusinesses, createBusiness } from '@/api/businessApi';
// או
import businessApi from '@/api/businessApi';
```

### שימוש פשוט:
```typescript
// קבלת עסקים
const businesses = await fetchBusinesses('user123');

// יצירת עסק חדש
const newBusiness = await createBusiness({
  name: 'העסק שלי',
  ownerId: 'user123',
  industry: 'טכנולוגיה'
});
```

## 🔧 קונפיגורציה

### Environment Variables:
```bash
# .env
VITE_API_URL=https://api.finflow.com    # אופציונלי - ברירת מחדל: mock mode
VITE_API_KEY=your_api_key_here          # אופציונלי - לצורכי אימות
```

### מצבי פעולה:
- **Mock Mode** (ברירת מחדל): נתוני דמו עם localStorage
- **API Mode**: בקשות HTTP אמיתיות לשרת

## 📋 רשימת פונקציות

### 🏢 ניהול עסקים בסיסי

#### `fetchBusinesses(userId: string)`
קבלת כל העסקים של משתמש ספציפי.

```typescript
const businesses = await fetchBusinesses('user123');
console.log(`נמצאו ${businesses.length} עסקים`);
```

#### `createBusiness(business: CreateBusinessRequest)`
יצירת עסק חדש.

```typescript
const newBusiness = await createBusiness({
  name: 'קפה דני',
  ownerId: 'user123',
  industry: 'מזון ומשקאות',
  businessNumber: '123456789',
  address: {
    street: 'רחוב הרצל 25',
    city: 'תל אביב',
    zipCode: '6473925',
    country: 'ישראל'
  }
});
```

#### `updateBusiness(businessId: string, updates: UpdateBusinessRequest)`
עדכון עסק קיים.

```typescript
const updated = await updateBusiness('business123', {
  name: 'שם עדכני',
  contact: {
    phone: '03-1234567',
    email: 'info@business.com'
  }
});
```

#### `deleteBusiness(businessId: string)`
מחיקת עסק.

```typescript
await deleteBusiness('business123');
console.log('עסק נמחק בהצלחה');
```

#### `fetchBusinessById(businessId: string)`
קבלת עסק לפי ID.

```typescript
const business = await fetchBusinessById('business123');
if (business) {
  console.log('עסק נמצא:', business.name);
}
```

### 🔍 חיפוש מתקדם

#### `searchBusinesses(userId, query, filters?)`
חיפוש עסקים עם פילטרים.

```typescript
const results = await searchBusinesses('user123', 'קפה', {
  industry: 'מזון ומשקאות',
  status: 'active'
});
```

### 👤 העדפות משתמש

#### `setUserSelectedBusiness(userId, businessId)`
שמירת עסק נבחר למשתמש.

```typescript
await setUserSelectedBusiness('user123', 'business456');
```

#### `getUserSelectedBusiness(userId)`
קבלת עסק נבחר למשתמש.

```typescript
const selectedId = await getUserSelectedBusiness('user123');
```

### 📊 סטטיסטיקות ואנליטיקה

#### `getBusinessStats(businessId)`
סטטיסטיקות מפורטות של עסק.

```typescript
const stats = await getBusinessStats('business123');
console.log({
  'סה"כ עסקאות': stats.totalTransactions,
  'הכנסות': stats.totalRevenue,
  'רווח נקי': stats.netProfit
});
```

#### `getUserBusinessSummary(userId)`
סיכום כללי של עסקי המשתמש.

```typescript
const summary = await getUserBusinessSummary('user123');
console.log(`יש לך ${summary.totalBusinesses} עסקים פעילים`);
```

### 🔧 כלי עזר

#### `checkApiHealth()`
בדיקת תקינות השרת.

```typescript
const isHealthy = await checkApiHealth();
console.log('מצב API:', isHealthy ? 'תקין' : 'לא זמין');
```

#### `getApiVersion()`
קבלת גרסת API.

```typescript
const version = await getApiVersion();
console.log('גרסה:', version);
```

## 🎯 דוגמאות מעשיות

### יצירת עסק מלא
```typescript
const fullBusiness = await createBusiness({
  name: 'הסטודיו של מיכל',
  ownerId: 'user123',
  industry: 'שירותים',
  businessNumber: '987654321',
  companyId: '515987654',
  address: {
    street: 'רחוב בן יהודה 15',
    city: 'תל אביב',
    zipCode: '6380115',
    country: 'ישראל'
  },
  contact: {
    phone: '03-9876543',
    email: 'info@michalstudio.co.il',
    website: 'www.michalstudio.co.il'
  }
});
```

### זרימת עבודה מלאה
```typescript
async function businessWorkflow(userId: string) {
  // 1. בדיקת תקינות
  const isHealthy = await checkApiHealth();
  if (!isHealthy) throw new Error('API לא זמין');
  
  // 2. קבלת עסקים קיימים
  const businesses = await fetchBusinesses(userId);
  
  // 3. יצירת עסק חדש אם אין
  if (businesses.length === 0) {
    await createBusiness({
      name: 'העסק הראשון שלי',
      ownerId: userId,
      industry: 'שירותים'
    });
  }
  
  // 4. הגדרת עסק נבחר
  await setUserSelectedBusiness(userId, businesses[0].id);
  
  // 5. קבלת סטטיסטיקות
  const stats = await getBusinessStats(businesses[0].id);
  
  return { businesses, stats };
}
```

## 🔐 אבטחה

### אימות אוטומטי
הפונקציות כוללות אימות אוטומטי כאשר `VITE_API_KEY` מוגדר:

```typescript
// Headers אוטומטיים:
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_KEY'
}
```

### טיפול בשגיאות
```typescript
try {
  const business = await createBusiness(data);
} catch (error) {
  if (error.message.includes('API Error: 401')) {
    console.log('שגיאת הרשאה - בדוק API key');
  } else if (error.message.includes('API Error: 404')) {
    console.log('עסק לא נמצא');
  }
}
```

## 🧪 מצב Mock למפתחים

במצב פיתוח (ללא `VITE_API_URL`), כל הפונקציות פועלות עם נתוני דמו:

- **זמני תגובה** מדומים (200-500ms)
- **נתונים מציאותיים** למטרות בדיקה
- **שמירה ב-localStorage** לשמירת מצב
- **לוגים מפורטים** למעקב

## 📈 ביצועים

### Best Practices:
1. **Cache תוצאות** חוזרות
2. **Debounce חיפושים** (300ms+)
3. **טען lazy** נתונים לא קריטיים
4. **הצג loading states** למשתמש

### דוגמה לקידוש עם React:
```typescript
const [businesses, setBusinesses] = useState<Business[]>([]);
const [loading, setLoading] = useState(false);

const loadBusinesses = useCallback(async () => {
  setLoading(true);
  try {
    const data = await fetchBusinesses(userId);
    setBusinesses(data);
  } catch (error) {
    console.error('שגיאה:', error);
  } finally {
    setLoading(false);
  }
}, [userId]);

useEffect(() => {
  loadBusinesses();
}, [loadBusinesses]);
```

## 🔄 Migration לפרודקשן

### שלב 1: הוספת API URL
```bash
VITE_API_URL=https://your-api.com
```

### שלב 2: הוספת אימות
```bash
VITE_API_KEY=your_production_key
```

### שלב 3: בדיקת תקינות
```typescript
const isReady = await checkApiHealth();
if (isReady) {
  console.log('✅ מוכן לפרודקשן');
}
```

## 🎉 סיכום

קובץ ה-`businessApi.ts` מספק:

- ✅ **ממשק אחיד** לכל פעולות העסק
- ✅ **תמיכה ב-Mock** ו-API אמיתי
- ✅ **TypeScript מלא** עם type safety
- ✅ **טיפול בשגיאות** מתקדם
- ✅ **דוגמאות מעשיות** מוכנות לשימוש
- ✅ **ביצועים מותאמים** עם caching
- ✅ **אבטחה built-in** עם authentication

המערכת מוכנה לשימוש מיידי ולהרחבה עתידית! 🚀
