import { useState } from 'react';
import { useBusinessContext } from '../contexts/BusinessContext';
import { useAuth } from '../contexts/AuthContext';
import type { CreateBusinessRequest } from '../entities/business';
import { INDUSTRIES } from '../entities/business';

interface QuickBusinessCreatorProps {
  onComplete?: () => void;
}

const QuickBusinessCreator = ({ onComplete }: QuickBusinessCreatorProps) => {
  const { createBusiness, isLoading } = useBusinessContext();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateBusinessRequest>({
    name: '',
    ownerId: user?.id || '',
    industry: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      await createBusiness(formData);
      setShowForm(false);
      setFormData({
        name: '',
        ownerId: user?.id || '',
        industry: '',
      });
      onComplete?.();
    } catch (error) {
      console.error('שגיאה ביצירת עסק:', error);
    }
  };

  if (!showForm) {
    return (
      <div className="text-center">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          ➕ צור עסק ראשון
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">יצירת עסק חדש</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            שם העסק *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-right focus:border-blue-500 focus:outline-none"
            placeholder="הכנס שם העסק..."
            required
            dir="rtl"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            תחום פעילות
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-right focus:border-blue-500 focus:outline-none"
            dir="rtl"
          >
            <option value="">בחר תחום...</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
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
  );
};

export default QuickBusinessCreator;
