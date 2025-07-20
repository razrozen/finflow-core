# 📚 מדריך API - FinFlow

## 🤖 AI Services API

### FinancialAdvisor

```typescript
import { FinancialAdvisor } from '@/services/ai/FinancialAdvisor';

const advisor = new FinancialAdvisor();
```

#### Methods

##### `getAdvice(query: string, context?: BusinessContext)`
מקבל ייעוץ פיננסי מותאם אישית.

```typescript
const advice = await advisor.getAdvice(
  "איך לשפר את התזרים החודשי?",
  {
    businessType: "חנות אופנה",
    monthlyRevenue: 50000,
    expenses: 35000
  }
);
```

**Parameters:**
- `query` - שאלה בעברית או אנגלית
- `context` - הקשר עסקי אופציונלי

**Returns:** `Promise<AdviceResponse>`

---

### AI Experts

#### AccountantExpert
```typescript
import { AccountantExpert } from '@/ai/modules/AccountantExpert';

const expert = new AccountantExpert();
const taxAdvice = await expert.getTaxAdvice(businessData);
```

#### BusinessAdvisorExpert
```typescript
import { BusinessAdvisorExpert } from '@/ai/modules/BusinessAdvisorExpert';

const expert = new BusinessAdvisorExpert();
const strategy = await expert.createBusinessStrategy(goals);
```

#### BookkeeperExpert
```typescript
import { BookkeeperExpert } from '@/ai/modules/BookkeeperExpert';

const expert = new BookkeeperExpert();
const report = await expert.generateReport(transactions);
```

#### InvestmentManagerExpert
```typescript
import { InvestmentManagerExpert } from '@/ai/modules/InvestmentManagerExpert';

const expert = new InvestmentManagerExpert();
const portfolio = await expert.analyzeInvestments(capital);
```

---

## 🗂️ Data Types

### BusinessContext
```typescript
interface BusinessContext {
  businessType: string;
  monthlyRevenue: number;
  expenses: number;
  industry?: string;
  employees?: number;
  location?: string;
}
```

### AdviceResponse
```typescript
interface AdviceResponse {
  advice: string;
  confidence: number;
  recommendations: Recommendation[];
  warnings?: string[];
}
```

### Recommendation
```typescript
interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
  estimatedImpact: string;
}
```

---

## 🔧 Utility Functions

### Business Storage
```typescript
import { BusinessStorage } from '@/utils/businessStorage';

// שמירת נתוני עסק
BusinessStorage.saveBusiness(businessData);

// טעינת נתוני עסק
const business = BusinessStorage.loadBusiness(businessId);

// מחיקת נתוני עסק
BusinessStorage.deleteBusiness(businessId);
```

### Input Sanitization
```typescript
import { sanitizeInput } from '@/utils/inputSanitizer';

const cleanInput = sanitizeInput(userInput);
```

---

## 🛡️ Security Functions

### XSS Protection
```typescript
import { preventXSS } from '@/utils/security';

const safeContent = preventXSS(userContent);
```

### API Key Management
```typescript
// משתני סביבה מוגנים
const apiKey = process.env.VITE_OPENAI_API_KEY;
const apiUrl = process.env.VITE_API_URL;
```

---

## 🧪 Testing Utilities

### Mock Data
```typescript
import { mockBusinessData } from '@/tests/mocks/businessData';
import { mockAIResponse } from '@/tests/mocks/aiResponses';
```

### Test Helpers
```typescript
import { renderWithContext } from '@/tests/utils/testHelpers';
import { createMockBusiness } from '@/tests/utils/businessMocks';
```

---

## 🌐 Environment Variables

### Required
```env
VITE_OPENAI_API_KEY=your_openai_key_here
VITE_API_URL=https://api.finflow.co.il
VITE_AUTH_SECRET=your_auth_secret
VITE_CLIENT_ID=finflow-client-prod
```

### Optional
```env
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=info
VITE_AI_MAX_RESPONSES=4
VITE_AI_LANGUAGE=he
```

---

## 📝 Usage Examples

### Basic AI Query
```typescript
import { FinancialAdvisor } from '@/services/ai/FinancialAdvisor';

async function getBusinessAdvice() {
  const advisor = new FinancialAdvisor();
  
  try {
    const response = await advisor.getAdvice(
      "איך לצמצם הוצאות בעסק שלי?"
    );
    
    console.log(response.advice);
    response.recommendations.forEach(rec => {
      console.log(`${rec.title}: ${rec.description}`);
    });
  } catch (error) {
    console.error('Error getting advice:', error);
  }
}
```

### Component Integration
```typescript
import { useFinancialAdvisor } from '@/hooks/useFinancialAdvisor';

function AdviceComponent() {
  const { getAdvice, loading, error } = useFinancialAdvisor();
  
  const handleSubmit = async (query: string) => {
    const advice = await getAdvice(query);
    // Handle advice response
  };
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {/* Component UI */}
    </div>
  );
}
```
