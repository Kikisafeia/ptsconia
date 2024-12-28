import { Document, AnalysisResult } from '../types';
import { analyzeWithPerplexity } from './perplexity';
import { parseAnalysisResponse } from '../utils/documentParser';
import { sendToWebhook } from './webhook';
import { useEmailStore } from '../store/emailStore';
import { analyzeDocumentWithIntelligence } from './documentIntelligence';
import { useDocumentStore } from '../store/documentStore';

export async function analyzeDocument(document: Document): Promise<AnalysisResult> {
  const email = useEmailStore.getState().email;
  
  if (!email) {
    throw new Error('Por favor, ingrese un correo electrónico antes de analizar');
  }

  try {
    // Primero procesar el documento con Document Intelligence
    console.log('Procesando documento con Azure Document Intelligence...');
    const docIntelligenceResult = await analyzeDocumentWithIntelligence(document.file);
    
    // Realizar análisis con Perplexity
    console.log('Realizando análisis con Perplexity...');
    const analysisResponse = await analyzeWithPerplexity(docIntelligenceResult.content, document.country);
    
    if (!analysisResponse) {
      throw new Error('No se recibió respuesta del análisis');
    }
    
    const analysis = parseAnalysisResponse(analysisResponse);
    
    await sendToWebhook(analysis);
    
    // Update document in store with analysis results and status
    const documentStore = useDocumentStore.getState();
    documentStore.updateDocument(document.id, { 
      result: analysis,
      status: 'completed'
    });
    
    return analysis;
  } catch (error) {
    console.error('Error en análisis:', error);
    throw new Error(error instanceof Error ? error.message : 'Error durante el análisis');
  }
}
