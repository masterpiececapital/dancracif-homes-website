"use client";

import * as React from "react";
import { Eye, Crosshair } from "lucide-react";

export const VisionMission: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block mb-3">
            Purpose & Direction
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight">
            What drives us forward
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Vision */}
          <div className="relative group rounded-3xl bg-gradient-to-br from-[#0754C6] to-[#0B3D91] p-8 sm:p-10 lg:p-12 text-white overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-[#0754C6]/20">
            {/* Decorative circle */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/[0.05]" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-white/[0.04]" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6 backdrop-blur-sm">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">
                Our Vision
              </h3>
              <p className="text-white/85 text-[15px] sm:text-base leading-relaxed font-medium">
                To become Nigeria&apos;s leading, trusted, and respected real estate development company, recognised for delivering quality, affordable, and functional homes that create lasting value for homeowners, investors, and communities.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="relative group rounded-3xl bg-slate-50 border border-slate-200/80 p-8 sm:p-10 lg:p-12 overflow-hidden transition-shadow hover:shadow-xl">
            {/* Decorative circle */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#0754C6]/[0.04]" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#0754C6]/[0.03]" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#0754C6]/10 flex items-center justify-center mb-6">
                <Crosshair className="w-7 h-7 text-[#0754C6]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Our Mission
              </h3>
              <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed font-medium">
                To develop and deliver well-planned residential and commercial properties that combine quality, functionality, affordability and value through professional project coordination, responsible development practices, transparent customer engagement and a commitment to continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
