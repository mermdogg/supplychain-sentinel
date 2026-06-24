export type CriticalityLevel = "Low" | "Medium" | "High";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface Supplier {
  id: string;
  name: string;
  country: string;
  industry: string;
  product: string;
  criticality: CriticalityLevel;
  riskScore: number;
  riskLevel: RiskLevel;
  aiSummary: string;
  riskFactors: string[];
  recommendedActions: string[];
  createdAt: string;
  lat?: number;
  lng?: number;
}

export interface DisruptionAlert {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  affectedRegion: string;
  date: string;
  suppliersAffected: number;
}

export interface RiskTrendPoint {
  date: string;
  score: number;
}

export interface ScenarioResult {
  scenario: string;
  businessImpact: string;
  operationalRisks: string[];
  mitigationSteps: string[];
  alternativeSourcing: string[];
}

export interface DashboardStats {
  overallRiskScore: number;
  totalSuppliers: number;
  highRiskCount: number;
  recentAlerts: number;
}