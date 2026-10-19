"use client";

import * as React from "react";
import { MapPin, Clock, CalendarCheck } from "lucide-react";
import { InspectionForm } from "@/components/home/inspection-form";
import { ESTATE_CONTACT } from "@/constants/navigation";

export const FidelisInspectionSection: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-white py-16 sm:py-24 border-b border-zinc-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Site Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-fidelis-brown block">
                On-Site Visit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Schedule a Private Inspection
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tour Fidelis Court in person. Our site engineers and sales executives will walk you through the estate layout, unit specifications, infrastructure progress, and payment plans.
              </p>
            </div>

            {/* Practical Site Inspection Info Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-5 h-5 text-fidelis-brown shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Site Location</p>
                  <p className="text-slate-600 mt-0.5">
                    21, Josephat Mojeckwu Avenue, Kubwa F01, Abuja, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Clock className="w-5 h-5 text-fidelis-brown shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">Visiting Hours</p>
                  <p className="text-slate-600 mt-0.5">
                    {ESTATE_CONTACT.inspectionHours}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CalendarCheck className="w-5 h-5 text-fidelis-brown shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-slate-900">What to Expect</p>
                  <p className="text-slate-600 mt-0.5">
                    Direct developer consultation, physical inspection of foundation &amp; superstructure, title &amp; survey review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inspection Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm">

            <InspectionForm buttonVariant="fidelis-brown" />
          </div>
        </div>
      </div>
    </section>
  );
};
