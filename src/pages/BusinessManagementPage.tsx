import { useState } from 'react';
import { useBusinessContext } from '../contexts/BusinessContext';
import { useAuth } from '../contexts/AuthContext';
import type { CreateBusinessRequest } from '../entities/business';
import { INDUSTRIES } from '../entities/business';

const BusinessManagementPage = () => {
  const { businesses, currentBusiness, createBusiness, deleteBusiness, isLoading, error } = useBusinessContext();
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState<CreateBusinessRequest>({
    name: '',
    ownerId: user?.id || '',
    industry: '',
    businessNumber: '',
    companyId: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: 'ישראל'
    },
    contact: {
      phone: '',
      email: '',
      website: ''
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      ownerId: user?.id || '',
      industry: '',
      businessNumber: '',
      companyId: '',
      address: {
        street: '',
        city: '',
        zipCode: '',
        country: 'ישראל'
      },
      contact: {
        phone: '',
        email: '',
        website: ''
      }
    });
  };

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBusiness(formData);
      setShowCreateForm(false);
      resetForm();
    } catch (err) {
      console.error('שגיאה ביצירת עסק:', err);
    }
  };

  const handleDeleteBusiness = async (businessId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את העסק? פעולה זו לא ניתנת לביטול.')) {
      try {
        await deleteBusiness(businessId);
      } catch (err) {
        console.error('שגיאה במחיקת עסק:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">ניהול עסקים</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          ➕ הוסף עסק חדש
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* עסק נוכחי */}
      {currentBusiness && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">עסק פעיל כעת</h3>
          <div className="flex items-center gap-4">
            <div className="text-3xl">🏢</div>
            <div>
              <h4 className="text-lg font-medium text-gray-800">{currentBusiness.name}</h4>
              <p className="text-gray-600">{currentBusiness.industry || 'ללא תחום'}</p>
              {currentBusiness.companyId && (
                <p className="text-sm text-gray-500">ח.פ: {currentBusiness.companyId}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* רשימת עסקים */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏢</div>
                <div>
                  <h3 className="font-bold text-gray-800">{business.name}</h3>
                  <p className="text-sm text-gray-600">{business.industry || 'ללא תחום'}</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                business.status === 'active' ? 'bg-green-500' : 
                business.status === 'inactive' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            </div>

            {/* פרטי עסק */}
            <div className="space-y-2 mb-4">
              {business.companyId && (
                <p className="text-sm text-gray-600">ח.פ: {business.companyId}</p>
              )}
              {business.businessNumber && (
                <p className="text-sm text-gray-600">עוסק: {business.businessNumber}</p>
              )}
              {business.address?.city && (
                <p className="text-sm text-gray-600">📍 {business.address.city}</p>
              )}
              {business.contact?.phone && (
                <p className="text-sm text-gray-600">📞 {business.contact.phone}</p>
              )}
            </div>

            {/* תפקיד המשתמש */}
            <div className="mb-4">
              {business.ownerId === user?.id && (
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">👑 בעלים</span>
              )}
              {business.permissions?.advisorId === user?.id && (
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs ml-2">🧑‍💼 יועץ</span>
              )}
              {business.permissions?.accountantId === user?.id && (
                <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs ml-2">📊 רו"ח</span>
              )}
              {user?.role === 'admin' && business.ownerId !== user.id && (
                <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs ml-2">⚡ אדמין</span>
              )}
            </div>

            {/* פעולות */}
            <div className="flex gap-2">
              <button
                onClick={() => {/* TODO: הוסף עריכה */}}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm"
              >
                ✏️ ערוך
              </button>
              
              {(business.ownerId === user?.id || user?.role === 'admin') && (
                <button
                  onClick={() => handleDeleteBusiness(business.id)}
                  className="bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors text-sm"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* טופס יצירת עסק */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">הוסף עסק חדש</h3>
            
            <form onSubmit={handleCreateBusiness} className="space-y-4">
              <input
                type="text"
                placeholder="שם העסק *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                required
                dir="rtl"
              />
              
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                dir="rtl"
              >
                <option value="">בחר תחום פעילות</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="מספר עוסק"
                value={formData.businessNumber}
                onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                dir="rtl"
              />
              
              <input
                type="text"
                placeholder="ח.פ / ע.ר"
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-right"
                dir="rtl"
              />
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !formData.name.trim()}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'יוצר...' : 'צור עסק'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessManagementPage;
