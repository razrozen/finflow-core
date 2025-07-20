import React from 'react';
import { Link } from 'react-router-dom';
import { BusinessRecommender } from '../components/BusinessRecommender';
import { useAuth } from '../contexts/AuthContext';

export const StrategicAIPage: React.FC = () => {
  const { user } = useAuth();

  // הגנת הרשאות - רק ליועצים ומעלה
  if (user?.role === "owner") {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">גישה מוגבלת</h2>
          <p className="text-red-600 mb-6">
            המערכת המתקדמת זמינה ליועצים עסקיים ומנהלי מערכת בלבד.
          </p>
          <div className="space-y-3">
            <Link 
              to="/advisor"
              className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              🧠 נסה את היועץ החכם הפשוט
            </Link>
            <Link 
              to="/dashboard"
              className="block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              🏠 חזרה לדשבורד
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* אזהרה על ממשק חדש */}
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✨</div>
            <div className="flex-1">
              <h3 className="font-bold text-green-800 mb-1">חדש! גרסה פשוטה וזריזה</h3>
              <p className="text-green-700 text-sm mb-2">
                רוצה ממשק פשוט יותר? נסה את היועץ החכם החדש שלנו
              </p>
              <Link 
                to="/advisor"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                🚀 יועץ חכם פשוט
              </Link>
            </div>
          </div>
        </div>
        
        {/* כותרת ראשית */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🧠 מערכת AI לתמיכה בהחלטות עסקיות
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            קבל המלצות אסטרטגיות מותאמות אישית מבוססות על ניתוח מתקדם של הנתונים העסקיים שלך
          </p>
        </div>

        {/* תיאור המערכת */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">איך המערכת עובדת?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🔍
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Data Analyzer</h3>
              <p className="text-sm text-gray-600">
                ניתוח חכם של הקלטים שלך - נתוני לקוחות, מחזור, הוצאות ואתגרים עסקיים
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                📈
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Pattern Matcher</h3>
              <p className="text-sm text-gray-600">
                השוואה מול תבניות הצלחה עסקיות מוכחות בתחום שלך
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                🎯
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Recommendation Engine</h3>
              <p className="text-sm text-gray-600">
                מחולל המלצות אוטומטי המתאים פתרונות ספציפיים למצב העסקי שלך
              </p>
            </div>
          </div>
        </div>

        {/* המרכיב הראשי */}
        <BusinessRecommender />

        {/* דוגמאות לשימוש */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">דוגמאות לשימוש:</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-600 mb-2">🍕 מסעדה</h3>
              <p className="text-sm text-gray-600">
                "אני מנהל פיצרייה קטנה עם 30 מקומות ישיבה. המחזור החודשי הוא 60,000 שקל אבל הרווחיות נמוכה בגלל עלויות מלאי גבוהות ותחרות קשה באזור..."
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-green-600 mb-2">💻 סטארט-אפ טכנולוגי</h3>
              <p className="text-sm text-gray-600">
                "פיתחנו אפליקציה חדשנית לניהול פרויקטים. יש לנו 500 משתמשים רשומים אבל רק 50 משלמים. אנחנו מחפשים דרכים להגדיל את שיעור ההמרה..."
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-purple-600 mb-2">🏪 חנות קמעונאית</h3>
              <p className="text-sm text-gray-600">
                "יש לי חנות בגדים בקניון. המכירות צנחו ב-30% בחודשים האחרונים. אני רואה שהלקוחות עוברים לקנייה אונליין אבל לא יודע איך להתמודד עם זה..."
              </p>
            </div>
          </div>
        </div>

        {/* יתרונות המערכת */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">למה להשתמש במערכת שלנו?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-bold mb-1">המלצות מיידיות</h3>
                <p className="text-sm opacity-90">קבל המלצות תוך דקות במקום שבועות של ייעוץ</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-bold mb-1">מותאם אישית</h3>
                <p className="text-sm opacity-90">כל המלצה מותאמת לתחום ולמצב הספציפי שלך</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div>
                <h3 className="font-bold mb-1">מבוסס נתונים</h3>
                <p className="text-sm opacity-90">ההמלצות מבוססות על ניתוח של תבניות הצלחה מוכחות</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-2xl">💰</div>
              <div>
                <h3 className="font-bold mb-1">חסכוני</h3>
                <p className="text-sm opacity-90">חסוך עלויות ייעוץ יקר וקבל תובנות איכותיות</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
