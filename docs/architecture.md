# 🏗️ ארכיטקטורת המערכת - FinFlow

## סקירה כללית

FinFlow בנוי כאפליקציית SPA (Single Page Application) עם ארכיטקטורה מודולרית המבוססת על React ו-TypeScript.

## 🔧 שכבות המערכת

### Frontend Layer
```
src/
├── components/     # רכיבי UI חכמים
├── pages/         # דפי האפליקציה
├── layouts/       # תבניות עמודים
├── context/       # ניהול מצב גלובלי
└── hooks/         # Custom React hooks
```

### AI Layer
```
src/ai/
├── core/          # ליבת מנוע ה-AI
│   ├── openaiClient.ts
│   └── aiConfig.ts
├── modules/       # יועצים מתמחים
│   ├── AccountantExpert.ts
│   ├── BusinessAdvisorExpert.ts
│   ├── BookkeeperExpert.ts
│   └── InvestmentManagerExpert.ts
└── services/      # שירותי AI
    └── FinancialAdvisor.ts
```

### Data Layer
```
src/data/
├── sampleBusinesses.ts    # נתוני דוגמה
├── businessTypes.ts       # סוגי עסקים
└── financialData.ts       # מבני נתונים פיננסיים
```

### Testing Layer
```
src/tests/
├── security/      # בדיקות אבטחה
├── privacy/       # בדיקות פרטיות
├── ai/           # בדיקות AI
└── components/   # בדיקות רכיבים
```

## 🔄 זרימת נתונים

1. **User Input** → Component State
2. **Component State** → Context/Hooks
3. **Context** → AI Services
4. **AI Services** → OpenAI API
5. **AI Response** → Data Processing
6. **Processed Data** → UI Update

## 🛡️ אבטחה

### Client-Side Security
- Input sanitization
- XSS protection
- CSRF tokens
- Environment variables isolation

### API Security
- Rate limiting
- Request validation
- Error handling
- Secure headers

## 🚀 Build & Deployment

### Development
```bash
npm run dev     # Vite dev server
npm run test    # Vitest runner
npm run lint    # ESLint checker
```

### Production
```bash
npm run build   # Vite production build
npm run preview # Local production preview
```

### CI/CD Pipeline
1. **GitHub Push** → GitHub Actions
2. **Tests & Linting** → Quality checks
3. **Build** → Vite production build
4. **Deploy** → Vercel automatic deployment

## 📊 Performance

### Bundle Optimization
- Code splitting (vendor, ai, main chunks)
- Tree shaking
- Minification
- Compression (gzip/brotli)

### Runtime Performance
- React 19 concurrent features
- Lazy loading
- Memoization
- Virtualization for large lists

## 🔧 טכנולוגיות מרכזיות

- **React 19.1.0** - UI framework
- **TypeScript 5.7.2** - Type safety
- **Vite 7.0.5** - Build tool
- **OpenAI API** - AI capabilities
- **Tailwind CSS** - Styling
- **Vitest** - Testing framework
