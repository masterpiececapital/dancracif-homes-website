"use client";

import * as React from "react";
import { FileText, Download, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FidelisCtaCards: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-12 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
        {/* Brochure Download — solid blue card */}
        <div className="w-full rounded-2xl bg-[#0754C6] px-6 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0">
              <FileText className="h-7 w-7 text-white/80" />
            </div>
            <div className="space-y-1">
              <p className="text-base sm:text-lg font-extrabold text-white leading-snug">
                Download the Fidelis Court brochure
              </p>
              <p className="text-sm text-blue-200">
                Prices, payment plan, fees, amenities and addresses — all in one PDF
                you can share.
              </p>
            </div>
          </div>
          <a
            href="/downloads/fidelis-court-brochure.pdf"
            download
            className="shrink-0"
          >
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download className="h-4 w-4" />}
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#0754C6] transition-colors"
            >
              Download brochure
            </Button>
          </a>
        </div>

        {/* Become an Agent — white bordered card */}
        <div className="w-full rounded-2xl bg-white border border-zinc-100 px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0 h-9 w-9 rounded-xl bg-[#EBF3FC] flex items-center justify-center">
              <Handshake className="h-5 w-5 text-[#0754C6]" />
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-extrabold text-zinc-900">
                Become a Fidelis Court agent
              </p>
              <p className="text-sm text-zinc-500">
                Refer buyers and earn commission on every successful sale.
              </p>
            </div>
          </div>
          <Button variant="primary" size="md" className="shrink-0">
            Apply now
          </Button>
        </div>
      </div>
    </section>
  );
};
