"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import SupplierForm from "@/components/suppliers/SupplierForm";
import SupplierTable from "@/components/dashboard/SupplierTable";
import { Supplier, CriticalityLevel } from "@/types";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskScoring";
import { fetchSuppliers, insertSupplier, deleteSupplier } from "@/lib/supabase";
import { Users, AlertTriangle, TrendingUp, Loader2 } from "lucide-react";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSuppliers()
      .then(setSuppliers)
      .catch(() => setError("Failed to load suppliers from database."))
      .finally(() => setLoading(false));
  }, []);

 const handleAddSupplier = async (formData: {
  name: string;
  country: string;
  industry: string;
  product: string;
  criticality: CriticalityLevel;
}) => {
  // Call Claude AI via our API route
  const response = await fetch("/api/analyze-supplier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("AI analysis failed");
  }

  const analysis = await response.json();

  await insertSupplier({
    ...formData,
    riskScore: analysis.riskScore,
    riskLevel: analysis.riskLevel,
    aiSummary: analysis.aiSummary,
    riskFactors: analysis.riskFactors,
    recommendedActions: analysis.recommendedActions,
  });

  const updated = await fetchSuppliers();
  setSuppliers(updated);
};

  const handleDeleteSupplier = async (id: string) => {
    await deleteSupplier(id);
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const highRisk = suppliers.filter((s) => s.riskScore >= 75).length;
  const avgScore =
    suppliers.length > 0
      ? Math.round(
          suppliers.reduce((a, b) => a + b.riskScore, 0) / suppliers.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Supplier Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading
              ? "Loading from database..."
              : `${suppliers.length} suppliers tracked — data persisted in Supabase`}
          </p>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{suppliers.length}</div>
              <div className="text-xs text-gray-500">Total Suppliers</div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{highRisk}</div>
              <div className="text-xs text-gray-500">Critical Risk</div>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{avgScore}</div>
              <div className="text-xs text-gray-500">Avg Risk Score</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <SupplierForm onSubmit={handleAddSupplier} />

        {loading ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            <span className="text-gray-500 text-sm">Loading suppliers from database...</span>
          </div>
        ) : (
          <SupplierTable
            suppliers={suppliers}
            onDelete={handleDeleteSupplier}
          />
        )}
      </main>
    </div>
  );
}