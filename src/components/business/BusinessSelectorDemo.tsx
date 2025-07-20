import { BusinessSelector } from './BusinessSelector';
import { useBusiness } from '../../contexts/BusinessContext';

const BusinessSelectorDemo = () => {
  const { selectedBusiness, businesses } = useBusiness();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-slate-800">דמו - בחירת עסק</h3>
      
      <BusinessSelector />
      
      {selectedBusiness && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">עסק נבחר:</h4>
          <div className="text-sm text-green-700">
            <p><span className="font-medium">שם:</span> {selectedBusiness.name}</p>
            <p><span className="font-medium">מזהה:</span> {selectedBusiness.id}</p>
            <p><span className="font-medium">סטטוס:</span> {selectedBusiness.status}</p>
            {selectedBusiness.industry && (
              <p><span className="font-medium">תחום:</span> {selectedBusiness.industry}</p>
            )}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">מידע כללי:</h4>
        <div className="text-sm text-blue-700">
          <p>סה"כ עסקים זמינים: {businesses.length}</p>
          <p>עסק נבחר כרגע: {selectedBusiness ? '✅' : '❌'}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessSelectorDemo;
