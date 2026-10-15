"use client";

import * as React from "react";
import { Play, Radio, ExternalLink, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ConstructionSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"latest" | "live">("latest");

  return (
    <section className="w-full bg-white py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6]">
              From the Site • YouTube
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
              Fidelis Court construction updates
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Follow our progress at Kubwa F01 and join the team on site during live broadcasts.
            </p>
          </div>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm self-start md:self-auto"
          >
            <Youtube className="h-4 w-4 text-red-600" />
            <span>YouTube channel</span>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2.5">
          <Button
            variant={activeTab === "latest" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("latest")}
            leftIcon={<Play className="h-3 w-3 fill-current" />}
          >
            Latest upload
          </Button>

          <Button
            variant={activeTab === "live" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("live")}
            leftIcon={<Radio className="h-3 w-3" />}
          >
            Live channel
          </Button>
        </div>

        {/* Video Player Showcase Frame */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />

          {/* Top Bar Details */}
          <div className="absolute top-5 left-5 z-20 flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-full bg-[#0754C6] flex items-center justify-center font-bold text-xs text-white shadow-md">
              DH
            </div>
            <div>
              <p className="text-white font-bold text-xs sm:text-sm tracking-wide">
                INDEPENDENCE PROMO!
              </p>
              <p className="text-[11px] text-zinc-400">Dancracif Homes</p>
            </div>
          </div>

          {/* Center Play Button */}
          <div className="relative z-20 flex flex-col items-center gap-2.5 transition-transform duration-300 group-hover:scale-105">
            <div className="h-14 w-14 sm:h-18 sm:w-18 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-600/30">
              <Play className="h-7 w-7 fill-white translate-x-0.5" />
            </div>
            <span className="text-xs font-semibold text-white/90 bg-black/60 px-3.5 py-1 rounded-full backdrop-blur-md">
              1-Bedroom Shortlet, Jahi • ₦70K/Night
            </span>
          </div>

          {/* Bottom Right Watch on YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white backdrop-blur-md transition-colors"
          >
            <span>Watch on</span>
            <span className="font-bold">YouTube</span>
          </a>
        </div>

        {/* Video Caption & External Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-500 gap-1.5 pt-1">
          <span>Latest channel upload: INDEPENDENCE PROMO!</span>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0754C6] hover:underline"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
