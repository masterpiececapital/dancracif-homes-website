"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onBookInspectionClick?: () => void;
  onReserveClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookInspectionClick,
  onReserveClick,
}) => {
  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fidelis-court-hero.jpg"
          alt="Fidelis Court Estate, Kubwa F01, Abuja"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-20 sm:py-24 w-full">
        <div className="max-w-2xl space-y-5">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0754C6]" />
            <span>Now Selling • Kubwa F01, Abuja</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.14]">
            <span className="font-extrabold text-white">Fidelis Court.</span>{" "}
            Secure, serviced living in the heart of Kubwa.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-200/90 max-w-xl leading-relaxed">
            1 & 2-bedroom apartments and 4-bedroom terraces from ₦53M, with a flexible 12-month payment plan.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button
              variant="primary"
              size="md"
              onClick={onBookInspectionClick}
              leftIcon={<Calendar className="h-4 w-4" />}
            >
              Book an Inspection
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={onReserveClick}
              leftIcon={<Key className="h-4 w-4" />}
            >
              Reserve a Unit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
