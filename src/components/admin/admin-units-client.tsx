"use client";

import * as React from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Edit3,
  Save,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getPropertyUnitsList,
  updatePropertyUnitAction,
} from "@/app/actions/admin-dashboard";
import { PropertyUnit } from "@/lib/db/entities/PropertyUnit";

interface AdminUnitsClientProps {
  initialUnits: PropertyUnit[];
}

export function AdminUnitsClient({ initialUnits }: AdminUnitsClientProps) {
  const [units, setUnits] = React.useState<PropertyUnit[]>(initialUnits);
  const [editingUnitId, setEditingUnitId] = React.useState<string | null>(null);
  const [unitForm, setUnitForm] = React.useState<Partial<PropertyUnit>>({});
  const [isSaving, setIsSaving] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const fresh = await getPropertyUnitsList();
      setUnits(fresh);
      toast.success("Estate inventory refreshed");
    } catch {
      toast.error("Failed to refresh units");
    } finally {
      setIsRefreshing(false);
    }
  };

  const startEdit = (unit: PropertyUnit) => {
    setEditingUnitId(unit.id);
    setUnitForm({
      price: unit.price,
      availableUnits: unit.availableUnits,
      unitsCount: unit.unitsCount,
      status: unit.status,
      description: unit.description,
    });
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    try {
      await updatePropertyUnitAction(id, unitForm);
      setUnits((curr) =>
        curr.map((u) => (u.id === id ? { ...u, ...unitForm } : u))
      );
      setEditingUnitId(null);
      toast.success("Unit details updated successfully");
    } catch {
      toast.error("Failed to update unit details");
    } finally {
      setIsSaving(false);
    }
  };

  const totalInventory = units.reduce(
    (acc, u) => acc + (u.unitsCount || 0),
    0
  );
  const availableInventory = units.reduce(
    (acc, u) => acc + (u.availableUnits || 0),
    0
  );
  const soldInventory = Math.max(0, totalInventory - availableInventory);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case "limited":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Limited Units
          </span>
        );
      case "sold_out":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Sold Out
          </span>
        );
      default:
        return (
          <span className="text-[11px] uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls Row */}
      <div className="flex items-center justify-end gap-3">
          <Link
            href="/fidelis-court"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0754C6] text-xs font-semibold shadow-2xs transition-all"
          >
            <span>Live Estate Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Units Built
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {totalInventory} Units
            </div>
            <span className="text-[11px] text-slate-500">Across 4 unit types</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0754C6] flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Available Units
            </span>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {availableInventory} Units Left
            </div>
            <span className="text-[11px] text-slate-500">
              Open for immediate purchase
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Sold &amp; Reserved
            </span>
            <div className="text-2xl font-black text-slate-700 mt-1">
              {soldInventory} Units
            </div>
            <span className="text-[11px] text-slate-500">
              {Math.round((soldInventory / (totalInventory || 1)) * 100)}% Allocation rate
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Home className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {units.map((unit) => {
          const isEditing = editingUnitId === unit.id;
          const availablePct = Math.round(
            (unit.availableUnits / (unit.unitsCount || 1)) * 100
          );

          return (
            <div
              key={unit.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="p-6 space-y-4">
                {/* Header with Title and Status */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#0754C6] uppercase tracking-wider font-semibold">
                      ID: {unit.id}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      {unit.title}
                    </h3>
                  </div>
                  {getStatusBadge(unit.status)}
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {unit.description}
                </p>

                {/* Edit Form or Read-Only State */}
                {isEditing ? (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Price Display String
                      </label>
                      <input
                        type="text"
                        value={unitForm.price ?? unit.price}
                        onChange={(e) =>
                          setUnitForm((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Available Units
                        </label>
                        <input
                          type="number"
                          value={
                            unitForm.availableUnits ?? unit.availableUnits
                          }
                          onChange={(e) =>
                            setUnitForm((prev) => ({
                              ...prev,
                              availableUnits: Number(e.target.value),
                            }))
                          }
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Total Units
                        </label>
                        <input
                          type="number"
                          value={unitForm.unitsCount ?? unit.unitsCount}
                          onChange={(e) =>
                            setUnitForm((prev) => ({
                              ...prev,
                              unitsCount: Number(e.target.value),
                            }))
                          }
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Inventory Status
                      </label>
                      <select
                        value={unitForm.status ?? unit.status}
                        onChange={(e) =>
                          setUnitForm((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
                      >
                        <option value="available">Available</option>
                        <option value="limited">Limited</option>
                        <option value="sold_out">Sold Out</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingUnitId(null)}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSave(unit.id)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    {/* Price and Availability Chips */}
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-medium">
                        Current Listing Price:
                      </span>
                      <span className="text-xl font-extrabold text-[#0754C6]">
                        {unit.price}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">
                          {unit.availableUnits} Available
                        </span>
                        <span className="text-slate-400">
                          Total {unit.unitsCount} Units
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            availablePct > 30
                              ? "bg-emerald-500"
                              : availablePct > 0
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${Math.max(5, availablePct)}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => startEdit(unit)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#0754C6] hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                      <span>Edit Unit Pricing &amp; Stock</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
