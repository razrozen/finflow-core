import { useBusiness } from '../contexts/BusinessContext';

// דוגמה לשימוש פשוט ב-BusinessContext
const BusinessStatus = () => {
  const { selectedBusiness } = useBusiness();

  if (!selectedBusiness) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center">
        <div className="text-2xl mb-2">🏢</div>
        <p className="text-gray-600">לא נבחר עסק כרגע</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div>
            <h3 className="font-bold text-blue-800">{selectedBusiness.name}</h3>
            <p className="text-sm text-blue-600">
              {selectedBusiness.industry || 'ללא תחום'}
            </p>
          </div>
        </div>
        
        <div className="text-xs text-blue-500">
          ID: {selectedBusiness.id.slice(-8)}
        </div>
      </div>
      
      {selectedBusiness.companyId && (
        <div className="mt-2 text-xs text-blue-600">
          ח.פ: {selectedBusiness.companyId}
        </div>
      )}
    </div>
  );
};

export default BusinessStatus;
