import { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateFinancialStrategy } from '../services/ai';

const StrategyPage = () => {
  const [revenueGoal, setRevenueGoal] = useState('');
  const [strategy, setStrategy] = useState('');

  const handleGenerate = () => {
    if (!revenueGoal.trim()) return;
    setStrategy(generateFinancialStrategy(Number(revenueGoal)));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">בנה אסטרטגיה פיננסית</h2>

      {/* הודעה על המערכת החדשה */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🧠</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-800 mb-2">חדש! מערכת AI אסטרטגית מתקדמת</h3>
            <p className="text-purple-700 mb-3">
              קבל המלצות אסטרטגיות מותאמות אישית מבוססות על ניתוח מתקדם של הנתונים העסקיים שלך
            </p>
            <Link 
              to="/strategic-ai"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              🚀 נסה את המערכת החדשה
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="revenue" className="block font-medium">
          מהו יעד ההכנסות שלך בחודש? (₪)
        </label>
        <input
          type="number"
          id="revenue"
          className="w-full border px-4 py-2 rounded text-right"
          placeholder="לדוגמה: 30000"
          value={revenueGoal}
          onChange={(e) => setRevenueGoal(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          צור אסטרטגיה
        </button>
      </div>

      {strategy && (
        <div className="bg-white p-4 rounded shadow text-sm whitespace-pre-line">
          {strategy}
        </div>
      )}
    </div>
  );
};

export default StrategyPage;
