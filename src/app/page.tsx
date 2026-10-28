"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { OpenHouseSection } from "@/components/home/open-house-section";
import { ConstructionSection } from "@/components/home/construction-section";
import { BrochureBanner } from "@/components/home/brochure-banner";
import { HomesSection } from "@/components/home/homes-section";
import { AmenitiesSection } from "@/components/home/amenities-section";
import { ActionCardsSection } from "@/components/home/action-cards-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  const scrollToContact = () => {
    const target = document.getElementById("open-house") || document.getElementById("faq");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFCFE] text-zinc-900 flex flex-col antialiased">
      {/* Navigation Header */}
      <Header onBookInspectionClick={scrollToContact} />

      {/* Main Content Flow — flex-col so order utilities work on mobile */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Section — order-1 on all screens */}
        <div className="order-1">
          <HeroSection
            onBookInspectionClick={scrollToContact}
            onReserveClick={scrollToContact}
          />
        </div>

        {/* 2. Key Stats Bar — order-2 on all screens */}
        <div className="order-2">
          <StatsSection />
        </div>

        {/* 3. Homes at Fidelis Court — order-3 on all screens */}
        <div className="order-3">
          <HomesSection onEnquire={scrollToContact} />
        </div>

        {/* 4. Open House — desktop: sm:order-[11] | mobile: order-[8] (just before Construction) */}
        <div id="open-house" className="order-[8] sm:order-[11]">
          <OpenHouseSection />
        </div>

        {/* 5. Brochure Download Banner — desktop: order-6 | mobile: order-4 (after Homes) */}
        <div className="order-[4] sm:order-[6]">
          <BrochureBanner />
        </div>

        {/* 6. 40% CTA Banner — mobile only at order-5 (on desktop it sits above the footer) */}
        <div className="order-[5] sm:hidden w-full">
          <CtaBanner onCalculateClick={scrollToContact} />
        </div>

        {/* 7. Why Fidelis Court (Amenities) — desktop: order-7 | mobile: order-6 */}
        <div className="order-[6] sm:order-[7]">
          <AmenitiesSection />
        </div>

        {/* 8. Quick Action Cards — desktop: order-8 | mobile: order-7 */}
        <div className="order-[7] sm:order-[8]">
          <ActionCardsSection />
        </div>

        {/* 9. YouTube Construction Updates — desktop: order-5 | mobile: order-9 */}
        <div className="order-[9] sm:order-[5]">
          <ConstructionSection />
        </div>

        {/* 10. FAQ — desktop: same | mobile: order-[10] */}
        <div className="order-[10]">
          <FaqSection />
        </div>
      </main>

      {/* Footer — sits after main; on desktop CtaBanner is inside the viewport-height wrapper */}
      <div className="w-full sm:min-h-[calc(100dvh-4.5rem)] lg:h-[calc(100dvh-4.5rem)] lg:min-h-[540px] sm:flex sm:flex-col sm:justify-between hidden">
        <CtaBanner onCalculateClick={scrollToContact} className="flex-1" />
        <Footer compact />
      </div>
      {/* Mobile footer (shown only on mobile, CtaBanner is already above) */}
      <div className="sm:hidden">
        <Footer compact />
      </div>
    </div>
  );
}
