"use client";

import * as React from "react";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FidelisCtaCards: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-14 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Become an Agent — white bordered card */}
        <div className="w-full rounded-3xl bg-white border border-zinc-200 px-6 py-8 sm:px-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 shrink-0 h-12 w-12 rounded-2xl bg-fidelis-brown/10 flex items-center justify-center">
              <Handshake className="h-6 w-6 text-fidelis-brown" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
                Become a Fidelis Court agent
              </h3>
              <p className="text-sm sm:text-base text-zinc-500">
                Refer buyers and earn commission on every successful sale.
              </p>
            </div>
          </div>
          <Link href="/become-an-agent">
            <Button variant="fidelis-brown" size="lg" className="shrink-0 font-bold cursor-pointer">
              Apply now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
