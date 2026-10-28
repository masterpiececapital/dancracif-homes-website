"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Zap, Wifi, Droplets, ArrowRight } from "lucide-react";
import { AMENITIES_DATA, AmenityItem } from "@/constants/amenities";

const iconMap: Record<AmenityItem["icon"], React.ReactNode> = {
  security: <ShieldCheck className="h-7 w-7 text-[#00ABF0]" />,
  power: <Zap className="h-7 w-7 text-[#00ABF0]" />,
  wifi: <Wifi className="h-7 w-7 text-[#00ABF0]" />,
  water: <Droplets className="h-7 w-7 text-[#00ABF0]" />,
};

export const AmenitiesSection: React.FC = () => {
  return (
    <section className="w-full bg-[#EBF3FC] py-16 sm:py-20 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Estate Interior Image */}
          <div>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm bg-zinc-200">
              <Image
                src="/fidelis-court/Building Under Scaffolding Beneath a Vast Sky-1.png"
                alt="Fidelis Court Living Room Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Amenities Content */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00ABF0]">
                Why Fidelis Court
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Everything a modern home needs — already in place.
              </h2>
            </div>

            {/* Amenities List - single col on mobile, 2-col on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
              {AMENITIES_DATA.map((item) => (
                <div
                  key={item.id}
                  className="group p-4 -m-4 rounded-2xl hover:bg-white/90 hover:shadow-xl hover:scale-[1.04] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer"
                >
                  <div className="mb-3 group-hover:scale-115 group-hover:rotate-3 transition-transform duration-300 origin-left inline-block">
                    {iconMap[item.icon]}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight group-hover:text-[#00ABF0] group-hover:scale-[1.05] group-hover:font-extrabold origin-left inline-block transition-all duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 group-hover:text-zinc-900 leading-relaxed transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Link */}
            <div className="pt-2">
              <Link
                href="#amenities"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00ABF0] hover:text-[#00ABF0]/80 transition-colors group"
              >
                <span>Explore all amenities</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
