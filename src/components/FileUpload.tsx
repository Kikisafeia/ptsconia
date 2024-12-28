import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { EmailInput } from './EmailInput';

export const FileUpload: React.FC = () => {
  const addDocument = useDocumentStore((state) => state.addDocument);
  const defaultCountry = useDocumentStore((state) => state.defaultCountry);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const doc = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending' as const,
        uploadedAt: new Date(),
        file: file,
        country: defaultCountry
      };
      addDocument(doc);
    });
  }, [addDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <div className="space-y-4">
      <EmailInput />
      
      <div
        {...getRootProps()}
        className={`p-4 md:p-8 border-2 border-dashed rounded-lg transition-colors
          ${isDragActive ? 'border-safeia-yellow bg-safeia-bg' : 'border-safeia-gray'}`}
        role="region"
        aria-label="Área de carga de archivos"
      >
        <input 
          {...getInputProps()} 
          aria-label="Seleccionar archivo"
          aria-describedby="file-upload-instructions"
        />
        <div 
          className="flex flex-col items-center justify-center text-safeia-gray text-center"
          id="file-upload-instructions"
        >
          <Upload className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4" aria-hidden="true" />
          <p className="text-base md:text-lg font-medium">
            {isDragActive
              ? 'Suelta los archivos aquí...'
              : 'Arrastra y suelta archivos aquí, o haz clic para seleccionar'}
          </p>
          <p className="mt-1 md:mt-2 text-xs md:text-sm">
            Formatos soportados: PDF, DOCX, TXT (máx. 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};
