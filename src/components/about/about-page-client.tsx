"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { AboutHero } from "@/components/about/about-hero";
import { VisionMission } from "@/components/about/vision-mission";
import { CoreValues } from "@/components/about/core-values";
import { AreasOfExpertise } from "@/components/about/areas-of-expertise";
import { CeoProfile } from "@/components/about/ceo-profile";

export default function AboutPageClient() {
  const scrollToContact = () => {
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col antialiased">
      <Header onBookInspectionClick={scrollToContact} />
      <main className="flex-1">
        <AboutHero />
        <section className="w-full bg-[#edf4fc] py-16 sm:py-24">
          <VisionMission />
          <CoreValues />
        </section>
        <AreasOfExpertise />
        <CeoProfile />
      </main>
      <Footer />
    </div>
  );
}
