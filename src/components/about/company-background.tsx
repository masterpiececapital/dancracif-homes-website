"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Building, Users2, Handshake } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: MapPin,
    label: "Based in Abuja, FCT",
  },
  {
    icon: Building,
    label: "Residential & Commercial",
  },
  {
    icon: Users2,
    label: "Homeowners & Investors",
  },
  {
    icon: Handshake,
    label: "Professional Partnerships",
  },
];

export const CompanyBackground: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/fidelis-court/Sunlit Construction Site Between Scaffolding.png"
                alt="Dangracif Homes property development in Abuja"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white rounded-2xl shadow-lg border border-slate-100 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0754C6] flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Registered
                </p>
                <p className="text-sm font-bold text-slate-900">
                  RC-1896142
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00ABF0] block">
              Our Background
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Developing quality homes in Nigeria&apos;s capital
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Dangracif Homes Limited operates within Nigeria&apos;s real estate and housing sector, with residential development activities in Abuja. Our business focus is on developing and marketing residential and commercial properties that combine practical living spaces with the features and infrastructure required for comfortable modern living.
              </p>
              <p>
                Through our development activities, we create opportunities for homeownership while supporting property investment and the continued development of urban communities. With an emphasis on quality, affordability, functionality and long-term value, we aim to bridge the gap between the demand for suitable housing and the delivery of well-planned residential developments.
              </p>
            </div>

            {/* Highlight Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {HIGHLIGHTS.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
                  >
                    <Icon className="w-4.5 h-4.5 text-[#00ABF0] shrink-0" />
                    <span className="text-[13px] font-semibold text-slate-700">
                      {h.label}
                    </span>
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
