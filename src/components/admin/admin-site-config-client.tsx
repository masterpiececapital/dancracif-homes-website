"use client";

import * as React from "react";
import {
  SlidersHorizontal,
  Building2,
  Phone,
  BarChart3,
  CalendarCheck,
  Save,
  Loader2,
  CheckCircle2,
  Sparkles,
  Info,
  Youtube,
  Clock,
  Shield,
  Layers,
  MapPin,
  Mail,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import { saveMultipleSiteConfigs } from "@/app/actions/admin-content";

interface AdminSiteConfigClientProps {
  initialConfigs: Record<string, any>;
}

export function AdminSiteConfigClient({ initialConfigs }: AdminSiteConfigClientProps) {
  const [activeTab, setActiveTab] = React.useState<"estate" | "stats" | "contact" | "open_house">("estate");
  const [isSaving, setIsSaving] = React.useState(false);

  // Estate settings
  const [estate, setEstate] = React.useState({
    name: initialConfigs.estate?.name || "Fidelis Court",
    address:
      initialConfigs.estate?.address ||
      "21, Josephat Mojeckwu Avenue, Kubwa F01, Abuja, FCT, Nigeria",
    description:
      initialConfigs.estate?.description ||
      "A gated residential community on approximately 9,900 sqm.",
    deliveryDate: initialConfigs.estate?.deliveryDate || "December 2027",
    youtubeUrl: initialConfigs.estate?.youtubeUrl || "https://youtube.com",
  });

  // Stats settings
  const [stats, setStats] = React.useState({
    units: initialConfigs.stats?.units || "88",
    sqm: initialConfigs.stats?.sqm || "9,900",
    months: initialConfigs.stats?.months || "14",
    security: initialConfigs.stats?.security || "24/7",
  });

  // Contact settings
  const [contact, setContact] = React.useState({
    phone: initialConfigs.contact?.phone || "+234 800 000 0000",
    email: initialConfigs.contact?.email || "sales@dangracifhomes.com",
    whatsapp: initialConfigs.contact?.whatsapp || "2348000000000",
    inspectionHours:
      initialConfigs.contact?.inspectionHours ||
      "Inspections hold Monday – Saturday, 9am – 5pm.",
  });

  // Open House settings
  const [openHouse, setOpenHouse] = React.useState({
    enabled: initialConfigs.open_house?.enabled ?? true,
    status: initialConfigs.open_house?.status || "Ongoing Event",
    headline: initialConfigs.open_house?.headline || "Fidelis Court Open House",
    description:
      initialConfigs.open_house?.description ||
      "Visit the estate, meet our sales team and explore your next home.",
  });

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveMultipleSiteConfigs({
        estate,
        stats,
        contact,
        open_house: openHouse,
      });
      toast.success("Site configuration saved and published live!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update configuration");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "estate", label: "Estate Info", icon: Building2 },
    { id: "stats", label: "Key Metrics", icon: BarChart3 },
    { id: "contact", label: "Contact & Hours", icon: Phone },
    { id: "open_house", label: "Open House Banner", icon: CalendarCheck },
  ] as const;

  return (
    <form onSubmit={handleSaveAll} className="space-y-6">
      {/* Top Banner and Save Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0754C6]/10 text-[#0754C6] flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Live Website Parameters
            </h2>
            <p className="text-xs text-slate-500">
              Changes made here update the public landing page instantly
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0754C6] hover:bg-[#0648AB] text-white text-xs font-bold tracking-wide shadow-xs transition-all cursor-pointer disabled:opacity-60 self-start sm:self-center"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? "Publishing Changes..." : "Save All Changes"}</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#0754C6] text-white shadow-2xs"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/70"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ESTATE INFO */}
      {activeTab === "estate" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Estate Identity & Specifications
              </h3>
              <p className="text-xs text-slate-500">
                Primary name, physical location, and presentation details
              </p>
            </div>
            <Building2 className="w-5 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Estate Brand Name
              </label>
              <input
                type="text"
                value={estate.name}
                onChange={(e) =>
                  setEstate((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Handover / Delivery Date
              </label>
              <input
                type="text"
                value={estate.deliveryDate}
                onChange={(e) =>
                  setEstate((prev) => ({ ...prev, deliveryDate: e.target.value }))
                }
                placeholder="December 2027"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Physical Location & Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={estate.address}
                onChange={(e) =>
                  setEstate((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              YouTube Video Tour / Walkthrough Link
            </label>
            <div className="relative">
              <Youtube className="w-4 h-4 text-red-500 absolute left-3.5 top-3" />
              <input
                type="url"
                value={estate.youtubeUrl}
                onChange={(e) =>
                  setEstate((prev) => ({ ...prev, youtubeUrl: e.target.value }))
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Estate Overview Description
            </label>
            <textarea
              rows={3}
              value={estate.description}
              onChange={(e) =>
                setEstate((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white resize-y"
            />
          </div>
        </div>
      )}

      {/* TAB 2: KEY METRICS */}
      {activeTab === "stats" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Key Performance Metrics & Stats
              </h3>
              <p className="text-xs text-slate-500">
                Displayed in the bold metric strip on the homepage
              </p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Total Units</span>
                <Layers className="w-4 h-4 text-[#0754C6]" />
              </div>
              <input
                type="text"
                value={stats.units}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, units: e.target.value }))
                }
                placeholder="88"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0754C6]"
              />
              <p className="text-[10px] text-slate-400">Total residential units planned</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Land Footprint</span>
                <MapPin className="w-4 h-4 text-[#0754C6]" />
              </div>
              <input
                type="text"
                value={stats.sqm}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, sqm: e.target.value }))
                }
                placeholder="9,900"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0754C6]"
              />
              <p className="text-[10px] text-slate-400">Total sqm estate area</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Timeline Months</span>
                <Clock className="w-4 h-4 text-[#0754C6]" />
              </div>
              <input
                type="text"
                value={stats.months}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, months: e.target.value }))
                }
                placeholder="14"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0754C6]"
              />
              <p className="text-[10px] text-slate-400">Construction span in months</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Security Guard</span>
                <Shield className="w-4 h-4 text-[#0754C6]" />
              </div>
              <input
                type="text"
                value={stats.security}
                onChange={(e) =>
                  setStats((prev) => ({ ...prev, security: e.target.value }))
                }
                placeholder="24/7"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0754C6]"
              />
              <p className="text-[10px] text-slate-400">Surveillance & gate security</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT & HOURS */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Channels & Operating Hours
              </h3>
              <p className="text-xs text-slate-500">
                Channels utilized across forms, footers, and direct click-to-chat links
              </p>
            </div>
            <Phone className="w-5 h-5 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Inquiries Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Sales Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                WhatsApp Direct Number (Digits only with country code)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={contact.whatsapp}
                  onChange={(e) =>
                    setContact((prev) => ({ ...prev, whatsapp: e.target.value }))
                  }
                  placeholder="2348000000000"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Site Inspection Hours Note
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={contact.inspectionHours}
                  onChange={(e) =>
                    setContact((prev) => ({
                      ...prev,
                      inspectionHours: e.target.value,
                    }))
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OPEN HOUSE BANNER */}
      {activeTab === "open_house" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Open House Announcement Banner
              </h3>
              <p className="text-xs text-slate-500">
                Controls the prominent event ribbon displayed on the top of the website
              </p>
            </div>
            <CalendarCheck className="w-5 h-5 text-slate-400" />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">
                Enable Open House Banner
              </p>
              <p className="text-[11px] text-slate-500">
                When activated, visitors will see the announcement and quick RSVP options
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={openHouse.enabled}
                onChange={(e) =>
                  setOpenHouse((prev) => ({ ...prev, enabled: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0754C6]" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Badge Status Text
              </label>
              <input
                type="text"
                value={openHouse.status}
                onChange={(e) =>
                  setOpenHouse((prev) => ({ ...prev, status: e.target.value }))
                }
                placeholder="Ongoing Event or Scheduled for Saturday"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Event Headline
              </label>
              <input
                type="text"
                value={openHouse.headline}
                onChange={(e) =>
                  setOpenHouse((prev) => ({ ...prev, headline: e.target.value }))
                }
                placeholder="Fidelis Court Open House"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Event Description / Subtitle
            </label>
            <textarea
              rows={2}
              value={openHouse.description}
              onChange={(e) =>
                setOpenHouse((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0754C6]/20 focus:border-[#0754C6] focus:bg-white resize-none"
            />
          </div>

          {/* Live Preview Box */}
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Banner Appearance Preview
            </p>
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#0754C6] to-[#04337a] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white mb-1">
                  {openHouse.status || "Special Event"}
                </span>
                <p className="text-xs font-bold">{openHouse.headline}</p>
                <p className="text-[11px] text-white/80">{openHouse.description}</p>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-white text-[#0754C6] text-xs font-bold self-start sm:self-center shadow-xs">
                RSVP Now
              </span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
