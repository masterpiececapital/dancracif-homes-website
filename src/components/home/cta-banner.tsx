"use client";

import * as React from "react";

interface CtaBannerProps {
  onCalculateClick?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onCalculateClick }) => {
  return (
    <section className="w-full bg-[#0754C6] py-16 sm:py-20 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center space-y-6 relative z-10">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
          Start with just 40% and spread the rest over 12 months.
        </h2>

        <div>
          <button
            type="button"
            onClick={onCalculateClick}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-[#0754C6] font-bold text-xs sm:text-sm shadow-md hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer"
          >
            Calculate your payment
          </button>
        </div>
      </div>
    </section>
  );
};
