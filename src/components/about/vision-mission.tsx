"use client";

import * as React from "react";

export const VisionMission: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mb-16 sm:mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Our Vision */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00ABF0] block">
            OUR VISION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
            Lasting value for every community
          </h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            To become Nigeria&apos;s leading, trusted and respected real estate
            development company, recognised for delivering quality, affordable
            and functional homes that create lasting value for homeowners,
            investors and communities.
          </p>
        </div>

        {/* Our Mission */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00ABF0] block">
            OUR MISSION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
            Purposeful development
          </h2>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            To develop and deliver well-planned residential and commercial
            properties that combine quality, functionality, affordability and
            value through professional project coordination, responsible
            development practices and transparent customer engagement.
          </p>
        </div>
      </div>
    </div>
  );
};
