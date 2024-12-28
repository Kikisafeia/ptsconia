import React from 'react';
import { FileText } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { PageHeader } from './components/PageHeader';
import { CountrySelect } from './components/CountrySelect';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ResultsViewer } from './components/ResultsViewer';
import { useDocumentStore } from './store/documentStore';

const App: React.FC = () => {
  const { documents } = useDocumentStore();
  const activeDocument = documents.find(doc => doc.status === 'completed');

  return (
    <div className="min-h-screen bg-safeia-bg">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <PageHeader 
          icon={<FileText className="w-8 h-8 text-safeia-yellow mr-3" />}
          title="Análisis de Procedimiento de Trabajo con IA"
          subtitle="Herramienta profesional de análisis de documentos"
        />

        <div className="grid grid-cols-1 gap-8">
          {activeDocument?.result ? (
            <>
              <ResultsViewer 
                result={activeDocument.result} 
                onConfirm={() => console.log('Results confirmed')}
              />
              <AnalyticsDashboard result={activeDocument.result} />
            </>
          ) : (
            <AnalyticsDashboard result={{
              content: '',
              pages: 0,
              tables: [],
              styles: [],
              safety_and_health: '',
              environment: '',
              quality: '',
              compliance_summary: '',
              embeddings: []
            }} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Subir Documentos</h2>
              <div className="mb-6">
                <CountrySelect />
              </div>
              <FileUpload />
            </div>

            <ProcessingStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
