"use client";

import * as React from "react";
import { UnitPlan, formatNaira } from "@/constants/pricing";
import { cn } from "@/lib/utils";

interface PaymentPlanProps {
  plan: UnitPlan;
}

export const PaymentPlan: React.FC<PaymentPlanProps> = ({ plan }) => {
  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-16 sm:pb-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Payment instalments */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Payment plan — {plan.label}
            </h2>

            <div className="space-y-3.5">
              {plan.instalments.map((inst, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-slate-200/80 px-5 py-4 shadow-sm"
                >
                  {/* Percentage badge */}
                  <div className="h-11 w-11 shrink-0 rounded-full bg-[#0754C6] flex items-center justify-center">
                    <span className="text-xs font-bold text-white leading-none">
                      {inst.percentage}%
                    </span>
                  </div>
                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900">{inst.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{inst.subtitle}</p>
                  </div>
                  {/* Amount */}
                  <span className="text-sm sm:text-base font-bold text-slate-900 shrink-0">
                    {formatNaira(inst.amount)}
                  </span>
                </div>
              ))}
            </div>

            {plan.note && (
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">{plan.note}</p>
            )}
          </div>

          {/* Right: Additional charges */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Additional charges
            </h2>

            <div className="rounded-2xl border border-slate-200/80 overflow-hidden divide-y divide-slate-100 bg-white shadow-sm">
              {plan.additionalCharges.map((charge, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start justify-between px-5 py-4 gap-4",
                    charge.isTotalOwnership
                      ? "bg-[#EBF3FC]"
                      : "bg-white"
                  )}
                >
                  <div className="min-w-0">
                    <p
                      className={cn(
                        charge.isTotalOwnership
                          ? "text-base font-bold text-[#0754C6]"
                          : "text-sm font-semibold text-slate-900"
                      )}
                    >
                      {charge.label}
                    </p>
                    {charge.sublabel && (
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                        {charge.sublabel}
                      </p>
                    )}
                  </div>
                  <span
                    className={cn(
                      charge.isTotalOwnership
                        ? "text-base sm:text-lg font-extrabold text-[#0754C6] shrink-0"
                        : "text-sm sm:text-base font-bold text-slate-900 shrink-0"
                    )}
                  >
                    {formatNaira(charge.amount)}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pt-0.5">
              Service charge deposit is subject to change based on market realities
              and FMC budget performance at completion.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#0754C6] text-white text-sm font-semibold hover:bg-[#0648AB] transition-colors shadow-sm cursor-pointer"
              >
                Reserve this unit
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-[#0754C6] bg-white text-[#0754C6] text-sm font-semibold hover:bg-[#0754C6]/5 transition-colors cursor-pointer"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
