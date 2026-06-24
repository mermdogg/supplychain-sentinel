import { Shield, Users, AlertTriangle, Bell } from "lucide-react";
import { DashboardStats } from "@/types";

function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  subtitle,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  subtitle?: string;
  accent?: string;
}) {
  return (
    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-5 overflow-hidden hover:border-gray-700 transition-colors">
      {/* Subtle top accent line */}
      {accent && (
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${accent}`} />
      )}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1 tracking-tight">
        {value}
      </div>
      <div className="text-sm font-medium text-gray-400">{label}</div>
      {subtitle && (
        <div className="text-xs text-gray-600 mt-1">{subtitle}</div>
      )}
    </div>
  );
}

export default function StatsRow({ stats }: { stats: DashboardStats }) {
  const riskSubtitle =
    stats.overallRiskScore >= 75
      ? "⚠ Critical — immediate action required"
      : stats.overallRiskScore >= 50
      ? "↑ Elevated — multiple risks active"
      : stats.overallRiskScore >= 25
      ? "~ Moderate — monitor closely"
      : "✓ Low — portfolio stable";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Overall Risk Score"
        value={stats.overallRiskScore}
        icon={Shield}
        iconBg="bg-red-500/10"
        iconColor="text-red-400"
        accent="bg-gradient-to-r from-red-500/50 to-orange-500/50"
        subtitle={riskSubtitle}
      />
      <StatCard
        label="Suppliers Tracked"
        value={stats.totalSuppliers}
        icon={Users}
        iconBg="bg-blue-500/10"
        iconColor="text-blue-400"
        accent="bg-gradient-to-r from-blue-500/50 to-cyan-500/50"
        subtitle="Across all programs"
      />
      <StatCard
        label="High-Risk Suppliers"
        value={stats.highRiskCount}
        icon={AlertTriangle}
        iconBg="bg-orange-500/10"
        iconColor="text-orange-400"
        accent="bg-gradient-to-r from-orange-500/50 to-yellow-500/50"
        subtitle="Risk score ≥ 50"
      />
      <StatCard
        label="Active Alerts"
        value={stats.recentAlerts}
        icon={Bell}
        iconBg="bg-purple-500/10"
        iconColor="text-purple-400"
        accent="bg-gradient-to-r from-purple-500/50 to-pink-500/50"
        subtitle="Last 30 days"
      />
    </div>
  );
}