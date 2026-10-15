"use client";

import * as React from "react";
import { ShieldCheck, Award, HeartHandshake, Target } from "lucide-react";

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Clear pricing, clear title, and honest communication at every stage.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Sound construction and durable finishes that hold their value.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    description:
      "Estates designed for safety, comfort and neighbourliness.",
  },
  {
    icon: Target,
    title: "Delivery",
    description:
      "Disciplined project management and on-schedule handovers.",
  },
];

export const CoreValues: React.FC = () => {
  return (
    <section className="w-full bg-[#EAF2FE] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-slate-100 flex flex-col items-start hover:shadow-md transition-shadow"
              >
                <div className="text-[#0754C6] mb-5">
                  <Icon className="w-8 h-8 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
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
