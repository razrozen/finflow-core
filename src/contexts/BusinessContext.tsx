import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Business, CreateBusinessRequest, UpdateBusinessRequest } from '../entities/business';
import { useAuth } from './AuthContext';
import { loadSampleData } from '../data/sampleBusinesses';
import { BusinessApiService } from '../services/businessApiService';
import { fetchBusinesses } from '../api/businessApi';

interface BusinessContextType {
  // רשימת עסקים
  businesses: Business[];
  currentBusiness: Business | null;
  
  // פעולות עסק
  createBusiness: (data: CreateBusinessRequest) => Promise<Business>;
  updateBusiness: (id: string, data: UpdateBusinessRequest) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<void>;
  switchBusiness: (businessId: string) => void;
  
  // מצב טעינה
  isLoading: boolean;
  error: string | null;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider = ({ children }: BusinessProviderProps) => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBusinesses = useCallback(async () => {
    setIsLoading(true);
    try {
      // טעינת נתוני דוגמה בפעם הראשונה (למצב Mock)
      loadSampleData();
      
      // שימוש ב-fetchBusinesses מה-API החדש
      const userId = user?.id || "user1"; // בעתיד תקבל מה-Auth
      const businessesData = await fetchBusinesses(userId);
      
      setBusinesses(businessesData);
      
      // בחירת עסק נוכחי מ-localStorage
      const saved = localStorage.getItem("selectedBusinessId");
      if (saved) {
        const existing = businessesData.find((b) => b.id === saved);
        if (existing) {
          setCurrentBusiness(existing);
        } else if (businessesData.length > 0) {
          setCurrentBusiness(businessesData[0]);
        }
      } else if (businessesData.length > 0) {
        setCurrentBusiness(businessesData[0]);
      }
      
    } catch (err) {
      setError('שגיאה בטעינת העסקים');
      console.error('Error loading businesses:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // טעינת עסקים מהשרת
  useEffect(() => {
    if (!user) {
      setBusinesses([]);
      setCurrentBusiness(null);
      return;
    }

    loadBusinesses();
  }, [user, loadBusinesses]);

  const createBusiness = async (data: CreateBusinessRequest): Promise<Business> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await BusinessApiService.createBusiness(data);
      
      if (result.success) {
        // עדכון המצב המקומי
        const updatedBusinesses = [...businesses, result.data];
        setBusinesses(updatedBusinesses);
        
        // הגדרה כעסק נוכחי אם זה הראשון
        if (!currentBusiness) {
          switchBusiness(result.data.id);
        }

        return result.data;
      } else {
        throw new Error(result.error || 'שגיאה ביצירת העסק');
      }
    } catch (err) {
      setError('שגיאה ביצירת העסק');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBusiness = async (id: string, data: UpdateBusinessRequest): Promise<Business> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await BusinessApiService.updateBusiness(id, data);
      
      if (result.success) {
        // עדכון המצב המקומי
        const updatedBusinesses = businesses.map(business => 
          business.id === id ? result.data : business
        );
        setBusinesses(updatedBusinesses);
        
        // עדכון העסק הנוכחי אם זה אותו עסק
        if (currentBusiness?.id === id) {
          setCurrentBusiness(result.data);
        }

        return result.data;
      } else {
        throw new Error(result.error || 'שגיאה בעדכון העסק');
      }
    } catch (err) {
      setError('שגיאה בעדכון העסק');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBusiness = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await BusinessApiService.deleteBusiness(id);
      
      if (result.success) {
        // עדכון המצב המקומי
        const updatedBusinesses = businesses.filter(business => business.id !== id);
        setBusinesses(updatedBusinesses);
        
        // אם מחקנו את העסק הנוכחי, עבור לעסק אחר
        if (currentBusiness?.id === id) {
          if (updatedBusinesses.length > 0) {
            switchBusiness(updatedBusinesses[0].id);
          } else {
            setCurrentBusiness(null);
          }
        }
      } else {
        throw new Error(result.error || 'שגיאה במחיקת העסק');
      }
    } catch (err) {
      setError('שגיאה במחיקת העסק');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const switchBusiness = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId);
    if (business && user) {
      setCurrentBusiness(business);
      // שמירת הבחירה ב-localStorage
      localStorage.setItem("selectedBusinessId", businessId);
      // גם שמירה דרך BusinessApiService למצבים עתידיים
      BusinessApiService.setUserSelectedBusiness(user.id, businessId);
    }
  };

  const value: BusinessContextType = {
    businesses,
    currentBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    switchBusiness,
    isLoading,
    error
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

// Hook פשוט יותר לגישה למידע העסק הנוכחי
export const useBusiness = () => {
  const context = useBusinessContext();
  return {
    selectedBusiness: context.currentBusiness,
    setSelectedBusiness: (business: Business) => context.switchBusiness(business.id),
    // גישה לכל הפונקציונליות המתקדמת
    ...context
  };
};

export default BusinessContext;
