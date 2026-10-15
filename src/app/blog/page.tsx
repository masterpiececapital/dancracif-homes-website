"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { BlogHero } from "@/components/blog/blog-hero";

export default function BlogPage() {
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
        <BlogHero />
      </main>

      <Footer />
    </div>
  );
}
