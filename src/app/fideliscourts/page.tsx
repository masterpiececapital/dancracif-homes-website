"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ProjectHero } from "@/components/fidelis-court/project-hero";
import { ProjectHeroImage } from "@/components/fidelis-court/project-hero-image";
import { UnitMixSection } from "@/components/fidelis-court/unit-mix-section";
import { FidelisHomesSection } from "@/components/fidelis-court/fidelis-homes-section";
import { FidelisScrollGallery } from "@/components/fidelis-court/fidelis-scroll-gallery";
import { FidelisBrochureSection } from "@/components/fidelis-court/fidelis-brochure-section";
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
        {/* 1. Project overview hero (with pricing blue styling) */}
        <ProjectHero />

        {/* 1b. Featured image before unit mix */}
        <ProjectHeroImage />

        {/* 2. Unit mix + highlights */}
        <UnitMixSection />

        {/* 3. Choose your home (Unit models) */}
        <FidelisHomesSection onReserveUnit={scrollToContact} />

        {/* 4. Animated picture scroll gallery with the moved images and site progress */}
        <FidelisScrollGallery />

        {/* 5. Brochure section followed by Book an inspection & View pricing buttons */}
        <FidelisBrochureSection onBookInspectionClick={scrollToContact} />

        {/* 6. Facilities & services */}
        <FacilitiesSection />

        {/* 7. Construction milestones */}
        <ConstructionTimeline />

        {/* 8. YouTube construction updates */}
        <ConstructionSection />

        {/* 9. Become an agent card */}
        <FidelisCtaCards />

        {/* 10. Location map + office addresses */}
        <LocationSection />
      </main>

      <Footer />
    </div>
  );
}
