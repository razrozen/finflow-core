import type { Business } from '../entities/business';

// נתונים לדוגמה לצורך בדיקה והדגמה
export const sampleBusinesses: Business[] = [
  {
    id: 'business_1',
    name: 'קפה בראון',
    ownerId: 'user_owner_1',
    industry: 'מזון ומשקאות',
    businessNumber: '123456789',
    companyId: '514123456',
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active',
    address: {
      street: 'רחוב הרצל 25',
      city: 'תל אביב',
      zipCode: '6473925',
      country: 'ישראל'
    },
    contact: {
      phone: '03-5551234',
      email: 'info@cafebrown.co.il',
      website: 'www.cafebrown.co.il'
    },
    settings: {
      currency: 'ILS',
      taxRate: 17,
      fiscalYearStart: '01-01'
    },
    permissions: {
      advisorId: 'user_advisor_1',
      sharedWith: []
    },
    lastActivityAt: '2024-12-01T14:30:00Z'
  },
  {
    id: 'business_2',
    name: 'טק סולושנס בע"מ',
    ownerId: 'user_owner_2',
    industry: 'טכנולוגיה',
    businessNumber: '987654321',
    companyId: '515987654',
    createdAt: '2023-06-10T09:00:00Z',
    status: 'active',
    address: {
      street: 'פארק הטכנולוגיה, בניין 8',
      city: 'הרצליה',
      zipCode: '4672408',
      country: 'ישראל'
    },
    contact: {
      phone: '09-9551234',
      email: 'contact@techsolutions.co.il',
      website: 'www.techsolutions.co.il'
    },
    settings: {
      currency: 'ILS',
      taxRate: 17,
      fiscalYearStart: '01-01'
    },
    permissions: {
      advisorId: 'user_advisor_1',
      accountantId: 'user_accountant_1',
      sharedWith: ['user_manager_1']
    },
    lastActivityAt: '2024-11-28T16:45:00Z'
  },
  {
    id: 'business_3',
    name: 'סטודיו עיצוב ירון',
    ownerId: 'user_owner_3',
    industry: 'שירותים',
    businessNumber: '555444333',
    createdAt: '2024-03-20T11:30:00Z',
    status: 'active',
    address: {
      street: 'רחוב דיזנגוף 101',
      city: 'תל אביב',
      zipCode: '6435101',
      country: 'ישראל'
    },
    contact: {
      phone: '03-7771234',
      email: 'yaron@design-studio.co.il'
    },
    settings: {
      currency: 'ILS',
      taxRate: 17,
      fiscalYearStart: '01-01'
    },
    permissions: {
      advisorId: 'user_advisor_1',
      sharedWith: []
    },
    lastActivityAt: '2024-11-15T10:20:00Z'
  }
];

// פונקציה לטעינת נתונים לדוגמה
export const loadSampleData = () => {
  // בדיקה אם כבר יש נתונים
  const existingData = localStorage.getItem('all_businesses');
  if (!existingData || JSON.parse(existingData).length === 0) {
    localStorage.setItem('all_businesses', JSON.stringify(sampleBusinesses));
    
    // יצירת נתונים לכל בעל עסק
    sampleBusinesses.forEach(business => {
      const ownerBusinesses = sampleBusinesses.filter(b => b.ownerId === business.ownerId);
      localStorage.setItem(`businesses_${business.ownerId}`, JSON.stringify(ownerBusinesses));
    });
    
    // יצירת נתונים ליועץ
    const advisorBusinesses = sampleBusinesses.filter(b => b.permissions?.advisorId === 'user_advisor_1');
    localStorage.setItem('businesses_user_advisor_1', JSON.stringify(advisorBusinesses));
    
    console.log('נתוני דוגמה נטענו בהצלחה');
  }
};

// זיהויי משתמשים לדוגמה
export const sampleUserIds = {
  owner1: 'user_owner_1',
  owner2: 'user_owner_2', 
  owner3: 'user_owner_3',
  advisor1: 'user_advisor_1',
  accountant1: 'user_accountant_1',
  manager1: 'user_manager_1'
};
