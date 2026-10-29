"use client";

import * as React from "react";
import {
  CalendarDays,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  X,
  Loader2,
  Milestone,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { ConstructionMilestone } from "@/lib/db/entities/ConstructionMilestone";
import {
  getMilestones,
  saveMilestone,
  deleteMilestone,
} from "@/app/actions/admin-content";
import { ViewToggle } from "./ui/view-toggle";
import { ConfirmModal } from "./ui/confirm-modal";
import { CardSkeletonGrid, ListSkeletonTable } from "./ui/skeleton-loaders";

interface AdminTimelineClientProps {
  initialMilestones: ConstructionMilestone[];
}

export function AdminTimelineClient({ initialMilestones }: AdminTimelineClientProps) {
  const [milestones, setMilestones] = React.useState<ConstructionMilestone[]>(initialMilestones);
  const [view, setView] = React.useState<"card" | "list">("card");
  const [isLoading, setIsLoading] = React.useState(false);

  // Edit / Create modal state
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<ConstructionMilestone | null>(null);
  const [formDraft, setFormDraft] = React.useState<Partial<ConstructionMilestone>>({
    phaseNumber: 1,
    date: "",
    title: "",
  });
  const [isSaving, setIsSaving] = React.useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = React.useState<ConstructionMilestone | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormDraft({
      phaseNumber: milestones.length + 1,
      date: "",
      title: "",
    });
    setIsFormOpen(true);
  };

  const openEditModal = (item: ConstructionMilestone) => {
    setEditingItem(item);
    setFormDraft({
      id: item.id,
      phaseNumber: item.phaseNumber,
      date: item.date,
      title: item.title,
    });
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDraft.title?.trim() || !formDraft.date?.trim()) {
      toast.error("Milestone title and completion date are required");
      return;
    }

    setIsSaving(true);
    try {
      const saved = await saveMilestone(formDraft as any);
      if (editingItem) {
        setMilestones((prev) =>
          prev
            .map((m) => (m.id === saved.id ? saved : m))
            .sort((a, b) => a.phaseNumber - b.phaseNumber)
        );
        toast.success("Milestone updated");
      } else {
        setMilestones((prev) =>
          [...prev, saved].sort((a, b) => a.phaseNumber - b.phaseNumber)
        );
        toast.success("Milestone added to timeline");
      }
      setIsFormOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save milestone");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteMilestone(deleteTarget.id);
      setMilestones((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      toast.success("Milestone deleted");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete milestone");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0754C6]/10 text-[#00ABF0] flex items-center justify-center font-bold">
            <Milestone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Project Phases ({milestones.length})
            </h2>
            <p className="text-xs text-slate-500">
              Sequential construction progress displayed on the homepage roadmap
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ViewToggle view={view} onChange={setView} />
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Phase</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        view === "card" ? (
          <CardSkeletonGrid count={4} />
        ) : (
          <ListSkeletonTable rows={4} />
        )
      ) : milestones.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-slate-300 p-12 text-center">
          <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No milestones yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Create sequential phases like Groundbreaking, Superstructure, Roofing, and Handover.
          </p>
          <button
            type="button"
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0754C6] text-white text-xs font-bold hover:bg-[#0648AB] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Phase 1</span>
          </button>
        </div>
      ) : view === "card" ? (
        /* CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {milestones.map((m, index) => (
            <div
              key={m.id}
              className="bg-white rounded-lg border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all p-5 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#00ABF0] text-xs font-bold border border-blue-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0754C6]" />
                    Phase {m.phaseNumber}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    #{index + 1} of {milestones.length}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#00ABF0] transition-colors leading-snug">
                  {m.title}
                </h3>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{m.date}</span>
                </div>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => openEditModal(m)}
                  className="p-1.5 rounded-md text-slate-500 hover:text-[#00ABF0] hover:bg-slate-100 cursor-pointer"
                  title="Edit Milestone"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(m)}
                  className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  title="Delete Milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-lg border border-slate-200/80 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-28">Phase</th>
                <th className="py-3 px-4">Milestone Title</th>
                <th className="py-3 px-4 w-48">Target Timeline</th>
                <th className="py-3 px-4 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {milestones.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#00ABF0]">
                    Phase {m.phaseNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {m.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {m.date}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(m)}
                        className="p-1.5 rounded-md text-slate-500 hover:text-[#00ABF0] hover:bg-slate-100 cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(m)}
                        className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => !isSaving && setIsFormOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#0754C6]/10 text-[#00ABF0] flex items-center justify-center">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {editingItem ? "Edit Milestone" : "Add Construction Phase"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Fidelis Court progress timeline
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                disabled={isSaving}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phase Number *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formDraft.phaseNumber ?? 1}
                  onChange={(e) =>
                    setFormDraft((prev) => ({
                      ...prev,
                      phaseNumber: parseInt(e.target.value, 10) || 1,
                    }))
                  }
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Milestone Title *
                </label>
                <input
                  type="text"
                  required
                  value={formDraft.title || ""}
                  onChange={(e) =>
                    setFormDraft((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Groundbreaking & Foundation"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Timeline / Date *
                </label>
                <input
                  type="text"
                  required
                  value={formDraft.date || ""}
                  onChange={(e) =>
                    setFormDraft((prev) => ({ ...prev, date: e.target.value }))
                  }
                  placeholder="e.g. Q4 2026 or Dec 2026"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? "Update Phase" : "Save Phase"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Milestone"
        description="Are you sure you want to remove this milestone from the timeline?"
        itemName={`Phase ${deleteTarget?.phaseNumber}: ${deleteTarget?.title}`}
        confirmText="Delete Phase"
        isLoading={isDeleting}
      />
    </div>
  );
}
