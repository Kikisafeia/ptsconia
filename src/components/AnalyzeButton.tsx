import React from 'react';
import { PlayCircle } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { analyzeDocument } from '../services/analysis';

export const AnalyzeButton: React.FC<{ documentId: string }> = ({ documentId }) => {
  const { documents, updateDocument } = useDocumentStore();
  const document = documents.find(doc => doc.id === documentId);

  const handleAnalysis = async () => {
    if (!document) return;

    try {
      updateDocument(documentId, { status: 'processing' });
      const result = await analyzeDocument(document);
      updateDocument(documentId, { 
        status: 'completed',
        result 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error('Análisis fallido:', errorMessage);
      updateDocument(documentId, { 
        status: 'error',
        error: errorMessage
      });
    }
  };

  return (
    <button
      onClick={handleAnalysis}
      disabled={!document || document.status === 'processing'}
      className="inline-flex items-center px-3 py-1 border border-transparent rounded-md 
                 text-sm font-medium text-white bg-safeia-yellow hover:bg-safeia-yellow-dark 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-safeia-yellow
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <PlayCircle className="w-4 h-4 mr-2" />
      Analizar
    </button>
  );
};