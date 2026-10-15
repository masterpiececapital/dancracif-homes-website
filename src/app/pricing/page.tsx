"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { PaymentPlan } from "@/components/pricing/payment-plan";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { UNIT_PLANS, UnitPlan } from "@/constants/pricing";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = React.useState<UnitPlan>(
    UNIT_PLANS[1] // default to 2-Bedroom
  );

  const scrollToContact = () => {
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFCFE] text-zinc-900 flex flex-col antialiased">
      <Header onBookInspectionClick={scrollToContact} />

      <main className="flex-1">
        {/* 1. Hero with embedded unit cards */}
        <PricingHero selected={selectedPlan} onSelect={setSelectedPlan} />

        {/* 2. Payment plan + Additional charges */}
        <PaymentPlan plan={selectedPlan} />

        {/* 3. Pricing FAQ */}
        <PricingFaq />
      </main>

      <Footer />
    </div>
  );
}
