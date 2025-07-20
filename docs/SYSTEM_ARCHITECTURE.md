<!-- This file is part of the FinFlow Documentation Package - Owner: FinFlow Core Team -->

# System Architecture - ארכיטקטורת המערכת

## 📋 סקירה כללית

מערכת FinFlow Core הינה אפליקציית React מודרנית לניהול פיננסי עסקי עם תמיכה במספר עסקים ושילוב AI.

## 🏗️ ארכיטקטורה כללית

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React 19)                     │
├─────────────────────────────────────────────────────────────┤
│                   UI Components Layer                      │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Layout    │  │   Business   │  │    Finance      │   │
│  │ Components  │  │  Components  │  │   Components    │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                   Context Layer                            │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │    Auth     │  │   Business   │  │      AI         │   │
│  │   Context   │  │   Context    │  │    Context      │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                   Services Layer                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Business    │  │   Storage    │  │       AI        │   │
│  │ ApiService  │  │   Services   │  │    Services     │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     API Layer                              │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Business    │  │   User API   │  │   Reports API   │   │
│  │     API     │  │  (planned)   │  │   (planned)     │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                 Storage & External                         │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ localStorage│  │   Future     │  │    OpenAI       │   │
│  │   (Dev)     │  │  Backend     │  │      API        │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 שכבות המערכת

### 1. 🎨 UI Components Layer

**תפקיד**: רכיבי ממשק המשתמש הגלויים למשתמש

**רכיבים עיקריים**:
```
├── Layout/
│   ├── MainLayout.tsx          # פריסה ראשית
│   ├── Navigation.tsx          # תפריט ניווט
│   └── Header.tsx              # כותרת עליונה
├── Business/
│   ├── BusinessSelector.tsx    # בחירת עסק
│   ├── BusinessSwitcher.tsx    # החלפת עסקים
│   ├── QuickBusinessCreator.tsx # יצירה מהירה
│   └── BusinessManagerDemo.tsx  # ניהול עסקים
├── Finance/
│   ├── DashboardCards.tsx      # כרטיסי דשבורד
│   ├── TransactionList.tsx     # רשימת עסקאות
│   └── ReportsView.tsx         # דוחות
└── Common/
    ├── LoadingSpinner.tsx      # אנימציות טעינה
    ├── ErrorBoundary.tsx       # טיפול בשגיאות
    └── Modal.tsx               # חלונות קופצים
```

### 2. 🧠 Context Layer

**תפקיד**: ניהול מצב אפליקציה ושיתוף נתונים בין רכיבים

**קונטקסטים**:
```typescript
AuthContext         # ניהול משתמשים והרשאות
├── user: User | null
├── login()
├── logout()
└── checkPermissions()

BusinessContext     # ניהול עסקים מרובים
├── businesses: Business[]
├── currentBusiness: Business | null
├── createBusiness()
├── updateBusiness()
├── deleteBusiness()
└── switchBusiness()

AIContext          # שירותי בינה מלאכותית
├── recommendations: AIRecommendation[]
├── isProcessing: boolean
├── generateRecommendation()
└── analyzeData()
```

### 3. ⚙️ Services Layer

**תפקיד**: לוגיקה עסקית ותיווך עם APIs

**שירותים**:
```typescript
BusinessApiService     # ניהול עסקים
├── getBusinessesForUser()
├── createBusiness()
├── updateBusiness()
├── deleteBusiness()
└── setUserSelectedBusiness()

BusinessStorage       # אחסון מקומי
├── saveBusinesses()
├── loadBusinesses()
├── getUserBusinesses()
└── clearBusinessData()

AIRecommender        # המלצות AI
├── analyzeBusinessData()
├── generateRecommendations()
└── processFinancialData()

AIReportClient       # דוחות AI
├── generateReport()
├── analyzeTransactions()
└── predictTrends()
```

### 4. 📡 API Layer

**תפקיד**: תקשורת עם שירותים חיצוניים ובקרת Backend

**APIs נוכחיים**:
```typescript
businessApi.ts       # API עסקים מלא
├── fetchBusinesses()
├── createBusiness()
├── updateBusiness()
├── deleteBusiness()
├── searchBusinesses()
├── getBusinessStats()
└── checkApiHealth()
```

**APIs מתוכננים**:
```typescript
userApi.ts          # ניהול משתמשים
transactionApi.ts   # ניהול עסקאות
reportsApi.ts       # דוחות ואנליטיקה
settingsApi.ts      # הגדרות מערכת
```

### 5. 💾 Storage & External Layer

**תפקיד**: אחסון נתונים ושירותים חיצוניים

**רכיבים**:
```
localStorage        # אחסון מקומי (פיתוח)
├── businesses
├── selectedBusinessId
├── userPreferences
└── temporaryData

Future Backend      # שרת עתידי
├── PostgreSQL Database
├── Redis Cache
├── File Storage
└── Authentication Server

External APIs       # שירותים חיצוניים
├── OpenAI GPT-4
├── Payment Gateways (עתיד)
├── Banking APIs (עתיד)
└── Government APIs (עתיד)
```

## 🔄 זרימת נתונים

### 1. 📊 זרימת ניהול עסקים

```
User Action (UI)
    ↓
BusinessSelector.handleChange()
    ↓
BusinessContext.switchBusiness()
    ↓
localStorage.setItem("selectedBusinessId")
    ↓
BusinessApiService.setUserSelectedBusiness()
    ↓
State Update (setCurrentBusiness)
    ↓
UI Re-render
```

### 2. 🔄 זרימת טעינת נתונים

```
App Load
    ↓
BusinessContext.useEffect()
    ↓
fetchBusinesses(userId)
    ↓
businessApi.ts (Mock/API mode)
    ↓
localStorage.getItem("selectedBusinessId")
    ↓
setBusinesses() + setCurrentBusiness()
    ↓
UI Render with Data
```

### 3. 🤖 זרימת AI

```
User Request
    ↓
AIContext.generateRecommendation()
    ↓
AIRecommender.analyzeBusinessData()
    ↓
OpenAI API Call
    ↓
Process Response
    ↓
Update UI with Recommendations
```

## 🎛️ מצבי פעולה

### Development Mode (Mock)
```
Environment: Local Development
Data Source: localStorage + Mock Data
API Calls: Simulated with delays
Authentication: Mock user
External Services: Disabled/Mocked
```

### Production Mode (API)
```
Environment: Production Server
Data Source: HTTP API + Database
API Calls: Real HTTP requests
Authentication: JWT tokens
External Services: OpenAI, Banking APIs
```

## 🔧 תצורת טכנולוגיות

### Frontend Stack
```typescript
React 19.1.0        # UI Framework
TypeScript          # Type Safety
Vite 7.0.5         # Build Tool
Tailwind CSS       # Styling
React Router       # Navigation
Context API        # State Management
```

### Build & Development
```typescript
ESLint             # Code Quality
Prettier           # Code Formatting
TypeScript Compiler # Type Checking
Vite Dev Server    # Development
Vite Build         # Production Build
```

### External Integrations
```typescript
OpenAI GPT-4       # AI Services
localStorage       # Client Storage
Environment Variables # Configuration
```

## 🚀 הרחבות עתידיות

### Phase 1 - Backend Integration
```
- Real API Server (Node.js/Python)
- PostgreSQL Database
- JWT Authentication
- Redis Caching
```

### Phase 2 - Advanced Features
```
- Real-time Updates (WebSockets)
- File Upload & Storage
- Email Notifications
- Mobile App (React Native)
```

### Phase 3 - Enterprise Features
```
- Multi-tenant Architecture
- Advanced Analytics
- Integration Hub
- White-label Solution
```

## 📈 ביצועים ואופטימיזציה

### טעינה מהירה
```
- Code Splitting בVite
- Lazy Loading של קומפוננטים
- Caching ב-localStorage
- Debounced Search
```

### זיכרון מותאם
```
- useCallback לפונקציות
- useMemo לחישובים
- Context מפוצל לנושאים
- Cleanup ב-useEffect
```

### UX מותאם
```
- Loading States
- Error Boundaries
- Optimistic Updates
- Offline Support (עתיד)
```

---

*עודכן לאחרונה: ${new Date().toLocaleDateString('he-IL')}*
