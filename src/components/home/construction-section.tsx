"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Play, Radio, ExternalLink, Youtube } from "lucide-react";

export const ConstructionSection: React.FC = () => {
  const pathname = usePathname();
  const isFidelisCourtPage = pathname === "/fideliscourts" || pathname === "/fidelis-court";
  const [activeTab, setActiveTab] = React.useState<"latest" | "live">("latest");

  return (
    <section className="w-full bg-white py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-xl">
            <span className={`text-sm font-semibold uppercase tracking-[0.2em] ${isFidelisCourtPage ? "text-fidelis-brown" : "text-[#0754C6]"}`}>
              From the Site • YouTube
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight whitespace-nowrap">
              Fidelis Court construction updates
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Follow our progress at Kubwa F01 and join the team on site during live broadcasts.
            </p>
          </div>

          <a
            href="https://youtu.be/4NjadeZpfN0?si=rckY9siRuMaAYjx_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 bg-white text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm self-start md:self-auto"
          >
            <Youtube className="h-4 w-4" />
            <span>YouTube channel</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab("latest")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${activeTab === "latest"
              ? `${isFidelisCourtPage ? "bg-fidelis-brown" : "bg-[#0754C6]"} text-white shadow-sm`
              : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
          >
            <Play className="h-4 w-4" />
            Latest upload
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("live")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${activeTab === "live"
              ? `${isFidelisCourtPage ? "bg-fidelis-brown" : "bg-[#0754C6]"} text-white shadow-sm`
              : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
          >
            <Radio className="h-4 w-4" />
            Live channel
          </button>
        </div>


        {/* Video Player Showcase Frame */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
          <iframe
            key={activeTab}
            className="absolute inset-0 w-full h-full"
            src={
              activeTab === "latest"
                ? "https://www.youtube.com/embed/4NjadeZpfN0"
                : "https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
            }
            title="Fidelis Court construction updates"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Video Caption & External Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-zinc-500 gap-1.5 pt-1">
          <span>Latest channel upload: INDEPENDENCE PROMO!</span>
          <a
            href="https://youtu.be/4NjadeZpfN0?si=rckY9siRuMaAYjx_"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-semibold hover:underline ${isFidelisCourtPage ? "text-fidelis-brown" : "text-[#0754C6]"}`}
          >
            <span className="">Watch on YouTube</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
