"use client";

import * as React from "react";
import {
  Building2,
  Shield,
  Wifi,
  Zap,
  Phone,
  CloudRain,
  Droplets,
  Lamp,
  Leaf,
  Fence,
  Trash2,
  Settings2,
  Gauge,
} from "lucide-react";

const FACILITIES = [
  { icon: Building2, label: "Commercial building (G+1)" },
  { icon: Shield, label: "Security office / gate house" },
  { icon: Wifi, label: "Fibre internet" },
  { icon: Zap, label: "Dedicated transformer" },
  { icon: Zap, label: "Generator for common areas" },
  { icon: Shield, label: "24-hour security & patrol" },
  { icon: Phone, label: "Intercom access control" },
  { icon: CloudRain, label: "Storm water network" },
  { icon: Droplets, label: "Industrial borehole & reticulation" },
  { icon: Lamp, label: "Street lighting" },
  { icon: Leaf, label: "Landscaping" },
  { icon: Fence, label: "Perimeter fence & paved walkways" },
  { icon: Trash2, label: "Sewage sanitation network" },
  { icon: Settings2, label: "Facility management service" },
  { icon: Gauge, label: "Smart metering / dual power" },
];

export const FacilitiesSection: React.FC = () => {
  return (
    <section className="w-full bg-[#EBF3FC] py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0754C6]">
            Facilities &amp; Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Built-in comfort and peace of mind
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FACILITIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-zinc-100 hover:border-[#0754C6]/20 hover:shadow-sm transition-all"
            >
              <div className="h-9 w-9 shrink-0 rounded-xl bg-[#0754C6] flex items-center justify-center">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-zinc-800">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
