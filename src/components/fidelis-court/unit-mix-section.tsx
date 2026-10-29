"use client";

import * as React from "react";
import { Calendar, FileText, Building2, CheckCircle2 } from "lucide-react";

const UNIT_MIX = [
  { type: "1-Bedroom Apartment", count: 32, note: "Compact, modern layout" },
  { type: "2-Bedroom Apartment", count: 48, note: "Ideal for families & rentals" },
  { type: "4-Bedroom Terrace", count: 8, note: "Premium triplex living" },
];

const KEY_HIGHLIGHTS = [
  {
    icon: <Calendar className="h-6 w-6 text-[#00ABF0]" />,
    title: "14-month delivery",
    sub: "Completion scheduled for December 2027",
  },
  {
    icon: <FileText className="h-6 w-6 text-[#00ABF0]" />,
    title: "Title to buyer",
    sub: "Deed of sub-lease directly issued",
  },
  {
    icon: <Building2 className="h-6 w-6 text-[#00ABF0]" />,
    title: "Commercial building",
    sub: "Ground + first floor retail & services",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-[#00ABF0]" />,
    title: "Infrastructure ready",
    sub: "Paved roads, underground drainage & dual power",
  },
];

export const UnitMixSection: React.FC = () => {
  const total = UNIT_MIX.reduce((acc, u) => acc + u.count, 0);

  return (
    <section className="w-full bg-[#FAFCFE] py-14 sm:py-20 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left column: Unit Mix Table (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">

              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                Unit mix
              </h2>
              <p className="text-sm text-zinc-500">
                88 residential homes planned across three versatile architectural typologies.
              </p>
            </div>

            <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden bg-white shadow-xs">
              {UNIT_MIX.map((row) => (
                <div
                  key={row.type}
                  className="group flex items-center justify-between px-6 py-5 bg-white hover:bg-slate-50/80 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="text-base font-semibold text-zinc-800 group-hover:text-[#00ABF0] group-hover:scale-105 inline-block origin-left transition-all duration-300">
                      {row.type}
                    </span>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">
                      {row.note}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-zinc-900 group-hover:text-[#00ABF0] group-hover:scale-110 inline-block transition-transform duration-300 bg-zinc-100 group-hover:bg-[#00ABF0]/10 px-3 py-1 rounded-xl">
                    {row.count}
                  </span>
                </div>
              ))}
              {/* Total row */}
              <div className="flex items-center justify-between px-6 py-4.5 bg-[#00ABF0]/10 border-t border-[#00ABF0]/20">
                <span className="text-base font-bold text-[#00ABF0]">
                  Total residential units
                </span>
                <span className="text-xl font-extrabold text-[#00ABF0]">
                  {total}
                </span>
              </div>
            </div>
          </div>

          {/* Right column: Key Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00ABF0]">
                PROJECT SPECIFICATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                Key Highlights
              </h3>
              <p className="text-sm text-zinc-500">
                Essential guarantees and development parameters ensuring long-term investment value.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {KEY_HIGHLIGHTS.map((h) => (
                <div
                  key={h.title}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-zinc-200/90 bg-white hover:border-[#00ABF0]/30 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#00ABF0]/10 group-hover:bg-[#00ABF0]/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      {h.icon}
                    </div>
                    <p className="text-lg font-bold text-zinc-900 group-hover:text-[#00ABF0] group-hover:scale-[1.04] inline-block origin-left transition-all duration-300 tracking-tight">
                      {h.title}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-500 group-hover:text-zinc-700 leading-relaxed mt-1.5 transition-colors duration-300">
                      {h.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
