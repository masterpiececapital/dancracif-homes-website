"use client";

import * as React from "react";

const MILESTONES = [
  {
    number: "01",
    date: "Apr 2026",
    title: "Groundbreaking & site mobilisation",
  },
  {
    number: "02",
    date: "Oct 2026 – Jun 2027",
    title: "Substructure & superstructure works",
  },
  {
    number: "03",
    date: "Jul – Nov 2027",
    title: "Roofing, services & finishes",
  },
  {
    number: "04",
    date: "Dec 2027",
    title: "Infrastructure completion & handover",
  },
];

export const ConstructionTimeline: React.FC = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0754C6]">
            Construction Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Indicative milestones
          </h2>
          <p className="text-sm text-zinc-500 max-w-2xl">
            14-month delivery programme from October 2026 to December 2027,
            following groundbreaking in April 2026.
          </p>
        </div>

        {/* Timeline cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MILESTONES.map((m) => (
            <div
              key={m.number}
              className="rounded-2xl border border-zinc-100 bg-white p-5 space-y-2 hover:border-[#0754C6]/20 hover:shadow-sm transition-all"
            >
              <span className="text-xs font-bold text-[#0754C6] uppercase tracking-wider">
                {String(m.number).padStart(2, "0")} · {m.date}
              </span>
              <p className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                {m.title}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-400">
          Timeline is indicative and subject to change.
        </p>
      </div>
    </section>
  );
};
