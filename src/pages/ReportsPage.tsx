import ReportGenerator from "../components/ReportGenerator";
import { PermissionGuard, AdvisorOrAbove } from "../components/PermissionGuard";
import { useAuth } from "../contexts/AuthContext";

const sampleData = [
  { month: "ינואר", הכנסות: 22000, הוצאות: 18000 },
  { month: "פברואר", הכנסות: 28500, הוצאות: 21000 },
  { month: "מרץ", הכנסות: 30200, הוצאות: 23500 },
  { month: "אפריל", הכנסות: 26400, הוצאות: 20000 },
  { month: "מאי", הכנסות: 32000, הוצאות: 24500 },
  { month: "יוני", הכנסות: 29800, הוצאות: 22800 },
];

const ReportsPage = () => {
  const { user } = useAuth();
  
  // חישוב רווח לכל חודש
  const dataWithProfit = sampleData.map(item => ({
    ...item,
    רווח: item.הכנסות - item.הוצאות
  }));

  // חישוב סטטיסטיקות כלליות
  const totalIncome = sampleData.reduce((sum, item) => sum + item.הכנסות, 0);
  const totalExpenses = sampleData.reduce((sum, item) => sum + item.הוצאות, 0);
  const totalProfit = totalIncome - totalExpenses;
  const avgMonthlyIncome = Math.round(totalIncome / sampleData.length);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">דוחות וניתוחים</h1>
        <div className="text-sm text-gray-600">
          נצפה על ידי: {user?.name} ({user?.role === 'admin' ? 'מנהל מערכת' : user?.role === 'advisor' ? 'יועץ עסקי' : 'בעל עסק'})
        </div>
      </div>

      {/* הודעת הרשאות */}
      <PermissionGuard 
        ownerOrAbove 
        fallback={
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">🚫 גישה מוגבלת</h2>
            <p className="text-red-600">אינך מורשה לצפות בדוחות. נדרשת הרשאת בעל עסק לפחות.</p>
          </div>
        }
      >
        {/* כרטיסי סיכום - זמינים לכולם */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-blue-600">סך הכנסות</h3>
          <p className="text-2xl font-bold text-blue-900">{totalIncome.toLocaleString()} ₪</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-red-600">סך הוצאות</h3>
          <p className="text-2xl font-bold text-red-900">{totalExpenses.toLocaleString()} ₪</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-green-600">רווח נקי</h3>
          <p className="text-2xl font-bold text-green-900">{totalProfit.toLocaleString()} ₪</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-purple-600">ממוצע חודשי</h3>
          <p className="text-2xl font-bold text-purple-900">{avgMonthlyIncome.toLocaleString()} ₪</p>
        </div>
      </div>

      {/* גרף הכנסות פשוט */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">גרף הכנסות חודשיות</h2>
        <div className="space-y-2">
          {sampleData.map((item, index) => {
            const percentage = (item.הכנסות / Math.max(...sampleData.map(d => d.הכנסות))) * 100;
            return (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-16 text-sm">{item.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {item.הכנסות.toLocaleString()} ₪
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* טבלת נתונים מפורטת */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold">נתונים חודשיים מפורטים</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-right">חודש</th>
                <th className="p-3 text-right">הכנסות</th>
                <th className="p-3 text-right">הוצאות</th>
                <th className="p-3 text-right">רווח</th>
                <th className="p-3 text-right">שיעור רווחיות</th>
              </tr>
            </thead>
            <tbody>
              {dataWithProfit.map((item, index) => {
                const profitMargin = ((item.רווח / item.הכנסות) * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{item.month}</td>
                    <td className="p-3 text-blue-600 font-medium">{item.הכנסות.toLocaleString()} ₪</td>
                    <td className="p-3 text-red-600 font-medium">{item.הוצאות.toLocaleString()} ₪</td>
                    <td className={`p-3 font-medium ${item.רווח > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.רווח.toLocaleString()} ₪
                    </td>
                    <td className={`p-3 font-medium ${parseFloat(profitMargin) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {profitMargin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* תובנות ומסקנות */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">תובנות עסקיות</h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">📈 מגמת צמיחה</h3>
            <p className="text-blue-700">החודש הטוב ביותר היה מאי עם הכנסות של {Math.max(...sampleData.map(d => d.הכנסות)).toLocaleString()} ₪</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800">⚠️ נקודת שיפור</h3>
            <p className="text-yellow-700">יש לבחון את הירידה בהכנסות באפריל - ירידה של {((30200 - 26400) / 30200 * 100).toFixed(1)}%</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">💡 המלצה</h3>
            <p className="text-green-700">שמירה על שיעור רווחיות ממוצע של {((totalProfit / totalIncome) * 100).toFixed(1)}% - ביצועים טובים!</p>
          </div>
        </div>
      </div>

      {/* מחולל דוחות AI - רק ליועצים ומעלה */}
      <AdvisorOrAbove fallback={
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <h3 className="font-bold text-orange-800 mb-1">🔒 תכונה מתקדמת</h3>
          <p className="text-sm text-orange-600">מחולל דוחות AI זמין ליועצים עסקיים ומנהלי מערכת בלבד</p>
        </div>
      }>
        <ReportGenerator />
      </AdvisorOrAbove>
      
      </PermissionGuard>
    </div>
  );
};

export default ReportsPage;
