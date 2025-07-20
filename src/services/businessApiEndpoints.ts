// API Endpoints Configuration for Business Management
// קובץ זה מכיל את כל ה-endpoints שצריכים להיות מוגדרים בשרת

export const API_ENDPOINTS = {
  
  // =============== BUSINESS ENDPOINTS ===============
  
  // GET /api/businesses/user/:userId
  // קבלת עסקים עבור משתמש ספציפי
  GET_USER_BUSINESSES: '/api/businesses/user/:userId',
  
  // POST /api/businesses
  // יצירת עסק חדש
  CREATE_BUSINESS: '/api/businesses',
  
  // GET /api/businesses/:businessId
  // קבלת עסק לפי ID
  GET_BUSINESS_BY_ID: '/api/businesses/:businessId',
  
  // PUT /api/businesses/:businessId
  // עדכון עסק קיים
  UPDATE_BUSINESS: '/api/businesses/:businessId',
  
  // DELETE /api/businesses/:businessId
  // מחיקת עסק
  DELETE_BUSINESS: '/api/businesses/:businessId',
  
  // GET /api/businesses/search
  // חיפוש עסקים עם פילטרים
  SEARCH_BUSINESSES: '/api/businesses/search',
  
  // =============== USER PREFERENCES ===============
  
  // POST /api/users/:userId/selected-business
  // שמירת עסק נבחר למשתמש
  SET_USER_SELECTED_BUSINESS: '/api/users/:userId/selected-business',
  
  // GET /api/users/:userId/selected-business
  // קבלת עסק נבחר למשתמש
  GET_USER_SELECTED_BUSINESS: '/api/users/:userId/selected-business',
  
  // =============== PERMISSIONS ===============
  
  // POST /api/businesses/:businessId/permissions
  // הוספת הרשאות לעסק
  ADD_BUSINESS_PERMISSIONS: '/api/businesses/:businessId/permissions',
  
  // DELETE /api/businesses/:businessId/permissions/:userId
  // הסרת הרשאות מעסק
  REMOVE_BUSINESS_PERMISSIONS: '/api/businesses/:businessId/permissions/:userId',
  
  // =============== STATISTICS ===============
  
  // GET /api/businesses/:businessId/stats
  // סטטיסטיקות עסק
  GET_BUSINESS_STATS: '/api/businesses/:businessId/stats',
  
  // GET /api/users/:userId/business-summary
  // סיכום עסקים למשתמש
  GET_USER_BUSINESS_SUMMARY: '/api/users/:userId/business-summary',
};

// =============== REQUEST/RESPONSE SCHEMAS ===============

/**
 * Business API Request/Response Types
 */

// יצירת עסק חדש - POST /api/businesses
export interface CreateBusinessApiRequest {
  name: string;
  ownerId: string;
  industry?: string;
  businessNumber?: string;
  companyId?: string;
  vatId?: string;
  address?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

// עדכון עסק - PUT /api/businesses/:businessId
export interface UpdateBusinessApiRequest {
  name?: string;
  industry?: string;
  businessNumber?: string;
  companyId?: string;
  vatId?: string;
  address?: {
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  settings?: {
    currency?: string;
    taxRate?: number;
    fiscalYearStart?: string;
  };
  status?: 'active' | 'inactive' | 'archived';
}

// תגובת API סטנדרטית
export interface StandardApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
  requestId?: string;
}

// תגובת רשימת עסקים
export interface BusinessListApiResponse {
  businesses: any[]; // Business[]
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// חיפוש עסקים - GET /api/businesses/search
export interface SearchBusinessesQuery {
  userId: string;
  query?: string;
  industry?: string;
  status?: 'active' | 'inactive' | 'archived';
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'lastActivityAt';
  sortOrder?: 'asc' | 'desc';
}

// הרשאות עסק - POST /api/businesses/:businessId/permissions
export interface BusinessPermissionsRequest {
  advisorId?: string;
  accountantId?: string;
  sharedWith?: string[];
  action: 'add' | 'remove' | 'update';
}

// סטטיסטיקות עסק - GET /api/businesses/:businessId/stats
export interface BusinessStatsResponse {
  businessId: string;
  totalTransactions: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  activeUsers: number;
  lastActivity: string;
  monthlyStats: {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
}

// =============== ERROR HANDLING ===============

export const API_ERROR_CODES = {
  // Business related errors
  BUSINESS_NOT_FOUND: 'BUSINESS_NOT_FOUND',
  BUSINESS_ACCESS_DENIED: 'BUSINESS_ACCESS_DENIED',
  BUSINESS_ALREADY_EXISTS: 'BUSINESS_ALREADY_EXISTS',
  BUSINESS_CREATION_FAILED: 'BUSINESS_CREATION_FAILED',
  
  // User related errors
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_NOT_AUTHORIZED: 'USER_NOT_AUTHORIZED',
  USER_PERMISSION_DENIED: 'USER_PERMISSION_DENIED',
  
  // General errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

// =============== UTILITY FUNCTIONS ===============

/**
 * בונה URL עם parameters
 */
export const buildApiUrl = (endpoint: string, params: Record<string, string | number>) => {
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value));
  });
  return url;
};

/**
 * בונה query string
 */
export const buildQueryString = (params: Record<string, any>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

// =============== MOCK RESPONSES FOR DEVELOPMENT ===============

export const MOCK_RESPONSES = {
  
  // דוגמה לתגובת יצירת עסק מוצלחת
  CREATE_BUSINESS_SUCCESS: {
    success: true,
    data: {
      id: 'business_1234567890_abc123',
      name: 'העסק שלי',
      ownerId: 'user_123',
      industry: 'טכנולוגיה',
      createdAt: '2024-01-15T10:00:00Z',
      status: 'active',
      settings: {
        currency: 'ILS',
        taxRate: 17,
        fiscalYearStart: '01-01'
      }
    },
    message: 'עסק נוצר בהצלחה',
    timestamp: '2024-01-15T10:00:00Z'
  },
  
  // דוגמה לתגובת שגיאה
  BUSINESS_NOT_FOUND: {
    success: false,
    error: 'עסק לא נמצא',
    code: 'BUSINESS_NOT_FOUND',
    timestamp: '2024-01-15T10:00:00Z'
  },
  
  // דוגמה לרשימת עסקים
  USER_BUSINESSES_SUCCESS: {
    success: true,
    data: {
      businesses: [
        // ... רשימת עסקים
      ],
      total: 5,
      page: 1,
      limit: 10,
      hasMore: false
    },
    timestamp: '2024-01-15T10:00:00Z'
  }
};

// =============== CONFIGURATION ===============

export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3001',
  API_VERSION: 'v1',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Authentication
  AUTH_HEADER: 'Authorization',
  AUTH_PREFIX: 'Bearer',
  
  // Rate limiting
  RATE_LIMIT: {
    requests: 100,
    window: 60000, // 1 minute
  }
};

export default {
  API_ENDPOINTS,
  API_ERROR_CODES,
  API_CONFIG,
  MOCK_RESPONSES,
  buildApiUrl,
  buildQueryString
};
