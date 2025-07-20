import { useEffect, useState } from 'react';
import { financeService } from '../lib/financeService';
import FinanceForm from '../components/FinanceForm';

const FinancePage = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const result = await financeService.getAll();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-right" dir="rtl">
      <h1 className="text-2xl font-bold text-slate-800">ניהול פיננסי</h1>

      <FinanceForm onSubmitSuccess={fetchData} />

      <table className="w-full bg-white shadow-md rounded-md text-right">
        <thead>
          <tr className="bg-slate-100">
            <th className="p-2">סוג</th>
            <th className="p-2">קטגוריה</th>
            <th className="p-2">סכום</th>
            <th className="p-2">תאריך</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <tr key={tx.id} className="border-b">
              <td className="p-2">{tx.type === 'income' ? 'הכנסה' : 'הוצאה'}</td>
              <td className="p-2">{tx.category}</td>
              <td className="p-2">{tx.amount.toLocaleString()} ₪</td>
              <td className="p-2">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancePage;
