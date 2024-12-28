import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AnalysisResult } from '../types';

interface AnalyticsDashboardProps {
  result: AnalysisResult;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Panel de Seguridad y Salud */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Seguridad y Salud</h3>
        <ReactMarkdown className="prose max-w-none">
          {result.safety_and_health}
        </ReactMarkdown>
      </div>

      {/* Panel de Medio Ambiente */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Medio Ambiente</h3>
        <ReactMarkdown className="prose max-w-none">
          {result.environment}
        </ReactMarkdown>
      </div>

      {/* Panel de Calidad */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Calidad</h3>
        <ReactMarkdown className="prose max-w-none">
          {result.quality}
        </ReactMarkdown>
      </div>

      {/* Panel de Resumen de Cumplimiento */}
      <div className="bg-white rounded-lg shadow p-6 col-span-full">
        <h3 className="text-lg font-semibold mb-4">Resumen de Cumplimiento</h3>
        <ReactMarkdown className="prose max-w-none">
          {result.compliance_summary}
        </ReactMarkdown>
      </div>
    </div>
  );
};
