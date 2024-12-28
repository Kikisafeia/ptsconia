import { generateEmbeddings } from './azureEmbeddings';
import { Document } from '../types';

export async function readFileContent(file: File): Promise<{ text: string; embeddings: number[] }> {
  return new Promise(async (resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (!event.target?.result) {
          throw new Error('Failed to read file content');
        }

        const fileContent = event.target.result as string;
        
        // Generate embeddings using Azure OpenAI
        const embeddings = await generateEmbeddings(fileContent);
        
        resolve({
          text: fileContent,
          embeddings
        });
      };
      
      reader.onerror = () => {
        throw new Error(`Error reading file: ${file.name}`);
      };

      if (file.type === 'application/pdf') {
        // Convert PDF to text using Azure OpenAI
        const pdfText = await extractTextFromPDF(file);
        const embeddings = await generateEmbeddings(pdfText);
        resolve({
          text: pdfText,
          embeddings
        });
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Convert DOCX to text using Azure OpenAI
        const docxText = await extractTextFromDOCX(file);
        const embeddings = await generateEmbeddings(docxText);
        resolve({
          text: docxText,
          embeddings
        });
      } else {
        reader.readAsText(file);
      }
    } catch (error) {
      reject(error);
    }
  });
}

import { extractTextFromDocument } from './azureEmbeddings';

async function extractTextFromPDF(file: File): Promise<string> {
  return extractTextFromDocument(file);
}

async function extractTextFromDOCX(file: File): Promise<string> {
  return extractTextFromDocument(file);
}
