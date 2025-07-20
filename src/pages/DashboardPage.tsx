import { Link } from 'react-router-dom';
import { useBusinessContext } from '../contexts/BusinessContext';
import QuickBusinessCreator from '../components/QuickBusinessCreator';
import BusinessStatus from '../components/BusinessStatus';
import BusinessManagerDemo from '../components/BusinessManagerDemo';
import { BusinessSelectorDemo } from '../components/business';
import DocumentUpload from '../modules/documents/components/DocumentUpload';
import DocumentsList from '../modules/documents/components/DocumentsList';
import type { FinancialData } from '../modules/documents/services/ocrService';

const DashboardPage = () => {
  const { currentBusiness, businesses } = useBusinessContext();

  // פונקציה לטיפול בטקסט מחולץ מ-OCR
  const handleTextExtracted = (text: string, financialData: FinancialData) => {
    console.log('📄 טקסט נחלץ:', text);
    console.log('💰 מידע פיננסי:', financialData);
    
    // כאן נוכל לשלוח את הנתונים לשרת או לשמור מקומית
    // לדוגמה: שמירת הקבלה לרשימת ההוצאות
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">דשבורד ראשי</h2>
        
        {/* אינדיקטור עסק פעיל */}
        {currentBusiness && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-blue-800">
                עובד על: <strong>{currentBusiness.name}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* הודעה אם אין עסקים */}
      {businesses.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🏢</div>
          <h3 className="text-xl font-bold text-yellow-800 mb-2">אין עסקים רשומים</h3>
          <p className="text-yellow-700 mb-6">צור עסק ראשון כדי להתחיל לעבוד עם המערכת</p>
          
          <QuickBusinessCreator />
          
          <div className="mt-4 pt-4 border-t border-yellow-200">
            <Link 
              to="/businesses" 
              className="text-yellow-600 hover:text-yellow-800 underline text-sm"
            >
              או עבור לעמוד ניהול עסקים המלא
            </Link>
          </div>
        </div>
      )}
      
      <p className="text-slate-600">
        ברוך הבא ל-FinFlow – עוזר הניהול הפיננסי שלך. כאן תראה נתונים מרכזיים, המלצות חכמות וסטטוס עסקי כללי.
      </p>
      
      {/* הצגת מצב העסק הנוכחי */}
      {currentBusiness && (
        <BusinessStatus />
      )}
      
      {/* הדגשת המערכת החדשה */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="text-5xl">🧠</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">🚀 חדש! מערכת AI לתמיכה בהחלטות עסקיות</h3>
            <p className="text-lg opacity-90 mb-4">
              מנוע AI מתקדם שמספק המלצות אסטרטגיות מותאמות אישית לעסק שלך
            </p>
            <div className="flex gap-3">
              <Link 
                to="/strategic-ai"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                🎯 התחל עכשיו
              </Link>
              <div className="text-sm opacity-75 self-center">
                ⚡ קבל המלצות תוך דקות | 🎯 מותאם אישית | 📊 מבוסס נתונים
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* תכונות מהירות */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link to="/ai-assistant" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="font-bold text-gray-800 mb-2">AI עסקי</h3>
          <p className="text-sm text-gray-600">יועצים AI מומחים לכל תחום עסקי</p>
        </Link>
        
        <Link to="/advisor" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="font-bold text-gray-800 mb-2">יועץ חכם</h3>
          <p className="text-sm text-gray-600">המלצות AI אסטרטגיות מיידיות</p>
        </Link>
        
        <Link to="/finance" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="font-bold text-gray-800 mb-2">ניהול פיננסי</h3>
          <p className="text-sm text-gray-600">מעקב הכנסות והוצאות</p>
        </Link>
        
        <Link to="/reports" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold text-gray-800 mb-2">דוחות</h3>
          <p className="text-sm text-gray-600">ניתוח נתונים ודוחות AI</p>
        </Link>
      </div>

      {/* העלאת מסמכים עם OCR */}
      <div className="mt-8">
        <DocumentUpload 
          onTextExtracted={handleTextExtracted}
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* רשימת מסמכים שמורים */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">📚 מסמכים שמורים</h3>
        <DocumentsList />
      </div>
      
      {/* דמו למפתחים - ניהול עסקים */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BusinessSelectorDemo />
            <BusinessManagerDemo />
          </div>
        </div>
      )}
      
      {/* כאן נוסיף בעתיד גרפים, טבלאות ואינדיקטורים */}
    </div>
  );
};

export default DashboardPage;
