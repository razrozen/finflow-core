<!-- נוצר אוטומטית על ידי GitHub Copilot עבור תיעוד מערכת FinFlow -->

# 📊 דיאגרמות מערכת - FinFlow

## 🏗️ 1. מבנה כללי של המערכת

### ארכיטקטורה ברמה גבוהה
```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 Frontend Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   React UI  │  │  TypeScript │  │    Vite     │          │
│  │   Components│  │   Business  │  │   Build     │          │
│  │             │  │    Logic    │  │   System    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Context   │  │   Hooks &   │  │   State     │          │
│  │  Providers  │  │  Services   │  │ Management  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │   HTTPS/TLS   │
                    └───────┬───────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    🔌 API Gateway Layer                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │    Auth     │  │    Rate     │  │   Request   │          │
│  │ Middleware  │  │  Limiting   │  │ Validation  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   CORS      │  │   Logging   │  │   Error     │          │
│  │ Handling    │  │ Middleware  │  │  Handling   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                   ⚙️ Business Logic Layer                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Business   │  │  Financial  │  │     AI      │          │
│  │   Service   │  │   Service   │  │   Service   │          │
│  │businessApi.ts│  │             │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   User      │  │   Report    │  │Integration  │          │
│  │  Service    │  │  Service    │  │  Service    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    💾 Data Layer                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ localStorage│  │   Cache     │  │   Future    │          │
│  │  (Current)  │  │   Layer     │  │  Database   │          │
│  │             │  │   (Redis)   │  │(PostgreSQL) │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│               🔗 External Integrations Layer                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Zapier    │  │ OCR.space   │  │   OpenAI    │          │
│  │Automations  │  │  Document   │  │     AI      │          │
│  │             │  │ Processing  │  │  Assistant  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Banking   │  │   Email     │  │  Analytics  │          │
│  │    APIs     │  │  Services   │  │  Services   │          │
│  │  (Future)   │  │  (Future)   │  │  (Future)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### מבנה תיקיות פרויקט
```
finflow-core/
├── 📁 public/                    # נכסים סטטיים
│   ├── vite.svg
│   └── favicon.ico
│
├── 📁 src/                       # קוד מקור
│   ├── 📁 components/            # רכיבי React
│   │   ├── 📁 ui/               # רכיבי UI בסיסיים
│   │   ├── 📁 business/         # רכיבים ייחודיים לעסקים
│   │   ├── 📁 layout/           # רכיבי פריסה
│   │   └── 📁 forms/            # טפסים וולידציה
│   │
│   ├── 📁 contexts/              # React Contexts
│   │   ├── AuthContext.tsx      # הקשר אימות
│   │   ├── BusinessContext.tsx  # הקשר ניהול עסקים
│   │   └── ThemeContext.tsx     # הקשר ערכת נושא
│   │
│   ├── 📁 hooks/                 # Custom Hooks
│   │   ├── useAuth.ts           # Hook אימות
│   │   ├── useBusiness.ts       # Hook עסקים
│   │   └── useLocalStorage.ts   # Hook אחסון מקומי
│   │
│   ├── 📁 services/              # שכבת שירותים
│   │   ├── 📁 api/              # שירותי API
│   │   │   ├── businessApi.ts   # API עסקים
│   │   │   ├── userApi.ts       # API משתמשים
│   │   │   └── aiApi.ts         # API של AI
│   │   │
│   │   ├── 📁 integrations/     # אינטגרציות חיצוניות
│   │   │   ├── zapier.ts        # Zapier webhooks
│   │   │   ├── ocr.ts           # OCR.space
│   │   │   └── openai.ts        # OpenAI GPT
│   │   │
│   │   └── 📁 storage/          # שירותי אחסון
│   │       ├── localStorage.ts  # אחסון מקומי
│   │       └── cache.ts         # מנגנון cache
│   │
│   ├── 📁 entities/              # הגדרות טיפוסים
│   │   ├── business.ts          # Business entity
│   │   ├── user.ts              # User entity
│   │   ├── transaction.ts       # Transaction entity
│   │   └── strategy.ts          # Strategy entity
│   │
│   ├── 📁 utils/                 # עזרים כלליים
│   │   ├── validation.ts        # פונקציות ולידציה
│   │   ├── formatting.ts        # עיצוב נתונים
│   │   └── constants.ts         # קבועים
│   │
│   ├── 📁 styles/                # עיצוב ו-CSS
│   │   ├── globals.css          # עיצוב גלובלי
│   │   ├── components.css       # עיצוב רכיבים
│   │   └── themes/              # ערכות נושא
│   │
│   ├── main.ts                   # נקודת כניסה ראשית
│   ├── App.tsx                   # רכיב App ראשי
│   └── vite-env.d.ts            # הגדרות TypeScript
│
├── 📁 docs/                      # תיעוד מערכת
│   ├── API_OVERVIEW.md          # סקירת API
│   ├── BUSINESS_API_GUIDE.md    # מדריך Business API
│   ├── SECURITY_MODEL.md        # מודל אבטחה
│   ├── EXTERNAL_INTEGRATIONS.md # אינטגרציות חיצוניות
│   └── SYSTEM_DIAGRAMS.md       # דיאגרמות מערכת (קובץ זה)
│
├── 📁 tests/                     # בדיקות
│   ├── 📁 unit/                 # בדיקות יחידה
│   ├── 📁 integration/          # בדיקות אינטגרציה
│   └── 📁 e2e/                  # בדיקות End-to-End
│
├── package.json                  # תלויות NPM
├── tsconfig.json                # הגדרות TypeScript
├── vite.config.ts              # הגדרות Vite
└── README.md                    # תיאור פרויקט
```

## 🔄 2. תרשים זרימת משתמש (User Flow)

### זרימת משתמש מלאה
```
┌─────────────────┐
│   🏠 עמוד בית    │
│   Landing Page  │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│  🔐 התחברות     │◄──────── כניסה עם:
│   Login Page    │          • אימייל + סיסמה
└─────┬───────────┘          • Google OAuth
      │                      • Microsoft OAuth
      ▼
┌─────────────────┐
│ ✅ אימות זהות    │
│  Authentication │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐    יש עסקים? ┌─────────────────┐
│ 🏢 בחירת עסק     │──────────────│ 📝 יצירת עסק    │
│ Business Select │      לא      │ Create Business │
└─────┬───────────┘              └─────┬───────────┘
      │ כן                             │
      ▼                                │
┌─────────────────┐◄───────────────────┘
│ 📊 דשבורד ראשי   │
│ Main Dashboard  │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ 🧠 תובנות AI     │
│  AI Insights    │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ 📈 יצירת אסטרטגיה│
│ Strategy Create │
└─────┬───────────┘
      │
      ▼
┌─────────────────┐
│ 💾 שמירה ומעקב   │
│ Save & Monitor  │
└─────────────────┘
```

### זרימות משנה מפורטות

#### 🔐 זרימת אימות
```
התחברות ← אימות פרטים ← בדיקת MFA (אם נדרש) ← יצירת session ← הפניה לדשבורד
    │              │                │                  │              │
    ▼              ▼                ▼                  ▼              ▼
שגיאת פרטים    שגיאת אימות     כישלון MFA        שגיאת מערכת    הצלחה
    │              │                │                  │              │
    ▼              ▼                ▼                  ▼              ▼
חזרה להתחברות  חזרה להתחברות   ניסיון נוסף       הודעת שגיאה   המשך תהליך
```

#### 🏢 זרימת ניהול עסק
```
בחירת עסק ← טעינת נתוני עסק ← הצגת דשבורד ← פעולות עסקיות
    │              │                    │             │
    ▼              ▼                    ▼             ▼
בחירה מרשימה   שמירה ב-Context      עדכון UI    עדכון נתונים
    │              │                    │             │
    ▼              ▼                    ▼             ▼
עסק נוכחי      מידע זמין בכל      ממשק מותאם   סנכרון עם שרת
               הרכיבים              לעסק
```

#### 🤖 זרימת AI Assistant
```
בקשת משתמש ← ניתוח הקשר ← שליחה ל-AI ← עיבוד תגובה ← הצגת תובנות
    │              │              │             │              │
    ▼              ▼              ▼             ▼              ▼
זיהוי כוונה   העשרת נתונים   API call     פרסור JSON    ממשק אינטראקטיבי
    │              │              │             │              │
    ▼              ▼              ▼             ▼              ▼
יצירת prompt  הוספת context  קבלת תגובה   יצירת components עדכון UI
```

## 🗃️ 3. Entity Relationship Diagram (ERD)

### יחסים בין אנטיטיות מרכזיות
```
┌─────────────────────────────────────────────────────────────┐
│                          👤 User                           │
├─────────────────────────────────────────────────────────────┤
│ PK: id: string                                             │
│    email: string (unique)                                  │
│    name: string                                            │
│    password_hash: string                                   │
│    role: UserRole                                          │
│    created_at: datetime                                    │
│    last_login: datetime?                                   │
│    mfa_enabled: boolean                                    │
│    preferences: UserPreferences                           │
└─────────┬───────────────────────────────────────────────────┘
          │
          │ 1:N (owns)
          ▼
┌─────────────────────────────────────────────────────────────┐
│                        🏢 Business                         │
├─────────────────────────────────────────────────────────────┤
│ PK: id: string                                             │
│ FK: owner_id: string → User.id                            │
│    name: string                                            │
│    industry: string?                                       │
│    business_number: string?                                │
│    company_id: string?                                     │
│    vat_id: string?                                         │
│    address: Address?                                       │
│    contact: ContactInfo?                                   │
│    settings: BusinessSettings?                            │
│    status: BusinessStatus                                  │
│    created_at: datetime                                    │
│    last_activity_at: datetime?                            │
└─────────┬───────────────────────────────────────┬─────────┘
          │                                       │
          │ 1:N (has)                            │ 1:N (generates)
          ▼                                       ▼
┌─────────────────────────────┐        ┌─────────────────────────────┐
│      💳 Transaction         │        │       📊 Report             │
├─────────────────────────────┤        ├─────────────────────────────┤
│ PK: id: string             │        │ PK: id: string             │
│ FK: business_id: string    │        │ FK: business_id: string    │
│    amount: decimal         │        │    type: ReportType        │
│    description: string     │        │    data: JSON              │
│    date: date              │        │    generated_at: datetime  │
│    category: string        │        │    parameters: JSON        │
│    type: TransactionType   │        └─────────────────────────────┘
│    created_at: datetime    │
│    updated_at: datetime    │
└─────────┬───────────────────┘
          │
          │ 1:N (belongs to)
          ▼
┌─────────────────────────────┐
│       📁 Category           │
├─────────────────────────────┤
│ PK: id: string             │
│ FK: business_id: string    │
│    name: string            │
│    color: string           │
│    icon: string            │
│    parent_id: string?      │
│    is_active: boolean      │
└─────────────────────────────┘
```

### יחסים מתקדמים
```
┌─────────────────────────────────────────────────────────────┐
│                    🎯 BusinessStrategy                      │
├─────────────────────────────────────────────────────────────┤
│ PK: id: string                                             │
│ FK: business_id: string → Business.id                     │
│    title: string                                           │
│    description: string                                     │
│    ai_analysis: JSON                                       │
│    recommendations: JSON[]                                 │
│    implementation_plan: JSON                               │
│    status: StrategyStatus                                  │
│    created_at: datetime                                    │
│    updated_at: datetime                                    │
└─────────┬───────────────────────────────────────────────────┘
          │
          │ 1:N (contains)
          ▼
┌─────────────────────────────────────────────────────────────┐
│                     💬 AIMessage                           │
├─────────────────────────────────────────────────────────────┤
│ PK: id: string                                             │
│ FK: strategy_id: string → BusinessStrategy.id             │
│ FK: business_id: string → Business.id                     │
│    role: MessageRole (user/assistant/system)              │
│    content: string                                         │
│    metadata: JSON                                          │
│    timestamp: datetime                                     │
│    tokens_used: number?                                    │
│    cost: decimal?                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   🔐 UserBusinessAccess                    │
├─────────────────────────────────────────────────────────────┤
│ PK: id: string                                             │
│ FK: user_id: string → User.id                             │
│ FK: business_id: string → Business.id                     │
│    role: BusinessRole                                      │
│    permissions: Permission[]                               │
│    granted_by: string → User.id                           │
│    granted_at: datetime                                    │
│    expires_at: datetime?                                   │
│    is_active: boolean                                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     🔧 Integration                         │
├─────────────────────────────────────────────────────────────┤
│ PK: id: string                                             │
│ FK: business_id: string → Business.id                     │
│    service_name: string (zapier/ocr/openai)               │
│    configuration: JSON                                     │
│    credentials: EncryptedJSON                             │
│    status: IntegrationStatus                              │
│    last_sync: datetime?                                    │
│    created_at: datetime                                    │
│    updated_at: datetime                                    │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 4. תרשים זרימת נתונים (Data Flow)

### זרימת נתונים ראשית
```
┌─────────────┐    HTTP Request     ┌─────────────┐
│   Browser   │ ──────────────────► │   Frontend  │
│             │                     │   (React)   │
└─────────────┘                     └─────┬───────┘
                                          │ Component State
                                          │ Context Updates
                                          ▼
                                  ┌─────────────┐
                                  │   Context   │
                                  │  Providers  │
                                  │  (State)    │
                                  └─────┬───────┘
                                        │ API Calls
                                        │ Service Layer
                                        ▼
                                ┌─────────────┐
                                │   Services  │
                                │businessApi.ts│
                                │    etc.     │
                                └─────┬───────┘
                                      │ Data Operations
                                      │ localStorage/API
                                      ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ localStorage│   │  Future DB  │   │ External    │
│   (Local)   │   │(PostgreSQL) │   │ Services    │
│             │   │             │   │ (AI/OCR)    │
└─────────────┘   └─────────────┘   └─────────────┘
```

### זרימת נתונים לתכונות AI
```
User Input (שאלה/בקשה)
         │
         ▼
┌─────────────────┐
│ Component       │
│ (ChatInterface) │
└─────┬───────────┘
      │ State Update
      ▼
┌─────────────────┐
│ Context         │
│ (AIContext)     │
└─────┬───────────┘
      │ Service Call
      ▼
┌─────────────────┐
│ AI Service      │
│ (aiApi.ts)      │
└─────┬───────────┘
      │ API Request
      ▼
┌─────────────────┐     ┌─────────────────┐
│ OpenAI API      │     │ Business Data   │
│ (External)      │◄────│ Context         │
│                 │     │ (Local)         │
└─────┬───────────┘     └─────────────────┘
      │ AI Response
      ▼
┌─────────────────┐
│ Response        │
│ Processing      │
└─────┬───────────┘
      │ Structured Data
      ▼
┌─────────────────┐
│ UI Update       │
│ (Components)    │
└─────────────────┘
```

### זרימת נתונים לאינטגרציות
```
Business Event (עסקה חדשה/דוח)
         │
         ▼
┌─────────────────┐
│ Event Trigger   │
│ (Business Logic)│
└─────┬───────────┘
      │ Webhook Call
      ▼
┌─────────────────┐
│ Integration     │
│ Service         │
│ (zapier.ts)     │
└─────┬───────────┘
      │ HTTP POST
      ▼
┌─────────────────┐     ┌─────────────────┐
│ Zapier Webhook  │────►│ External Action │
│ (External)      │     │ (Email/Slack)   │
└─────────────────┘     └─────────────────┘

Document Upload (חשבונית/קבלה)
         │
         ▼
┌─────────────────┐
│ File Upload     │
│ Component       │
└─────┬───────────┘
      │ Base64 Data
      ▼
┌─────────────────┐
│ OCR Service     │
│ (ocr.ts)        │
└─────┬───────────┘
      │ API Request
      ▼
┌─────────────────┐
│ OCR.space API   │
│ (External)      │
└─────┬───────────┘
      │ Extracted Text
      ▼
┌─────────────────┐
│ AI Analysis     │
│ (Structure Data)│
└─────┬───────────┘
      │ Structured Transaction
      ▼
┌─────────────────┐
│ Add to Business │
│ Data            │
└─────────────────┘
```

## ⚙️ 5. דיאגרמת רכיבים (Component Diagram)

### מבנה רכיבי React
```
┌─────────────────────────────────────────────────────────────┐
│                         📱 App.tsx                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │   🔐 Auth       │  │   🎨 Theme      │                  │
│  │   Provider      │  │   Provider      │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  🏢 Business Provider                   ││
│  │  ┌─────────────────┐  ┌─────────────────┐              ││
│  │  │  📊 Dashboard   │  │  ⚙️ Settings    │              ││
│  │  │  Layout         │  │  Panel          │              ││
│  │  └─────────────────┘  └─────────────────┘              ││
│  │                                                         ││
│  │  ┌─────────────────┐  ┌─────────────────┐              ││
│  │  │  🤖 AI Chat     │  │  📈 Reports     │              ││
│  │  │  Interface      │  │  Dashboard      │              ││
│  │  └─────────────────┘  └─────────────────┘              ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### רכיבי UI מפורטים
```
🔐 Authentication Components
├── LoginForm.tsx
├── RegisterForm.tsx  
├── MFAVerification.tsx
├── PasswordReset.tsx
└── SocialLogin.tsx

🏢 Business Components
├── BusinessSelector.tsx
├── BusinessCreator.tsx
├── BusinessSettings.tsx
├── BusinessMetrics.tsx
└── BusinessProfile.tsx

💳 Transaction Components
├── TransactionList.tsx
├── TransactionForm.tsx
├── TransactionDetails.tsx
├── CategorySelector.tsx
└── BulkTransactionUpload.tsx

📊 Dashboard Components
├── DashboardLayout.tsx
├── MetricsWidget.tsx
├── ChartWidget.tsx
├── RecentActivity.tsx
└── QuickActions.tsx

🤖 AI Components
├── ChatInterface.tsx
├── MessageBubble.tsx
├── InsightCard.tsx
├── RecommendationList.tsx
└── StrategyBuilder.tsx

📈 Reports Components
├── ReportBuilder.tsx
├── ChartVisualization.tsx
├── DataTable.tsx
├── FilterPanel.tsx
└── ExportOptions.tsx

🔧 Settings Components
├── UserProfile.tsx
├── SecuritySettings.tsx
├── IntegrationSettings.tsx
├── NotificationPreferences.tsx
└── BillingInformation.tsx

📱 Layout Components
├── Header.tsx
├── Sidebar.tsx
├── Navigation.tsx
├── Footer.tsx
└── MobileMenu.tsx

🎨 UI Components (Shared)
├── Button.tsx
├── Input.tsx
├── Modal.tsx
├── Toast.tsx
├── Loading.tsx
├── ErrorBoundary.tsx
└── ConfirmDialog.tsx
```

## 🔒 6. דיאגרמת אבטחה (Security Architecture)

### שכבות אבטחה
```
┌─────────────────────────────────────────────────────────────┐
│                    🌐 Internet/Client                       │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/TLS 1.3
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   🛡️ Security Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │     WAF     │  │   DDoS      │  │    CORS     │          │
│  │ Protection  │  │ Protection  │  │  Handler    │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Rate        │  │ IP          │  │ SSL/TLS     │          │
│  │ Limiting    │  │ Filtering   │  │ Termination │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────┬───────────────────────────────────────┘
                      │ Authenticated Requests
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                🔐 Authentication Layer                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   OAuth     │  │     JWT     │  │     MFA     │          │
│  │ Providers   │  │ Validation  │  │ Verification│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Session     │  │ Role-Based  │  │ Permission  │          │
│  │ Management  │  │ Access      │  │ Validation  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────┬───────────────────────────────────────┘
                      │ Authorized Requests
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                🏗️ Application Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Input       │  │ Business    │  │ Output      │          │
│  │ Validation  │  │ Logic       │  │ Sanitization│          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ CSRF        │  │ XSS         │  │ SQL         │          │
│  │ Protection  │  │ Prevention  │  │ Injection   │          │
│  │             │  │             │  │ Prevention  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────┬───────────────────────────────────────┘
                      │ Processed Data
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 💾 Data Layer Security                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Encryption  │  │    Row      │  │ Field-Level │          │
│  │ at Rest     │  │   Level     │  │ Encryption  │          │
│  │ (AES-256)   │  │  Security   │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ Backup      │  │ Audit       │  │ Data        │          │
│  │ Encryption  │  │ Logging     │  │ Masking     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

*דיאגרמות אלו מספקות מבט כולל ומפורט על ארכיטקטורת FinFlow, תוך הדגשת הקשרים בין הרכיבים, זרימת הנתונים ומודל האבטחה המתקדם*
