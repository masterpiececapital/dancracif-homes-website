"use client";

import * as React from "react";
import { ExternalLink, Youtube } from "lucide-react";
import { useYoutubeUrl } from "@/components/common/site-images-provider";

export const ConstructionSection: React.FC = () => {
  const configuredUrl = useYoutubeUrl();
  const youtubeUrl = React.useMemo(() => {
    if (!configuredUrl) return "https://youtu.be/4NjadeZpfN0";
    try {
      const url = new URL(configuredUrl);
      if (
        !["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(
          url.hostname
        )
      ) {
        return "https://youtu.be/4NjadeZpfN0";
      }
      if (url.pathname === "/" && !url.searchParams.has("v")) {
        return "https://youtu.be/4NjadeZpfN0";
      }
      return url.toString();
    } catch {
      return "https://youtu.be/4NjadeZpfN0";
    }
  }, [configuredUrl]);
  const videoId = React.useMemo(() => {
    try {
      const url = new URL(youtubeUrl);
      if (url.hostname === "youtu.be") {
        return url.pathname.split("/").filter(Boolean)[0] || null;
      }
      return (
        url.searchParams.get("v") ||
        url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ||
        null
      );
    } catch {
      return null;
    }
  }, [youtubeUrl]);

  return (
    <section className="w-full bg-white py-14 sm:py-18 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00ABF0]">
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
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 bg-white text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-50 transition-colors shadow-sm self-start md:self-auto"
          >
            <Youtube className="h-4 w-4" />
            <span>YouTube channel</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Video Player Showcase Frame */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-xl">
          {videoId ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`}
              title="Fidelis Court construction updates"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-white">
              <Youtube className="h-10 w-10" />
              <p className="text-sm text-white/80">
                Open the configured YouTube channel to watch construction updates.
              </p>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
              >
                Visit YouTube
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>

        {/* Video Caption & External Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-zinc-500 gap-1.5 pt-1">
          <span>Watch Fidelis Court construction updates on YouTube.</span>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold hover:underline text-[#00ABF0]"
          >
            <span className="">Watch on YouTube</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
