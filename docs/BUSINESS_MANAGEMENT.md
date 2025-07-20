# FinFlow - מערכת עסקים מרובים

## מבוא
מערכת FinFlow תומכת בניהול מספר עסקים באותו זמן, מה שמאפשר ליועצים עסקיים ורואי חשבון לנהל מספר לקוחות במקביל.

## ארכיטקטורה

### BusinessContext
המערכת מבוססת על `BusinessContext` שמספק את כל הפונקציונליות הנדרשת:

```typescript
// Hook פשוט
const { selectedBusiness, setSelectedBusiness } = useBusiness();

// Hook מתקדם
const { 
  businesses, 
  currentBusiness, 
  createBusiness, 
  updateBusiness, 
  deleteBusiness,
  switchBusiness,
  isLoading,
  error 
} = useBusinessContext();
```

### BusinessStorage
מחלקה לניהול נתונים מתקדמת:

```typescript
import { BusinessStorage } from '../utils/businessStorage';

// קבלת עסקים עבור משתמש
const userBusinesses = BusinessStorage.getBusinessesForUser(userId);

// שמירת עסק
BusinessStorage.saveBusiness(business);

// מחיקת עסק
BusinessStorage.deleteBusiness(businessId);
```

## מערכת הרשאות

### תפקידי משתמשים
- **👑 בעל עסק (owner)** - רואה רק את העסקים שלו
- **🧑‍💼 יועץ עסקי (advisor)** - רואה עסקים שהוא מייעץ להם
- **📊 רואה חשבון (accountant)** - רואה עסקים שהוא מנהל
- **⚡ מנהל מערכת (admin)** - רואה את כל העסקים

### הרשאות ברמת העסק
```typescript
{
  permissions: {
    advisorId: 'user_advisor_1',      // יועץ מוקצה
    accountantId: 'user_accountant_1', // רו"ח מוקצה  
    sharedWith: ['user_manager_1']     // משתמשים נוספים
  }
}
```

## קומפוננטים עיקריים

### BusinessSwitcher
מחליף עסקים בסיידבר:
```typescript
import BusinessSwitcher from '../components/BusinessSwitcher';

// משתמש אוטומטי בסיידבר
<BusinessSwitcher />
```

### BusinessStatus
הצגת מצב העסק הנוכחי:
```typescript
import BusinessStatus from '../components/BusinessStatus';

<BusinessStatus />
```

### QuickBusinessCreator
יצירת עסק מהירה:
```typescript
import QuickBusinessCreator from '../components/QuickBusinessCreator';

<QuickBusinessCreator onComplete={() => console.log('נוצר!')} />
```

## דוגמאות שימוש

### יצירת עסק חדש
```typescript
const handleCreateBusiness = async () => {
  try {
    const newBusiness = await createBusiness({
      name: 'העסק שלי',
      ownerId: user.id,
      industry: 'טכנולוגיה',
      businessNumber: '123456789',
      companyId: '514123456'
    });
    console.log('עסק נוצר:', newBusiness);
  } catch (error) {
    console.error('שגיאה:', error);
  }
};
```

### עדכון עסק קיים
```typescript
const handleUpdateBusiness = async (businessId: string) => {
  try {
    const updated = await updateBusiness(businessId, {
      name: 'שם חדש',
      industry: 'שירותים',
      status: 'active'
    });
    console.log('עסק עודכן:', updated);
  } catch (error) {
    console.error('שגיאה:', error);
  }
};
```

### מעבר בין עסקים
```typescript
const handleSwitchBusiness = (businessId: string) => {
  switchBusiness(businessId);
  // העסק החדש יישמר אוטומטי ב-localStorage
};
```

## מבנה נתונים

### Business Entity
```typescript
type Business = {
  id: string;
  name: string;
  ownerId: string;
  industry?: string;
  createdAt: string;
  
  // פרטים עסקיים
  businessNumber?: string;
  companyId?: string;
  vatId?: string;
  
  // מיקום
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  
  // יצירת קשר
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  
  // הגדרות
  settings?: {
    currency: string;
    taxRate: number;
    fiscalYearStart: string;
  };
  
  // מטא-דאטה
  status: 'active' | 'inactive' | 'archived';
  lastActivityAt?: string;
  
  // הרשאות
  permissions?: {
    advisorId?: string;
    accountantId?: string;
    sharedWith?: string[];
  };
};
```

## אחסון נתונים

### LocalStorage Structure
```
all_businesses: Business[]           // כל העסקים במערכת
businesses_${userId}: Business[]    // עסקים עבור משתמש ספציפי
currentBusiness_${userId}: string   // ID של העסק האחרון שנבחר
```

### מטמון אוטומטי
המערכת מנהלת מטמון אוטומטי שמתעדכן כאשר:
- נוצר עסק חדש
- מתעדכן עסק קיים
- נמחק עסק
- משתנות הרשאות

## API Reference

### useBusinessContext()
```typescript
const {
  businesses,        // רשימת כל העסקים הזמינים
  currentBusiness,   // העסק הפעיל כרגע
  createBusiness,    // יצירת עסק חדש
  updateBusiness,    // עדכון עסק קיים
  deleteBusiness,    // מחיקת עסק
  switchBusiness,    // מעבר לעסק אחר
  isLoading,         // מצב טעינה
  error             // שגיאות
} = useBusinessContext();
```

### useBusiness() - גרסה פשוטה
```typescript
const {
  selectedBusiness,    // העסק הנבחר (alias ל-currentBusiness)
  setSelectedBusiness, // פונקציה לבחירת עסק (alias ל-switchBusiness)
  // + כל הפונקציונליות המתקדמת
} = useBusiness();
```

## טיפים למפתחים

### בדיקת הרשאות
```typescript
const canEditBusiness = (business: Business, userId: string) => {
  return business.ownerId === userId || 
         business.permissions?.advisorId === userId ||
         business.permissions?.accountantId === userId;
};
```

### סינון עסקים לפי סטטוס
```typescript
const activeBusinesses = businesses.filter(b => b.status === 'active');
```

### חיפוש עסקים
```typescript
const searchBusinesses = (query: string) => {
  return businesses.filter(b => 
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.industry?.toLowerCase().includes(query.toLowerCase())
  );
};
```

## פתרון בעיות נפוצות

### עסק לא נטען
```typescript
// וודא שהמשתמש מחובר
if (!user) return;

// בדוק הרשאות
const hasAccess = BusinessStorage.getBusinessesForUser(user.id);
```

### נתונים לא מתעדכנים
```typescript
// רענן את המטמון
BusinessStorage.updateUserCache(user.id);
```

### שגיאת הרשאות
```typescript
// וודא שהמשתמש הוא בעל העסק או שיש לו הרשאות
const business = businesses.find(b => b.id === businessId);
if (business?.ownerId !== user.id && user.role !== 'admin') {
  throw new Error('אין הרשאה לפעולה זו');
}
```

## תחזוקה

### ניקוי נתונים (development only)
```typescript
BusinessStorage.clearAllData(); // מחק את כל הנתונים
```

### יצירת עסק לדוגמה
```typescript
const sample = BusinessStorage.createSampleBusiness(user.id);
```
