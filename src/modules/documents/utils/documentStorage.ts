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

/**
 * שמירת מסמך מעובד ברשימה מקומית (LocalStorage)
 */
export function saveDocument(document: DocumentData): void {
  try {
    const existingDocs = getDocuments();
    const updatedDocs = [...existingDocs, document];
    localStorage.setItem('finflow_documents', JSON.stringify(updatedDocs));
    console.log('✅ מסמך נשמר בהצלחה:', document.fileName);
  } catch (error) {
    console.error('❌ שגיאה בשמירת מסמך:', error);
  }
}

/**
 * קבלת כל המסמכים השמורים
 */
export function getDocuments(): DocumentData[] {
  try {
    const docs = localStorage.getItem('finflow_documents');
    return docs ? JSON.parse(docs) : [];
  } catch (error) {
    console.error('❌ שגיאה בקריאת מסמכים:', error);
    return [];
  }
}

/**
 * מחיקת מסמך לפי ID
 */
export function deleteDocument(id: string): void {
  try {
    const existingDocs = getDocuments();
    const filteredDocs = existingDocs.filter(doc => doc.id !== id);
    localStorage.setItem('finflow_documents', JSON.stringify(filteredDocs));
    console.log('🗑️ מסמך נמחק:', id);
  } catch (error) {
    console.error('❌ שגיאה במחיקת מסמך:', error);
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
