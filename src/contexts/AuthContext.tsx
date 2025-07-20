import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, UserRole } from '../types/userRoles';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  hasPermission: (requiredRole: UserRole) => boolean;
  isAdmin: boolean;
  isAdvisor: boolean;
  isOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ההירכיה של ההרשאות (מהגבוהה לנמוכה)
const roleHierarchy: Record<UserRole, number> = {
  'admin': 3,
  'advisor': 2,
  'owner': 1
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // טוען נתוני משתמש מ-localStorage בעת טעינה
  useEffect(() => {
    const savedUser = localStorage.getItem('finflow_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('שגיאה בטעינת נתוני משתמש:', error);
        localStorage.removeItem('finflow_user');
      }
    } else {
      // משתמש ברירת מחדל - בעל עסק
      const defaultUser: User = {
        id: 'demo-user',
        name: 'משתמש דמו',
        email: 'demo@finflow.com',
        role: 'owner'
      };
      setUser(defaultUser);
      localStorage.setItem('finflow_user', JSON.stringify(defaultUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('finflow_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finflow_user');
  };

  const setUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('finflow_user', JSON.stringify(updatedUser));
    }
  };

  // בדיקת הרשאות - בודק אם למשתמש יש הרשאה מספקת
  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    setUserRole,
    hasPermission,
    isAdmin: user?.role === 'admin',
    isAdvisor: user?.role === 'advisor' || user?.role === 'admin',
    isOwner: user?.role === 'owner' || user?.role === 'advisor' || user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook לבדיקת הרשאות ספציפיות
export const usePermissions = () => {
  const { hasPermission, isAdmin, isAdvisor, isOwner } = useAuth();
  
  return {
    hasPermission,
    isAdmin,
    isAdvisor,
    isOwner,
    canManageUsers: isAdmin,
    canViewAllData: isAdmin || isAdvisor,
    canEditOwnData: isOwner || isAdvisor || isAdmin
  };
};
