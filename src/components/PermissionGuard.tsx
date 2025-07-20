import type { ReactNode } from 'react';
import { usePermissions } from '../contexts/AuthContext';
import type { UserRole } from '../types/userRoles';

interface PermissionGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
  fallback?: ReactNode;
  adminOnly?: boolean;
  advisorOrAbove?: boolean;
  ownerOrAbove?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredRole,
  fallback = null,
  adminOnly = false,
  advisorOrAbove = false,
  ownerOrAbove = false
}) => {
  const { hasPermission, isAdmin, isAdvisor, isOwner } = usePermissions();

  // בדיקות הרשאות שונות
  let hasAccess = false;

  if (adminOnly) {
    hasAccess = isAdmin;
  } else if (advisorOrAbove) {
    hasAccess = isAdvisor;
  } else if (ownerOrAbove) {
    hasAccess = isOwner;
  } else if (requiredRole) {
    hasAccess = hasPermission(requiredRole);
  } else {
    hasAccess = true; // אין הגבלות
  }

  if (!hasAccess) {
    return (
      <>
        {fallback || (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">🚫</div>
            <h3 className="font-bold text-red-800 mb-1">אין הרשאה</h3>
            <p className="text-sm text-red-600">
              אינך מורשה לצפות בתוכן זה. נדרשת הרשאת{' '}
              {adminOnly && 'מנהל מערכת'}
              {advisorOrAbove && 'יועץ עסקי או מעלה'}
              {ownerOrAbove && 'בעל עסק או מעלה'}
              {requiredRole && requiredRole}
            </p>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
};

// קומפוננטה מותאמת למנהלי מערכת
export const AdminOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({
  children,
  fallback
}) => (
  <PermissionGuard adminOnly fallback={fallback}>
    {children}
  </PermissionGuard>
);

// קומפוננטה מותאמת ליועצים ומעלה
export const AdvisorOrAbove: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({
  children,
  fallback
}) => (
  <PermissionGuard advisorOrAbove fallback={fallback}>
    {children}
  </PermissionGuard>
);

// קומפוננטה מותאמת לבעלי עסק ומעלה
export const OwnerOrAbove: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({
  children,
  fallback
}) => (
  <PermissionGuard ownerOrAbove fallback={fallback}>
    {children}
  </PermissionGuard>
);
