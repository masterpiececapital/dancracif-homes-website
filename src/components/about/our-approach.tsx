"use client";

import * as React from "react";
import {
  Compass,
  BadgeCheck,
  LayoutDashboard,
  Wifi,
  Users,
  Timer,
} from "lucide-react";

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Purposeful Planning",
    description:
      "Designing developments around practical housing needs and intended use.",
  },
  {
    icon: BadgeCheck,
    title: "Quality-Conscious Delivery",
    description:
      "Promoting appropriate construction standards and attention to finishing.",
  },
  {
    icon: LayoutDashboard,
    title: "Functional Design",
    description:
      "Supporting comfortable, practical and efficient use of residential spaces.",
  },
  {
    icon: Wifi,
    title: "Infrastructure Awareness",
    description:
      "Giving due consideration to essential utilities, access, security and shared facilities.",
  },
  {
    icon: Users,
    title: "Customer-Focused Engagement",
    description:
      "Providing clear information and professional support to prospective purchasers.",
  },
  {
    icon: Timer,
    title: "Long-Term Value",
    description:
      "Considering durability, functionality, market relevance and future needs of property owners.",
  },
];

export const OurApproach: React.FC = () => {
  return (
    <section className="w-full bg-[#05142b] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#60a5fa] block mb-3">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            Our approach to development
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed max-w-xl mx-auto">
            Successful property development requires more than the construction of buildings. It requires planning, coordination, quality consciousness, and attention to the people who will occupy these properties.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="group relative rounded-2xl bg-white/[0.04] border border-white/[0.08] p-7 sm:p-8 hover:bg-white/[0.08] hover:border-[#60a5fa]/30 transition-all duration-300"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#0754C6]/20 flex items-center justify-center group-hover:bg-[#0754C6] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#60a5fa] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Step {idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {principle.title}
                </h3>
                <p className="text-[13px] font-medium text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
