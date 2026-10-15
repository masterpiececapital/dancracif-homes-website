"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOMES_DATA } from "@/constants/homes";
import { HomeCard } from "./home-card";
import { HomeModel } from "@/types";

interface HomesSectionProps {
  onEnquire?: (home: HomeModel) => void;
}

export const HomesSection: React.FC<HomesSectionProps> = ({ onEnquire }) => {
  return (
    <section id="pricing" className="w-full bg-[#FAFCFE] py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6] mb-2">
              Choose Your Home
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900">
              Homes at Fidelis Court
            </h2>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-md sm:text-md font-bold text-[#0754C6] hover:text-[#0648AB] transition-colors group"
          >
            <span>See pricing & payment plan</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Homes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOMES_DATA.map((home) => (
            <HomeCard key={home.id} home={home} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </section>
  );
};
