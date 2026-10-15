"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { AboutHero } from "@/components/about/about-hero";
import { CoreValues } from "@/components/about/core-values";
import { Leadership } from "@/components/about/leadership";

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
        {/* 1. Hero Section */}
        <AboutHero />

        {/* 2. Core Values Section */}
        <CoreValues />

        {/* 3. Leadership / Principal Officers Section */}
        <Leadership />
      </main>

      <Footer />
    </div>
  );
}
