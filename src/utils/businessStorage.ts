import type { Business } from '../entities/business';

// מחלקה לניהול נתוני עסקים ב-localStorage
export class BusinessStorage {
  
  // קבלת כל העסקים מהמערכת
  static getAllBusinesses(): Business[] {
    try {
      const stored = localStorage.getItem('all_businesses');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('שגיאה בטעינת עסקים:', error);
      return [];
    }
  }

  // קבלת עסקים עבור משתמש ספציפי
  static getBusinessesForUser(userId: string): Business[] {
    const allBusinesses = this.getAllBusinesses();
    
    return allBusinesses.filter(business => {
      // בעל העסק
      if (business.ownerId === userId) return true;
      
      // יועץ מוקצה
      if (business.permissions?.advisorId === userId) return true;
      
      // רואה חשבון מוקצה
      if (business.permissions?.accountantId === userId) return true;
      
      // משתמש משותף
      if (business.permissions?.sharedWith?.includes(userId)) return true;
      
      return false;
    });
  }

  // שמירת עסק חדש או עדכון קיים
  static saveBusiness(business: Business): void {
    const allBusinesses = this.getAllBusinesses();
    const existingIndex = allBusinesses.findIndex(b => b.id === business.id);
    
    if (existingIndex >= 0) {
      allBusinesses[existingIndex] = business;
    } else {
      allBusinesses.push(business);
    }
    
    localStorage.setItem('all_businesses', JSON.stringify(allBusinesses));
    
    // עדכון המטמון של המשתמש
    this.updateUserCache(business.ownerId);
    
    // עדכון למשתמשים עם הרשאות
    if (business.permissions?.advisorId) {
      this.updateUserCache(business.permissions.advisorId);
    }
    if (business.permissions?.accountantId) {
      this.updateUserCache(business.permissions.accountantId);
    }
    business.permissions?.sharedWith?.forEach(userId => {
      this.updateUserCache(userId);
    });
  }

  // מחיקת עסק
  static deleteBusiness(businessId: string): void {
    const allBusinesses = this.getAllBusinesses();
    const business = allBusinesses.find(b => b.id === businessId);
    
    if (!business) return;
    
    const updatedBusinesses = allBusinesses.filter(b => b.id !== businessId);
    localStorage.setItem('all_businesses', JSON.stringify(updatedBusinesses));
    
    // עדכון המטמון של כל המשתמשים הרלוונטיים
    this.updateUserCache(business.ownerId);
    if (business.permissions?.advisorId) {
      this.updateUserCache(business.permissions.advisorId);
    }
    if (business.permissions?.accountantId) {
      this.updateUserCache(business.permissions.accountantId);
    }
    business.permissions?.sharedWith?.forEach(userId => {
      this.updateUserCache(userId);
    });
  }

  // עדכון מטמון של משתמש ספציפי
  static updateUserCache(userId: string): void {
    const userBusinesses = this.getBusinessesForUser(userId);
    localStorage.setItem(`businesses_${userId}`, JSON.stringify(userBusinesses));
  }

  // קבלת העסק האחרון שנבחר עבור משתמש
  static getLastSelectedBusiness(userId: string): string | null {
    return localStorage.getItem(`currentBusiness_${userId}`);
  }

  // שמירת העסק שנבחר עבור משתמש
  static setLastSelectedBusiness(userId: string, businessId: string): void {
    localStorage.setItem(`currentBusiness_${userId}`, businessId);
  }

  // איפוס נתונים (לצורכי פיתוח)
  static clearAllData(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('businesses_') || key === 'all_businesses' || key.startsWith('currentBusiness_')) {
        localStorage.removeItem(key);
      }
    });
  }

  // יצירת עסק לדוגמה לבדיקה מהירה
  static createSampleBusiness(ownerId: string): Business {
    const sampleBusiness: Business = {
      id: `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: 'העסק שלי',
      ownerId,
      industry: 'שירותים',
      createdAt: new Date().toISOString(),
      status: 'active',
      settings: {
        currency: 'ILS',
        taxRate: 17,
        fiscalYearStart: '01-01'
      },
      permissions: {
        sharedWith: []
      }
    };

    this.saveBusiness(sampleBusiness);
    return sampleBusiness;
  }
}
