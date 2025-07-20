import type { Business, CreateBusinessRequest, UpdateBusinessRequest } from "../entities/business";

// Business API functions for HTTP requests
// יפונקציות API לניהול עסקים

// Environment configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const IS_MOCK_MODE = !import.meta.env.VITE_API_URL || import.meta.env.DEV;

// Helper function for API requests
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(import.meta.env.VITE_API_KEY && {
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
    })
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// =============== BUSINESS API METHODS ===============

/**
 * קבלת עסקים עבור משתמש ספציפי
 */
export const fetchBusinesses = async (userId: string): Promise<Business[]> => {
  if (IS_MOCK_MODE) {
    // Mock data for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'mock-business-1',
            name: 'עסק דמו 1',
            ownerId: userId,
            industry: 'טכנולוגיה',
            createdAt: new Date().toISOString(),
            status: 'active',
            settings: {
              currency: 'ILS',
              taxRate: 17,
              fiscalYearStart: '01-01'
            }
          },
          {
            id: 'mock-business-2',
            name: 'עסק דמו 2',
            ownerId: userId,
            industry: 'שירותים',
            createdAt: new Date().toISOString(),
            status: 'active',
            settings: {
              currency: 'ILS',
              taxRate: 17,
              fiscalYearStart: '01-01'
            }
          }
        ]);
      }, 500); // Simulate network delay
    });
  }

  return apiRequest(`/businesses?ownerId=${userId}`);
};

/**
 * יצירת עסק חדש
 */
export const createBusiness = async (business: CreateBusinessRequest): Promise<Business> => {
  if (IS_MOCK_MODE) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBusiness: Business = {
          id: `mock-${Date.now()}`,
          ...business,
          createdAt: new Date().toISOString(),
          status: 'active',
          settings: {
            currency: 'ILS',
            taxRate: 17,
            fiscalYearStart: '01-01'
          }
        };
        resolve(newBusiness);
      }, 300);
    });
  }

  return apiRequest('/businesses', {
    method: 'POST',
    body: JSON.stringify(business),
  });
};

/**
 * עדכון עסק קיים
 */
export const updateBusiness = async (
  businessId: string, 
  updates: UpdateBusinessRequest
): Promise<Business> => {
  if (IS_MOCK_MODE) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedBusiness: Business = {
          id: businessId,
          name: updates.name || 'עסק עודכן',
          ownerId: 'mock-user',
          createdAt: new Date().toISOString(),
          status: updates.status || 'active',
          lastActivityAt: new Date().toISOString(),
          ...updates,
          settings: {
            currency: 'ILS',
            taxRate: 17,
            fiscalYearStart: '01-01',
            ...updates.settings
          }
        };
        resolve(updatedBusiness);
      }, 300);
    });
  }

  return apiRequest(`/businesses/${businessId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};

/**
 * מחיקת עסק
 */
export const deleteBusiness = async (businessId: string): Promise<void> => {
  if (IS_MOCK_MODE) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }

  return apiRequest(`/businesses/${businessId}`, {
    method: 'DELETE',
  });
};

/**
 * קבלת עסק לפי ID
 */
export const fetchBusinessById = async (businessId: string): Promise<Business | null> => {
  if (IS_MOCK_MODE) {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockBusiness: Business = {
          id: businessId,
          name: 'עסק דמו',
          ownerId: 'mock-user',
          industry: 'טכנולוגיה',
          createdAt: new Date().toISOString(),
          status: 'active',
          settings: {
            currency: 'ILS',
            taxRate: 17,
            fiscalYearStart: '01-01'
          }
        };
        resolve(mockBusiness);
      }, 300);
    });
  }

  try {
    return await apiRequest(`/businesses/${businessId}`);
  } catch (error) {
    console.error('Failed to fetch business:', error);
    return null;
  }
};

/**
 * חיפוש עסקים
 */
export const searchBusinesses = async (
  userId: string,
  query: string,
  filters?: {
    industry?: string;
    status?: 'active' | 'inactive' | 'archived';
  }
): Promise<Business[]> => {
  if (IS_MOCK_MODE) {
    // Mock implementation with filtering
    const allBusinesses = await fetchBusinesses(userId);
    return allBusinesses.filter(business => {
      const matchesQuery = business.name.toLowerCase().includes(query.toLowerCase()) ||
                          business.industry?.toLowerCase().includes(query.toLowerCase());
      const matchesIndustry = !filters?.industry || business.industry === filters.industry;
      const matchesStatus = !filters?.status || business.status === filters.status;
      
      return matchesQuery && matchesIndustry && matchesStatus;
    });
  }

  const params = new URLSearchParams({
    userId,
    query,
    ...(filters?.industry && { industry: filters.industry }),
    ...(filters?.status && { status: filters.status })
  });

  return apiRequest(`/businesses/search?${params}`);
};

// =============== USER PREFERENCES ===============

/**
 * שמירת עסק נבחר עבור משתמש
 */
export const setUserSelectedBusiness = async (
  userId: string, 
  businessId: string
): Promise<void> => {
  if (IS_MOCK_MODE) {
    // Store in localStorage for mock mode
    localStorage.setItem(`selectedBusiness_${userId}`, businessId);
    return Promise.resolve();
  }

  return apiRequest(`/users/${userId}/selected-business`, {
    method: 'POST',
    body: JSON.stringify({ businessId }),
  });
};

/**
 * קבלת עסק נבחר עבור משתמש
 */
export const getUserSelectedBusiness = async (userId: string): Promise<string | null> => {
  if (IS_MOCK_MODE) {
    // Get from localStorage for mock mode
    return Promise.resolve(localStorage.getItem(`selectedBusiness_${userId}`));
  }

  try {
    const result = await apiRequest(`/users/${userId}/selected-business`);
    return result.businessId || null;
  } catch (error) {
    console.error('Failed to get user selected business:', error);
    return null;
  }
};

// =============== STATISTICS & ANALYTICS ===============

/**
 * קבלת סטטיסטיקות עסק
 */
export const getBusinessStats = async (businessId: string): Promise<{
  totalTransactions: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  activeUsers: number;
  lastActivity: string;
}> => {
  if (IS_MOCK_MODE) {
    // Mock statistics
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalTransactions: 156,
          totalRevenue: 45000,
          totalExpenses: 32000,
          netProfit: 13000,
          activeUsers: 3,
          lastActivity: new Date().toISOString()
        });
      }, 400);
    });
  }

  return apiRequest(`/businesses/${businessId}/stats`);
};

/**
 * קבלת סיכום עסקים למשתמש
 */
export const getUserBusinessSummary = async (userId: string): Promise<{
  totalBusinesses: number;
  activeBusinesses: number;
  totalRevenue: number;
  monthlyGrowth: number;
}> => {
  if (IS_MOCK_MODE) {
    // Mock summary
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalBusinesses: 2,
          activeBusinesses: 2,
          totalRevenue: 90000,
          monthlyGrowth: 12.5
        });
      }, 350);
    });
  }

  return apiRequest(`/users/${userId}/business-summary`);
};

// =============== UTILITY FUNCTIONS ===============

/**
 * בדיקת זמינות API
 */
export const checkApiHealth = async (): Promise<boolean> => {
  if (IS_MOCK_MODE) {
    return Promise.resolve(true);
  }

  try {
    await apiRequest('/health');
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

/**
 * קבלת מידע על גרסת API
 */
export const getApiVersion = async (): Promise<string> => {
  if (IS_MOCK_MODE) {
    return Promise.resolve('mock-v1.0.0');
  }

  try {
    const result = await apiRequest('/version');
    return result.version || 'unknown';
  } catch (error) {
    console.error('Failed to get API version:', error);
    return 'unknown';
  }
};

// =============== EXPORTS ===============

export default {
  fetchBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  fetchBusinessById,
  searchBusinesses,
  setUserSelectedBusiness,
  getUserSelectedBusiness,
  getBusinessStats,
  getUserBusinessSummary,
  checkApiHealth,
  getApiVersion,
};

// Type exports for convenience
export type {
  Business,
  CreateBusinessRequest,
  UpdateBusinessRequest,
} from "../entities/business";
