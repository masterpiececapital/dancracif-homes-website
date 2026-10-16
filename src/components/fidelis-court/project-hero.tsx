"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

export const ProjectHero: React.FC = () => {
  return (
    <section className="w-full bg-fidelis-brown py-12 sm:py-18">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            The Project
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Fidelis Court
          </h1>
          <div className="flex items-start gap-2 text-zinc-400 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white" />
            <span className="text-white text-base">
              21, Josephat Mojeckwu Avenue, Kubwa F01, Abuja, FCT, Nigeria
            </span>
          </div>
          <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
            A gated residential community on approximately 9,900 sqm, planned to
            comprise 88 homes and a two-storey commercial building, delivered
            with full estate infrastructure and professional facility
            management.
          </p>
        </div>
      </div>
    </section>
  );
};
