"use client";

import * as React from "react";
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Target,
  Lightbulb,
  ClipboardCheck,
  TreePine,
  Briefcase,
} from "lucide-react";

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We believe in honesty, ethical business practices and responsible dealings with customers, partners, investors, contractors and other stakeholders.",
    color: "#0754C6",
    bgColor: "#EAF2FE",
  },
  {
    icon: Award,
    title: "Quality & Excellence",
    description:
      "We strive for high standards in planning, design, construction coordination, finishing and the overall delivery of our developments.",
    color: "#7C3AED",
    bgColor: "#F3EEFE",
  },
  {
    icon: HeartHandshake,
    title: "Affordability & Value",
    description:
      "We seek to provide property options that balance quality with affordability and offer meaningful value to homeowners and investors.",
    color: "#0891B2",
    bgColor: "#ECFEFF",
  },
  {
    icon: Target,
    title: "Customer Satisfaction",
    description:
      "We recognise the importance of understanding customers' needs, communicating clearly and providing professional support throughout the property acquisition process.",
    color: "#DC2626",
    bgColor: "#FEF2F2",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We encourage modern design, practical building solutions and improved processes that respond to changing housing needs and contemporary lifestyles.",
    color: "#EA580C",
    bgColor: "#FFF7ED",
  },
  {
    icon: ClipboardCheck,
    title: "Accountability",
    description:
      "We value responsibility, effective project oversight, clear communication and the proper management of commitments and resources.",
    color: "#4338CA",
    bgColor: "#EEF2FF",
  },
  {
    icon: TreePine,
    title: "Sustainability & Community",
    description:
      "We recognise the importance of responsible development, efficient use of resources, appropriate infrastructure and the creation of residential environments that support community wellbeing.",
    color: "#16A34A",
    bgColor: "#F0FDF4",
  },
  {
    icon: Briefcase,
    title: "Professionalism",
    description:
      "We seek to work with competent professionals and maintain high standards of conduct, coordination and service delivery.",
    color: "#0369A1",
    bgColor: "#F0F9FF",
  },
];

export const CoreValues: React.FC = () => {
  return (
    <section className="w-full bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block mb-3">
            What We Stand For
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Our core values
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed max-w-xl mx-auto">
            These principles guide every decision we make and shape how we develop homes, serve customers, and build lasting partnerships.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="group bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: val.bgColor }}
                >
                  <Icon
                    className="w-6 h-6 stroke-[2.2]"
                    style={{ color: val.color }}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {val.title}
                </h3>
                <p className="text-[13px] font-medium text-slate-500 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
