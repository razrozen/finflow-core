import { useState } from 'react';
import { useBusinessContext } from '../contexts/BusinessContext';
import { useAuth } from '../contexts/AuthContext';

const BusinessSwitcher = () => {
  const { businesses, currentBusiness, switchBusiness } = useBusinessContext();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || businesses.length <= 1) {
    return null;
  }

  const handleSwitch = (businessId: string) => {
    switchBusiness(businessId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* כפתור בחירת עסק */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg transition-colors w-full text-right"
      >
        <div className="flex-1">
          <div className="text-sm font-medium">
            {currentBusiness?.name || 'בחר עסק'}
          </div>
          <div className="text-xs text-slate-300">
            {businesses.length} עסקים זמינים
          </div>
        </div>
        <div className="text-lg">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {/* רשימת עסקים */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {businesses.map((business) => (
            <button
              key={business.id}
              onClick={() => handleSwitch(business.id)}
              className={`w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                currentBusiness?.id === business.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {/* סטטוס עסק */}
                <div className={`w-3 h-3 rounded-full ${
                  business.status === 'active' ? 'bg-green-500' : 
                  business.status === 'inactive' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
                
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm">
                    {business.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {business.industry || 'ללא תחום'}
                    {business.ownerId === user.id && (
                      <span className="mr-2 text-blue-600">👑 בעלים</span>
                    )}
                    {business.permissions?.advisorId === user.id && (
                      <span className="mr-2 text-green-600">🧑‍💼 יועץ</span>
                    )}
                    {business.permissions?.accountantId === user.id && (
                      <span className="mr-2 text-purple-600">📊 רו"ח</span>
                    )}
                  </div>
                </div>
                
                {currentBusiness?.id === business.id && (
                  <div className="text-blue-600">✓</div>
                )}
              </div>
            </button>
          ))}
          
          {/* קישור להוספת עסק חדש */}
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-3 py-2 text-right text-blue-600 hover:bg-blue-50 rounded text-sm font-medium transition-colors"
            >
              ➕ הוסף עסק חדש
            </button>
          </div>
        </div>
      )}
      
      {/* רקע לסגירה */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default BusinessSwitcher;
