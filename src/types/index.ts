export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  country: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  uploadedAt: Date;
  file: File;
  result?: AnalysisResult;
  error?: string;
}

export interface AnalysisResult {
  content: string;
  pages: number;
  tables: string[];
  styles: string[];
  safety_and_health: string;
  environment: string;
  quality: string;
  compliance_summary: string;
  embeddings: number[];
}

export interface Procedure {
  id: string;
  title: string;
  description: string;
  steps: string[];
  risks: Risk[];
}

export interface Risk {
  id: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

export interface Legislation {
  type: 'SST' | 'MedioAmbiente' | 'Calidad';
  name: string;
  description: string;
  requirements: string[];
  applicableArticles: string[];
}

export interface ComplianceStatus {
  isCompliant: boolean;
  country: string;
  applicableLegislation: Legislation[];
  violations: string[];
  recommendations: string[];
}

export interface WebhookConfig {
  url: string;
  secret: string;
  enabled: boolean;
}
