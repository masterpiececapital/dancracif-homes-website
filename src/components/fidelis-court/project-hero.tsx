"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

export const ProjectHero: React.FC = () => {
  return (
    <section className="w-full bg-[#0D1B3E] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B8DEF]">
            The Project
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Fidelis Court
          </h1>
          <div className="flex items-start gap-2 text-zinc-400 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#5B8DEF]" />
            <span>21, Josephat Mojeckwu Avenue, Kubwa F01, Abuja, FCT, Nigeria</span>
          </div>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
            A gated residential community on approximately 9,900 sqm, planned to
            comprise 88 homes and a two-storey commercial building, delivered with
            full estate infrastructure and professional facility management.
          </p>
        </div>
      </div>
    </section>
  );
};
