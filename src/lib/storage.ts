// שירות אחסון בסיסי עם LocalStorage
// בעתיד ניתן להחליף בקלות למסד נתונים אמיתי

import type { 
  Transaction, 
  Category, 
  FinancialSummary, 
  ApiResponse,
  TransactionFilters,
  QueryOptions,
  PaginatedResponse 
} from './types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finflow_transactions',
  CATEGORIES: 'finflow_categories',
  USER: 'finflow_user',
  USER_SETTINGS: 'finflow_user_settings'
};

class StorageService {
  // =============== TRANSACTION METHODS ===============
  
  async getTransactions(filters?: TransactionFilters, options?: QueryOptions): Promise<PaginatedResponse<Transaction>> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      let transactions: Transaction[] = stored ? JSON.parse(stored) : [];

      // Apply filters
      if (filters) {
        transactions = this.filterTransactions(transactions, filters);
      }

      // Apply sorting
      if (options?.sortBy) {
        transactions = this.sortTransactions(transactions, options.sortBy, options.sortOrder || 'desc');
      }

      // Apply pagination
      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = transactions.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        pagination: {
          page,
          limit,
          total: transactions.length,
          totalPages: Math.ceil(transactions.length / limit)
        },
        success: true
      };
    } catch (error) {
      console.error('Error getting transactions:', error);
      throw new Error('שגיאה בטעינת הנתונים');
    }
  }

  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Transaction>> {
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
      transactions.unshift(newTransaction); // Add to beginning
      
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));

      return {
        data: newTransaction,
        success: true,
        message: 'העסקה נוספה בהצלחה'
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw new Error('שגיאה בהוספת העסקה');
    }
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<ApiResponse<Transaction>> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
      
      const index = transactions.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error('העסקה לא נמצאה');
      }

      transactions[index] = {
        ...transactions[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));

      return {
        data: transactions[index],
        success: true,
        message: 'העסקה עודכנה בהצלחה'
      };
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new Error('שגיאה בעדכון העסקה');
    }
  }

  async deleteTransaction(id: string): Promise<ApiResponse<void>> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      const transactions: Transaction[] = stored ? JSON.parse(stored) : [];
      
      const filteredTransactions = transactions.filter(t => t.id !== id);
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filteredTransactions));

      return {
        data: undefined,
        success: true,
        message: 'העסקה נמחקה בהצלחה'
      };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw new Error('שגיאה במחיקת העסקה');
    }
  }

  // =============== CATEGORY METHODS ===============
  
  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const categories: Category[] = stored ? JSON.parse(stored) : this.getDefaultCategories();
      
      // Save default categories if none exist
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      }

      return {
        data: categories,
        success: true
      };
    } catch (error) {
      console.error('Error getting categories:', error);
      throw new Error('שגיאה בטעינת הקטגוריות');
    }
  }

  // =============== FINANCIAL SUMMARY ===============
  
  async getFinancialSummary(startDate: string, endDate: string): Promise<ApiResponse<FinancialSummary>> {
    try {
      const result = await this.getTransactions({
        dateFrom: startDate,
        dateTo: endDate
      });

      const transactions = result.data;
      
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const summary: FinancialSummary = {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        period: { start: startDate, end: endDate },
        transactions
      };

      return {
        data: summary,
        success: true
      };
    } catch (error) {
      console.error('Error getting financial summary:', error);
      throw new Error('שגיאה בחישוב הסיכום הפיננסי');
    }
  }

  // =============== HELPER METHODS ===============
  
  private filterTransactions(transactions: Transaction[], filters: TransactionFilters): Transaction[] {
    return transactions.filter(transaction => {
      if (filters.type && transaction.type !== filters.type) return false;
      if (filters.category && transaction.category !== filters.category) return false;
      if (filters.dateFrom && transaction.date < filters.dateFrom) return false;
      if (filters.dateTo && transaction.date > filters.dateTo) return false;
      if (filters.minAmount && transaction.amount < filters.minAmount) return false;
      if (filters.maxAmount && transaction.amount > filters.maxAmount) return false;
      return true;
    });
  }

  private sortTransactions(transactions: Transaction[], sortBy: string, order: 'asc' | 'desc'): Transaction[] {
    return [...transactions].sort((a, b) => {
      let aValue: any = a[sortBy as keyof Transaction];
      let bValue: any = b[sortBy as keyof Transaction];
      
      if (sortBy === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getDefaultCategories(): Category[] {
    return [
      // Income categories
      { id: '1', name: 'מכירות', type: 'income', color: '#22c55e', icon: '💰' },
      { id: '2', name: 'שירותים', type: 'income', color: '#3b82f6', icon: '🔧' },
      { id: '3', name: 'השקעות', type: 'income', color: '#8b5cf6', icon: '📈' },
      { id: '4', name: 'אחר', type: 'income', color: '#64748b', icon: '💼' },
      
      // Expense categories
      { id: '5', name: 'שכר דירה', type: 'expense', color: '#ef4444', icon: '🏢' },
      { id: '6', name: 'שכר עובדים', type: 'expense', color: '#f97316', icon: '👥' },
      { id: '7', name: 'שיווק', type: 'expense', color: '#eab308', icon: '📢' },
      { id: '8', name: 'חומרי גלם', type: 'expense', color: '#84cc16', icon: '📦' },
      { id: '9', name: 'ביטוח', type: 'expense', color: '#06b6d4', icon: '🛡️' },
      { id: '10', name: 'אחר', type: 'expense', color: '#64748b', icon: '💳' }
    ];
  }
}

// Export singleton instance
export const storageService = new StorageService();
