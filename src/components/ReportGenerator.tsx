import { useState } from "react";
import { getAiBusinessReport } from "../lib/aiReportClient";

const ReportGenerator = () => {
  const [input, setInput] = useState("");
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setReport("⏳ מפיק דוח, נא להמתין...");
    
    try {
      const aiResponse = await getAiBusinessReport(input);
      setReport(aiResponse);
    } catch (error) {
      console.error("Error generating report:", error);
      setReport("מצטער, יש בעיה ביצירת הדוח. אנא נסה שוב מאוחר יותר.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4" dir="rtl">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">🤖 מחולל דוחות עסקיים AI</h2>
        <p className="text-gray-600 text-sm mt-1">הזן נתונים עסקיים וקבל ניתוח מקצועי מפורט</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            נתוני החברה שלך:
          </label>
          <textarea
            placeholder="לדוגמה: החברה שלי עוסקת בפיתוח אפליקציות. השנה הכנסות: 500,000 ₪, הוצאות: 350,000 ₪. יש לנו 5 עובדים ו-50 לקוחות פעילים. הבעיה העיקרית היא שמירה על לקוחות קיימים..."
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg text-right resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        
        <button
          onClick={generateReport}
          disabled={!input.trim() || isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            !input.trim() || isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isLoading ? "🔄 יוצר דוח..." : "📊 צור דוח AI"}
        </button>

        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="mr-3 text-gray-600">ה-AI מנתח את הנתונים שלך...</span>
          </div>
        )}

        {report && !isLoading && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">📋 הדוח העסקי שלך:</h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <pre className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed font-sans">
                {report}
              </pre>
            </div>
            
            {/* כפתורי פעולה */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigator.clipboard.writeText(report)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                📋 העתק דוח
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([report], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "finflow-business-report.txt";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                📄 ייצוא קובץ
              </button>
              <button
                onClick={() => setReport("")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
              >
                🗑️ נקה
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
