export interface DiagnosisResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  isHealthy: boolean;
  plantName: string;
  diseaseName?: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
}

export interface GeminiResponse {
  isHealthy: boolean;
  plantName: string;
  diseaseName?: string;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
}
