"use client";

import { useState } from "react";
import { Supplier } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash2, X, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function RiskBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-red-500/10 text-red-400 border border-red-500/20",
    High: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    Low: "bg-green-500/10 text-green-400 border border-green-500/20",
  };
  const dots: Record<string, string> = {
    Critical: "bg-red-400",
    High: "bg-orange-400",
    Medium: "bg-yellow-400",
    Low: "bg-green-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[level] || styles.Medium}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[level] || dots.Medium}`} />
      {level}
    </span>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 75 ? "bg-red-500" :
    score >= 50 ? "bg-orange-500" :
    score >= 25 ? "bg-yellow-500" : "bg-green-500";
  const textColor =
    score >= 75 ? "text-red-400" :
    score >= 50 ? "text-orange-400" :
    score >= 25 ? "text-yellow-400" : "text-green-400";
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <span className={`text-sm font-bold tabular-nums ${textColor}`}>{score}</span>
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function CriticalityDot({ level }: { level: string }) {
  const styles: Record<string, string> = {
    High: "text-red-400 bg-red-500/10 border-red-500/20",
    Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    Low: "text-green-400 bg-green-500/10 border-green-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[level] || styles.Medium}`}>
      {level}
    </span>
  );
}

// Full detail modal
function SupplierModal({
  supplier,
  onClose,
}: {
  supplier: Supplier;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-white">{supplier.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {supplier.country} · {supplier.industry} · {supplier.product}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score */}
        <div className="flex items-center gap-4 mb-5 p-4 bg-gray-800/50 rounded-xl">
          <div>
            <div className="text-3xl font-bold text-white">
              {supplier.riskScore}
              <span className="text-sm text-gray-500 font-normal">/100</span>
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Risk Score</div>
          </div>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                supplier.riskScore >= 75 ? "bg-red-500" :
                supplier.riskScore >= 50 ? "bg-orange-500" :
                supplier.riskScore >= 25 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${supplier.riskScore}%` }}
            />
          </div>
          <RiskBadge level={supplier.riskLevel} />
        </div>

        {/* AI Summary */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            AI Risk Briefing
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {supplier.aiSummary}
          </p>
        </div>

        {/* Risk Factors */}
        {supplier.riskFactors?.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Risk Factors
            </h4>
            <div className="space-y-1.5">
              {supplier.riskFactors.map((factor, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Actions */}
        {supplier.recommendedActions?.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Recommended Actions
            </h4>
            <div className="space-y-1.5">
              {supplier.recommendedActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface SupplierTableProps {
  suppliers: Supplier[];
  onDelete?: (id: string) => void;
}

export default function SupplierTable({ suppliers, onDelete }: SupplierTableProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  if (suppliers.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 text-center">
        <p className="text-gray-400 font-medium">No suppliers tracked yet</p>
        <p className="text-gray-600 text-sm mt-1">Add your first supplier to begin risk analysis.</p>
      </div>
    );
  }

  return (
    <>
      {selectedSupplier && (
        <SupplierModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">Supplier Risk Registry</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {suppliers.length} supplier{suppliers.length !== 1 ? "s" : ""} tracked — click any row for full AI briefing
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" /> High</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Medium</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Low</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                {["Supplier", "Country", "Industry", "Product", "Criticality", "Risk Score", "Risk Level", "AI Summary", "Actions"].map((h) => (
                  <TableHead key={h} className="text-gray-500 text-xs font-medium uppercase tracking-wider">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className="border-gray-800/50 hover:bg-gray-800/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedSupplier(supplier)}
                >
                  <TableCell className="font-medium text-white text-sm">{supplier.name}</TableCell>
                  <TableCell className="text-gray-300 text-sm">{supplier.country}</TableCell>
                  <TableCell className="text-gray-400 text-sm">{supplier.industry}</TableCell>
                  <TableCell className="text-gray-400 text-sm">{supplier.product}</TableCell>
                  <TableCell><CriticalityDot level={supplier.criticality} /></TableCell>
                  <TableCell><ScoreBar score={supplier.riskScore} /></TableCell>
                  <TableCell><RiskBadge level={supplier.riskLevel} /></TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{supplier.aiSummary}</p>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(supplier.id)}
                        className="h-7 w-7 p-0 text-gray-600 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}