"use client";

import * as React from "react";

const PRINCIPAL_OFFICERS = [
  {
    initials: "MD",
    name: "Name to be confirmed",
    role: "Managing Director",
  },
  {
    initials: "PA",
    name: "Name to be confirmed",
    role: "Project Architect",
  },
  {
    initials: "PE",
    name: "Name to be confirmed",
    role: "Project Engineer",
  },
  {
    initials: "MS",
    name: "Name to be confirmed",
    role: "Head, Marketing & Sales",
  },
  {
    initials: "LA",
    name: "Name to be confirmed",
    role: "Legal Adviser",
  },
];

export const Leadership: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="space-y-2 mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6] block">
            LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our principal officers
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {PRINCIPAL_OFFICERS.map((officer, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#0064CF] to-[#0093ED] flex items-center justify-center text-white text-lg sm:text-xl font-bold tracking-wider shadow-sm">
                {officer.initials}
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-900 mt-5 leading-snug">
                {officer.name}
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#0754C6] mt-1 leading-snug">
                {officer.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
