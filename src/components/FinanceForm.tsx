import React, { useState } from 'react';
import { financeService } from '../lib/financeService';

type Props = {
  onSubmitSuccess: () => void;
};

const FinanceForm = ({ onSubmitSuccess }: Props) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    await financeService.add({
      type,
      category,
      amount: Number(amount),
      date,
    });

    // איפוס שדות
    setCategory('');
    setAmount('');
    setDate('');
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 space-y-4">
      <div className="flex space-x-4 rtl:space-x-reverse">
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="radio"
            name="type"
            value="income"
            checked={type === 'income'}
            onChange={() => setType('income')}
          />
          <span>הכנסה</span>
        </label>
        <label className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
          />
          <span>הוצאה</span>
        </label>
      </div>

      <input
        type="text"
        placeholder="קטגוריה (לדוג׳ שכירות, שירותים...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded p-2 text-right"
      />
      <input
        type="number"
        placeholder="סכום (₪)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border rounded p-2 text-right"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded p-2 text-right"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        הוסף תנועה
      </button>
    </form>
  );
};

export default FinanceForm;
