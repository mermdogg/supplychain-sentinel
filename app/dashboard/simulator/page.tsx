import Navbar from "@/components/layout/Navbar";
import ScenarioSimulator from "@/components/simulator/ScenarioSimulator";
import { Zap, Shield, TrendingDown } from "lucide-react";

const useCases = [
  {
    icon: Shield,
    title: "Geopolitical Events",
    description: "Model the impact of sanctions, export controls, or military conflicts on your supplier network.",
    color: "blue",
  },
  {
    icon: TrendingDown,
    title: "Natural Disasters",
    description: "Simulate hurricanes, earthquakes, or flooding disrupting key manufacturing regions.",
    color: "orange",
  },
  {
    icon: Zap,
    title: "Regulatory Changes",
    description: "Assess how new BIS regulations, ITAR updates, or tariff changes affect procurement.",
    color: "purple",
  },
];

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Scenario Simulator</h1>
            <p className="text-gray-500 text-sm mt-1">
              Model supply chain disruptions and receive AI-generated impact analysis
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full">
            <Zap className="w-3 h-3" />
            Powered by Claude AI
          </div>
        </div>

        {/* Use case cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {useCases.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                color === "blue" ? "bg-blue-500/10 border border-blue-500/20" :
                color === "orange" ? "bg-orange-500/10 border border-orange-500/20" :
                "bg-purple-500/10 border border-purple-500/20"
              }`}>
                <Icon className={`w-4 h-4 ${
                  color === "blue" ? "text-blue-400" :
                  color === "orange" ? "text-orange-400" :
                  "text-purple-400"
                }`} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Simulator */}
        <ScenarioSimulator />

      </main>
    </div>
  );
}