// Types ו-Interfaces לתשתית הנתונים הפיננסיים

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color?: string;
  icon?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessType?: string;
  createdAt: string;
  settings: UserSettings;
}

export interface UserSettings {
  currency: 'ILS' | 'USD' | 'EUR';
  language: 'he' | 'en';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY';
  theme: 'light' | 'dark';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  period: {
    start: string;
    end: string;
  };
  transactions: Transaction[];
}

export interface MonthlyReport {
  month: string; // YYYY-MM format
  income: number;
  expenses: number;
  profit: number;
  topCategories: {
    income: { category: string; amount: number }[];
    expenses: { category: string; amount: number }[];
  };
}

// Response types for API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

// Filter and Query types
export interface TransactionFilters {
  type?: 'income' | 'expense';
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'amount' | 'description';
  sortOrder?: 'asc' | 'desc';
}
