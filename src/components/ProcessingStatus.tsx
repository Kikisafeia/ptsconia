import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { AnalyzeButton } from './AnalyzeButton';
import { ResultsViewer } from './ResultsViewer';
import { sendToWebhook } from '../services/webhook';

const statusConfig = {
  pending: {
    icon: Clock,
    text: 'Pendiente',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
  },
  processing: {
    icon: Loader2,
    text: 'Procesando',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
  },
  completed: {
    icon: CheckCircle,
    text: 'Completado',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
  },
  error: {
    icon: AlertCircle,
    text: 'Error',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
  },
};

export const ProcessingStatus: React.FC = () => {
  const documents = useDocumentStore((state) => state.documents);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-safeia-black mb-4">Estado del Procesamiento</h2>
      <div className="space-y-4">
        {documents.map((doc) => {
          const status = statusConfig[doc.status];
          const StatusIcon = status.icon;

          return (
            <div key={doc.id}>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-safeia-gray/20">
                <div className="flex items-center space-x-4">
                  <StatusIcon className={`w-5 h-5 ${status.textColor}`} />
                  <div>
                    <p className="font-medium text-safeia-black">{doc.name}</p>
                    <p className="text-sm text-safeia-gray">
                      {new Date(doc.uploadedAt).toLocaleString()}
                    </p>
                    {doc.error && (
                      <p className="text-sm text-red-600 mt-1">{doc.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.textColor}`}>
                    {status.text}
                  </span>
                  {doc.status === 'pending' && (
                    <AnalyzeButton documentId={doc.id} />
                  )}
                </div>
              </div>
              
              {doc.status === 'completed' && doc.result && (
                <ResultsViewer 
                  result={doc.result}
                  onConfirm={async () => {
                    try {
                      await sendToWebhook(doc.result!);
                      alert('Resultados enviados al webhook exitosamente');
                    } catch (error) {
                      alert('Error al enviar al webhook');
                    }
                  }}
                />
              )}
            </div>
          );
        })}
        
        {documents.length === 0 && (
          <p className="text-center text-safeia-gray py-4">
            No hay documentos para analizar
          </p>
        )}
      </div>
    </div>
  );
}
