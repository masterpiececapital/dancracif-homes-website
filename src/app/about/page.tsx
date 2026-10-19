"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { AboutHero } from "@/components/about/about-hero";
import { CompanyBackground } from "@/components/about/company-background";
import { CeoProfile } from "@/components/about/ceo-profile";
import { VisionMission } from "@/components/about/vision-mission";
import { CoreValues } from "@/components/about/core-values";
import { AreasOfExpertise } from "@/components/about/areas-of-expertise";
import { OurApproach } from "@/components/about/our-approach";
import { BrandPromise } from "@/components/about/brand-promise";

export default function AboutPage() {
  const scrollToContact = () => {
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col antialiased">
      <Header onBookInspectionClick={scrollToContact} />

      <main className="flex-1">
        {/* 1. Hero — Full-bleed dark intro with company tagline */}
        {/* <AboutHero /> */}

        {/* 2. Company Background — Image + narrative */}
        <CompanyBackground />

        {/* 3. CEO Profile — Executive leadership */}
        <CeoProfile />

        {/* 4. Vision & Mission — Side-by-side cards */}
        <VisionMission />

        {/* 4. Core Values — 8-card grid */}
        <CoreValues />

        {/* 5. Areas of Expertise — Sticky sidebar + grid */}
        <AreasOfExpertise />

        {/* 6. Our Approach — Dark section with principles */}
        <OurApproach />

        {/* 7. Brand Promise — Gradient CTA card */}
        <BrandPromise />
      </main>

      <Footer />
    </div>
  );
}
