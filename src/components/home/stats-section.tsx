import * as React from "react";
import { STATS_DATA } from "@/constants/stats";

export const StatsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-12 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center cursor-pointer p-3 rounded-2xl hover:bg-white hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#00ABF0] tracking-tight group-hover:scale-110 group-hover:drop-shadow-sm transition-transform duration-300">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-600 group-hover:text-zinc-900 group-hover:font-semibold mt-1.5 transition-colors">
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
