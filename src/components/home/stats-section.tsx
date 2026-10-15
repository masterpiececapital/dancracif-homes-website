import * as React from "react";
import { STATS_DATA } from "@/constants/stats";

export const StatsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-12 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS_DATA.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0754C6] tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-600 mt-1.5">
                {stat.label}
                {stat.sublabel && (
                  <span className="text-zinc-600 font-medium">
                    {" "}
                    · {stat.sublabel}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
