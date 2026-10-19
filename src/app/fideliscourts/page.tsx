"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ProjectHero } from "@/components/fidelis-court/project-hero";
import { UnitMixSection } from "@/components/fidelis-court/unit-mix-section";
import { FacilitiesSection } from "@/components/fidelis-court/facilities-section";
import { ConstructionGallery } from "@/components/fidelis-court/construction-gallery";
import { ConstructionTimeline } from "@/components/fidelis-court/construction-timeline";
import { ConstructionSection } from "@/components/home/construction-section";
import { FidelisCtaCards } from "@/components/fidelis-court/fidelis-cta-cards";
import { FidelisInspectionSection } from "@/components/fidelis-court/fidelis-inspection-section";
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

        {/* 2. Unit mix + highlights + real site photos */}
        <UnitMixSection
          exteriorImageSrc={"/fidelis-court/Building Toward the Mountain Ridge.png"}
          interiorImageSrc={"/fidelis-court/Bright Renovation Room with Window Views.png"}
        />

        {/* 3. Facilities & services */}
        <FacilitiesSection />

        {/* 4. Live Construction Photography Gallery */}
        <ConstructionGallery />

        {/* 5. Construction milestones */}
        <ConstructionTimeline />

        {/* 6. YouTube construction updates */}
        <ConstructionSection />

        {/* 7. Brochure download + Become an agent */}
        <FidelisCtaCards />

        {/* 8. On-site Inspection Booking Form */}
        <FidelisInspectionSection />

        {/* 9. Location map + office addresses */}
        <LocationSection />
      </main>

      <Footer className="bg-fidelis-brown" />
    </div>
  );
}
