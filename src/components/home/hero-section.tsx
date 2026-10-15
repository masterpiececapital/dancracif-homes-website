"use client";

import * as React from "react";
import Image from "next/image";
import { CalendarCheck, KeyRound } from "lucide-react";
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
    <section className="relative w-full min-h-[590px] lg:min-h-[682px] flex items-center overflow-hidden">
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
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3 py-20 sm:py-24 w-full lg:translate-y-14">
        <div className="max-w-[660px] space-y-5">
          {/* Tag Pill */}
          <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-md">
            <span>Now Selling · Kubwa F01, Abuja</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-light text-white tracking-tight leading-[1.08]">
            <span className="font-extrabold tracking-wide text-white">
              Fidelis Court.
            </span>{" "}
            Secure, serviced living in the heart of Kubwa.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-medium text-white max-w-xl leading-relaxed">
            1 & 2-bedroom apartments and 4-bedroom terraces from ₦53M, with a
            flexible 12-month payment plan.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onBookInspectionClick}
              className="h-[52px]"
              leftIcon={<CalendarCheck className="h-5 w-5" />}
            >
              Book an Inspection
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onReserveClick}
              className="h-[52px]"
              leftIcon={<KeyRound className="h-5 w-5" />}
            >
              Reserve a Unit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
