"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { BlogPost } from "@/constants/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-fit">
      {/* Top Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="px-4 py-3 sm:px-5 sm:py-4 flex flex-col flex-1">
        <p className="text-xs text-slate-600">
          {post.imageCaption}
        </p>

        <span className="text-xs font-bold uppercase tracking-wider text-[#00ABF0] mt-4 block">
          {post.date}
        </span>

        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mt-2 tracking-tight leading-snug">
          {post.title}
        </h2>

        <p className="text-sm text-slate-800 leading-relaxed mt-2.5">
          {post.summary}
        </p>

        {/* Read more / Read less toggle button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00ABF0] hover:text-[#00ABF0]/80 transition-colors cursor-pointer group"
          >
            <span>{isExpanded ? "Read less" : "Read more"}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#00ABF0] transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-4 mt-3 border-t border-slate-300 space-y-4 animate-in fade-in duration-200">
            <p className="text-sm text-slate-700 leading-relaxed">
              {post.expandedContent}
            </p>

            <div>
              <Link
                href={post.linkHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00ABF0] hover:text-[#00ABF0]/80 hover:gap-2 transition-all cursor-pointer"
              >
                <span>{post.linkText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
