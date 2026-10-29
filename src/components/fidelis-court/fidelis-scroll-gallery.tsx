"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
} from "lucide-react";
import { useSiteImageResolver } from "@/components/common/site-images-provider";

interface GalleryPhoto {
  src: string;
  title: string;
  category: "Exterior" | "Interior";
  stage: string;
  description: string;
}

const SCROLL_PHOTOS: GalleryPhoto[] = [
  {
    src: "/fidelis-court/Building Toward the Mountain Ridge.png",
    title: "Structural Superstructure & Mountain Ridge",
    category: "Exterior",
    stage: "Structural Framing",
    description:
      "Reinforced blockwork and cast concrete elevation set against the scenic Kubwa mountain ridge.",
  },
  {
    src: "/fidelis-court/Bright Renovation Room with Window Views.png",
    title: "Spacious Interior Living Room",
    category: "Interior",
    stage: "Room Framing",
    description:
      "Wide double-window openings engineered for natural cross-ventilation and sunlit living spaces.",
  },
  {
    src: "/fidelis-court/Sunlit Construction Site Under Dramatic Skies.png",
    title: "Wide Site Coordination & Layout",
    category: "Exterior",
    stage: "Active Construction",
    description:
      "Pan-estate view across the 9,900 sqm development showing simultaneous residential block erection.",
  },
  {
    src: "/fidelis-court/Sunlit Unfinished Room Renovation.png",
    title: "Corner Bedroom Suite Natural Light",
    category: "Interior",
    stage: "MEP Prep & Screeding",
    description:
      "Corner unit configuration capturing optimal ambient sunlight with ample space for en-suite bath.",
  },
  {
    src: "/fidelis-court/Vibrant Mid-Rise Construction Site.png",
    title: "Terrace Decking & External Scaffolding",
    category: "Exterior",
    stage: "Superstructure",
    description:
      "Multi-deck formwork and structural staging advancing on schedule toward roofing milestones.",
  },
  {
    src: "/fidelis-court/Bright Unfinished Room Under Construction.png",
    title: "Living & Dining Architecture",
    category: "Interior",
    stage: "Partition Masonry",
    description:
      "Modern open floor plan facilitating contemporary lifestyle layouts and seamless flow.",
  },
  {
    src: "/fidelis-court/Building Under Scaffolding Beneath a Vast Sky-1.png",
    title: "Apartment Wing Superstructure",
    category: "Exterior",
    stage: "Column Casting",
    description:
      "High tensile steel reinforcement and column casting delivering durable structural strength.",
  },
  {
    src: "/fidelis-court/Bright Unfinished Hallway Renovation.png",
    title: "Corridor & Suite Distribution",
    category: "Interior",
    stage: "Concealed Conduits",
    description:
      "Internal hallway reticulation connecting master bedrooms, guest suites, and service passages.",
  },
];

export const FidelisScrollGallery: React.FC = () => {
  const getSiteImage = useSiteImageResolver();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activePhoto, setActivePhoto] = React.useState<GalleryPhoto | null>(
    null
  );
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Monitor scroll progress for dynamic indicator
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollOffset = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollOffset : scrollOffset,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#FAFCFE] py-6 sm:py-10 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-8">
        {/* Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ABF0]/10 text-[#00ABF0] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Site Showcase • Scroll &amp; Explore</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
              Fidelis Court in Pictures
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed">
              Take an interactive visual walk through actual on-site progress,
              from external superstructure framing to sunlit interior spaces.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-[#00ABF0] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center text-zinc-700 shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-[#00ABF0] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center justify-center text-zinc-700 shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0754C6] to-[#00ABF0] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${Math.max(8, scrollProgress)}%` }}
          />
        </div>

        {/* Horizontal Scrolling Gallery Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory -mx-6 px-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none" }}
        >
          {SCROLL_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              onClick={() => setActivePhoto(photo)}
              className="group relative flex-none w-[82vw] sm:w-[380px] md:w-[440px] snap-start rounded-3xl overflow-hidden bg-white border border-zinc-200/90 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 ease-out cursor-pointer flex flex-col"
            >
              {/* Photo Frame with Hover Zoom */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                <Image
                  src={getSiteImage(photo.src)}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 85vw, 440px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/85 transition-colors duration-300" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider border border-white/15">
                    {photo.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0754C6]/90 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                    {photo.stage}
                  </span>
                </div>

                {/* Expand icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="p-3.5 rounded-full bg-white/90 backdrop-blur-md text-zinc-900 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 text-[#00ABF0]" />
                  </span>
                </div>

                {/* Overlaid Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-200 group-hover:scale-[1.02] origin-left transition-all duration-300 drop-shadow-sm line-clamp-1">
                    {photo.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Card Info with Pop-up effect */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white space-y-2">
                <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed group-hover:text-zinc-900 transition-colors">
                  {photo.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 group-hover:text-[#00ABF0] font-semibold transition-colors">
                  <span>Click to view full photo</span>
                  <span className="w-2 h-2 rounded-full bg-[#0754C6] transform group-hover:scale-125 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Preview */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black">
              <Image
                src={getSiteImage(activePhoto.src)}
                alt={activePhoto.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption & details */}
            <div className="p-6 bg-zinc-900 text-white space-y-1.5 border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white">
                  {activePhoto.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#0754C6] text-white text-xs font-bold">
                  {activePhoto.stage}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
