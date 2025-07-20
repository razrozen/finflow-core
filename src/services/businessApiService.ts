// Business API Service - שכבת API לניהול עסקים
// תומכת הן ב-localStorage והן ב-API אמיתי בעתיד

import type { Business, CreateBusinessRequest, UpdateBusinessRequest } from '../entities/business';
import { BusinessStorage } from '../utils/businessStorage';

// ממשקי API לעתיד
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// קונפיגורציה לסביבה
const API_CONFIG = {
  // בפיתוח - localStorage, בייצור - API אמיתי
  USE_LOCAL_STORAGE: import.meta.env.DEV || !import.meta.env.VITE_API_URL,
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  API_KEY: import.meta.env.VITE_API_KEY || '',
};

export class BusinessApiService {
  
  // ========== CRUD Operations ==========
  
  /**
   * קבלת עסקים עבור משתמש ספציפי
   */
  static async getBusinessesForUser(userId: string): Promise<ApiResponse<Business[]>> {
    try {
      if (API_CONFIG.USE_LOCAL_STORAGE) {
        // localStorage mode
        const businesses = BusinessStorage.getBusinessesForUser(userId);
        return {
          data: businesses,
          success: true,
          message: `נמצאו ${businesses.length} עסקים`
        };
      } else {
        // API mode
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/businesses/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה לא ידועה'
      };
    }
  }

  /**
   * יצירת עסק חדש
   */
  static async createBusiness(data: CreateBusinessRequest): Promise<ApiResponse<Business>> {
    try {
      if (API_CONFIG.USE_LOCAL_STORAGE) {
        // localStorage mode
        const newBusiness: Business = {
          id: `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: data.name,
          ownerId: data.ownerId,
          industry: data.industry,
          businessNumber: data.businessNumber,
          companyId: data.companyId,
          vatId: data.companyId, // אותו מספר ברוב המקרים
          address: data.address,
          contact: data.contact,
          createdAt: new Date().toISOString(),
          status: 'active',
          settings: {
            currency: 'ILS',
            taxRate: 17, // מע"ם סטנדרטי
            fiscalYearStart: '01-01'
          },
          permissions: {
            sharedWith: []
          }
        };

        BusinessStorage.saveBusiness(newBusiness);
        
        return {
          data: newBusiness,
          success: true,
          message: 'עסק נוצר בהצלחה'
        };
      } else {
        // API mode
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/businesses`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error('Error creating business:', error);
      return {
        data: {} as Business,
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה ביצירת העסק'
      };
    }
  }

  /**
   * עדכון עסק קיים
   */
  static async updateBusiness(businessId: string, data: UpdateBusinessRequest): Promise<ApiResponse<Business>> {
    try {
      if (API_CONFIG.USE_LOCAL_STORAGE) {
        // localStorage mode
        const allBusinesses = BusinessStorage.getAllBusinesses();
        const businessToUpdate = allBusinesses.find((b: Business) => b.id === businessId);
        
        if (!businessToUpdate) {
          throw new Error('עסק לא נמצא');
        }
        
        const updatedBusiness = { 
          ...businessToUpdate, 
          ...data, 
          lastActivityAt: new Date().toISOString() 
        };
        
        BusinessStorage.saveBusiness(updatedBusiness);
        
        return {
          data: updatedBusiness,
          success: true,
          message: 'עסק עודכן בהצלחה'
        };
      } else {
        // API mode
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/businesses/${businessId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error('Error updating business:', error);
      return {
        data: {} as Business,
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה בעדכון העסק'
      };
    }
  }

  /**
   * מחיקת עסק
   */
  static async deleteBusiness(businessId: string): Promise<ApiResponse<void>> {
    try {
      if (API_CONFIG.USE_LOCAL_STORAGE) {
        // localStorage mode
        BusinessStorage.deleteBusiness(businessId);
        
        return {
          data: undefined,
          success: true,
          message: 'עסק נמחק בהצלחה'
        };
      } else {
        // API mode
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/businesses/${businessId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        return {
          data: undefined,
          success: true,
          message: 'עסק נמחק בהצלחה'
        };
      }
    } catch (error) {
      console.error('Error deleting business:', error);
      return {
        data: undefined,
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה במחיקת העסק'
      };
    }
  }

  // ========== Additional API Methods ==========

  /**
   * קבלת עסק לפי ID
   */
  static async getBusinessById(businessId: string): Promise<ApiResponse<Business | null>> {
    try {
      if (API_CONFIG.USE_LOCAL_STORAGE) {
        const allBusinesses = BusinessStorage.getAllBusinesses();
        const business = allBusinesses.find((b: Business) => b.id === businessId);
        
        return {
          data: business || null,
          success: true,
          message: business ? 'עסק נמצא' : 'עסק לא נמצא'
        };
      } else {
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/businesses/${businessId}`, {
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error('Error fetching business:', error);
      return {
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה בטעינת העסק'
      };
    }
  }

  /**
   * חיפוש עסקים
   */
  static async searchBusinesses(
    userId: string, 
    query: string, 
    filters?: { industry?: string; status?: string }
  ): Promise<ApiResponse<Business[]>> {
    try {
      if (API_CONFIG.USE_LOCAL_STORAGE) {
        let businesses = BusinessStorage.getBusinessesForUser(userId);
        
        // סינון לפי חיפוש
        if (query) {
          businesses = businesses.filter((business: Business) => 
            business.name.toLowerCase().includes(query.toLowerCase()) ||
            business.industry?.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        // סינון לפי תחום
        if (filters?.industry) {
          businesses = businesses.filter((business: Business) => business.industry === filters.industry);
        }
        
        // סינון לפי סטטוס
        if (filters?.status) {
          businesses = businesses.filter((business: Business) => business.status === filters.status);
        }
        
        return {
          data: businesses,
          success: true,
          message: `נמצאו ${businesses.length} עסקים`
        };
      } else {
        const params = new URLSearchParams({
          userId,
          query,
          ...(filters?.industry && { industry: filters.industry }),
          ...(filters?.status && { status: filters.status })
        });
        
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/businesses/search?${params}`, {
          headers: {
            'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error('Error searching businesses:', error);
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : 'שגיאה בחיפוש עסקים'
      };
    }
  }

  // ========== User Preferences ==========

  /**
   * שמירת עסק נבחר למשתמש
   */
  static setUserSelectedBusiness(userId: string, businessId: string): void {
    if (API_CONFIG.USE_LOCAL_STORAGE) {
      BusinessStorage.setLastSelectedBusiness(userId, businessId);
    } else {
      // יישלח ל-API בעתיד
      fetch(`${API_CONFIG.API_BASE_URL}/users/${userId}/selected-business`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ businessId })
      }).catch(console.error);
    }
  }

  /**
   * קבלת עסק נבחר למשתמש
   */
  static getUserSelectedBusiness(userId: string): string | null {
    if (API_CONFIG.USE_LOCAL_STORAGE) {
      return BusinessStorage.getLastSelectedBusiness(userId);
    } else {
      // יחזור מה-API בעתיד
      return null;
    }
  }

  // ========== Development Utilities ==========

  /**
   * איפוס נתונים (development only)
   */
  static clearAllData(): void {
    if (API_CONFIG.USE_LOCAL_STORAGE && import.meta.env.DEV) {
      BusinessStorage.clearAllData();
    }
  }

  /**
   * יצירת עסק לדוגמה (development only)
   */
  static createSampleBusiness(ownerId: string): Business | null {
    if (API_CONFIG.USE_LOCAL_STORAGE && import.meta.env.DEV) {
      return BusinessStorage.createSampleBusiness(ownerId);
    }
    return null;
  }

  // ========== System Info ==========

  /**
   * מידע על מצב המערכת
   */
  static getSystemInfo() {
    return {
      isLocalStorage: API_CONFIG.USE_LOCAL_STORAGE,
      apiUrl: API_CONFIG.API_BASE_URL,
      environment: import.meta.env.MODE,
      version: '2.0.0'
    };
  }
}
