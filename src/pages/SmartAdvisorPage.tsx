import { useState } from "react";
import { Link } from "react-router-dom";
import { generateBusinessRecommendations } from "../lib/aiRecommender";
import { AdvisorOrAbove } from "../components/PermissionGuard";

export default function SmartAdvisorPage() {
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('אנא תאר את המצב העסקי שלך');
      return;
    }
    
    setRecommendations("⏳ מפיק המלצות...");
    try {
      const res = await generateBusinessRecommendations(input);
      setRecommendations(res);
    } catch (error) {
      console.error('שגיאה ביצירת המלצות:', error);
      setRecommendations('אירעה שגיאה ביצירת ההמלצות. אנא נסה שוב.');
    }
  };

  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* הפנייה לגרסה מתקדמת */}
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🔬</div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-800 mb-1">רוצה ניתוח מתקדם יותר?</h3>
              <p className="text-blue-700 text-sm mb-2">
                נסה את המערכת המתקדמת עם ניתוח נתונים, זיהוי תבניות והמלצות מפורטות
              </p>
              <Link 
                to="/strategic-ai"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                🧠 למערכת המתקדמת
              </Link>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-blue-700 mb-2">🧠 מנוע המלצות AI עסקי</h1>
        <p className="text-gray-600 mb-6">קבל המלצות אסטרטגיות מותאמות אישית לעסק שלך</p>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              תאר את המצב העסקי שלך:
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="לדוגמה: אני מנהל מסעדה עם 50 מקומות ישיבה. המחזור החודשי הוא 80,000 שקל אבל הרווחיות נמוכה. יש לי בעיות עם עלויות מלאי וקשיים למשוך לקוחות חדשים..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-lg text-right focus:border-blue-500 focus:outline-none resize-none"
              dir="rtl"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!input.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium text-lg transition-all ${
              !input.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
            }`}
          >
            🚀 צור המלצות אסטרטגיות
          </button>

          {recommendations && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 ההמלצות שלך:</h3>
              <div 
                className="whitespace-pre-line text-gray-700 leading-relaxed"
                dir="rtl"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                {recommendations}
              </div>
            </div>
          )}
        </div>

        {/* כלים מתקדמים ליועצים */}
        <AdvisorOrAbove>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">🧑‍💼 כלים מקצועיים ליועצים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-gray-800 mb-2">📊 ניתוח פיננסי מתקדם</h3>
                <p className="text-gray-600 text-sm mb-3">כלי מתקדם לניתוח תזרים מזומנים ורווחיות</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  פתח כלי ניתוח
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-gray-800 mb-2">📈 תחזיות עסקיות</h3>
                <p className="text-gray-600 text-sm mb-3">מודלים למנבא צמיחה והתפתחות עתידית</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  צור תחזית
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-gray-800 mb-2">🎯 אסטרטגיית שיווק</h3>
                <p className="text-gray-600 text-sm mb-3">תכנון קמפיינים וניתוח ROI</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  תכנן קמפיין
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-gray-800 mb-2">💼 ייעוץ השקעות</h3>
                <p className="text-gray-600 text-sm mb-3">המלצות השקעה והערכת סיכונים</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                  נתח השקעות
                </button>
              </div>
            </div>
          </div>
        </AdvisorOrAbove>

        {/* מידע נוסף */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💡 טיפים לקבלת המלצות טובות יותר:</h2>
          <ul className="space-y-2 text-gray-600" dir="rtl">
            <li>• תאר את תחום העסק שלך בפירוט</li>
            <li>• ציין מחזור כספי חודשי/שנתי</li>
            <li>• פרט על האתגרים והבעיות הקיימות</li>
            <li>• הזכר מטרות וחזון עתידיים</li>
            <li>• כלול נתונים על לקוחות ותחרות</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
