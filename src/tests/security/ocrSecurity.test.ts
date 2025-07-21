import { describe, it, expect, beforeEach } from 'vitest';
import { extractFinancialData, cleanOcrText } from '../../modules/documents/services/ocrService';
import { saveDocument, getDocuments, deleteDocument, generateDocumentId } from '../../modules/documents/utils/documentStorage';

describe('🔐 בדיקות אבטחה למודול OCR', () => {
  
  describe('🧹 ניקוי טקסט OCR', () => {
    it('מסיר תווים מסוכנים מטקסט', () => {
      const dangerousText = '<script>alert("hack")</script>שלום עולם';
      const cleaned = cleanOcrText(dangerousText);
      
      expect(cleaned).not.toContain('<script>');
      expect(cleaned).not.toContain('alert');
      expect(cleaned).toContain('שלום עולם');
    });

    it('מסיר JavaScript URLs', () => {
      const jsUrl = 'javascript:alert("xss") חשבונית 100₪';
      const cleaned = cleanOcrText(jsUrl);
      
      expect(cleaned).not.toContain('javascript:');
      expect(cleaned).not.toContain('alert');
      expect(cleaned).toContain('חשבונית 100₪');
    });

    it('מסיר HTML tags', () => {
      const htmlText = '<div onclick="hack()">חשבונית</div><img src="x" onerror="alert(1)">';
      const cleaned = cleanOcrText(htmlText);
      
      expect(cleaned).not.toContain('<div>');
      expect(cleaned).not.toContain('onclick');
      expect(cleaned).not.toContain('<img>');
      expect(cleaned).not.toContain('onerror');
      expect(cleaned).toContain('חשבונית');
    });

    it('מגביל אורך טקסט', () => {
      const longText = 'א'.repeat(20000);
      const cleaned = cleanOcrText(longText);
      
      expect(cleaned.length).toBeLessThanOrEqual(10000);
    });

    it('מטפל בקלט null/undefined', () => {
      expect(cleanOcrText(null as any)).toBe('');
      expect(cleanOcrText(undefined as any)).toBe('');
      expect(cleanOcrText('')).toBe('');
    });
  });

  describe('💰 חילוץ מידע פיננסי', () => {
    it('חולץ סכומים בביטחון', () => {
      const safeText = 'חשבונית לקנייה 150₪ תאריך: 20.07.2025';
      const financial = extractFinancialData(safeText);
      
      expect(financial.amount).toBe(150);
      expect(financial.currency).toBe('₪');
      expect(financial.date).toBe('20.07.2025');
    });

    it('לא מעבד טקסט עם תוכן מסוכן', () => {
      const dangerousText = '<script>alert("hack")</script> 100₪';
      const financial = extractFinancialData(dangerousText);
      
      // הפונקציה צריכה לחלץ את הסכום אבל לא לכלול תוכן מסוכן
      expect(financial.amount).toBe(100);
      expect(JSON.stringify(financial)).not.toContain('<script>');
    });

    it('מטפל בטקסט ריק', () => {
      const financial = extractFinancialData('');
      expect(financial).toEqual({});
    });
  });

  describe('💾 אחסון מסמכים מאובטח', () => {
    beforeEach(() => {
      // ניקוי localStorage לפני כל בדיקה
      localStorage.clear();
    });

    it('מולד ID ייחודי ובטוח', () => {
      const id1 = generateDocumentId();
      const id2 = generateDocumentId();
      
      expect(id1).toMatch(/^doc_\d+_[a-z0-9]{9}$/);
      expect(id2).toMatch(/^doc_\d+_[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });

    it('דוחה מסמכים עם שמות קבצים מסוכנים', () => {
      const dangerousDoc = {
        id: generateDocumentId(),
        fileName: '../../../etc/passwd',
        uploadDate: new Date(),
        extractedText: 'טקסט חוקי',
        financialData: {},
        confidence: 95,
        language: 'he',
        processingTime: 1000
      };

      expect(() => saveDocument(dangerousDoc)).toThrow('שם קובץ לא חוקי');
    });

    it('דוחה מסמכים עם תוכן מסוכן', () => {
      const maliciousDoc = {
        id: generateDocumentId(),
        fileName: 'safe.jpg',
        uploadDate: new Date(),
        extractedText: '<script>alert("xss")</script>',
        financialData: {},
        confidence: 95,
        language: 'he',
        processingTime: 1000
      };

      expect(() => saveDocument(maliciousDoc)).toThrow('המסמך כולל תוכן לא בטוח');
    });

    it('מגביל מספר מסמכים', () => {
      // יצירת 100 מסמכים (המגבלה)
      for (let i = 0; i < 100; i++) {
        const doc = {
          id: generateDocumentId(),
          fileName: `doc${i}.jpg`,
          uploadDate: new Date(),
          extractedText: `מסמך ${i}`,
          financialData: {},
          confidence: 95,
          language: 'he',
          processingTime: 1000
        };
        saveDocument(doc);
      }

      // ניסיון להוסיף מסמך נוסף
      const extraDoc = {
        id: generateDocumentId(),
        fileName: 'extra.jpg',
        uploadDate: new Date(),
        extractedText: 'מסמך נוסף',
        financialData: {},
        confidence: 95,
        language: 'he',
        processingTime: 1000
      };

      expect(() => saveDocument(extraDoc)).toThrow('מקסימום 100 מסמכים מותרים');
    });

    it('מסנן מסמכים פגומים בקריאה', () => {
      // הכנסת נתונים פגומים ישירות ל-localStorage
      localStorage.setItem('finflow_documents', JSON.stringify([
        { id: 'valid1', fileName: 'valid.jpg', extractedText: 'טקסט תקין' },
        { id: '../malicious', fileName: 'bad.jpg', extractedText: 'טקסט' }, // שם ID מסוכן
        { extractedText: 'חסר ID' }, // חסר ID
        'לא אובייקט', // לא אובייקט
        { id: 'valid2', fileName: 'valid2.jpg', extractedText: 'טקסט תקין נוסף' }
      ]));

      const docs = getDocuments();
      
      // רק המסמכים התקינים צריכים להיות מוחזרים
      expect(docs).toHaveLength(2);
      expect(docs[0].id).toBe('valid1');
      expect(docs[1].id).toBe('valid2');
    });

    it('מוחק רק מסמכים עם ID תקין', () => {
      const validDoc = {
        id: generateDocumentId(),
        fileName: 'test.jpg',
        uploadDate: new Date(),
        extractedText: 'טקסט בדיקה',
        financialData: {},
        confidence: 95,
        language: 'he',
        processingTime: 1000
      };

      saveDocument(validDoc);
      expect(getDocuments()).toHaveLength(1);

      // ניסיון מחיקה עם ID לא תקין
      expect(() => deleteDocument('')).toThrow('מזהה מסמך לא תקין');
      expect(() => deleteDocument('123')).toThrow('מזהה מסמך לא תקין');
      
      // מחיקה תקינה
      deleteDocument(validDoc.id);
      expect(getDocuments()).toHaveLength(0);
    });
  });

  describe('🔒 בדיקות רגקס בטוחות', () => {
    it('רגקס תאריכים לא גורם ל-ReDoS', () => {
      const maliciousInput = '1'.repeat(10000) + '/' + '1'.repeat(10000);
      const startTime = Date.now();
      
      extractFinancialData(maliciousInput);
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(1000); // פחות מ-1 שנייה
    });

    it('רגקס סכומים לא גורם ל-ReDoS', () => {
      const maliciousInput = '₪' + '1'.repeat(10000) + '.9'.repeat(10000);
      const startTime = Date.now();
      
      extractFinancialData(maliciousInput);
      
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(1000); // פחות מ-1 שנייה
    });
  });

  describe('🌐 הגנת פרטיות', () => {
    it('לא שומר מידע זיהוי אישי', () => {
      const textWithPersonalInfo = 'ת.ז: 123456789 טלפון: 050-1234567 כתובת: רחוב הרצל 1';
      const financial = extractFinancialData(textWithPersonalInfo);
      
      // לא צריך לחלץ מידע אישי
      expect(JSON.stringify(financial)).not.toContain('123456789');
      expect(JSON.stringify(financial)).not.toContain('050-1234567');
      expect(JSON.stringify(financial)).not.toContain('הרצל');
    });

    it('מעבד רק מידע פיננסי רלוונטי', () => {
      const businessText = 'חברת ABC בע"מ חשבונית 456 סכום: 200₪ תאריך: 01.01.2025';
      const financial = extractFinancialData(businessText);
      
      expect(financial.amount).toBe(200);
      expect(financial.currency).toBe('₪');
      expect(financial.date).toBe('01.01.2025');
      // שם החברה יכול להיות כלול כספק
      expect(financial.vendor).toContain('ABC');
    });
  });
});
