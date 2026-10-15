"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export const AboutHero: React.FC = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text */}
          <div className="space-y-4 sm:space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6] block">
              ABOUT US
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.12] tracking-tight">
              Building homes Abuja can trust.
            </h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-relaxed pt-1">
              Dancracif Homes is a real estate development company focused on
              creating secure, fully serviced residential communities for
              families and investors in Abuja. From infrastructure to facility
              management, we take care of the details so you can simply enjoy
              coming home.
            </p>
            <div className="pt-3">
              <Link
                href="/fidelis-court"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0754C6] text-white text-sm font-semibold hover:bg-[#0648AB] transition-colors shadow-sm cursor-pointer"
              >
                Our current project
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <Image
              src="/images/terrace-duplex.jpg"
              alt="Dancracif Homes building modern residences in Abuja"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
