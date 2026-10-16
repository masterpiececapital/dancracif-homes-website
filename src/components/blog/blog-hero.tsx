"use client";

import * as React from "react";
import { BLOG_POSTS } from "@/constants/blog";
import { BlogCard } from "./blog-card";

export const BlogHero: React.FC = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Header Block */}
        <div className="space-y-2 mb-10 sm:mb-12">
          <span className={`text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6]`}>
            BLOG
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            News & updates
          </h1>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
