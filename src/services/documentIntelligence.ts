import { DocumentAnalysisClient, AzureKeyCredential } from '@azure/ai-form-recognizer';
import { AnalysisResult } from '../types';

const endpoint = import.meta.env.VITE_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT;
const apiKey = import.meta.env.VITE_AZURE_DOCUMENT_INTELLIGENCE_API_KEY;

if (!endpoint || !apiKey) {
  throw new Error('Azure Document Intelligence credentials not configured');
}

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

export async function analyzeDocumentWithIntelligence(file: File): Promise<AnalysisResult> {
  const poller = await client.beginAnalyzeDocument(
    'prebuilt-document',
    await file.arrayBuffer()
  );

  const { content, pages, tables, styles } = await poller.pollUntilDone();

  return {
    content: content || '',
    pages: pages?.length || 0,
    tables: tables?.map(table => JSON.stringify(table)) || [],
    styles: styles?.map(style => JSON.stringify(style)) || [],
    procedures: [],
    safetyMeasures: [],
    equipment: [],
    personnel: [],
    risks: [],
    complianceStatus: {
      isCompliant: false,
      country: '',
      applicableLegislation: [],
      violations: [],
      recommendations: []
    },
    embeddings: []
  };
}
