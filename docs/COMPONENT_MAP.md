<!-- This file is part of the FinFlow Documentation Package - Owner: FinFlow Core Team -->

# Component Map - מיפוי רכיבי UI

## 📋 סקירה כללית

מדריך מלא לכל רכיבי ה-UI במערכת FinFlow Core, תפקידם, מיקומם, ויחסי הגומלין ביניהם.

## 🗂️ מבנה תיקיות הרכיבים

```
src/components/
├── layout/                 # רכיבי פריסה עיקריים
│   ├── MainLayout.tsx      # פריסה ראשית עם ניווט
│   ├── Navigation.tsx      # תפריט צדדי ועליון
│   └── Header.tsx          # כותרת עליונה עם פרטי משתמש
├── business/               # רכיבי ניהול עסקים
│   ├── BusinessSelector.tsx    # בחירת עסק פעיל
│   ├── BusinessSwitcher.tsx    # החלפה מהירה בין עסקים
│   ├── QuickBusinessCreator.tsx # יצירת עסק חדש
│   └── BusinessManagerDemo.tsx  # ניהול עסקים מתקדם
├── finance/                # רכיבי ניהול פיננסי
│   ├── DashboardCards.tsx      # כרטיסי סקירה
│   ├── TransactionList.tsx     # רשימת עסקאות
│   ├── ReportsView.tsx         # תצוגת דוחות
│   └── FinanceCharts.tsx       # גרפים פיננסיים
├── common/                 # רכיבים כלליים
│   ├── LoadingSpinner.tsx      # אנימציית טעינה
│   ├── ErrorBoundary.tsx       # טיפול בשגיאות
│   ├── Modal.tsx               # חלון קופץ כללי
│   └── FormComponents.tsx      # רכיבי טופס
└── ai/                     # רכיבי בינה מלאכותית
    ├── AIRecommendations.tsx   # המלצות AI
    ├── AIChat.tsx              # צ'אט עם AI
    └── AIInsights.tsx          # תובנות מבוססות AI
```

## 🏗️ רכיבי Layout (פריסה)

### 📱 MainLayout.tsx
**תפקיד**: פריסה ראשית של כל האפליקציה

**מיקום**: `src/components/layout/MainLayout.tsx`

**תכונות**:
- מכיל את כל הדפים הפנימיים
- ניהול responsive design
- אינטגרציה עם Navigation ו-Header
- תמיכה ב-RTL (עברית)

**Props**:
```typescript
interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}
```

**שימוש**:
```tsx
<MainLayout>
  <DashboardPage />
</MainLayout>
```

### 🧭 Navigation.tsx
**תפקיד**: תפריט ניווט צדדי ועליון

**מיקום**: `src/components/layout/Navigation.tsx`

**תכונות**:
- תפריט מתקפל (collapsible)
- הדגשת דף פעיל
- ניווט לדפים שונים
- אייקונים ותוויות

**מבנה תפריט**:
```typescript
const menuItems = [
  { path: '/', label: 'דשבורד', icon: 'dashboard' },
  { path: '/finance', label: 'כספים', icon: 'finance' },
  { path: '/reports', label: 'דוחות', icon: 'reports' },
  { path: '/settings', label: 'הגדרות', icon: 'settings' }
];
```

### 🎯 Header.tsx
**תפקיד**: כותרת עליונה עם פרטי משתמש ופעולות

**מיקום**: `src/components/layout/Header.tsx`

**תכונות**:
- הצגת שם משתמש ותמונה
- כפתור התנתקות
- הודעות ואזעקות
- חיפוש גלובלי

**רכיבים פנימיים**:
- UserProfile dropdown
- NotificationBell
- GlobalSearch
- ThemeToggle

## 🏢 רכיבי Business (עסקים)

### 🎯 BusinessSelector.tsx
**תפקיד**: בחירת עסק פעיל מרשימה

**מיקום**: `src/components/business/BusinessSelector.tsx`

**תכונות**:
- Select dropdown עם רשימת עסקים
- שמירה אוטומטית ב-localStorage
- הצגת עסק נבחר
- טיפול במצב ללא עסקים

**State**:
```typescript
const { selectedBusiness, setSelectedBusiness, businesses } = useBusiness();
```

**Events**:
```typescript
const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const business = businesses.find((b) => b.id === e.target.value);
  if (business) {
    localStorage.setItem("selectedBusinessId", business.id);
    setSelectedBusiness(business);
  }
};
```

### 🔄 BusinessSwitcher.tsx
**תפקיד**: החלפה מהירה בין עסקים עם UI מתקדם

**מיקום**: `src/components/business/BusinessSwitcher.tsx`

**תכונות**:
- Grid layout עם כרטיסי עסקים
- הצגת פרטי עסק (שם, ענף, סטטוס)
- עריכה מהירה
- אנימציות החלפה

**מבנה כרטיס עסק**:
```typescript
interface BusinessCard {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'inactive';
  revenue?: number;
  isSelected: boolean;
}
```

### ⚡ QuickBusinessCreator.tsx
**תפקיד**: יצירת עסק חדש במהירות

**מיקום**: `src/components/business/QuickBusinessCreator.tsx`

**תכונות**:
- טופס קומפקטי ליצירה מהירה
- ולידציה בזמן אמת
- אוטו-השלמה לענפים
- שמירה אוטומטית

**שדות טופס**:
```typescript
interface QuickBusinessForm {
  name: string;           // שם העסק
  industry: string;       // ענף פעילות
  businessNumber?: string; // מספר עוסק
  location?: string;      // מיקום
}
```

### 🎛️ BusinessManagerDemo.tsx
**תפקיד**: ניהול מתקדם של עסקים (CRUD מלא)

**מיקום**: `src/components/business/BusinessManagerDemo.tsx`

**תכונות**:
- טבלה עם כל העסקים
- עריכה, מחיקה, הוספה
- סינון וחיפוש
- ייצוא נתונים
- הגדרות הרשאות

**פעולות זמינות**:
```typescript
const actions = [
  'view',      // צפייה בפרטים
  'edit',      // עריכת עסק
  'delete',    // מחיקת עסק
  'duplicate', // שכפול עסק
  'archive',   // העברה לארכיון
  'export'     // ייצוא נתונים
];
```

## 💰 רכיבי Finance (כספים)

### 📊 DashboardCards.tsx
**תפקיד**: כרטיסי סקירה פיננסית בדשבורד

**מיקום**: `src/components/finance/DashboardCards.tsx`

**כרטיסים**:
```typescript
const dashboardCards = [
  {
    title: 'סה"כ הכנסות',
    value: '₪125,000',
    change: '+12%',
    trend: 'up'
  },
  {
    title: 'הוצאות החודש',
    value: '₪45,000',
    change: '-5%',
    trend: 'down'
  },
  {
    title: 'רווח נקי',
    value: '₪80,000',
    change: '+18%',
    trend: 'up'
  },
  {
    title: 'לקוחות פעילים',
    value: '156',
    change: '+3',
    trend: 'up'
  }
];
```

### 📋 TransactionList.tsx
**תפקיד**: רשימת עסקאות פיננסיות

**מיקום**: `src/components/finance/TransactionList.tsx`

**תכונות**:
- טבלה עם עסקאות
- סינון לפי תאריך, סכום, קטגוריה
- עמוד loading ו-pagination
- ייצוא ל-Excel/CSV

**מבנה עסקה**:
```typescript
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  status: 'pending' | 'completed' | 'cancelled';
}
```

### 📈 ReportsView.tsx
**תפקיד**: תצוגת דוחות פיננסיים

**מיקום**: `src/components/finance/ReportsView.tsx`

**סוגי דוחות**:
- דוח רווח והפסד
- מאזן חודשי
- דוח תזרים מזומנים
- ניתוח לפי קטגוריות

### 📊 FinanceCharts.tsx
**תפקיד**: גרפים ותרשימים פיננסיים

**מיקום**: `src/components/finance/FinanceCharts.tsx`

**סוגי גרפים**:
- Line Chart - מגמות לאורך זמן
- Bar Chart - השוואות
- Pie Chart - חלוקות לפי קטגוריה
- Area Chart - הצטברות

## 🛠️ רכיבי Common (כלליים)

### ⏳ LoadingSpinner.tsx
**תפקיד**: אנימציית טעינה אוניברסלית

**מיקום**: `src/components/common/LoadingSpinner.tsx`

**וריאציות**:
```typescript
type SpinnerSize = 'small' | 'medium' | 'large';
type SpinnerType = 'dots' | 'spinner' | 'bars';
```

### 🚨 ErrorBoundary.tsx
**תפקיד**: טיפול בשגיאות JavaScript ו-React

**מיקום**: `src/components/common/ErrorBoundary.tsx`

**תכונות**:
- לכידת שגיאות בזמן rendering
- הצגת UI חלופי
- דיווח על שגיאות
- כפתור retry

### 🪟 Modal.tsx
**תפקיד**: חלון קופץ גנרי לכל שימוש

**מיקום**: `src/components/common/Modal.tsx`

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  children: ReactNode;
}
```

### 📝 FormComponents.tsx
**תפקיד**: רכיבי טופס סטנדרטיים

**מיקום**: `src/components/common/FormComponents.tsx`

**רכיבים**:
- InputField - שדה קלט טקסט
- SelectField - רשימה נפתחת
- DatePicker - בחירת תאריך
- FileUpload - העלאת קבצים
- FormButton - כפתורי טופס

## 🤖 רכיבי AI (בינה מלאכותית)

### 💡 AIRecommendations.tsx
**תפקיד**: הצגת המלצות AI למשתמש

**מיקום**: `src/components/ai/AIRecommendations.tsx`

**סוגי המלצות**:
```typescript
interface AIRecommendation {
  id: string;
  type: 'cost_optimization' | 'revenue_growth' | 'risk_management';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  expectedImpact: string;
  actionItems: string[];
}
```

### 💬 AIChat.tsx
**תפקיד**: צ'אט אינטראקטיבי עם AI

**מיקום**: `src/components/ai/AIChat.tsx`

**תכונות**:
- ממשק צ'אט בזמן אמת
- שליחת שאלות עסקיות
- תגובות חכמות מהAI
- היסטוריית שיחות

### 🔍 AIInsights.tsx
**תפקיד**: תובנות וניתוחים מבוססי AI

**מיקום**: `src/components/ai/AIInsights.tsx`

**סוגי תובנות**:
- ניתוח מגמות
- זיהוי דפוסים
- תחזיות עתידיות
- אזהרות מוקדמות

## 🔗 יחסי גומלין בין רכיבים

### 🏗️ היררכיה של רכיבים

```
App.tsx
├── AuthProvider
│   ├── BusinessProvider
│   │   ├── AIProvider
│   │   │   ├── MainLayout
│   │   │   │   ├── Header
│   │   │   │   │   ├── UserProfile
│   │   │   │   │   ├── NotificationBell
│   │   │   │   │   └── BusinessSelector
│   │   │   │   ├── Navigation
│   │   │   │   └── PageContent
│   │   │   │       ├── DashboardPage
│   │   │   │       │   ├── DashboardCards
│   │   │   │       │   ├── FinanceCharts
│   │   │   │       │   └── AIRecommendations
│   │   │   │       ├── FinancePage
│   │   │   │       │   ├── TransactionList
│   │   │   │       │   └── ReportsView
│   │   │   │       └── BusinessPage
│   │   │   │           ├── BusinessSwitcher
│   │   │   │           ├── QuickBusinessCreator
│   │   │   │           └── BusinessManagerDemo
│   │   │   └── Modal (global)
│   │   └── ErrorBoundary (global)
│   └── LoadingSpinner (global)
```

### 📡 תקשורת בין רכיבים

**דרך Context**:
```typescript
// עסקים
BusinessSelector → BusinessContext → BusinessSwitcher
QuickBusinessCreator → BusinessContext → BusinessManagerDemo

// אימות
Header → AuthContext → Navigation

// AI
AIRecommendations → AIContext → AIChat → AIInsights
```

**דרך Props**:
```typescript
MainLayout → Header (user props)
BusinessSwitcher → BusinessCard (business props)
DashboardCards → FinanceChart (data props)
```

**דרך Events**:
```typescript
BusinessSelector.onChange → BusinessContext.switchBusiness
Modal.onClose → Parent.setIsModalOpen
FormComponents.onSubmit → Parent.handleSubmit
```

## 📱 Responsive Design

### 📏 Breakpoints

```css
/* Mobile First */
.component {
  /* Mobile: < 640px */
  @apply flex-col space-y-2;
  
  /* Tablet: >= 640px */
  @media (min-width: 640px) {
    @apply flex-row space-x-4 space-y-0;
  }
  
  /* Desktop: >= 1024px */
  @media (min-width: 1024px) {
    @apply grid grid-cols-3 gap-6;
  }
  
  /* Large: >= 1280px */
  @media (min-width: 1280px) {
    @apply grid-cols-4;
  }
}
```

### 📱 רכיבים רספונסיביים

**BusinessSwitcher**:
- Mobile: רשימה אנכית
- Tablet: Grid 2 עמודות
- Desktop: Grid 3-4 עמודות

**DashboardCards**:
- Mobile: סטאק אנכי
- Tablet: 2x2 Grid
- Desktop: 4x1 Grid

**Navigation**:
- Mobile: תפריט המבורגר
- Tablet: תפריט צדדי מתקפל
- Desktop: תפריט צדדי מלא

## 🎨 עיצוב ונושא

### 🎨 Color Palette

```css
:root {
  --primary: #2563eb;      /* כחול ראשי */
  --secondary: #64748b;    /* אפור משני */
  --success: #059669;      /* ירוק הצלחה */
  --warning: #d97706;      /* כתום אזהרה */
  --error: #dc2626;        /* אדום שגיאה */
  --background: #f8fafc;   /* רקע בהיר */
  --foreground: #1e293b;   /* טקסט כהה */
}
```

### ✏️ Typography

```css
.heading-1 { @apply text-3xl font-bold mb-4; }
.heading-2 { @apply text-2xl font-semibold mb-3; }
.heading-3 { @apply text-xl font-medium mb-2; }
.body-text { @apply text-base leading-relaxed; }
.small-text { @apply text-sm text-gray-600; }
```

### 🔧 Component Utilities

```css
.card { @apply bg-white rounded-lg shadow-sm border p-4; }
.button-primary { @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700; }
.button-secondary { @apply bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300; }
.input-field { @apply border rounded px-3 py-2 focus:outline-none focus:ring-2; }
```

## 🧪 Testing Strategy

### 🔬 Component Testing

```typescript
// Example: BusinessSelector.test.tsx
describe('BusinessSelector', () => {
  test('renders business list correctly', () => {
    // Test implementation
  });
  
  test('handles business selection', () => {
    // Test implementation
  });
  
  test('saves selection to localStorage', () => {
    // Test implementation
  });
});
```

### 🎭 Integration Testing

```typescript
// Example: Business workflow test
describe('Business Management Flow', () => {
  test('create → select → switch business', () => {
    // Full workflow test
  });
});
```

---

*עודכן לאחרונה: ${new Date().toLocaleDateString('he-IL')}*
