import React from 'react';
import { Activity, FileText, Clock, CheckCircle } from 'lucide-react';

const stats = [
  { id: 1, name: 'Documentos procesados', value: '1,234', icon: FileText },
  { id: 2, name: 'Tiempo promedio', value: '2.3s', icon: Clock },
  { id: 3, name: 'Precisión', value: '98.7%', icon: CheckCircle },
  { id: 4, name: 'Actividad reciente', value: '12', icon: Activity },
];

export const AnalyticsPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Métricas de Análisis</h2>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex-shrink-0">
              <stat.icon className="h-6 w-6 text-safeia-yellow" aria-hidden="true" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-safeia-gray">{stat.name}</dt>
              <dd className="mt-1 text-lg font-semibold text-safeia-black">{stat.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};
