"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

const ROW_1 = [
  "Residential property development",
  "Commercial property development",
  "Property sales and marketing",
];

const ROW_2 = [
  "Project planning and coordination",
  "Property investment opportunities",
  "Approved finishing and customization",
];

export const AreasOfExpertise: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block">
            OUR EXPERTISE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            From planning to property ownership
          </h2>
        </div>

        {/* 2-Row / 3-Column Grid with Horizontal Dividers */}
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-6 border-b border-slate-200/80">
            {ROW_1.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-[#0754C6] shrink-0" />
                <span className="text-sm sm:text-[15px] font-semibold text-[#0a192f]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-6 border-b border-slate-200/80">
            {ROW_2.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <ArrowRight className="w-4 h-4 text-[#0754C6] shrink-0" />
                <span className="text-sm sm:text-[15px] font-semibold text-[#0a192f]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Development · Dangracif Mall */}
        <div className="mt-12 sm:mt-14 max-w-4xl space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-[#0a192f]">
            Commercial development · Dangracif Mall
          </h3>
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            Our company profile also includes Dangracif Mall in Kubwa, Abuja: a
            commercial development envisioned for retail, services and business
            activities, with a focus on functionality, accessibility and
            commercial value.
          </p>
        </div>
      </div>
    </section>
  );
};
