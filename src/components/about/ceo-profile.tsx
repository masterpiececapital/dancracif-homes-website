"use client";

import * as React from "react";
import Image from "next/image";
import {
  Shield,
  Award,
  Globe2,
  Briefcase,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AWARDS = [
  "Commandant, Infantry Corps Award for Best All-Round Student Officer, Young Officers Course 63.",
  "Commandant, Armed Forces Command and Staff College Award for Best All-Round Student Officer, Junior Staff Course 45.",
  "Chief of Army Staff Commendation for First in Order of Merit in the Captain-to-Major Written Promotion Examination, 1999.",
  "Commandant, Infantry Corps Award for Best All-Round Student Officer, Company Commanders Course.",
  "Ghana Army Commander's Award for Overall Best Army Student Officer, Ghana Armed Forces Command and Staff College, 2003.",
  "Ghana Minister of Foreign Affairs Award for Best Allied Student Officer, Ghana Armed Forces Command and Staff College, 2003.",
  "Chief of Army Staff Award for Outstanding Integrity and Professionalism, 2013.",
];

const KEY_APPOINTMENTS = [
  "General Officer Commanding, 2 Division, Nigerian Army, Ibadan",
  "Commander, 13 Brigade, Calabar",
  "Commander, 4 Brigade, Benin",
  "Chief of Army Standards and Evaluation, Army Headquarters",
  "Chief of Training, Nigerian Army",
  "Director of Military Training, Nigerian Defence Academy",
  "Commandant, Martin Luther Agwai International Leadership and Peacekeeping Centre",
];

const INTERNATIONAL_ROLES = [
  "Senior Military Expert, Peace and Security Department, African Union Commission, Addis Ababa",
  "Chief Planning Officer, Darfur Integrated Task Force, Addis Ababa",
  "AU Senior Military Representative/Liaison Officer to the UN Department of Peacekeeping Operations, New York",
];

const BIO_SECTIONS = [
  {
    icon: Shield,
    title: "A Distinguished Record of Leadership",
    content:
      "Enlisted into the Nigerian Defence Academy in 1984 as a member of the 36 Regular Course, General Azinta was commissioned into the Infantry Corps in September 1989. Through years of dedicated service, he rose to the rank of Major General in 2017 and retired from the Nigerian Army in December 2021. His military career was distinguished by progressive responsibility, demanding leadership assignments and professional recognition for excellence, integrity and professionalism.",
  },
  {
    icon: Globe2,
    title: "International Experience & Strategic Perspective",
    content:
      "General Azinta's professional experience extended beyond Nigeria to important international assignments in peace and security. These appointments broadened his experience in strategic planning, institutional cooperation, coordination and engagement across different organisations and professional environments.",
  },
  {
    icon: Briefcase,
    title: "Leadership at Dangracif Homes",
    content:
      "As CEO/Managing Director, General Azinta leads the company's strategic direction and corporate development agenda. His background in command, planning, training, standards and evaluation provides a strong foundation centred on accountability, coordination, effective decision-making and disciplined execution. Under his leadership, Dangracif Homes is positioned to pursue opportunities in residential and commercial property development, with a focus on quality, affordability, functionality and lasting value.",
  },
  {
    icon: Heart,
    title: "Community & Social Impact",
    content:
      "Following his retirement from military service, General Azinta established the General Azinta Foundation to support communities and less-privileged people through various initiatives. This commitment to community impact complements Dangracif Homes Limited's aspiration to contribute positively to the built environment by developing property solutions that support homeownership, investment and better living.",
  },
];

export const CeoProfile: React.FC = () => {
  const [showAllAwards, setShowAllAwards] = React.useState(false);
  const [showAllAppointments, setShowAllAppointments] = React.useState(false);

  return (
    <section className="w-full bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-2 sm:px-3">
        {/* Section Label */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0754C6] block mb-3">
            Executive Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Meet our CEO
          </h2>
        </div>

        {/* Profile Hero Card */}
        <div className="relative rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[3/3.5] lg:aspect-auto lg:h-full min-h-[400px]">
                <Image
                  src="/images/ceo.jpg"
                  alt="Major General Okwudili Fidelis Azinta (Rtd.) — CEO, Dangracif Homes Limited"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                {/* Subtle gradient at bottom for mobile text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
              {/* Rank badge */}
              <div className="inline-flex items-center self-start rounded-full bg-[#0754C6]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#0754C6] mb-5">
                <Shield className="w-3.5 h-3.5 mr-2" />
                Major General (Rtd.)
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight mb-1">
                Okwudili Fidelis Azinta
              </h3>
              <p className="text-[15px] font-semibold text-[#0754C6] mb-5">
                Chief Executive Officer / Managing Director
              </p>

              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6">
                Major General Okwudili Fidelis Azinta (Rtd.) is a distinguished Nigerian military officer and strategic leader whose career spans senior command appointments, military training and education, operational planning, institutional standards and evaluation, and international peace and security cooperation. As CEO/Managing Director of Dangracif Homes Limited, he brings extensive leadership experience, a disciplined approach to organisational management, and a strong commitment to professional excellence and purposeful development.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "NDA Enlistment", value: "1984" },
                  { label: "Commissioned", value: "1989" },
                  { label: "Retired", value: "Dec 2021" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100"
                  >
                    <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                      {stat.label}
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {BIO_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0754C6]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#0754C6]" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {section.title}
                  </h4>
                </div>
                <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Appointments & International Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          {/* Key Appointments */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0754C6]/10 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-[#0754C6]" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Key Command Appointments
              </h4>
            </div>
            <ul className="space-y-2.5">
              {(showAllAppointments
                ? KEY_APPOINTMENTS
                : KEY_APPOINTMENTS.slice(0, 4)
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0754C6] mt-1.5 shrink-0" />
                  <span className="text-[13px] sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            {KEY_APPOINTMENTS.length > 4 && (
              <button
                onClick={() => setShowAllAppointments(!showAllAppointments)}
                className="flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-[#0754C6] hover:text-[#0648AB] transition-colors cursor-pointer"
              >
                {showAllAppointments ? (
                  <>
                    Show less <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Show all {KEY_APPOINTMENTS.length} appointments{" "}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* International Roles */}
          <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#0754C6]/10 flex items-center justify-center shrink-0">
                <Globe2 className="w-5 h-5 text-[#0754C6]" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                International Assignments
              </h4>
            </div>
            <ul className="space-y-2.5">
              {INTERNATIONAL_ROLES.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0754C6] mt-1.5 shrink-0" />
                  <span className="text-[13px] sm:text-sm text-slate-600 font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Leadership Philosophy Quote */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-[13px] sm:text-sm text-slate-500 italic leading-relaxed font-medium">
                &ldquo;Leadership by example, informed by discipline, integrity, professionalism, strategic foresight, accountability, and service.&rdquo;
              </p>
              <p className="text-[12px] font-semibold text-slate-400 mt-2">
                — General Azinta&apos;s leadership philosophy
              </p>
            </div>
          </div>
        </div>

        {/* Awards & Distinctions */}
        <div className="bg-gradient-to-br from-[#05142b] to-[#0B3D91] rounded-2xl p-7 sm:p-10 overflow-hidden relative">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#0754C6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#60a5fa]" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Awards & Professional Distinctions
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(showAllAwards ? AWARDS : AWARDS.slice(0, 4)).map(
                (award, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/[0.06] border border-white/[0.08] rounded-xl px-5 py-4"
                  >
                    <span className="text-[11px] font-bold text-[#60a5fa] bg-[#60a5fa]/15 rounded-lg w-7 h-7 flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-white/80 font-medium leading-relaxed">
                      {award}
                    </span>
                  </div>
                )
              )}
            </div>

            {AWARDS.length > 4 && (
              <button
                onClick={() => setShowAllAwards(!showAllAwards)}
                className="flex items-center gap-1.5 mt-5 text-[13px] font-semibold text-[#60a5fa] hover:text-white transition-colors cursor-pointer"
              >
                {showAllAwards ? (
                  <>
                    Show fewer <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    View all {AWARDS.length} distinctions{" "}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
