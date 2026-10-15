"use client";

import * as React from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ContactSection } from "@/components/contact/contact-section";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col antialiased">
      <Header />

      <main className="flex-1">
        <React.Suspense fallback={null}>
          <ContactSection />
        </React.Suspense>
      </main>

      <Footer />
    </div>
  );
}
