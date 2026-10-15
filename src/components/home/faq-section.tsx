"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_DATA } from "@/constants/faq";
import { cn } from "@/lib/utils";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full bg-[#FAFCFE] py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6]">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900">
            Frequently asked questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-zinc-200/70">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="py-4 sm:py-4.5">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-zinc-900 hover:text-[#0754C6] transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180 text-[#0754C6]"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="pt-2.5 pr-6 text-xs sm:text-sm text-zinc-600 leading-relaxed animate-in fade-in-50 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
