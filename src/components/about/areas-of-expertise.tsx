"use client";

import * as React from "react";
import {
  Home,
  Building2,
  Megaphone,
  HardHat,
  TrendingUp,
  Paintbrush,
} from "lucide-react";

const EXPERTISE_AREAS = [
  {
    icon: Home,
    title: "Residential Development",
    description:
      "Planning and coordinating residential developments designed to meet the housing needs of individuals, families and property investors.",
  },
  {
    icon: Building2,
    title: "Commercial Development",
    description:
      "Developing commercial properties designed to support business operations, investment opportunities and economic activity — including malls and business-oriented real estate.",
  },
  {
    icon: Megaphone,
    title: "Property Sales & Marketing",
    description:
      "Presentation and marketing of available properties, customer engagement, inspections and support for prospective purchasers through the acquisition process.",
  },
  {
    icon: HardHat,
    title: "Project Planning & Coordination",
    description:
      "Coordination with architects, engineers, contractors, consultants and suppliers to support project implementation, quality oversight and timely delivery.",
  },
  {
    icon: TrendingUp,
    title: "Property Investment",
    description:
      "Providing prospective homeowners and investors with information about residential properties and opportunities to participate in the property market.",
  },
  {
    icon: Paintbrush,
    title: "Finishing & Customisation",
    description:
      "Coordination of approved finishing options and property customisation to meet purchasers' specific requirements within developments.",
  },
];

export const AreasOfExpertise: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Two-column layout: left intro, right grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block mb-3">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Our areas of expertise
            </h2>
            <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed">
              From initial planning through to finishing and handover, Dangracif Homes Limited covers the full spectrum of real estate development services. We bring together professionals, processes and partnerships to deliver quality properties.
            </p>
            {/* Decorative line */}
            <div className="hidden lg:block mt-8 w-16 h-1 rounded-full bg-gradient-to-r from-[#0754C6] to-[#60a5fa]" />
          </div>

          {/* Right Column: Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {EXPERTISE_AREAS.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="group relative bg-slate-50/80 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 hover:border-[#0754C6]/20 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Number badge */}
                    <span className="absolute top-5 right-5 text-[11px] font-bold text-slate-300 tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#0754C6]/10 flex items-center justify-center mb-4 group-hover:bg-[#0754C6] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#0754C6] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
