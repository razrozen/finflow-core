import React, { useState } from 'react';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { AdminOnly } from '../components/PermissionGuard';

const SettingsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    businessType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('📝 הפרטים נשמרו בהצלחה!');
    // בעתיד: שלח ל-API או אחסן ב-localStorage
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">הגדרות מערכת</h2>
      
      {/* מחליף תפקידים */}
      <RoleSwitcher />
      
      {/* הגדרות משתמש */}
      <div className="max-w-xl space-y-6">
        <h3 className="text-2xl font-bold text-slate-700">הגדרות משתמש</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="שם מלא"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-right"
          />
          <input
            name="email"
            type="email"
            placeholder="דוא״ל"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-right"
          />
          <input
            name="businessType"
            placeholder="תחום עיסוק"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded text-right"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            שמור שינויים
          </button>
        </form>
      </div>

      {/* הגדרות מערכת מתקדמות - רק למנהלי מערכת */}
      <AdminOnly>
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <span>⚠️</span>
            הגדרות מערכת מתקדמות
          </h3>
          <p className="text-red-700 mb-4">הגדרות אלו משפיעות על כל המערכת ועל כל המשתמשים</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-bold text-gray-800 mb-2">הגדרות מסד נתונים</h4>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                נהל גיבויים
              </button>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h4 className="font-bold text-gray-800 mb-2">הגדרות אבטחה</h4>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                נהל הצפנה
              </button>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h4 className="font-bold text-gray-800 mb-2">הגדרות API</h4>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                נהל מפתחות
              </button>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h4 className="font-bold text-gray-800 mb-2">הגדרות ביצועים</h4>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                נהל קאש
              </button>
            </div>
          </div>
        </div>
      </AdminOnly>
    </div>
  );
};

export default SettingsPage;
