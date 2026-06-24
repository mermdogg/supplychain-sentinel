import { CriticalityLevel, RiskLevel } from "@/types";

const countryRiskMap: Record<string, number> = {
  Russia: 90, "North Korea": 95, Iran: 88, Belarus: 82, Myanmar: 78,
  China: 68, Taiwan: 65, Pakistan: 62, Venezuela: 70,
  India: 38, Mexico: 32, Brazil: 40, Turkey: 45, Egypt: 42,
  USA: 10, Canada: 8, UK: 12, Germany: 10, France: 12,
  Japan: 15, "South Korea": 20, Norway: 6, Australia: 8, Israel: 30,
};

const industryRiskMap: Record<string, number> = {
  Semiconductors: 75, "Raw Materials": 65, "Advanced Materials": 40,
  Avionics: 55, Electronics: 60, "Defense Systems": 70,
  Software: 30, Logistics: 35, Manufacturing: 45, Chemicals: 55,
};

const criticalityMultiplier: Record<CriticalityLevel, number> = {
  Low: 0.7, Medium: 1.0, High: 1.35,
};

export function calculateRiskScore(
  country: string,
  industry: string,
  criticality: CriticalityLevel
): number {
  const countryScore = countryRiskMap[country] ?? 50;
  const industryScore = industryRiskMap[industry] ?? 50;
  const multiplier = criticalityMultiplier[criticality];
  const baseScore = countryScore * 0.5 + industryScore * 0.35 + 15 * 0.15;
  return Math.min(100, Math.round(baseScore * multiplier));
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return "Critical";
  if (score >= 50) return "High";
  if (score >= 25) return "Medium";
  return "Low";
}

export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case "Critical": return "text-red-500";
    case "High": return "text-orange-500";
    case "Medium": return "text-yellow-500";
    case "Low": return "text-green-500";
  }
}