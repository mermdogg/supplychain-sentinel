import Anthropic from "@anthropic-ai/sdk";

interface SupplierInput {
  name: string;
  country: string;
  industry: string;
  product: string;
  criticality: string;
}

interface AIRiskAnalysis {
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  riskFactors: string[];
  aiSummary: string;
  recommendedActions: string[];
}

function getMockAnalysis(supplier: SupplierInput): AIRiskAnalysis {
  const scores: Record<string, number> = {
    Russia: 90, China: 70, Taiwan: 65, Iran: 88,
    Mexico: 32, India: 38, USA: 10, Germany: 10,
    UK: 12, Norway: 6, Japan: 15, "South Korea": 20,
    Indonesia: 45,
  };
  const base = scores[supplier.country] ?? 50;
  const critBonus =
    supplier.criticality === "High" ? 15 :
    supplier.criticality === "Medium" ? 5 : -5;
  const riskScore = Math.min(100, Math.max(0, base + critBonus));
  const riskLevel =
    riskScore >= 75 ? "Critical" :
    riskScore >= 50 ? "High" :
    riskScore >= 25 ? "Medium" : "Low";

  return {
    riskScore,
    riskLevel,
    riskFactors: [
      `${supplier.country} geopolitical and trade risk`,
      `${supplier.industry} sector volatility`,
      `${supplier.criticality} criticality dependency`,
    ],
    aiSummary: `[MOCK] ${supplier.name} in ${supplier.country} presents a ${riskLevel.toLowerCase()} risk profile. Add ANTHROPIC_API_KEY for real AI analysis.`,
    recommendedActions: [
      "Evaluate alternative suppliers in lower-risk regions",
      "Review contract terms and force majeure clauses",
      "Establish safety stock appropriate to lead time",
    ],
  };
}

export async function analyzeSupplierRisk(
  supplier: SupplierInput
): Promise<AIRiskAnalysis> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  console.log("API Key present:", !!apiKey);
  console.log("API Key prefix:", apiKey?.substring(0, 15));

  if (!apiKey) {
    console.log("No API key found, using mock");
    return getMockAnalysis(supplier);
  }

  try {
    const client = new Anthropic({ apiKey });

    const prompt = `You are a senior supply chain risk analyst specializing in aerospace and defense procurement. Analyze this supplier and return a JSON risk assessment.

Supplier Details:
- Name: ${supplier.name}
- Country: ${supplier.country}
- Industry: ${supplier.industry}
- Product/Category: ${supplier.product}
- Program Criticality: ${supplier.criticality}

Return ONLY valid JSON with no markdown, no explanation, no code blocks:
{
  "riskScore": <integer 0-100>,
  "riskLevel": "<Low|Medium|High|Critical>",
  "riskFactors": ["<factor 1>", "<factor 2>", "<factor 3>"],
  "aiSummary": "<2-3 sentence executive summary for a defense program manager>",
  "recommendedActions": ["<action 1>", "<action 2>", "<action 3>"]
}`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    console.log("Claude response:", text.substring(0, 100));
    const parsed = JSON.parse(text.trim());
    return parsed as AIRiskAnalysis;
  } catch (error) {
    console.error("Claude API error:", error);
    return getMockAnalysis(supplier);
  }
}
