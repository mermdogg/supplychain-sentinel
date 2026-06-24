import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchSuppliers() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    name: row.name,
    country: row.country,
    industry: row.industry,
    product: row.product,
    criticality: row.criticality,
    riskScore: row.risk_score,
    riskLevel: row.risk_level,
    aiSummary: row.ai_summary || "",
    riskFactors: row.risk_factors || [],
    recommendedActions: row.recommended_actions || [],
    createdAt: row.created_at,
    lat: row.lat,
    lng: row.lng,
  }));
}

export async function insertSupplier(supplier: {
  name: string;
  country: string;
  industry: string;
  product: string;
  criticality: string;
  riskScore: number;
  riskLevel: string;
  aiSummary: string;
  riskFactors: string[];
  recommendedActions: string[];
  lat?: number;
  lng?: number;
}) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert({
      name: supplier.name,
      country: supplier.country,
      industry: supplier.industry,
      product: supplier.product,
      criticality: supplier.criticality,
      risk_score: supplier.riskScore,
      risk_level: supplier.riskLevel,
      ai_summary: supplier.aiSummary,
      risk_factors: supplier.riskFactors,
      recommended_actions: supplier.recommendedActions,
      lat: supplier.lat,
      lng: supplier.lng,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSupplier(id: string) {
  const { error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function fetchAlerts() {
  const { data, error } = await supabase
    .from("disruption_alerts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data || []).map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    severity: row.severity,
    affectedRegion: row.affected_region,
    date: row.created_at,
    suppliersAffected: row.suppliers_affected,
  }));
}