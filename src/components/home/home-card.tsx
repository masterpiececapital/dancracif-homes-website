"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeModel } from "@/types";

interface HomeCardProps {
  home: HomeModel;
  onEnquire?: (home: HomeModel) => void;
}

export const HomeCard: React.FC<HomeCardProps> = ({ home, onEnquire }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={home.imageSrc}
          alt={home.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
            {home.unitsCount} Units
          </span>
          <h3 className="text-[20px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            {home.title}
          </h3>
          <p className="text-sm font-lg text-zinc-600 dark:text-zinc-600">
            {home.description}
          </p>
        </div>

        {/* Footer: Price & Enquire Pill */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-bold tracking-tight text-[#00ABF0]">
            {home.price}
          </span>

          <Link
            href="/contact?tab=buy"
            className="px-5 py-2 rounded-full bg-[#EEF5FF] hover:bg-[#E0EEFF] text-[#00ABF0] font-semibold text-sm transition-colors cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
};
