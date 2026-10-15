"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PRICING_FAQS = [
  {
    q: "What title will the buyer receive?",
    a: "The title to buyer is a Deed of lease.",
  },
  {
    q: "When will the project be completed?",
    a: "Fidelis Court has a 14-month delivery programme, with a target completion date of December 2027, following groundbreaking in April 2026.",
  },
  {
    q: "Are the additional fees included in the price?",
    a: "No — the basic price covers the unit only. Legal, admin & survey fees, infrastructure fee, asset replacement deposit, and service charge deposit are charged separately and are detailed in the payment plan.",
  },
  {
    q: "What does 'shell option' mean for the terraces?",
    a: "Shell means the unit is delivered structurally complete — walls, roof, windows and doors in place — but without internal finishes such as tiling, plumbing fixtures, or electrical fittings. Buyers finish the interior to their own specification.",
  },
  {
    q: "Can I pay outright?",
    a: "Yes. Buyers who wish to pay the full purchase price upfront are welcome to do so. Please contact our sales team for outright purchase terms and any applicable discounts.",
  },
];

export const PricingFaq: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section className="w-full bg-white py-14 sm:py-18">
      <div className="max-w-3xl mx-auto px-2 sm:px-3 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight text-center">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-zinc-100">
          {PRICING_FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4 group"
                >
                  <span
                    className={cn(
                      "text-sm sm:text-base font-medium transition-colors",
                      isOpen ? "text-zinc-900" : "text-zinc-700 group-hover:text-zinc-900"
                    )}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 text-sm text-zinc-500 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
