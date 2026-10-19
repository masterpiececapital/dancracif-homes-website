"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[520px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fidelis-court1.jpg"
          alt="Dangracif Homes development in Abuja"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#04102a]/92 via-[#081b3e]/80 to-[#0754C6]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3 py-20 sm:py-28 w-full">
        <div className="max-w-[720px] space-y-6">
          {/* Label */}
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            About Dangracif Homes
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight">
            Building homes.{" "}
            <span className="text-[#60a5fa]">Creating value.</span>{" "}
            Supporting better living.
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/85 max-w-[620px] leading-relaxed font-medium">
            Dangracif Homes Limited is a Nigerian real estate development company focused on creating quality, affordable housing options that meet the evolving needs of individuals, families, and property investors.
          </p>

          {/* CTA */}
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/fideliscourts"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#0754C6] text-sm font-bold hover:bg-white/90 transition-all shadow-lg shadow-black/10 cursor-pointer"
            >
              Explore Fidelis Court
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-all cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};
