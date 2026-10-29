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
    <section className="w-full min-h-[93vh] bg-[#00ABF0]/10 border-b border-zinc-100 flex items-center py-8">
      <div className="w-full px-6 sm:px-10 lg:px-16 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00ABF0]">
            Facilities &amp; Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Built-in comfort and peace of mind
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {FACILITIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-5 border border-zinc-100 hover:border-[#00ABF0]/30 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-[#0754C6] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm shadow-[#0754C6]/20">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-base font-medium text-zinc-800 group-hover:text-[#00ABF0] group-hover:font-bold group-hover:scale-[1.05] origin-left inline-block transition-all duration-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
