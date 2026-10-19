"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getPublicFaqs } from "@/app/actions/public-content";

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
  const [faqs, setFaqs] = React.useState(PRICING_FAQS);
  const [open, setOpen] = React.useState<number | null>(0);
  const [hovered, setHovered] = React.useState<number | null>(null);

  React.useEffect(() => {
    getPublicFaqs().then((dbFaqs) => {
      if (dbFaqs && dbFaqs.length > 0) {
        setFaqs(dbFaqs);
      }
    });
  }, []);

  return (
    <section className="w-full bg-white py-14 sm:py-18">
      <div className="max-w-3xl mx-auto px-2 sm:px-3 space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight text-center">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-zinc-100">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full flex items-center justify-between py-4 text-left gap-4 cursor-pointer"
                >
                  <span
                    className={cn(
                      "text-sm sm:text-base font-medium transition-colors duration-200",
                      isOpen ? "text-zinc-900" : "text-zinc-700"
                    )}
                    style={{
                      textDecoration: hovered === i ? "underline" : "none",
                      textDecorationColor: "#000000",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0 transition-transform duration-200"
                    style={{ scale: hovered === i ? 1.1 : 1 }}
                  >
                    <ChevronDown
                      className="h-4 w-4 transition-colors duration-200"
                      style={{ color: hovered === i ? "#27272a" : "#a1a1aa" }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-4 text-sm font-medium text-gray-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
