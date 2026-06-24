import Navbar from "@/components/layout/Navbar";
import StatsRow from "@/components/dashboard/StatsRow";
import RiskTrendChart from "@/components/dashboard/RiskTrendChart";
import SupplierTable from "@/components/dashboard/SupplierTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import LiveNewsFeed from "@/components/dashboard/LiveNewsFeed";
import { mockSuppliers, mockAlerts, mockRiskTrend } from "@/lib/mockData";
import { getOverallRiskScore } from "@/lib/utils";

export default function DashboardPage() {
  const overallRiskScore = getOverallRiskScore(
    mockSuppliers.map((s) => s.riskScore)
  );
  const highRiskCount = mockSuppliers.filter((s) => s.riskScore >= 50).length;

  const stats = {
    overallRiskScore,
    totalSuppliers: mockSuppliers.length,
    highRiskCount,
    recentAlerts: mockAlerts.length,
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Risk Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time supply chain risk intelligence across your supplier network
          </p>
        </div>

        <StatsRow stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <RiskTrendChart data={mockRiskTrend} />
          </div>
          <AlertsPanel alerts={mockAlerts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-1 min-h-[520px]">
            <LiveNewsFeed />
          </div>
          <div className="lg:col-span-2">
            <SupplierTable suppliers={mockSuppliers} />
          </div>
        </div>
      </main>
    </div>
  );
}