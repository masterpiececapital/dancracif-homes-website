"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ProjectHero } from "@/components/fidelis-court/project-hero";
import { UnitMixSection } from "@/components/fidelis-court/unit-mix-section";
import { FacilitiesSection } from "@/components/fidelis-court/facilities-section";
import { ConstructionTimeline } from "@/components/fidelis-court/construction-timeline";
import { ConstructionSection } from "@/components/home/construction-section";
import { FidelisCtaCards } from "@/components/fidelis-court/fidelis-cta-cards";
import { LocationSection } from "@/components/fidelis-court/location-section";

export default function FidelisCourtPage() {
  const scrollToContact = () => {
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFCFE] text-zinc-900 flex flex-col antialiased">
      <Header onBookInspectionClick={scrollToContact} />

      <main className="flex-1">
        {/* 1. Project overview hero */}
        <ProjectHero />

        {/* 2. Unit mix + highlights + property images */}
        <UnitMixSection
          exteriorImageSrc={"/images/fidelis-court1.jpg"}
          interiorImageSrc={"/images/fidelis-court2.jpg"}
        />

        {/* 3. Facilities & services */}
        <FacilitiesSection />

        {/* 4. Construction milestones */}
        <ConstructionTimeline />

        {/* 5. YouTube construction updates */}
        <ConstructionSection />

        {/* 6. Brochure download + Become an agent */}
        <FidelisCtaCards />

        {/* 7. Location map + office addresses */}
        <LocationSection />
      </main>

      <Footer className="bg-fidelis-brown" />
    </div>
  );
}
