import { DisruptionAlert } from "@/types";
import { AlertTriangle, AlertCircle, Info, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "Critical")
    return (
      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-4 h-4 text-red-400" />
      </div>
    );
  if (severity === "High")
    return (
      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-4 h-4 text-orange-400" />
      </div>
    );
  if (severity === "Medium")
    return (
      <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
        <AlertCircle className="w-4 h-4 text-yellow-400" />
      </div>
    );
  return (
    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
      <Info className="w-4 h-4 text-blue-400" />
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/10 text-red-400 border-red-500/20",
    High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${styles[severity] || styles.Low}`}>
      {severity.toUpperCase()}
    </span>
  );
}

export default function AlertsPanel({ alerts }: { alerts: DisruptionAlert[] }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">Disruption Alerts</h3>
          <p className="text-xs text-gray-500 mt-0.5">{alerts.length} active alerts</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-gray-800/50">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 hover:bg-gray-800/30 transition-colors">
            <div className="flex gap-3">
              <SeverityIcon severity={alert.severity} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white leading-snug">
                    {alert.title}
                  </p>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">
                  {alert.description}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(alert.date)}
                  </span>
                  <span>·</span>
                  <span>{alert.affectedRegion}</span>
                  <span>·</span>
                  <span className="text-orange-500/70">
                    {alert.suppliersAffected} supplier{alert.suppliersAffected !== 1 ? "s" : ""} affected
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t border-gray-800 bg-gray-950/30">
        <p className="text-[11px] text-gray-600">
          Alerts update automatically with live intelligence feed
        </p>
      </div>
    </div>
  );
}