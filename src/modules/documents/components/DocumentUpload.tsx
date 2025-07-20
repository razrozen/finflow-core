import React, { useState, useCallback } from 'react';
import { extractTextFromImage, cleanOcrText, extractFinancialData } from '../services/ocrService';
import { saveDocument, generateDocumentId } from '../utils/documentStorage';
import type { OcrResult, FinancialData } from '../services/ocrService';

interface DocumentUploadProps {
  onTextExtracted?: (text: string, financialData: FinancialData) => void;
  className?: string;
}

export default function DocumentUpload({ onTextExtracted, className = '' }: DocumentUploadProps) {
  const [extractedText, setExtractedText] = useState<string>('');
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // בדיקת סוג קובץ
    if (!file.type.startsWith('image/')) {
      setError('אנא העלה קובץ תמונה בלבד (PNG, JPG, WebP)');
      return;
    }

    // בדיקת גודל קובץ (מקסימום 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('גודל הקובץ גדול מדי. מקסימום 10MB');
      return;
    }

    setLoading(true);
    setError('');
    setExtractedText('');
    setFinancialData(null);
    setOcrResult(null);
    setCurrentFile(file);
    setSaved(false);

    try {
      console.log('🚀 מתחיל עיבוד OCR עבור:', file.name);
      
      const result = await extractTextFromImage(file);
      const cleanedText = cleanOcrText(result.text);
      const financial = extractFinancialData(cleanedText);
      
      setOcrResult(result);
      setExtractedText(cleanedText);
      setFinancialData(financial);
      
      // העברת המידע לקומפוננטה הורה
      if (onTextExtracted) {
        onTextExtracted(cleanedText, financial);
      }

      console.log('✅ OCR הושלם בהצלחה:', {
        confidence: result.confidence,
        language: result.language,
        processingTime: result.processingTime
      });
      
    } catch (err) {
      console.error('❌ שגיאה ב-OCR:', err);
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה בעיבוד הקובץ');
    } finally {
      setLoading(false);
    }
  }, [onTextExtracted]);

  const handleSaveDocument = useCallback(() => {
    if (!ocrResult || !extractedText || !financialData || !currentFile) return;

    const documentData = {
      id: generateDocumentId(),
      fileName: currentFile.name,
      uploadDate: new Date(),
      extractedText,
      financialData,
      confidence: ocrResult.confidence,
      language: ocrResult.language,
      processingTime: ocrResult.processingTime
    };

    saveDocument(documentData);
    setSaved(true);
    console.log('💾 מסמך נשמר במערכת');
  }, [ocrResult, extractedText, financialData, currentFile]);

  const resetUpload = () => {
    setExtractedText('');
    setFinancialData(null);
    setError('');
    setOcrResult(null);
    setCurrentFile(null);
    setSaved(false);
  };

  return (
    <div className={`space-y-6 p-6 bg-white rounded-lg shadow-md ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          📄 העלאת מסמך לזיהוי טקסט
        </h3>
        <p className="text-gray-600">
          העלה תמונה של חשבונית או קבלה לחילוץ מידע אוטומטי
        </p>
      </div>

      {/* אזור העלאה */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={loading}
          className="hidden"
          id="document-upload"
        />
        <label 
          htmlFor="document-upload" 
          className={`cursor-pointer ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          <div className="flex flex-col items-center space-y-3">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-lg font-medium text-gray-700">
              {loading ? '⏳ מעבד...' : '📤 לחץ להעלאת תמונה'}
            </span>
            <span className="text-sm text-gray-500">
              PNG, JPG, WebP (עד 10MB)
            </span>
          </div>
        </label>
      </div>

      {/* מצב טעינה */}
      {loading && (
        <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-blue-700 font-medium">מזהה טקסט בתמונה...</span>
        </div>
      )}

      {/* הצגת שגיאות */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-red-600">⚠️</span>
            <span className="text-red-700 font-medium">שגיאה:</span>
            <span className="text-red-600">{error}</span>
          </div>
        </div>
      )}

      {/* תוצאות OCR */}
      {ocrResult && (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">✅ זיהוי הושלם בהצלחה</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">דיוק זיהוי:</span>
                <span className={`ml-2 ${ocrResult.confidence > 80 ? 'text-green-600' : ocrResult.confidence > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {Math.round(ocrResult.confidence)}%
                </span>
              </div>
              <div>
                <span className="font-medium">שפה:</span>
                <span className="ml-2 text-gray-700">
                  {ocrResult.language === 'he' ? 'עברית' : ocrResult.language === 'en' ? 'אנגלית' : 'מעורב'}
                </span>
              </div>
              <div>
                <span className="font-medium">זמן עיבוד:</span>
                <span className="ml-2 text-gray-700">{(ocrResult.processingTime / 1000).toFixed(1)}s</span>
              </div>
            </div>
          </div>

          {/* מידע פיננסי מחולץ */}
          {financialData && Object.keys(financialData).length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-3">💰 מידע פיננסי שזוהה</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {financialData.amount && (
                  <div>
                    <span className="font-medium">סכום:</span>
                    <span className="ml-2 text-blue-700 font-bold">
                      {financialData.amount} {financialData.currency || '₪'}
                    </span>
                  </div>
                )}
                {financialData.date && (
                  <div>
                    <span className="font-medium">תאריך:</span>
                    <span className="ml-2 text-gray-700">{financialData.date}</span>
                  </div>
                )}
                {financialData.vendor && (
                  <div className="col-span-2">
                    <span className="font-medium">ספק:</span>
                    <span className="ml-2 text-gray-700">{financialData.vendor}</span>
                  </div>
                )}
                {financialData.category && (
                  <div>
                    <span className="font-medium">קטגוריה:</span>
                    <span className="ml-2 text-purple-700 font-medium">{financialData.category}</span>
                  </div>
                )}
              </div>
              
              {/* כפתור שמירה */}
              <div className="mt-4 pt-3 border-t border-blue-200">
                {saved ? (
                  <div className="flex items-center space-x-2 text-green-700">
                    <span>✅</span>
                    <span className="font-medium">המסמך נשמר בהצלחה!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSaveDocument}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    💾 שמור מסמך במערכת
                  </button>
                )}
              </div>
            </div>
          )}

          {/* טקסט מחולץ */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-800">📝 טקסט מחולץ</h4>
              <button
                onClick={resetUpload}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                🔄 נקה
              </button>
            </div>
            <div className="p-4 bg-gray-50 border rounded-lg max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                {extractedText || 'לא זוהה טקסט...'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
