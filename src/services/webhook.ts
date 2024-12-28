import { AnalysisResult } from '../types';
import { WEBHOOK_URL } from '../config/constants';
import { useEmailStore } from '../store/emailStore';

export async function sendToWebhook(analysis: AnalysisResult): Promise<void> {
  const email = useEmailStore.getState().email;

  if (!email) {
    throw new Error('Se requiere un correo electrónico para el análisis');
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysis,
        email,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en webhook: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error al enviar webhook:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al enviar resultados');
  }
}