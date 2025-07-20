export type Business = {
  id: string;
  name: string;
  ownerId: string;
  industry?: string;
  createdAt: string;
  
  // פרטים עסקיים מורחבים
  businessNumber?: string; // מספר עוסק
  companyId?: string; // ח.פ / ע.ר
  vatId?: string; // מספר מע"ם
  
  // מיקום ופרטים
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  
  // פרטי יצירת קשר
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  
  // הגדרות עסק
  settings?: {
    currency: string; // ברירת מחדל: ILS
    taxRate: number; // אחוז מע"ם ברירת מחדל
    fiscalYearStart: string; // תחילת שנת הכספים (MM-DD)
  };
  
  // סטטוס ומטא-דאטה
  status: 'active' | 'inactive' | 'archived';
  lastActivityAt?: string;
  
  // הרשאות
  permissions?: {
    advisorId?: string; // יועץ מוקצה
    accountantId?: string; // רואה חשבון מוקצה
    sharedWith?: string[]; // משתמשים נוספים עם גישה
  };
};

// טיפוס למטרות יצירת עסק חדש
export type CreateBusinessRequest = {
  name: string;
  ownerId: string;
  industry?: string;
  businessNumber?: string;
  companyId?: string;
  address?: Business['address'];
  contact?: Business['contact'];
};

// טיפוס לעדכון עסק
export type UpdateBusinessRequest = Partial<Omit<Business, 'id' | 'createdAt' | 'ownerId'>>;

// רשימת תחומי פעילות נפוצים
export const INDUSTRIES = [
  'טכנולוגיה',
  'מסחר',
  'שירותים',
  'תעשייה',
  'נדל"ן',
  'בנייה',
  'חינוך',
  'בריאות',
  'תיירות',
  'מזון ומשקאות',
  'אופנה וטקסטיל',
  'רכב ותחבורה',
  'ייעוץ עסקי',
  'שירותים פיננסיים',
  'חקלאות',
  'אחר'
] as const;

export type Industry = typeof INDUSTRIES[number];
