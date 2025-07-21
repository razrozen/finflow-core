import type { FinancialData } from '../services/ocrService';

export interface DocumentData {
  id: string;
  fileName: string;
  uploadDate: Date;
  extractedText: string;
  financialData: FinancialData;
  confidence: number;
  language: string;
  processingTime: number;
}

export interface DocumentStats {
  totalDocuments: number;
  totalAmount: number;
  averageConfidence: number;
  languageDistribution: Record<string, number>;
  categoryDistribution: Record<string, number>;
}

// 🔒 הגדרות אבטחה וגבולות
const MAX_DOCUMENTS = 100; // מקסימום מסמכים לשמירה
const MAX_TEXT_LENGTH = 10000; // מקסימום אורך טקסט למסמך
const STORAGE_KEY = 'finflow_documents';

/**
 * וילידציה של נתוני מסמך לפני שמירה
 * 🔐 מוודא שהנתונים תקינים ובטוחים
 */
function validateDocumentData(document: DocumentData): { isValid: boolean; error?: string } {
  // בדיקות בסיסיות
  if (!document.id || !document.fileName || !document.extractedText) {
    return { isValid: false, error: 'חסרים נתונים חיוניים במסמך' };
  }
  
  // בדיקת אורך טקסט
  if (document.extractedText.length > MAX_TEXT_LENGTH) {
    return { isValid: false, error: 'טקסט המסמך ארוך מדי' };
  }
  
  // בדיקת תווים מסוכנים
  if (/<script|javascript:|on\w+\s*=/i.test(document.extractedText)) {
    return { isValid: false, error: 'המסמך כולל תוכן לא בטוח' };
  }
  
  // בדיקת שם קובץ
  if (document.fileName.includes('..') || /[<>:"|?*]/.test(document.fileName)) {
    return { isValid: false, error: 'שם קובץ לא חוקי' };
  }
  
  return { isValid: true };
}

/**
 * שמירת מסמך מעובד ברשימה מקומית
 * 🔐 כולל בדיקות אבטחה וגבולות נתונים
 */
export function saveDocument(document: DocumentData): void {
  try {
    // וילידציה של נתוני הקלט
    const validation = validateDocumentData(document);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    
    const existingDocs = getDocuments();
    
    // בדיקת מגבלת מספר מסמכים
    if (existingDocs.length >= MAX_DOCUMENTS) {
      throw new Error(`מקסימום ${MAX_DOCUMENTS} מסמכים מותרים. מחק מסמכים ישנים`);
    }
    
    const updatedDocs = [...existingDocs, document];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDocs));
    
    // לוג רק במצב פיתוח
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ מסמך נשמר בהצלחה:', document.fileName);
    }
  } catch (error) {
    console.error('❌ שגיאה בשמירת מסמך:', error);
  }
}

/**
 * קבלת כל המסמכים השמורים
 * 🔐 כולל בדיקות תקינות נתונים
 */
export function getDocuments(): DocumentData[] {
  try {
    const docs = localStorage.getItem(STORAGE_KEY);
    if (!docs) return [];
    
    const parsedDocs = JSON.parse(docs);
    
    // וילידציה של המבנה
    if (!Array.isArray(parsedDocs)) {
      console.warn('⚠️ מבנה נתונים פגום - מנקה אחסון');
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    
    // סינון מסמכים תקינים בלבד
    return parsedDocs.filter((doc: any) => {
      const validation = validateDocumentData(doc);
      return validation.isValid;
    });
    
  } catch (error) {
    console.error('❌ שגיאה בקריאת מסמכים:', error);
    // במקרה של שגיאה - ניקוי אחסון פגום
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

/**
 * מחיקת מסמך לפי ID
 * 🔐 כולל וילידציה של מזהה
 */
export function deleteDocument(id: string): void {
  try {
    // וילידציה של מזהה
    if (!id || typeof id !== 'string' || id.length < 5) {
      throw new Error('מזהה מסמך לא תקין');
    }
    
    const existingDocs = getDocuments();
    const filteredDocs = existingDocs.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredDocs));
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🗑️ מסמך נמחק:', id);
    }
  } catch (error) {
    console.error('❌ שגיאה במחיקת מסמך:', error);
    throw error;
  }
}

/**
 * יצירת ID ייחודי למסמך
 */
export function generateDocumentId(): string {
  return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * פילטור מסמכים לפי תאריך
 */
export function filterDocumentsByDate(documents: DocumentData[], fromDate?: Date, toDate?: Date): DocumentData[] {
  return documents.filter(doc => {
    const docDate = new Date(doc.uploadDate);
    if (fromDate && docDate < fromDate) return false;
    if (toDate && docDate > toDate) return false;
    return true;
  });
}

/**
 * חיפוש מסמכים לפי טקסט
 */
export function searchDocuments(documents: DocumentData[], searchTerm: string): DocumentData[] {
  const term = searchTerm.toLowerCase();
  return documents.filter(doc => 
    doc.fileName.toLowerCase().includes(term) ||
    doc.extractedText.toLowerCase().includes(term) ||
    doc.financialData.vendor?.toLowerCase().includes(term) ||
    doc.financialData.category?.toLowerCase().includes(term)
  );
}

/**
 * סיכום סטטיסטיקות מסמכים
 */
export function getDocumentStats(documents: DocumentData[]): DocumentStats {
  if (documents.length === 0) {
    return {
      totalDocuments: 0,
      totalAmount: 0,
      averageConfidence: 0,
      languageDistribution: {},
      categoryDistribution: {}
    };
  }

  const stats: DocumentStats = {
    totalDocuments: documents.length,
    totalAmount: 0,
    averageConfidence: 0,
    languageDistribution: {},
    categoryDistribution: {}
  };

  let totalConfidence = 0;

  documents.forEach(doc => {
    // סיכום סכומים
    if (doc.financialData.amount) {
      stats.totalAmount += doc.financialData.amount;
    }

    // סיכום דיוק
    totalConfidence += doc.confidence;

    // התפלגות שפות
    const lang = doc.language === 'he' ? 'עברית' : doc.language === 'en' ? 'אנגלית' : 'מעורב';
    stats.languageDistribution[lang] = (stats.languageDistribution[lang] || 0) + 1;

    // התפלגות קטגוריות
    const category = doc.financialData.category || 'לא קוטגוריזציה';
    stats.categoryDistribution[category] = (stats.categoryDistribution[category] || 0) + 1;
  });

  stats.averageConfidence = totalConfidence / documents.length;

  return stats;
}
