// כלים עזר לעבודה עם נתונים פיננסיים

import type { Transaction, MonthlyReport } from './types';

// =============== DATE UTILITIES ===============

export const dateUtils = {
  // המרה לפורמט ישראלי
  toIsraeliFormat(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('he-IL');
  },

  // קבלת תחילת החודש
  getMonthStart(date: string | Date = new Date()): string {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
  },

  // קבלת סוף החודש
  getMonthEnd(date: string | Date = new Date()): string {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0];
  },

  // קבלת תחילת השנה
  getYearStart(date: string | Date = new Date()): string {
    const d = new Date(date);
    return new Date(d.getFullYear(), 0, 1).toISOString().split('T')[0];
  },

  // קבלת סוף השנה
  getYearEnd(date: string | Date = new Date()): string {
    const d = new Date(date);
    return new Date(d.getFullYear(), 11, 31).toISOString().split('T')[0];
  },

  // בדיקה אם תאריך בטווח
  isInRange(date: string, startDate: string, endDate: string): boolean {
    return date >= startDate && date <= endDate;
  }
};

// =============== CURRENCY UTILITIES ===============

export const currencyUtils = {
  // עיצוב מספר לשקלים
  formatILS(amount: number): string {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  // עיצוב מספר עם פסיקים
  formatNumber(amount: number): string {
    return new Intl.NumberFormat('he-IL').format(amount);
  },

  // המרה לאחוזים
  toPercentage(value: number, total: number): string {
    if (total === 0) return '0%';
    return `${Math.round((value / total) * 100)}%`;
  }
};

// =============== CALCULATION UTILITIES ===============

export const calculationUtils = {
  // חישוב סך הכנסות
  calculateTotalIncome(transactions: Transaction[]): number {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  // חישוב סך הוצאות
  calculateTotalExpenses(transactions: Transaction[]): number {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  // חישוב רווח נקי
  calculateNetProfit(transactions: Transaction[]): number {
    const income = this.calculateTotalIncome(transactions);
    const expenses = this.calculateTotalExpenses(transactions);
    return income - expenses;
  },

  // חישוב ממוצע חודשי
  calculateMonthlyAverage(transactions: Transaction[], months: number): {
    avgIncome: number;
    avgExpenses: number;
    avgProfit: number;
  } {
    const income = this.calculateTotalIncome(transactions);
    const expenses = this.calculateTotalExpenses(transactions);
    
    return {
      avgIncome: income / months,
      avgExpenses: expenses / months,
      avgProfit: (income - expenses) / months
    };
  },

  // חישוב צמיחה באחוזים
  calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }
};

// =============== ANALYTICS UTILITIES ===============

export const analyticsUtils = {
  // קיבוץ עסקאות לפי קטגוריה
  groupByCategory(transactions: Transaction[]): Record<string, Transaction[]> {
    return transactions.reduce((groups, transaction) => {
      const category = transaction.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(transaction);
      return groups;
    }, {} as Record<string, Transaction[]>);
  },

  // קיבוץ עסקאות לפי חודש
  groupByMonth(transactions: Transaction[]): Record<string, Transaction[]> {
    return transactions.reduce((groups, transaction) => {
      const month = transaction.date.substring(0, 7); // YYYY-MM
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(transaction);
      return groups;
    }, {} as Record<string, Transaction[]>);
  },

  // יצירת דוח חודשי
  generateMonthlyReport(transactions: Transaction[], month: string): MonthlyReport {
    const monthTransactions = transactions.filter(t => t.date.startsWith(month));
    
    const income = calculationUtils.calculateTotalIncome(monthTransactions);
    const expenses = calculationUtils.calculateTotalExpenses(monthTransactions);
    
    // חישוב טופ קטגוריות
    const incomeByCategory = this.getTopCategories(monthTransactions, 'income');
    const expensesByCategory = this.getTopCategories(monthTransactions, 'expense');

    return {
      month,
      income,
      expenses,
      profit: income - expenses,
      topCategories: {
        income: incomeByCategory,
        expenses: expensesByCategory
      }
    };
  },

  // קבלת הקטגוריות המובילות
  getTopCategories(transactions: Transaction[], type: 'income' | 'expense', limit: number = 5): { category: string; amount: number }[] {
    const filteredTransactions = transactions.filter(t => t.type === type);
    const categoryTotals = this.groupByCategory(filteredTransactions);
    
    return Object.entries(categoryTotals)
      .map(([category, transactions]) => ({
        category,
        amount: transactions.reduce((sum, t) => sum + t.amount, 0)
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, limit);
  },

  // חישוב טרנדים
  calculateTrends(transactions: Transaction[]): {
    incomeGrowth: number;
    expensesGrowth: number;
    profitGrowth: number;
  } {
    const monthlyData = this.groupByMonth(transactions);
    const sortedMonths = Object.keys(monthlyData).sort();
    
    if (sortedMonths.length < 2) {
      return { incomeGrowth: 0, expensesGrowth: 0, profitGrowth: 0 };
    }

    const lastMonth = sortedMonths[sortedMonths.length - 1];
    const previousMonth = sortedMonths[sortedMonths.length - 2];
    
    const lastMonthData = monthlyData[lastMonth];
    const previousMonthData = monthlyData[previousMonth];
    
    const lastIncome = calculationUtils.calculateTotalIncome(lastMonthData);
    const previousIncome = calculationUtils.calculateTotalIncome(previousMonthData);
    
    const lastExpenses = calculationUtils.calculateTotalExpenses(lastMonthData);
    const previousExpenses = calculationUtils.calculateTotalExpenses(previousMonthData);
    
    return {
      incomeGrowth: calculationUtils.calculateGrowthRate(lastIncome, previousIncome),
      expensesGrowth: calculationUtils.calculateGrowthRate(lastExpenses, previousExpenses),
      profitGrowth: calculationUtils.calculateGrowthRate(
        lastIncome - lastExpenses,
        previousIncome - previousExpenses
      )
    };
  }
};

// =============== VALIDATION UTILITIES ===============

export const validationUtils = {
  // בדיקת תקינות עסקה
  validateTransaction(transaction: Partial<Transaction>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!transaction.amount || transaction.amount <= 0) {
      errors.push('סכום חייב להיות גדול מאפס');
    }

    if (!transaction.description || transaction.description.trim().length === 0) {
      errors.push('תיאור הוא חובה');
    }

    if (!transaction.category || transaction.category.trim().length === 0) {
      errors.push('קטגוריה היא חובה');
    }

    if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
      errors.push('סוג עסקה חייב להיות הכנסה או הוצאה');
    }

    if (!transaction.date) {
      errors.push('תאריך הוא חובה');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  // בדיקת תקינות טווח תאריכים
  validateDateRange(startDate: string, endDate: string): { valid: boolean; error?: string } {
    if (!startDate || !endDate) {
      return { valid: false, error: 'תאריך התחלה וסיום חובה' };
    }

    if (startDate > endDate) {
      return { valid: false, error: 'תאריך התחלה חייב להיות לפני תאריך הסיום' };
    }

    return { valid: true };
  }
};
