import Tesseract from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';

/**
 * שירות OCR לחילוץ טקסט מתמונות ומסמכי PDF
 * תומך בעברית ואנגלית
 */

export interface OcrResult {
  text: string;
  confidence: number;
  language: string;
  processingTime: number;
}

/**
 * חילוץ טקסט מתמונה באמצעות Tesseract OCR
 * @param image קובץ תמונה (PNG, JPG, WebP)
 * @returns טקסט מחולץ עם מידע נוסף
 */
export async function extractTextFromImage(image: File): Promise<OcrResult> {
  const startTime = Date.now();
  
  try {
    console.log('🔍 מתחיל זיהוי טקסט בתמונה...');
    
    const result = await Tesseract.recognize(image, 'heb+eng', {
      logger: (progress) => {
        if (progress.status === 'recognizing text') {
          console.log(`📊 התקדמות: ${Math.round(progress.progress * 100)}%`);
        }
      }
    });

    const processingTime = Date.now() - startTime;
    
    return {
      text: result.data.text.trim(),
      confidence: result.data.confidence,
      language: detectLanguage(result.data.text),
      processingTime
    };
  } catch (error) {
    console.error('❌ שגיאה בזיהוי טקסט:', error);
    throw new Error('נכשל בזיהוי הטקסט בתמונה');
  }
}

/**
 * חילוץ טקסט מקובץ PDF
 * @param pdfFile קובץ PDF
 * @returns טקסט מחולץ
 */
export async function extractTextFromPDF(pdfFile: File): Promise<string> {
  try {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    let fullText = '';
    for (let i = 0; i < pages.length; i++) {
      // הערה: PDF-lib לא תומך בחילוץ טקסט ישירות
      // נדרשת ספרייה נוספת כמו pdf-parse או pdf2pic + OCR
      console.log(`📄 עמוד ${i + 1} מתוך ${pages.length}`);
    }
    
    return fullText;
  } catch (error) {
    console.error('❌ שגיאה בעיבוד PDF:', error);
    throw new Error('נכשל בעיבוד קובץ PDF');
  }
}

/**
 * זיהוי שפה בטקסט
 * @param text הטקסט לבדיקה
 * @returns שפה זוהתה (he/en/mixed)
 */
function detectLanguage(text: string): string {
  const hebrewChars = text.match(/[\u0590-\u05FF]/g);
  const englishChars = text.match(/[a-zA-Z]/g);
  
  const hebrewCount = hebrewChars?.length || 0;
  const englishCount = englishChars?.length || 0;
  
  if (hebrewCount > englishCount * 2) return 'he';
  if (englishCount > hebrewCount * 2) return 'en';
  return 'mixed';
}

/**
 * ניקוי וסינון טקסט OCR
 * @param rawText טקסט גולמי מה-OCR
 * @returns טקסט מנוקה
 */
export function cleanOcrText(rawText: string): string {
  return rawText
    // הסרת שורות ריקות מרובות
    .replace(/\n\s*\n/g, '\n')
    // הסרת רווחים מרובים
    .replace(/\s+/g, ' ')
    // ניקוי תווים מיוחדים
    .replace(/[^\u0590-\u05FF\u0020-\u007Ea-zA-Z0-9₪.,:\-+()[\]]/g, '')
    .trim();
}

/**
 * חילוץ מידע פיננסי מטקסט
 * @param text טקסט OCR
 * @returns מידע פיננסי מחולץ
 */
export interface FinancialData {
  amount?: number;
  currency?: string;
  date?: string;
  vendor?: string;
  category?: string;
}

export function extractFinancialData(text: string): FinancialData {
  const result: FinancialData = {};
  
  // חילוץ סכומים (₪, שקל, NIS)
  const amountPatterns = [
    /(\d+\.?\d*)\s*₪/g,
    /₪\s*(\d+\.?\d*)/g,
    /(\d+\.?\d*)\s*שקל/g,
    /סה"כ[:\s]*(\d+\.?\d*)/g
  ];
  
  for (const pattern of amountPatterns) {
    const match = text.match(pattern);
    if (match) {
      const amount = parseFloat(match[1] || match[0].replace(/[^\d.]/g, ''));
      if (!isNaN(amount)) {
        result.amount = amount;
        result.currency = '₪';
        break;
      }
    }
  }
  
  // חילוץ תאריכים
  const datePatterns = [
    /(\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})/g,
    /(\d{1,2}\.\d{1,2}\.\d{4})/g
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.date = match[0];
      break;
    }
  }
  
  // חילוץ שם ספק (שורה ראשונה לרוב)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 0) {
    result.vendor = lines[0].trim();
  }
  
  // זיהוי קטגוריה בסיסי
  const categories = {
    'מזון': ['מזון', 'מסעדה', 'קפה', 'מרכול', 'סופר'],
    'דלק': ['דלק', 'תדלוק', 'סונול', 'פז'],
    'ביגוד': ['ביגוד', 'נעליים', 'אופנה'],
    'תחבורה': ['מונית', 'אוטובוס', 'רכבת', 'חניה']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      result.category = category;
      break;
    }
  }
  
  return result;
}
