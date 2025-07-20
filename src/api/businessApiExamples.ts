// דוגמה לשימוש ב-Business API
// Example usage of Business API

import businessApi from '../api/businessApi';
import type { CreateBusinessRequest, UpdateBusinessRequest } from '../entities/business';

// =============== דוגמאות שימוש בסיסיות ===============

/**
 * דוגמה ליצירת עסק חדש
 */
export const exampleCreateBusiness = async () => {
  try {
    const newBusinessData: CreateBusinessRequest = {
      name: 'הקפה של דני',
      ownerId: 'user123',
      industry: 'מזון ומשקאות',
      businessNumber: '123456789',
      companyId: '514123456',
      address: {
        street: 'רחוב הרצל 25',
        city: 'תל אביב',
        zipCode: '6473925',
        country: 'ישראל'
      },
      contact: {
        phone: '03-1234567',
        email: 'info@daniscafe.co.il',
        website: 'www.daniscafe.co.il'
      }
    };

    const createdBusiness = await businessApi.createBusiness(newBusinessData);
    console.log('עסק נוצר בהצלחה:', createdBusiness);
    return createdBusiness;
  } catch (error) {
    console.error('שגיאה ביצירת עסק:', error);
    throw error;
  }
};

/**
 * דוגמה לקבלת עסקים של משתמש
 */
export const exampleFetchUserBusinesses = async (userId: string) => {
  try {
    const businesses = await businessApi.fetchBusinesses(userId);
    console.log(`נמצאו ${businesses.length} עסקים עבור המשתמש:`, businesses);
    return businesses;
  } catch (error) {
    console.error('שגיאה בטעינת עסקים:', error);
    throw error;
  }
};

/**
 * דוגמה לעדכון עסק
 */
export const exampleUpdateBusiness = async (businessId: string) => {
  try {
    const updates: UpdateBusinessRequest = {
      name: 'הקפה של דני - מעודכן',
      status: 'active',
      contact: {
        phone: '03-9876543',
        email: 'updated@daniscafe.co.il'
      },
      settings: {
        currency: 'ILS',
        taxRate: 17,
        fiscalYearStart: '01-01'
      }
    };

    const updatedBusiness = await businessApi.updateBusiness(businessId, updates);
    console.log('עסק עודכן בהצלחה:', updatedBusiness);
    return updatedBusiness;
  } catch (error) {
    console.error('שגיאה בעדכון עסק:', error);
    throw error;
  }
};

/**
 * דוגמה לחיפוש עסקים
 */
export const exampleSearchBusinesses = async (userId: string) => {
  try {
    const searchResults = await businessApi.searchBusinesses(
      userId,
      'קפה', // חיפוש המילה "קפה"
      {
        industry: 'מזון ומשקאות',
        status: 'active'
      }
    );
    
    console.log('תוצאות חיפוש:', searchResults);
    return searchResults;
  } catch (error) {
    console.error('שגיאה בחיפוש עסקים:', error);
    throw error;
  }
};

// =============== דוגמאות למידע סטטיסטי ===============

/**
 * דוגמה לקבלת סטטיסטיקות עסק
 */
export const exampleGetBusinessStats = async (businessId: string) => {
  try {
    const stats = await businessApi.getBusinessStats(businessId);
    console.log('סטטיסטיקות העסק:', {
      'סה"כ עסקאות': stats.totalTransactions,
      'הכנסות': `₪${stats.totalRevenue.toLocaleString()}`,
      'הוצאות': `₪${stats.totalExpenses.toLocaleString()}`,
      'רווח נקי': `₪${stats.netProfit.toLocaleString()}`,
      'משתמשים פעילים': stats.activeUsers,
      'פעילות אחרונה': new Date(stats.lastActivity).toLocaleDateString('he-IL')
    });
    return stats;
  } catch (error) {
    console.error('שגיאה בטעינת סטטיסטיקות:', error);
    throw error;
  }
};

/**
 * דוגמה לקבלת סיכום עסקים למשתמש
 */
export const exampleGetUserSummary = async (userId: string) => {
  try {
    const summary = await businessApi.getUserBusinessSummary(userId);
    console.log('סיכום עסקים למשתמש:', {
      'סה"כ עסקים': summary.totalBusinesses,
      'עסקים פעילים': summary.activeBusinesses,
      'סה"כ הכנסות': `₪${summary.totalRevenue.toLocaleString()}`,
      'צמיחה חודשית': `${summary.monthlyGrowth}%`
    });
    return summary;
  } catch (error) {
    console.error('שגיאה בטעינת סיכום:', error);
    throw error;
  }
};

// =============== דוגמאות להעדפות משתמש ===============

/**
 * דוגמה לשמירת עסק נבחר
 */
export const exampleSetSelectedBusiness = async (userId: string, businessId: string) => {
  try {
    await businessApi.setUserSelectedBusiness(userId, businessId);
    console.log(`עסק ${businessId} נשמר כעסק נבחר עבור משתמש ${userId}`);
  } catch (error) {
    console.error('שגיאה בשמירת עסק נבחר:', error);
    throw error;
  }
};

/**
 * דוגמה לקבלת עסק נבחר
 */
export const exampleGetSelectedBusiness = async (userId: string) => {
  try {
    const selectedBusinessId = await businessApi.getUserSelectedBusiness(userId);
    if (selectedBusinessId) {
      console.log(`העסק הנבחר של המשתמש הוא: ${selectedBusinessId}`);
      // טען את פרטי העסק
      const business = await businessApi.fetchBusinessById(selectedBusinessId);
      console.log('פרטי העסק הנבחר:', business);
      return business;
    } else {
      console.log('אין עסק נבחר למשתמש');
      return null;
    }
  } catch (error) {
    console.error('שגיאה בטעינת עסק נבחר:', error);
    throw error;
  }
};

// =============== דוגמאות לניהול מערכת ===============

/**
 * דוגמה לבדיקת תקינות API
 */
export const exampleCheckApiHealth = async () => {
  try {
    const isHealthy = await businessApi.checkApiHealth();
    console.log('מצב API:', isHealthy ? 'תקין ✅' : 'לא תקין ❌');
    return isHealthy;
  } catch (error) {
    console.error('שגיאה בבדיקת API:', error);
    return false;
  }
};

/**
 * דוגמה לקבלת גרסת API
 */
export const exampleGetApiVersion = async () => {
  try {
    const version = await businessApi.getApiVersion();
    console.log('גרסת API:', version);
    return version;
  } catch (error) {
    console.error('שגיאה בקבלת גרסת API:', error);
    return 'unknown';
  }
};

// =============== דוגמה מקיפה ===============

/**
 * דוגמה מקיפה לזרימת עבודה מלאה
 */
export const exampleFullWorkflow = async () => {
  const userId = 'demo-user-123';
  
  try {
    console.log('🚀 מתחיל זרימת עבודה מלאה...');
    
    // 1. בדיקת תקינות API
    console.log('\n1️⃣ בודק תקינות API...');
    const isHealthy = await exampleCheckApiHealth();
    if (!isHealthy) {
      throw new Error('API לא זמין');
    }
    
    // 2. יצירת עסק חדש
    console.log('\n2️⃣ יוצר עסק חדש...');
    const newBusiness = await exampleCreateBusiness();
    
    // 3. קבלת כל העסקים
    console.log('\n3️⃣ טוען את כל העסקים...');
    await exampleFetchUserBusinesses(userId);
    
    // 4. הגדרת עסק נבחר
    console.log('\n4️⃣ מגדיר עסק נבחר...');
    await exampleSetSelectedBusiness(userId, newBusiness.id);
    
    // 5. קבלת סטטיסטיקות
    console.log('\n5️⃣ טוען סטטיסטיקות...');
    await exampleGetBusinessStats(newBusiness.id);
    
    // 6. קבלת סיכום משתמש
    console.log('\n6️⃣ טוען סיכום משתמש...');
    await exampleGetUserSummary(userId);
    
    console.log('\n✅ זרימת העבודה הושלמה בהצלחה!');
    
  } catch (error) {
    console.error('\n❌ שגיאה בזרימת העבודה:', error);
    throw error;
  }
};

// =============== EXPORT ===============

export default {
  exampleCreateBusiness,
  exampleFetchUserBusinesses,
  exampleUpdateBusiness,
  exampleSearchBusinesses,
  exampleGetBusinessStats,
  exampleGetUserSummary,
  exampleSetSelectedBusiness,
  exampleGetSelectedBusiness,
  exampleCheckApiHealth,
  exampleGetApiVersion,
  exampleFullWorkflow
};
