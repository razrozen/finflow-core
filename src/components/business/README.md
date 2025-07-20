# BusinessSelector Component

## סקירה
`BusinessSelector` הוא קומפוננט פשוט לבחירת עסק באמצעות תפריט נפתח (dropdown).

## שימוש

```tsx
import { BusinessSelector } from '@/components/business';

const MyPage = () => {
  return (
    <div>
      <h1>עמוד ניהול</h1>
      <BusinessSelector />
    </div>
  );
};
```

## תכונות

- 🔄 מתחבר אוטומטית ל-BusinessContext
- 📝 תווית בעברית "בחר עסק"
- ✅ הצגת העסק הנבחר מתחת לתפריט
- 🎯 עיצוב RTL (ימין לשמאל)
- 📱 עיצוב responsive עם Tailwind CSS

## API

הקומפוננט משתמש ב-hook `useBusiness()` שמספק:

- `businesses` - רשימת כל העסקים הזמינים
- `selectedBusiness` - העסק הנבחר כרגע
- `setSelectedBusiness` - פונקציה לשינוי העסק הנבחר

## דוגמה עם תצוגת מידע

```tsx
import { BusinessSelector } from '@/components/business';
import { useBusiness } from '@/contexts/BusinessContext';

const BusinessDashboard = () => {
  const { selectedBusiness } = useBusiness();

  return (
    <div className="p-4">
      <BusinessSelector />
      
      {selectedBusiness && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3>עסק פעיל: {selectedBusiness.name}</h3>
          <p>סטטוס: {selectedBusiness.status}</p>
        </div>
      )}
    </div>
  );
};
```

## הרחבות אפשריות

- הוספת חיפוש/סינון עסקים
- הצגת סמלים או אייקונים לעסקים
- תמיכה ביצירת עסק חדש מהתפריט
- הוספת מידע נוסף (תחום פעילות, סטטוס)

## קישור לקומפוננטות דומות

- `BusinessSwitcher` - גרסה מתקדמת יותר עם UI מפותח
- `QuickBusinessCreator` - יצירת עסק חדש במהירות
- `BusinessManagementPage` - ניהול מלא של עסקים
