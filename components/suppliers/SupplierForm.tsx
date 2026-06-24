"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CriticalityLevel } from "@/types";
import { Brain, Plus } from "lucide-react";

interface SupplierFormData {
  name: string;
  country: string;
  industry: string;
  product: string;
  criticality: CriticalityLevel;
}

interface SupplierFormProps {
  onSubmit: (data: SupplierFormData) => Promise<void>;
}

const industries = [
  "Semiconductors",
  "Raw Materials",
  "Advanced Materials",
  "Avionics",
  "Electronics",
  "Defense Systems",
  "Software",
  "Logistics",
  "Manufacturing",
  "Chemicals",
  "Other",
];

export default function SupplierForm({ onSubmit }: SupplierFormProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    country: "",
    industry: "",
    product: "",
    criticality: "Medium",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.country ||
      !formData.industry ||
      !formData.product
    ) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(
        `${formData.name} added successfully with AI risk analysis.`
      );
      setFormData({
        name: "",
        country: "",
        industry: "",
        product: "",
        criticality: "Medium",
      });
    } catch (e) {
      setError("Failed to add supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <Plus className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Add Supplier</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            AI risk analysis runs automatically on submission
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Supplier Name */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Supplier Name
            </Label>
            <Input
              placeholder="e.g. TaiwanSemi Precision"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl h-10"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Country
            </Label>
            <Input
              placeholder="e.g. Taiwan"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl h-10"
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Industry
            </Label>
            <Select
              value={formData.industry}
              onValueChange={(v) =>
                setFormData({ ...formData, industry: v })
              }
            >
              <SelectTrigger className="bg-gray-800/60 border-gray-700/60 text-white rounded-xl h-10 focus:border-blue-500/50">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 rounded-xl">
                {industries.map((ind) => (
                  <SelectItem
                    key={ind}
                    value={ind}
                    className="text-white hover:bg-gray-700 focus:bg-gray-700 rounded-lg"
                  >
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Product / Category
            </Label>
            <Input
              placeholder="e.g. Microprocessors"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
              className="bg-gray-800/60 border-gray-700/60 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl h-10"
            />
          </div>

          {/* Criticality */}
          <div className="space-y-2 sm:col-span-2">
            <Label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Criticality Level
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {(["Low", "Medium", "High"] as CriticalityLevel[]).map(
                (level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, criticality: level })
                    }
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      formData.criticality === level
                        ? level === "High"
                          ? "bg-red-500/10 border-red-500/40 text-red-400"
                          : level === "Medium"
                          ? "bg-yellow-500/10 border-yellow-500/40 text-yellow-400"
                          : "bg-green-500/10 border-green-500/40 text-green-400"
                        : "bg-gray-800/40 border-gray-700/40 text-gray-500 hover:border-gray-600 hover:text-gray-300"
                    }`}
                  >
                    {level}
                  </button>
                )
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {formData.criticality === "High"
                ? "Mission-critical — no substitute available"
                : formData.criticality === "Medium"
                ? "Important but can be substituted with lead time"
                : "Non-critical — easily sourced elsewhere"}
            </p>
          </div>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="mt-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 text-sm">✓ {success}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Add Supplier & Run AI Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
}