"use client";

import * as React from "react";
import { UNIT_PLANS, UnitPlan, formatNaira } from "@/constants/pricing";
import { cn } from "@/lib/utils";

interface UnitPricingCardsProps {
  selected: UnitPlan;
  onSelect: (plan: UnitPlan) => void;
}

export const UnitPricingCards: React.FC<UnitPricingCardsProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="w-full bg-[#0D1B3E] pb-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-0 -mb-px">
          {UNIT_PLANS.map((plan) => {
            const isActive = plan.id === selected.id;
            return (
              <button
                key={plan.id}
                onClick={() => onSelect(plan)}
                className={cn(
                  "text-left rounded-t-2xl px-5 py-5 border border-b-0 transition-all",
                  isActive
                    ? "bg-white border-zinc-200 shadow-sm"
                    : "bg-white/10 border-white/10 hover:bg-white/15 text-white"
                )}
              >
                <p
                  className={cn(
                    "text-xs mb-1",
                    isActive ? "text-zinc-400" : "text-zinc-300/70"
                  )}
                >
                  {plan.units} units available
                </p>
                <p
                  className={cn(
                    "text-base font-bold",
                    isActive ? "text-zinc-900" : "text-white"
                  )}
                >
                  {plan.label}
                </p>
                <p
                  className={cn(
                    "text-xl sm:text-2xl font-extrabold mt-2 tracking-tight",
                    isActive ? "text-[#00ABF0]" : "text-white"
                  )}
                >
                  {formatNaira(plan.basePrice)}
                </p>
                <p
                  className={cn(
                    "text-xs mt-0.5",
                    isActive ? "text-zinc-400" : "text-zinc-300/60"
                  )}
                >
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
