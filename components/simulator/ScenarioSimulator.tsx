"use client";

import { useState } from "react";
import {
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Loader2,
  Zap,
} from "lucide-react";

const examples = [
  "What happens if Taiwan semiconductor exports are delayed for 60 days due to military exercises?",
  "How would a 6-month Russian titanium export ban affect our structural programs?",
  "What is the impact if a major hurricane disrupts Mexican manufacturing for 3 weeks?",
  "What if new BIS export controls restrict Class B semiconductor procurement from China?",
];

interface SimResult {
  businessImpact: string;
  operationalRisks: string[];
  mitigationSteps: string[];
  alternativeSourcing: string[];
}

export default function ScenarioSimulator() {
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState<SimResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSimulation = async () => {
    if (!scenario.trim() || scenario.trim().length < 10) {
      setError("Please describe a scenario in more detail.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch("/api/simulate-scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      if (!response.ok) throw new Error("Simulation failed");
      const data = await response.json();
      setResult(data);
    } catch {
      setError("Simulation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Scenario Input</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Describe a disruption — Claude will model the impact
            </p>
          </div>
        </div>

        <div className="p-6">
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="e.g. What happens if Taiwan semiconductor exports are delayed for 60 days due to military exercises in the Taiwan Strait?"
            className="w-full bg-gray-800/60 border border-gray-700/60 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
            rows={4}
          />

          {error && (
            <div className="mt-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={runSimulation}
              disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-purple-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Run Scenario Analysis
                </>
              )}
            </button>
            <button
              onClick={() => { setScenario(""); setResult(null); setError(""); }}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors px-3 py-2"
            >
              Clear
            </button>
          </div>

          {/* Example scenarios */}
          <div className="mt-5">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
              Example scenarios
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setScenario(ex)}
                  className="text-left text-xs text-gray-500 hover:text-blue-400 border border-gray-800 hover:border-blue-800/50 px-3 py-2 rounded-xl transition-all leading-relaxed"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Business Impact */}
          <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
              <h4 className="font-semibold text-white text-sm">Business Impact</h4>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {result.businessImpact}
            </p>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Operational Risks */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <h4 className="font-medium text-white text-sm">Operational Risks</h4>
              </div>
              <ul className="space-y-2.5">
                {result.operationalRisks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                    <span className="text-xs text-gray-400 leading-relaxed">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mitigation Steps */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                </div>
                <h4 className="font-medium text-white text-sm">Mitigation Steps</h4>
              </div>
              <ul className="space-y-2.5">
                {result.mitigationSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-1.5" />
                    <span className="text-xs text-gray-400 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternative Sourcing */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <h4 className="font-medium text-white text-sm">Alternative Sourcing</h4>
              </div>
              <ul className="space-y-2.5">
                {result.alternativeSourcing.map((idea, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                    <span className="text-xs text-gray-400 leading-relaxed">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}