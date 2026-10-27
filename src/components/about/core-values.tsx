"use client";

import * as React from "react";
import {
  ShieldCheck,
  Award,
  Target,
  HeartHandshake,
} from "lucide-react";

interface CoreValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const CORE_VALUES: CoreValueItem[] = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Honesty, ethical business practices and responsible dealings with customers, partners and stakeholders.",
  },
  {
    icon: Award,
    title: "Quality and excellence",
    description:
      "High standards in planning, design, construction coordination, finishing and delivery.",
  },
  {
    icon: Target,
    title: "Affordability and value",
    description:
      "Property options that balance quality with affordability and create meaningful long-term value.",
  },
  {
    icon: HeartHandshake,
    title: "Customer satisfaction",
    description:
      "Clear communication and professional support throughout the property acquisition process.",
  },
  {
    icon: ShieldCheck,
    title: "Innovation",
    description:
      "Modern design, practical building solutions and improved processes for contemporary lifestyles.",
  },
  {
    icon: Award,
    title: "Accountability",
    description:
      "Effective project oversight, clear responsibilities and careful management of commitments and resources.",
  },
  {
    icon: Target,
    title: "Sustainability and community",
    description:
      "Responsible development, appropriate infrastructure and residential environments that support community wellbeing.",
  },
  {
    icon: HeartHandshake,
    title: "Professionalism",
    description:
      "Collaboration with competent professionals and high standards of conduct, coordination and service.",
  },
];

export const CoreValues: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="space-y-3 mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block">
          OUR CORE VALUES
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight">
          The principles behind our work
        </h2>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {CORE_VALUES.map((val, idx) => {
          const Icon = val.icon;
          return (
            <div
              key={`${val.title}-${idx}`}
              className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-all duration-200"
            >
              <div className="mb-5 text-[#0754C6]">
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-[#0a192f] mb-2 leading-snug">
                {val.title}
              </h3>
              <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                {val.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
