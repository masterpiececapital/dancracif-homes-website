"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, Key, Building2, ArrowRight } from "lucide-react";

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const ACTION_CARDS: ActionCard[] = [
  {
    id: "inspection",
    title: "Book an inspection",
    description: "Visit the site in Kubwa with our team.",
    icon: <Calendar className="h-6 w-6 text-[#00ABF0]" />,
    href: "/contact?tab=inspection",
  },
  {
    id: "reserve",
    title: "Reserve a unit",
    description: "Hold your preferred home before it's gone.",
    icon: <Key className="h-6 w-6 text-[#00ABF0]" />,
    href: "/contact?tab=reserve",
  },
  {
    id: "buy",
    title: "Buy now",
    description: "Send a purchase demand straight to our sales team.",
    icon: <Building2 className="h-6 w-6 text-[#00ABF0]" />,
    href: "/contact?tab=buy",
  },
];

export const ActionCardsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-12 sm:py-16 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTION_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-[#00ABF0] hover:scale-[1.03] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between gap-5 group cursor-pointer"
            >
              <div className="space-y-3.5">
                <div className="h-12 w-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center group-hover:bg-[#00ABF0]/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {card.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900 group-hover:text-[#00ABF0] group-hover:scale-[1.04] origin-left inline-block transition-all duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 group-hover:text-zinc-700 leading-relaxed transition-colors">
                    {card.description}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00ABF0] hover:text-[#00ABF0]/80 transition-colors">
                <span>Get started</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
