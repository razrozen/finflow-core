import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  // הגנת הרשאות - רק למנהלי מערכת
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-red-50 p-6 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center border-2 border-red-200">
          <div className="text-6xl mb-4">👑</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">אזור מנהלי מערכת</h2>
          <p className="text-red-600 mb-6">
            אין לך הרשאה לצפות בעמוד זה. גישה מוגבלת למנהלי מערכת בלבד.
          </p>
          <Link 
            to="/dashboard"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            🏠 חזרה לדשבורד
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* כותרת */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="text-4xl">👑</div>
            <div>
              <h1 className="text-3xl font-bold text-purple-800">פאנל ניהול מערכת</h1>
              <p className="text-purple-600">ברוך הבא, {user.name} - מנהל מערכת</p>
            </div>
          </div>
        </div>

        {/* סטטיסטיקות מערכת */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl text-blue-600">👥</div>
              <div>
                <h3 className="font-bold text-gray-800">משתמשים פעילים</h3>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl text-green-600">📊</div>
              <div>
                <h3 className="font-bold text-gray-800">דוחות נוצרו</h3>
                <p className="text-2xl font-bold text-green-600">3,492</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl text-orange-600">🤖</div>
              <div>
                <h3 className="font-bold text-gray-800">שאילתות AI</h3>
                <p className="text-2xl font-bold text-orange-600">8,156</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="text-3xl text-purple-600">⚡</div>
              <div>
                <h3 className="font-bold text-gray-800">זמן פעילות</h3>
                <p className="text-2xl font-bold text-purple-600">99.9%</p>
              </div>
            </div>
          </div>
        </div>

        {/* כלי ניהול */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* ניהול משתמשים */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">ניהול משתמשים</h3>
            <p className="text-gray-600 mb-4">הוספה, עריכה ומחיקה של משתמשים במערכת</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
              פתח ניהול משתמשים
            </button>
          </div>

          {/* ניטור מערכת */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">ניטור מערכת</h3>
            <p className="text-gray-600 mb-4">צפייה בלוגים, ביצועים ושגיאות מערכת</p>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
              פתח מוקד בקרה
            </button>
          </div>

          {/* הגדרות גלובליות */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">הגדרות מערכת</h3>
            <p className="text-gray-600 mb-4">הגדרות גלובליות, תצורות ומדיניות</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors">
              פתח הגדרות
            </button>
          </div>

          {/* גיבויים */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">💾</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">גיבויים</h3>
            <p className="text-gray-600 mb-4">ניהול גיבויים ושחזור נתונים</p>
            <button className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition-colors">
              נהל גיבויים
            </button>
          </div>

          {/* דוחות מנהלים */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">דוחות מנהלים</h3>
            <p className="text-gray-600 mb-4">דוחות מפורטים על פעילות המערכת</p>
            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
              צור דוח מנהלים
            </button>
          </div>

          {/* אבטחה */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">אבטחה</h3>
            <p className="text-gray-600 mb-4">הרשאות, הצפנה ומדיניות אבטחה</p>
            <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors">
              פתח מרכז אבטחה
            </button>
          </div>
        </div>

        {/* פעילות אחרונה */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">פעילות אחרונה במערכת</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <div className="text-blue-600">👤</div>
              <div className="flex-1">
                <p className="font-medium">משתמש חדש נרשם: יוסי כהן</p>
                <p className="text-sm text-gray-500">לפני 5 דקות</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <div className="text-green-600">📊</div>
              <div className="flex-1">
                <p className="font-medium">דוח עסקי נוצר על ידי מרים לוי</p>
                <p className="text-sm text-gray-500">לפני 12 דקות</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
              <div className="text-orange-600">🤖</div>
              <div className="flex-1">
                <p className="font-medium">שאילתת AI מורכבת עובדה</p>
                <p className="text-sm text-gray-500">לפני 18 דקות</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
