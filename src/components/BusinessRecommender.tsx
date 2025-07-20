import React, { useState } from 'react';
import { generateBusinessRecommendations } from '../lib/aiRecommender';

interface BusinessRecommenderProps {
  className?: string;
}

export const BusinessRecommender: React.FC<BusinessRecommenderProps> = ({ className = '' }) => {
  const [businessInput, setBusinessInput] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateRecommendations = async () => {
    if (!businessInput.trim()) {
      alert('אנא תאר את המצב העסקי שלך');
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateBusinessRecommendations(businessInput);
      setRecommendations(result);
    } catch (error) {
      console.error('שגיאה ביצירת המלצות:', error);
      setRecommendations('אירעה שגיאה ביצירת ההמלצות. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const exportRecommendations = () => {
    if (!recommendations) return;
    
    const date = new Date().toLocaleDateString('he-IL');
    const content = `המלצות אסטרטגיות עסקיות - ${date}\n\n${recommendations}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `המלצות-עסקיות-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-lg">
          🎯
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">מנוע המלצות עסקיות AI</h2>
          <p className="text-gray-600">קבל המלצות אסטרטגיות מותאמות אישית לעסק שלך</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* קלט מידע עסקי */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            תאר את המצב העסקי הנוכחי שלך:
          </label>
          <textarea
            value={businessInput}
            onChange={(e) => setBusinessInput(e.target.value)}
            placeholder="לדוגמה: אני מנהל מסעדה עם 50 מקומות ישיבה. המחזור החודשי הוא 80,000 שקל אבל הרווחיות נמוכה. יש לי בעיות עם עלויות מלאי וקשיים למשוך לקוחות חדשים..."
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
            rows={6}
            dir="rtl"
          />
          <div className="text-sm text-gray-500 mt-2">
            💡 כלול מידע על: תחום העסק, מחזור כספי, אתגרים עיקריים, מטרות עתידיות
          </div>
        </div>

        {/* כפתור יצירת המלצות */}
        <button
          onClick={handleGenerateRecommendations}
          disabled={isLoading || !businessInput.trim()}
          className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all ${
            isLoading || !businessInput.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              מייצר המלצות אסטרטגיות...
            </div>
          ) : (
            '🚀 צור המלצות אסטרטגיות'
          )}
        </button>

        {/* תוצאות המלצות */}
        {recommendations && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">📋 ההמלצות שלך:</h3>
              <button
                onClick={exportRecommendations}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                💾 ייצא המלצות
              </button>
            </div>
            
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
              dir="rtl"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {recommendations}
            </div>
          </div>
        )}

        {/* סטטיסטיקות ומידע נוסף */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">🔍</div>
            <div className="text-sm font-medium text-blue-800">ניתוח נתונים</div>
            <div className="text-xs text-blue-600">חילוץ תובנות מהקלט</div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">📈</div>
            <div className="text-sm font-medium text-green-800">תבניות הצלחה</div>
            <div className="text-xs text-green-600">השוואה לעסקים מצליחים</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">🎯</div>
            <div className="text-sm font-medium text-purple-800">המלצות מותאמות</div>
            <div className="text-xs text-purple-600">פעולות קונקרטיות לביצוע</div>
          </div>
        </div>
      </div>
    </div>
  );
};
