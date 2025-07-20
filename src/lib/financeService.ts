type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
};

let mockData: Transaction[] = [
  { id: '1', type: 'income', category: 'מכירות', amount: 5000, date: '2025-07-01' },
  { id: '2', type: 'expense', category: 'שכירות', amount: 2000, date: '2025-07-02' },
];

export const financeService = {
  getAll: async (): Promise<Transaction[]> => {
    return Promise.resolve(mockData);
  },

  add: async (tx: Omit<Transaction, 'id'>): Promise<void> => {
    mockData.push({ ...tx, id: crypto.randomUUID() });
  },

  remove: async (id: string): Promise<void> => {
    mockData = mockData.filter((tx) => tx.id !== id);
  },
};
