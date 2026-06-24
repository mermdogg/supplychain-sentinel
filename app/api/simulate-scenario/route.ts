import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  try {
    const { scenario } = await request.json();

    if (!scenario || scenario.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a scenario description" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(getMockResult(scenario));
    }

    try {
      const client = new Anthropic({ apiKey });

      const prompt = `You are a senior supply chain risk analyst for a major aerospace and defense prime contractor. A program manager has submitted the following disruption scenario for analysis:

"${scenario}"

Return ONLY valid JSON with no markdown, no explanation, no code blocks:
{
  "businessImpact": "<2-3 sentence summary of the business and program impact>",
  "operationalRisks": ["<risk 1>", "<risk 2>", "<risk 3>", "<risk 4>"],
  "mitigationSteps": ["<step 1>", "<step 2>", "<step 3>", "<step 4>"],
  "alternativeSourcing": ["<idea 1>", "<idea 2>", "<idea 3>"]
}

Be specific to aerospace and defense. Reference real industry concepts like ITAR, sole-source waivers, program schedules, and delivery order impacts where relevant.`;

      const message = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      });

      const text =
        message.content[0].type === "text" ? message.content[0].text : "";
      const parsed = JSON.parse(text.trim());
      return NextResponse.json(parsed);
    } catch (error) {
      console.error("Claude scenario error:", error);
      return NextResponse.json(getMockResult(scenario));
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Simulation failed" },
      { status: 500 }
    );
  }
}

function getMockResult(scenario: string) {
  return {
    businessImpact:
      "This disruption scenario would create significant cascading effects across dependent programs. Production timelines would compress and alternative sourcing would become urgent, with potential contract penalty exposure if delivery orders are missed.",
    operationalRisks: [
      "Production line stoppage within 30-60 days if inventory is depleted",
      "Subcontractor schedule slip cascading to prime contractor milestones",
      "Potential Liquidated Damages exposure under fixed-price delivery orders",
      "ITAR re-authorization delays if alternative foreign suppliers are engaged",
    ],
    mitigationSteps: [
      "Activate emergency inventory draw-down authorization immediately",
      "Issue RFQs to qualified alternative suppliers within 48 hours",
      "Brief program managers and update Integrated Master Schedule",
      "Engage contracting officer to document force majeure conditions",
    ],
    alternativeSourcing: [
      "Evaluate qualified suppliers in NATO-allied nations with existing ITAR agreements",
      "Contact domestic manufacturers for surge capacity authorization",
      "Review existing long-term agreements for schedule flexibility clauses",
    ],
  };
}
