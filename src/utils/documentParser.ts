import { AnalysisResult } from '../types';

export function parseAnalysisResponse(response: string): AnalysisResult {
  try {
    // Attempt to parse JSON if response is in JSON format
    try {
      return JSON.parse(response);
    } catch {
      // If not JSON, parse the text response
      return structureTextResponse(response);
    }
  } catch (error) {
    console.error('Failed to parse analysis response:', error);
    throw error;
  }
}

function structureTextResponse(text: string): AnalysisResult {
  // Extract sections from Markdown headers
  const extractSection = (header: string) => {
    const regex = new RegExp(`### ${header}[\\s\\S]*?(?=(### |<compliance_summary>|$))`, 'i');
    const match = text.match(regex);
    return match ? match[0].trim().replace(`### ${header}`, '').trim() : 'No se encontró información';
  };

  // Extract compliance summary from specific tag
  const extractComplianceSummary = () => {
    const regex = /<compliance_summary>([\s\S]*?)<\/compliance_summary>/i;
    const match = text.match(regex);
    return match ? match[1].trim() : 'No se encontró información';
  };

  return {
    content: text,
    pages: 1,
    tables: [],
    styles: [],
    safety_and_health: extractSection('Seguridad y Salud'),
    environment: extractSection('Medio Ambiente'),
    quality: extractSection('Calidad'),
    compliance_summary: extractComplianceSummary(),
    embeddings: []
  };
}
