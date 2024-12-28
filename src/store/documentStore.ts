import { create } from 'zustand';
import { Document } from '../types';

interface DocumentStore {
  documents: Document[];
  defaultCountry: string;
  addDocument: (doc: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  removeDocument: (id: string) => void;
  setDefaultCountry: (country: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  defaultCountry: '',
  addDocument: (doc) =>
    set((state) => ({
      documents: [...state.documents, { ...doc, country: state.defaultCountry }]
    })),
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),
  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),
  setDefaultCountry: (country) => set({ defaultCountry: country }),
}));
