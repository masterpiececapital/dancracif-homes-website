"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { useSiteImage } from "@/components/common/site-images-provider";

interface ProjectHeroImageProps {
  imageSrc?: string;
  caption?: string;
  location?: string;
}

export const ProjectHeroImage: React.FC<ProjectHeroImageProps> = ({
  imageSrc = "/fidelis-court/Building Toward the Mountain Ridge.png",
  caption = "Active Construction at Fidelis Court — Structural Framing & Mountain Backdrop",
  location = "Kubwa F01, Abuja",
}) => {
  const resolvedImage = useSiteImage(imageSrc);

  return (
    <section className="w-full bg-[#FAFCFE] pt-6 sm:pt-10 pb-2">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group bg-slate-900">
          <Image
            src={resolvedImage}
            alt="Fidelis Court Active Development"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />



          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
            <div className="space-y-1 max-w-xl">
              <p className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug drop-shadow-sm">
                {caption}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
