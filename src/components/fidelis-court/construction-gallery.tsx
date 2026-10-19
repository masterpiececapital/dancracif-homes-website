"use client";

import * as React from "react";
import Image from "next/image";
import { Camera, Eye, X, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoItem {
  src: string;
  title: string;
  category: "exterior" | "interior";
  stage: string;
  description: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    src: "/fidelis-court/Building Toward the Mountain Ridge.png",
    title: "Block Superstructure & Mountain Ridge",
    category: "exterior",
    stage: "Structural Framing",
    description: "Multi-level reinforced concrete and blockwork framing set against the scenic Kubwa mountain landscape.",
  },
  {
    src: "/fidelis-court/Apartment Building Under Construction.png",
    title: "Apartment Wing Elevation",
    category: "exterior",
    stage: "Masonry & Decking",
    description: "Floor slab casting and exterior masonry walling for residential apartment blocks.",
  },
  {
    src: "/fidelis-court/Sunlit Construction Site Under Dramatic Skies.png",
    title: "Full Site Progress & Layout",
    category: "exterior",
    stage: "Site Coordination",
    description: "Wide angle perspective of ongoing concurrent block erection across the 9,900 sqm development.",
  },
  {
    src: "/fidelis-court/Vibrant Mid-Rise Construction Site.png",
    title: "Facade Scaffolding & Formwork",
    category: "exterior",
    stage: "Superstructure",
    description: "Precision scaffolding, beam casting, and exterior envelope preparation.",
  },
  {
    src: "/fidelis-court/Bamboo Scaffolding Construction Site.png",
    title: "Perimeter Scaffolding & Support Columns",
    category: "exterior",
    stage: "Casting & Shoring",
    description: "External support structures facilitating safe column casting and masonry work on upper decks.",
  },
  {
    src: "/fidelis-court/Building Under Scaffolding Beneath a Vast Sky-1.png",
    title: "Mid-Rise Structural Elevation",
    category: "exterior",
    stage: "Deck Leveling",
    description: "Vertical extension of residential blocks progressing according to master schedule.",
  },
  {
    src: "/fidelis-court/Skyward Construction Site.png",
    title: "Upper Floor Decking & Reinforcement",
    category: "exterior",
    stage: "Iron Bending & Formwork",
    description: "High-grade tensile rebar and concrete formwork engineered for structural longevity.",
  },
  {
    src: "/fidelis-court/Sunlit Building Under Construction.png",
    title: "Sunlit Blockwork & Fenestration",
    category: "exterior",
    stage: "Block Setting",
    description: "Precision block alignment providing thermal insulation and acoustic privacy.",
  },
  {
    src: "/fidelis-court/Sunlit Construction Site Between Scaffolding.png",
    title: "Inter-Block Access Boulevard",
    category: "exterior",
    stage: "Civil Works Prep",
    description: "Access corridors between apartment clusters designed for convenient resident circulation.",
  },
  {
    src: "/fidelis-court/Sunlit Construction Site Under Dramatic Clouds.png",
    title: "Estate Superstructure Panoramic",
    category: "exterior",
    stage: "Active Construction",
    description: "Active site mobilization with simultaneous multi-trade teams advancing structural delivery.",
  },
  {
    src: "/fidelis-court/Under-Construction Lot Beneath Dramatic Skies.png",
    title: "Estate Perimeter & Ground Engineering",
    category: "exterior",
    stage: "Substructure & Drainage",
    description: "Ground grading and drainage channel coordination for storm water runoff management.",
  },
  {
    src: "/fidelis-court/Unfinished Buildings Beneath Dramatic Skies.png",
    title: "Multi-Block Clustering Progress",
    category: "exterior",
    stage: "Superstructure Alignment",
    description: "Overview of multiple housing clusters progressing toward roofing milestones.",
  },
  {
    src: "/fidelis-court/Urban Construction Under Dramatic Skies.png",
    title: "Contemporary Facade Geometry",
    category: "exterior",
    stage: "Architectural Walling",
    description: "Clean modern geometric lines planned for the Fidelis Court exterior finish.",
  },
  {
    src: "/fidelis-court/WhatsApp Image 2026-10-17 at 9.57.51 PM.jpeg",
    title: "Site Verification & Field Audit",
    category: "exterior",
    stage: "Quality Assurance",
    description: "Direct on-site quality assurance inspection verifying structural specifications and safety.",
  },
  {
    src: "/fidelis-court/Bright Renovation Room with Window Views.png",
    title: "Spacious Living Area Layout",
    category: "interior",
    stage: "Interior Framing",
    description: "Generous window openings designed for optimum natural cross-ventilation and daylight penetration.",
  },
  {
    src: "/fidelis-court/Bright Unfinished Hallway Renovation.png",
    title: "Access Corridor & Room Access",
    category: "interior",
    stage: "Wall Plastering Prep",
    description: "Internal corridor flow connecting bedroom suites and main residential lounges.",
  },
  {
    src: "/fidelis-court/Bright Unfinished Room Under Construction.png",
    title: "Bedroom Suite & En-Suite Boundary",
    category: "interior",
    stage: "Partition Masonry",
    description: "Internal room divisions ensuring generous master suite dimensions and private bath areas.",
  },
  {
    src: "/fidelis-court/Bright Unfinished Room with Exposed Wiring.png",
    title: "Electrical & Conduit Reticulation",
    category: "interior",
    stage: "MEP Rough-in",
    description: "In-wall piping, safety conduits, and concealed infrastructure for modern electrical distribution.",
  },
  {
    src: "/fidelis-court/Renovation in Progress_ Bright Unfinished Interior.png",
    title: "Open-Plan Living & Dining Space",
    category: "interior",
    stage: "Screeding & Leveling",
    description: "Expansive floor plate ready for premium tile screeding and ceiling electrical fixtures.",
  },
  {
    src: "/fidelis-court/Scaffolded Window to Sunny Hillside View.png",
    title: "Hillside Vistas from Upper Floors",
    category: "interior",
    stage: "Window Cill Installation",
    description: "Perimeter views overlooking the serene surroundings of Kubwa F01 from upper residential decks.",
  },
  {
    src: "/fidelis-court/Sunlit Unfinished Room Renovation.png",
    title: "Dual Window Corner Suite",
    category: "interior",
    stage: "Natural Illumination",
    description: "Corner residential units engineered for maximum ambient sunlight throughout the morning and afternoon.",
  },
  {
    src: "/fidelis-court/Unfinished Room Under Renovation.png",
    title: "Plumbing & Sanitary Line Rough-In",
    category: "interior",
    stage: "Plumbing Services",
    description: "Heavy-duty PPR and PVC piping laid for kitchen sinks, washrooms, and dedicated water lines.",
  },
];

export const ConstructionGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<"all" | "exterior" | "interior">("all");
  const [activePhotoIndex, setActivePhotoIndex] = React.useState<number | null>(null);
  const [showAll, setShowAll] = React.useState(false);

  const exteriorCount = React.useMemo(() => GALLERY_PHOTOS.filter((p) => p.category === "exterior").length, []);
  const interiorCount = React.useMemo(() => GALLERY_PHOTOS.filter((p) => p.category === "interior").length, []);

  const filteredPhotos = React.useMemo(() => {
    if (selectedFilter === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === selectedFilter);
  }, [selectedFilter]);

  const displayedPhotos = showAll ? filteredPhotos : filteredPhotos.slice(0, 8);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fidelis-brown/10 text-fidelis-brown text-xs font-bold tracking-wide">
              <Camera className="w-3.5 h-3.5" />
              <span>Live Site Documentation • 22 Verified Photos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Verified Ground Progress
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We believe in complete transparency. Explore high-resolution photography documenting actual ongoing construction milestones at Fidelis Court.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto shrink-0">
            <button
              onClick={() => { setSelectedFilter("all"); setShowAll(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-fidelis-brown text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-fidelis-brown"
              }`}
            >
              All Photos ({GALLERY_PHOTOS.length})
            </button>
            <button
              onClick={() => { setSelectedFilter("exterior"); setShowAll(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === "exterior"
                  ? "bg-fidelis-brown text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-fidelis-brown"
              }`}
            >
              Exterior &amp; Superstructure ({exteriorCount})
            </button>
            <button
              onClick={() => { setSelectedFilter("interior"); setShowAll(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === "interior"
                  ? "bg-fidelis-brown text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-fidelis-brown"
              }`}
            >
              Interior &amp; MEP ({interiorCount})
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPhotos.map((photo, idx) => (
            <div
              key={photo.src}
              onClick={() => setActivePhotoIndex(idx)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-200">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="p-3 rounded-full bg-white/90 text-slate-900 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5 text-fidelis-brown" />
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {photo.stage}
                </div>
              </div>

              <div className="p-4.5 flex-1 flex flex-col justify-between space-y-1 bg-white">
                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-fidelis-brown transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPhotos.length > 8 && (
          <div className="flex justify-center pt-2">
            <Button
              variant="fidelis-brown-outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-5 text-sm font-bold cursor-pointer"
            >
              {showAll ? "Show Fewer Photos" : `View All ${filteredPhotos.length} Photos`}
            </Button>
          </div>
        )}

        {/* Inspection CTA Strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-fidelis-brown text-white flex items-center justify-center shrink-0 shadow-sm shadow-fidelis-brown/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Inspect these blocks in person
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Physical site tours hold Monday to Saturday at 21, Josephat Mojeckwu Avenue, Kubwa F01.
              </p>
            </div>
          </div>
          <Button
            variant="fidelis-brown"
            size="lg"
            onClick={scrollToContact}
            className="shrink-0 font-bold"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Book Site Tour
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Big photo */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-black">
              <Image
                src={filteredPhotos[activePhotoIndex].src}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            {/* Photo info */}
            <div className="p-6 bg-slate-900 border-t border-white/10 space-y-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-fidelis-brown text-white text-xs font-semibold">
                  {filteredPhotos[activePhotoIndex].stage}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {filteredPhotos[activePhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
