"use client";

import * as React from "react";
import { FileText, Download, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FidelisCtaCards: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-12 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 space-y-4">
        {/* Brochure Download — solid Fidelis brown card */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#502911] to-[#7a3d18] px-6 py-12 sm:px-8 sm:py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0">
              <FileText className="h-12 w-12 text-white/80" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <p className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Download the Fidelis Court brochure
              </p>
              <p className="text-md text-white/75">
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
              variant="fidelis-brown-outline"
              size="lg"
              leftIcon={<Download className="h-5 w-5" />}
              className="bg-white !-[px-2]"
            >
              Download brochure
            </Button>
          </a>
        </div>

        {/* Become an Agent — white bordered card */}
        <div className="w-full mt-16 rounded-3xl bg-white border border-zinc-200 px-6 py-8 sm:px-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0 h-10 w-10  flex items-center justify-center">
              <Handshake className="h-10 w-10 text-fidelis-brown" />
            </div>
            <div className="space-y-0.5">
              <p className="text-2xl font-extrabold text-zinc-900">
                Become a Fidelis Court agent
              </p>
              <p className="text-md text-zinc-500">
                Refer buyers and earn commission on every successful sale.
              </p>
            </div>
          </div>
          <Button variant="fidelis-brown" size="lg" className="shrink-0">
            Apply now
          </Button>
        </div>
      </div>
    </section>
  );
};
