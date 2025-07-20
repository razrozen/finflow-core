import { useState, useEffect } from 'react';
import { getDocuments, deleteDocument, getDocumentStats } from '../utils/documentStorage';
import type { DocumentData, DocumentStats } from '../utils/documentStorage';

export default function DocumentsList() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const docs = getDocuments();
    setDocuments(docs);
    setStats(getDocumentStats(docs));
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את המסמך?')) {
      deleteDocument(id);
      loadDocuments();
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.extractedText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.financialData.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.financialData.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (documents.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <div className="text-6xl mb-4">📄</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">אין מסמכים שמורים</h3>
        <p className="text-gray-600">העלה מסמכים כדי לראות אותם כאן</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* סטטיסטיקות */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.totalDocuments}</div>
            <div className="text-sm text-blue-800">מסמכים</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₪{stats.totalAmount.toFixed(2)}</div>
            <div className="text-sm text-green-800">סה"כ סכומים</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.averageConfidence.toFixed(1)}%</div>
            <div className="text-sm text-purple-800">דיוק ממוצע</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {Object.keys(stats.categoryDistribution).length}
            </div>
            <div className="text-sm text-orange-800">קטגוריות</div>
          </div>
        </div>
      )}

      {/* חיפוש */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 חפש מסמכים..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-3 top-3 text-gray-400">🔍</div>
      </div>

      {/* רשימת מסמכים */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedDocument(doc)}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-gray-800 truncate mr-2">{doc.fileName}</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDocument(doc.id);
                }}
                className="text-red-500 hover:text-red-700 text-xl"
                title="מחק מסמך"
              >
                🗑️
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">תאריך:</span>
                <span className="text-gray-800">
                  {new Date(doc.uploadDate).toLocaleDateString('he-IL')}
                </span>
              </div>

              {doc.financialData.amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">סכום:</span>
                  <span className="text-green-600 font-bold">
                    ₪{doc.financialData.amount}
                  </span>
                </div>
              )}

              {doc.financialData.vendor && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ספק:</span>
                  <span className="text-gray-800 truncate ml-2">
                    {doc.financialData.vendor}
                  </span>
                </div>
              )}

              {doc.financialData.category && (
                <div className="flex justify-between">
                  <span className="text-gray-600">קטגוריה:</span>
                  <span className="text-purple-600">{doc.financialData.category}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">דיוק:</span>
                <span className={`font-medium ${
                  doc.confidence > 80 ? 'text-green-600' : 
                  doc.confidence > 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {doc.confidence.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 line-clamp-2">
                {doc.extractedText.substring(0, 100)}
                {doc.extractedText.length > 100 && '...'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* מודל פרטי מסמך */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  📄 {selectedDocument.fileName}
                </h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="font-medium text-gray-600">תאריך העלאה:</span>
                  <div className="text-gray-800">
                    {new Date(selectedDocument.uploadDate).toLocaleString('he-IL')}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">דיוק זיהוי:</span>
                  <div className={`${
                    selectedDocument.confidence > 80 ? 'text-green-600' : 
                    selectedDocument.confidence > 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {selectedDocument.confidence.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">שפה:</span>
                  <div className="text-gray-800">
                    {selectedDocument.language === 'he' ? 'עברית' : 
                     selectedDocument.language === 'en' ? 'אנגלית' : 'מעורב'}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">זמן עיבוד:</span>
                  <div className="text-gray-800">
                    {(selectedDocument.processingTime / 1000).toFixed(1)}s
                  </div>
                </div>
              </div>

              {/* מידע פיננסי */}
              {selectedDocument.financialData && Object.keys(selectedDocument.financialData).length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-3">💰 מידע פיננסי</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {selectedDocument.financialData.amount && (
                      <div>
                        <span className="font-medium">סכום:</span>
                        <span className="ml-2 text-blue-700 font-bold">
                          ₪{selectedDocument.financialData.amount}
                        </span>
                      </div>
                    )}
                    {selectedDocument.financialData.date && (
                      <div>
                        <span className="font-medium">תאריך:</span>
                        <span className="ml-2 text-gray-700">{selectedDocument.financialData.date}</span>
                      </div>
                    )}
                    {selectedDocument.financialData.vendor && (
                      <div className="col-span-2">
                        <span className="font-medium">ספק:</span>
                        <span className="ml-2 text-gray-700">{selectedDocument.financialData.vendor}</span>
                      </div>
                    )}
                    {selectedDocument.financialData.category && (
                      <div>
                        <span className="font-medium">קטגוריה:</span>
                        <span className="ml-2 text-purple-700">{selectedDocument.financialData.category}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* טקסט מלא */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">📝 טקסט מלא</h4>
                <div className="p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {selectedDocument.extractedText}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
