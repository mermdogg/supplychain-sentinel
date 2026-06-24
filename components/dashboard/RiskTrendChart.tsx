"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { RiskTrendPoint } from "@/types";
import { TrendingUp } from "lucide-react";

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    const level =
      score >= 75
        ? { label: "Critical", color: "text-red-400" }
        : score >= 50
        ? { label: "High", color: "text-orange-400" }
        : score >= 25
        ? { label: "Medium", color: "text-yellow-400" }
        : { label: "Low", color: "text-green-400" };

    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-white">
          {score}
          <span className="text-xs text-gray-500 font-normal ml-1">/100</span>
        </p>
        <p className={`text-xs font-medium ${level.color}`}>{level.label} Risk</p>
      </div>
    );
  }
  return null;
}

export default function RiskTrendChart({ data }: { data: RiskTrendPoint[] }) {
  const latest = data[data.length - 1]?.score ?? 0;
  const previous = data[data.length - 2]?.score ?? 0;
  const delta = latest - previous;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-white">Portfolio Risk Trend</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Aggregate risk score across all tracked suppliers
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Delta badge */}
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
            delta > 0
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : delta < 0
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-gray-800 text-gray-400"
          }`}>
            <TrendingUp className={`w-3 h-3 ${delta < 0 ? "rotate-180" : ""}`} />
            {delta > 0 ? "+" : ""}{delta} vs last month
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-blue-400 inline-block rounded" />
          Risk Score
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-px bg-red-500/50 border-dashed inline-block" />
          High threshold (50)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-px bg-red-500/30 border-dashed inline-block" />
          Critical threshold (75)
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 25, 50, 75, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={50}
            stroke="#f97316"
            strokeOpacity={0.3}
            strokeDasharray="4 4"
          />
          <ReferenceLine
            y={75}
            stroke="#ef4444"
            strokeOpacity={0.3}
            strokeDasharray="4 4"
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#riskGradient)"
            dot={{ fill: "#3b82f6", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#60a5fa", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}