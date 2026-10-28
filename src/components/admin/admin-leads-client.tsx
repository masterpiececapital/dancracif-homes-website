"use client";

import * as React from "react";
import {
  Search,
  Phone,
  Mail,
  Calendar,
  Building,
  Trash2,
  Edit3,
  X,
  Save,
  MessageSquare,
  RefreshCw,
  Filter,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getLeadsList,
  updateLeadStatusAction,
  updateLeadNotesAction,
  deleteLeadAction,
} from "@/app/actions/admin-dashboard";
import { LeadInquiry, InquiryStatus, InquiryType } from "@/lib/db/entities/LeadInquiry";

interface AdminLeadsClientProps {
  initialLeads: LeadInquiry[];
}

export function AdminLeadsClient({ initialLeads }: AdminLeadsClientProps) {
  const [leads, setLeads] = React.useState<LeadInquiry[]>(initialLeads);
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Selected lead for detail/notes modal
  const [activeLead, setActiveLead] = React.useState<LeadInquiry | null>(null);
  const [notesDraft, setNotesDraft] = React.useState("");
  const [isSavingNotes, setIsSavingNotes] = React.useState(false);

  const fetchFilteredLeads = async (type: string, status: string, search: string) => {
    setIsRefreshing(true);
    try {
      const filtered = await getLeadsList({ type, status, search });
      setLeads(filtered);
    } catch {
      toast.error("Failed to load inquiries");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    fetchFilteredLeads(type, selectedStatus, searchTerm);
  };

  const handleStatusFilterChange = (status: string) => {
    setSelectedStatus(status);
    fetchFilteredLeads(selectedType, status, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    fetchFilteredLeads(selectedType, selectedStatus, val);
  };

  const handleStatusUpdate = async (leadId: string, newStatus: InquiryStatus) => {
    const originalLeads = [...leads];
    setLeads((curr) =>
      curr.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    if (activeLead && activeLead.id === leadId) {
      setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await updateLeadStatusAction(leadId, newStatus);
      toast.success(`Status updated to "${newStatus}"`);
    } catch {
      setLeads(originalLeads);
      toast.error("Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    setIsSavingNotes(true);
    try {
      await updateLeadNotesAction(activeLead.id, notesDraft);
      setLeads((curr) =>
        curr.map((l) =>
          l.id === activeLead.id ? { ...l, notes: notesDraft } : l
        )
      );
      setActiveLead((prev) => (prev ? { ...prev, notes: notesDraft } : null));
      toast.success("Internal notes saved");
    } catch {
      toast.error("Failed to save notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Are you sure you want to permanently remove this inquiry?")) {
      return;
    }
    try {
      await deleteLeadAction(leadId);
      setLeads((curr) => curr.filter((l) => l.id !== leadId));
      if (activeLead?.id === leadId) {
        setActiveLead(null);
      }
      toast.success("Inquiry removed");
    } catch {
      toast.error("Failed to delete inquiry");
    }
  };

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "reserve":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "buy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "inspection":
        return "bg-blue-50 text-[#00ABF0] border-blue-200";
      case "open-house":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-50 text-[#00ABF0] border-blue-200";
      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "scheduled":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "archived":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by prospect name, email, or phone number..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          {/* Inquiry Types */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1.5 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            {[
              { id: "all", label: "All" },
              { id: "reserve", label: "Reservations" },
              { id: "inspection", label: "Inspections" },
              { id: "buy", label: "Buy Requests" },
              { id: "open-house", label: "Open House" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTypeChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === tab.id
                    ? "bg-[#0754C6] text-white shadow-2xs"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0754C6]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="scheduled">Scheduled</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-5">Prospect Details</th>
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Inquiry Type</th>
                <th className="py-3.5 px-5">Unit / Details</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No lead inquiries matching current filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Prospect Name & Date */}
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900">
                        {lead.fullName}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(lead.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Contact (Phone & Email) */}
                    <td className="py-4 px-5 text-xs text-slate-600 space-y-1">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 hover:text-[#00ABF0] font-medium transition-colors"
                      >
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{lead.phone}</span>
                      </a>
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1.5 hover:text-[#00ABF0] transition-colors truncate max-w-[200px]"
                      >
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span className="truncate">{lead.email}</span>
                      </a>
                    </td>

                    {/* Inquiry Type */}
                    <td className="py-4 px-5">
                      <span
                        className={`inline-block text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${getTypeBadgeClass(
                          lead.type
                        )}`}
                      >
                        {lead.type}
                      </span>
                    </td>

                    {/* Unit / Details */}
                    <td className="py-4 px-5 text-xs">
                      {lead.unitType ? (
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          <Building className="w-3 h-3 text-[#00ABF0]" />
                          <span>{lead.unitType}</span>
                          {lead.numberOfUnits > 1 && (
                            <span className="text-slate-400 font-normal">
                              ({lead.numberOfUnits} units)
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">General Estate</span>
                      )}

                      {lead.preferredDate && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{lead.preferredDate}</span>
                        </div>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-5">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            lead.id,
                            e.target.value as InquiryStatus
                          )
                        }
                        className={`text-xs font-bold rounded-lg px-2.5 py-1 border transition-all cursor-pointer ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="scheduled">SCHEDULED</option>
                        <option value="closed">CLOSED</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right space-x-1.5">
                      <button
                        onClick={() => {
                          setActiveLead(lead);
                          setNotesDraft(lead.notes || "");
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0754C6] hover:text-white text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        title="View details & internal notes"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Notes</span>
                      </button>

                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL & NOTES MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Inquiry: {activeLead.fullName}
                </h3>
                <p className="text-xs text-slate-400">
                  {new Date(activeLead.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">Phone</span>
                  <a
                    href={`tel:${activeLead.phone}`}
                    className="font-bold text-[#00ABF0]"
                  >
                    {activeLead.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">Email</span>
                  <a
                    href={`mailto:${activeLead.email}`}
                    className="font-bold text-[#00ABF0] truncate block"
                  >
                    {activeLead.email}
                  </a>
                </div>
              </div>

              {activeLead.unitType && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-400 block">Unit Type</span>
                    <span className="font-semibold text-slate-800">
                      {activeLead.unitType}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Number of Units</span>
                    <span className="font-semibold text-slate-800">
                      {activeLead.numberOfUnits}
                    </span>
                  </div>
                </div>
              )}

              {activeLead.preferredDate && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 block">
                    Preferred Inspection Date
                  </span>
                  <span className="font-semibold text-slate-800">
                    {activeLead.preferredDate}
                  </span>
                </div>
              )}

              {activeLead.message && (
                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 block font-medium mb-1">
                    Client Message:
                  </span>
                  <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 italic">
                    &ldquo;{activeLead.message}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Internal Admin Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Internal Follow-Up Notes
              </label>
              <textarea
                rows={3}
                placeholder="Log internal follow-up details (e.g., 'Called client on Oct 15, interested in 2-bed penthouse, requested PDF brochure')..."
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setActiveLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold tracking-wide shadow-xs cursor-pointer transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingNotes ? "Saving..." : "Save Notes"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
