"use client";

import * as React from "react";
import { UNIT_PLANS, UnitPlan, formatNaira } from "@/constants/pricing";
import { cn } from "@/lib/utils";

interface PricingHeroProps {
  selected: UnitPlan;
  onSelect: (plan: UnitPlan) => void;
}

export const PricingHero: React.FC<PricingHeroProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="w-full">
      {/* Dark Navy Hero Section */}
      <section className="w-full bg-[#071630] pt-16 sm:pt-20 pb-28 sm:pb-32">
        <div className="max-w-7xl mx-auto px-2 sm:px-3">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6]">
              PRICING
            </span>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight whitespace-nowrap">
              Transparent pricing. Flexible payment.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
              Secure your home with a 40% minimum deposit and spread the balance
              over 12 months.
            </p>
          </div>
        </div>
      </section>

      {/* Floating / Overlapping Unit Cards */}
      <div className="max-w-7xl mx-auto px-2 sm:px-3 -mt-10 sm:-mt-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {UNIT_PLANS.map((plan) => {
            const isSelected = plan.id === selected.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => onSelect(plan)}
                className={cn(
                  "text-left bg-white rounded-2xl p-6 sm:p-7 transition-all cursor-pointer",
                  "shadow-md hover:shadow-lg focus:outline-none",
                  isSelected
                    ? "border border-[#0754C6]"
                    : "border border-slate-200 hover:border-slate-300"
                )}
              >
                <p className="text-xs text-slate-500 font-normal">
                  {plan.units} units available
                </p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                  {plan.label}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0754C6] mt-4 tracking-tight">
                  {formatNaira(plan.basePrice)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Basic price
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
