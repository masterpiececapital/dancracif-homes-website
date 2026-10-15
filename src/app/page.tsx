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

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onBookInspectionClick={scrollToContact}
          onReserveClick={scrollToContact}
        />

        {/* 2. Key Stats Bar */}
        <StatsSection />

        {/* 3. Open House Event & Registration */}
        <div id="open-house">
          <OpenHouseSection />
        </div>

        {/* 4. YouTube Construction Updates */}
        <ConstructionSection />

        {/* 5. Brochure Download Banner */}
        <BrochureBanner />

        {/* 6. Homes at Fidelis Court (Unit Models) */}
        <HomesSection onEnquire={scrollToContact} />

        {/* 7. Why Fidelis Court (Amenities & Modern Living) */}
        <AmenitiesSection />

        {/* 8. Quick Action Cards (Book, Reserve, Buy) */}
        <ActionCardsSection />

        {/* 9. Frequently Asked Questions (Accordion) */}
        <FaqSection />

      </main>

      {/* 10. Final Viewport Section: 40% CTA Banner + Footer fitting exact height of the page */}
      <div className="w-full min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-4.5rem)] lg:h-[calc(100dvh-4.5rem)] lg:min-h-[540px] flex flex-col justify-between">
        <CtaBanner onCalculateClick={scrollToContact} className="flex-1" />
        <Footer compact />
      </div>
    </div>
  );
}
