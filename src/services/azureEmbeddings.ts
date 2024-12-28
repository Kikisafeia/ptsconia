import {
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_EMBEDDINGS_MODEL,
  AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT,
  AZURE_DOCUMENT_INTELLIGENCE_API_KEY
} from '../config/constants';

interface EmbeddingResponse {
  data: Array<{
    embedding: number[];
    index: number;
  }>;
}

interface TextExtractionResponse {
  text: string;
}

export async function extractTextFromDocument(inputFile: File | Blob): Promise<string> {
  // Convertir a File si es necesario
  const file = inputFile instanceof File ? inputFile : new File([inputFile], 'document', { type: 'application/pdf' });

  // Validación básica del archivo
  if (file.size === 0) {
    throw new Error('El archivo está vacío');
  }

  // Verificar el tipo MIME y extensión
  const supportedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/tiff'
  ];
  
  const supportedExtensions = ['.pdf', '.docx', '.jpg', '.jpeg', '.png', '.tiff'];
  
  // Verificar tipo MIME
  if (!supportedTypes.includes(file.type)) {
    throw new Error(`Tipo de archivo no soportado: ${file.type}. Formatos soportados: ${supportedExtensions.join(', ')}`);
  }
  
  // Verificar extensión del archivo
  const fileName = file.name.toLowerCase();
  const hasValidExtension = supportedExtensions.some(ext => fileName.endsWith(ext));
  if (!hasValidExtension) {
    throw new Error(`Extensión de archivo no soportada. Formatos soportados: ${supportedExtensions.join(', ')}`);
  }
  
  // Verificar integridad del archivo
  if (file.size > 50 * 1024 * 1024) { // 50MB
    throw new Error('El archivo es demasiado grande. Tamaño máximo: 50MB');
  }
  try {
    const url = `${AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT}formrecognizer/documentModels/prebuilt-read:analyze?api-version=2023-07-31`;

    // Crear FormData y agregar el archivo
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_DOCUMENT_INTELLIGENCE_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No hay detalles disponibles');
      throw new Error(`Error en Document Intelligence (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    
    if (!result.content) {
      throw new Error('La respuesta de Document Intelligence no contiene el texto extraído');
    }

    return result.content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en Document Intelligence';
    console.error('Error al extraer texto:', errorMessage);
    throw new Error(`Error al extraer texto: ${errorMessage}`);
  }
}

export async function generateEmbeddings(text: string): Promise<number[]> {
  try {
    const apiVersion = '2024-02-15-preview';
    const url = `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_EMBEDDINGS_MODEL}/embeddings?api-version=${apiVersion}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_API_KEY,
      },
      body: JSON.stringify({
        input: text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No hay detalles disponibles');
      throw new Error(`Error en Azure OpenAI (${response.status}): ${errorText}`);
    }

    const data: EmbeddingResponse = await response.json();
    
    if (!data.data?.[0]?.embedding) {
      throw new Error('La respuesta de Azure OpenAI no contiene los embeddings esperados');
    }

    return data.data[0].embedding;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido en Azure OpenAI';
    console.error('Error al generar embeddings:', errorMessage);
    throw new Error(`Error al generar embeddings: ${errorMessage}`);
  }
}
