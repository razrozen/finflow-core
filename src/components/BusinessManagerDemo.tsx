import { useBusinessContext } from '../contexts/BusinessContext';
import { useAuth } from '../contexts/AuthContext';

// דוגמה למימוש מתקדם עם כל הפונקציונליות
const BusinessManagerDemo = () => {
  const { 
    businesses, 
    currentBusiness, 
    createBusiness, 
    updateBusiness, 
    deleteBusiness,
    switchBusiness,
    isLoading,
    error 
  } = useBusinessContext();
  
  const { user } = useAuth();

  const handleCreateSample = async () => {
    if (!user) return;
    
    try {
      await createBusiness({
        name: `עסק דוגמה ${Date.now()}`,
        ownerId: user.id,
        industry: 'שירותים'
      });
    } catch (err) {
      console.error('שגיאה ביצירת עסק:', err);
    }
  };

  const handleUpdateCurrent = async () => {
    if (!currentBusiness) return;
    
    try {
      await updateBusiness(currentBusiness.id, {
        name: currentBusiness.name + ' (עודכן)',
        lastActivityAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('שגיאה בעדכון עסק:', err);
    }
  };

  const handleDeleteCurrent = async () => {
    if (!currentBusiness) return;
    
    if (window.confirm('האם אתה בטוח שברצונך למחוק את העסק?')) {
      try {
        await deleteBusiness(currentBusiness.id);
      } catch (err) {
        console.error('שגיאה במחיקת עסק:', err);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        🛠️ Business Manager Demo
      </h3>
      
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* מידע על המצב הנוכחי */}
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-600">
            📊 <strong>סך הכל עסקים:</strong> {businesses.length}
          </p>
          <p className="text-sm text-gray-600">
            🏢 <strong>עסק נוכחי:</strong> {currentBusiness?.name || 'אין'}
          </p>
          <p className="text-sm text-gray-600">
            ⏳ <strong>טוען:</strong> {isLoading ? 'כן' : 'לא'}
          </p>
        </div>

        {/* כפתורי פעולה */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleCreateSample}
            disabled={isLoading}
            className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
          >
            ➕ צור עסק דוגמה
          </button>
          
          <button
            onClick={handleUpdateCurrent}
            disabled={isLoading || !currentBusiness}
            className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            ✏️ עדכן עסק נוכחי
          </button>
          
          <button
            onClick={handleDeleteCurrent}
            disabled={isLoading || !currentBusiness}
            className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 disabled:opacity-50"
          >
            🗑️ מחק עסק נוכחי
          </button>
        </div>

        {/* רשימת עסקים לבחירה */}
        {businesses.length > 1 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              החלף עסק:
            </p>
            <div className="flex gap-2 flex-wrap">
              {businesses.map((business) => (
                <button
                  key={business.id}
                  onClick={() => switchBusiness(business.id)}
                  className={`px-3 py-1 rounded text-xs ${
                    currentBusiness?.id === business.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {business.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessManagerDemo;
