import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult } from '../types';

interface ResultsViewerProps {
  result: AnalysisResult;
  onConfirm: () => void;
}

export const ResultsViewer: React.FC<ResultsViewerProps> = ({ result, onConfirm }) => {
  const markdownContent = `
# Resultados del Análisis

## Seguridad y Salud
${result.safety_and_health}

## Medio Ambiente
${result.environment}

## Calidad
${result.quality}

## Resumen de Cumplimiento
${result.compliance_summary}
`;
  return (
    <div 
      className="bg-white rounded-lg shadow p-6 mt-4"
      role="region"
      aria-label="Resultados del análisis"
    >
      <ReactMarkdown 
        className="prose max-w-none"
        aria-labelledby="results-heading"
      >
        {markdownContent}
      </ReactMarkdown>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onConfirm}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md 
                     text-sm font-medium text-white bg-safeia-yellow hover:bg-safeia-yellow-dark 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-safeia-yellow"
          aria-label="Confirmar y enviar resultados al webhook"
        >
          Confirmar y Enviar al Webhook
        </button>
      </div>
    </div>
  );
};
