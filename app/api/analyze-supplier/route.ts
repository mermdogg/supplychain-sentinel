import { NextRequest, NextResponse } from "next/server";
import { analyzeSupplierRisk } from "@/lib/claudeAI";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, country, industry, product, criticality } = body;

    if (!name || !country || !industry || !product || !criticality) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const analysis = await analyzeSupplierRisk({
      name,
      country,
      industry,
      product,
      criticality,
    });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analyze supplier error:", error);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
