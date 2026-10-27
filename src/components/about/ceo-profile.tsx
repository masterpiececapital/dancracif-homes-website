"use client";

import * as React from "react";
import Image from "next/image";

export const CeoProfile: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block">
            LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight">
            Our Managing Director
          </h2>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          {/* Photo Column - Refined compact portrait */}
          <div className="w-full max-w-[250px] sm:max-w-[260px] lg:max-w-[290px] shrink-0">
            <div className="relative w-full aspect-[3/3.9] rounded-md sm:rounded-3xl overflow-hidden">
              <Image
                src="/images/ceo.jpg"
                alt="Major General Okwudili Fidelis Azinta (Rtd.) — CEO, Dangracif Homes Limited"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 280px"
              />
            </div>
          </div>

          {/* Bio Column */}
          <div className="flex-1 space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0a192f] tracking-tight leading-tight">
              Major General Okwudili Fidelis Azinta (Rtd.)
            </h3>

            <p className="text-base sm:text-[17px] font-bold text-[#0754C6] !mb-5">
              Chief Executive Officer / Managing Director
            </p>

            <p>
              A distinguished Nigerian military officer and strategic leader,
              General Azinta brings extensive experience in command, planning,
              institutional standards and international cooperation to Dangracif
              Homes Limited. Commissioned into the Infantry Corps in September
              1989, he rose to Major General in 2017 and retired from the
              Nigerian Army in December 2021.
            </p>

            <p>
              His appointments included General Officer Commanding, 2 Division;
              Chief of Army Standards and Evaluation; and Chief of Training,
              Nigerian Army. He also served with the African Union Commission
              and as an African Union liaison officer to the United Nations
              Department of Peacekeeping Operations in New York.
            </p>

            <p>
              At Dangracif Homes, his leadership centres on integrity,
              accountability, disciplined execution and purposeful development.
              He established the General Azinta Foundation after retirement to
              support communities and less-privileged people.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 font-medium pt-3">
              Our development work is supported by outsourced built-environment
              professionals and partners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
