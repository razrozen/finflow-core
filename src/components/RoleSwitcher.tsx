import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/userRoles';

export const RoleSwitcher: React.FC = () => {
  const { user, setUserRole } = useAuth();

  if (!user) return null;

  const roles: { value: UserRole; label: string; description: string; color: string }[] = [
    {
      value: 'owner',
      label: 'בעל עסק',
      description: 'גישה לנתונים אישיים בלבד',
      color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      value: 'advisor',
      label: 'יועץ עסקי',
      description: 'גישה לנתוני מספר לקוחות',
      color: 'bg-green-100 text-green-800 border-green-300'
    },
    {
      value: 'admin',
      label: 'מנהל מערכת',
      description: 'גישה מלאה לכל המערכת',
      color: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        🔄 החלף תפקיד (למטרות בדיקה)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        תפקיד נוכחי: <span className="font-bold">{user.name}</span> - {roles.find(r => r.value === user.role)?.label}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role.value}
            onClick={() => setUserRole(role.value)}
            className={`p-3 border rounded-lg text-sm transition-all hover:shadow-md ${
              user.role === role.value 
                ? `${role.color} border-2` 
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="font-bold mb-1">{role.label}</div>
            <div className="text-xs opacity-75">{role.description}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        💡 בחר תפקיד כדי לראות איך המערכת מתנהגת עבור סוגי משתמשים שונים
      </div>
    </div>
  );
};
