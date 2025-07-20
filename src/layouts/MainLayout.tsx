import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BusinessSwitcher from '../components/BusinessSwitcher';
import { BusinessSelector } from '../components/business/BusinessSelector';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { path: '/dashboard', label: 'דשבורד' },
    { path: '/ai-assistant', label: 'AI עסקי' },
    { path: '/strategic-ai', label: 'AI אסטרטגי' },
    { path: '/advisor', label: 'יועץ חכם' },
    { path: '/strategy', label: 'אסטרטגיה' },
    { path: '/finance', label: 'ניהול פיננסי' },
    { path: '/reports', label: 'דוחות' },
    ...(user?.role === 'advisor' || user?.role === 'admin' ? [{ path: '/businesses', label: 'ניהול עסקים' }] : []),
    ...(user?.role === 'admin' ? [{ path: '/admin', label: 'ניהול מערכת' }] : []),
    { path: '/settings', label: 'הגדרות' },
  ];

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin': return { label: 'מנהל מערכת', color: 'bg-purple-600', icon: '👑' };
      case 'advisor': return { label: 'יועץ עסקי', color: 'bg-green-600', icon: '🧑‍💼' };
      case 'owner': return { label: 'בעל עסק', color: 'bg-blue-600', icon: '🏪' };
      default: return { label: 'משתמש', color: 'bg-gray-600', icon: '👤' };
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-800 text-white p-4 space-y-4">
        <h1 className="text-2xl font-bold">FinFlow</h1>
        
        {/* מידע משתמש */}
        {user && (
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{getRoleDisplay(user.role).icon}</span>
              <span className="font-medium text-sm">{user.name}</span>
            </div>
            <div className={`inline-block px-2 py-1 rounded text-xs ${getRoleDisplay(user.role).color}`}>
              {getRoleDisplay(user.role).label}
            </div>
          </div>
        )}
        
        {/* בחירת עסק */}
        <BusinessSwitcher />
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded hover:bg-slate-700 ${
                location.pathname === item.path ? 'bg-slate-700' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-slate-50 p-6">
        <BusinessSelector />
        {children}
        
        <footer className="text-sm text-slate-500 mt-10 text-center">
          <a href="/legal/privacy" className="underline hover:text-blue-600 mx-2">מדיניות פרטיות</a> | 
          <a href="/legal/terms" className="underline hover:text-blue-600 mx-2">תנאי שימוש</a>
        </footer>
      </main>
    </div>
  );
};

export default MainLayout;
