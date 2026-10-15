"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, FileText, Building2 } from "lucide-react";

const UNIT_MIX = [
  { type: "1-Bedroom Apartment", count: 32 },
  { type: "2-Bedroom Apartment", count: 48 },
  { type: "4-Bedroom Terrace", count: 8 },
];

const KEY_HIGHLIGHTS = [
  {
    icon: <Calendar className="h-5 w-5 text-[#0754C6]" />,
    title: "14-month delivery",
    sub: "Completion: December 2027",
  },
  {
    icon: <FileText className="h-5 w-5 text-[#0754C6]" />,
    title: "Title to buyer",
    sub: "Deed of lease",
  },
  {
    icon: <Building2 className="h-5 w-5 text-[#0754C6]" />,
    title: "Commercial building",
    sub: "Ground + first floor",
  },
];

interface UnitMixSectionProps {
  exteriorImageSrc?: string;
  interiorImageSrc?: string;
}

export const UnitMixSection: React.FC<UnitMixSectionProps> = ({
  exteriorImageSrc,
  interiorImageSrc,
}) => {
  const total = UNIT_MIX.reduce((acc, u) => acc + u.count, 0);

  return (
    <section className="w-full bg-[#FAFCFE] py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left column */}
          <div className="space-y-8">
            {/* Unit Mix Table */}
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                Unit mix
              </h2>
              <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
                {UNIT_MIX.map((row) => (
                  <div
                    key={row.type}
                    className="flex items-center justify-between px-5 py-3.5 bg-white hover:bg-zinc-50 transition-colors"
                  >
                    <span className="text-sm text-zinc-700">{row.type}</span>
                    <span className="text-sm font-bold text-zinc-900">{row.count}</span>
                  </div>
                ))}
                {/* Total row */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#EBF3FC]">
                  <span className="text-sm font-semibold text-[#0754C6]">
                    Total residential units
                  </span>
                  <span className="text-sm font-extrabold text-[#0754C6]">{total}</span>
                </div>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KEY_HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-zinc-100 bg-white"
                >
                  <div className="mt-0.5 shrink-0">{h.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{h.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — property images (user will supply) */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100">
              {exteriorImageSrc ? (
                <Image
                  src={exteriorImageSrc}
                  alt="Fidelis Court Exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
                  Exterior photo
                </div>
              )}
            </div>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100">
              {interiorImageSrc ? (
                <Image
                  src={interiorImageSrc}
                  alt="Fidelis Court Interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
                  Interior photo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
