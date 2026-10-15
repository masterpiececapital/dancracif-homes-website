"use client";

import * as React from "react";
import Image from "next/image";
import { Users, MapPin, MessageSquare, Mail, ChevronDown } from "lucide-react";
import { OpenHouseFormData } from "@/types";

export const OpenHouseSection: React.FC = () => {
  const [formData, setFormData] = React.useState<OpenHouseFormData>({
    fullName: "",
    phone: "",
    email: "",
    homeOfInterest: "2-bed",
    attendees: 1,
    message: "",
  });

  const handleChange = (
    field: keyof OpenHouseFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Dancracif Homes, I would like to register for the Fidelis Court Open House.\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nHome of interest: ${formData.homeOfInterest}\nAttendees: ${formData.attendees}\nMessage: ${formData.message || "N/A"}`;
    window.open(
      `https://wa.me/2348000000000?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Open House Registration - ${formData.fullName}`;
    const body = `Name: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nHome of interest: ${formData.homeOfInterest}\nAttendees: ${formData.attendees}\nMessage: ${formData.message || "N/A"}`;
    window.location.href = `mailto:sales@dancracifhomes.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="w-full bg-[#EBF3FC] py-14 sm:py-18">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Column: Event Info & Estate Image */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0754C6]">
                Ongoing Event • Fidelis Court
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                Fidelis Court Open House
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-lg">
                Visit the estate, meet our sales team and explore your next home. Register your interest in attending our ongoing open house.
              </p>
            </div>

            {/* Location Address */}
            <div className="flex items-start gap-2.5 text-zinc-700">
              <MapPin className="h-5 w-5 text-[#0754C6] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-zinc-900">
                  Fidelis Court
                </p>
                <p className="text-sm text-zinc-600 mt-0.5">
                  21, Josephat Mojeckwu Avenue, Kubwa F01, Abuja, FCT, Nigeria
                </p>
              </div>
            </div>

            {/* Estate Photo Container */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-200 shadow-sm">
              <Image
                src="/images/terrace-duplex.jpg"
                alt="Fidelis Court Open House Estate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Registration Form (No White Card Box) */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 mb-2">
              <Users className="h-5 w-5 text-[#0754C6]" />
              <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                Open-house registration
              </h3>
            </div>

            <form className="space-y-4">
              {/* Full name */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all"
                  placeholder=""
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all"
                    placeholder=""
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Home of interest & Attendees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
                    Home of interest
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={formData.homeOfInterest}
                      onChange={(e) => handleChange("homeOfInterest", e.target.value)}
                      className="w-full h-11 pl-3.5 pr-9 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="2-bed">2-Bedroom Apartment — ₦80,000,000</option>
                      <option value="1-bed">1-Bedroom Apartment — ₦53,000,000</option>
                      <option value="4-bed-terrace">4-Bedroom Terrace Duplex — ₦145,000,000</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-zinc-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
                    Attendees (including you)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.attendees}
                    onChange={(e) =>
                      handleChange("attendees", parseInt(e.target.value) || 1)
                    }
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all"
                  />
                </div>
              </div>

              {/* Message (optional) */}
              <div>
                <label className="block text-sm font-semibold text-zinc-900 mb-1.5">
                  Message (optional)
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full min-h-[96px] p-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15 transition-all resize-y"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="h-11 px-6 rounded-full bg-[#0754C6] hover:bg-[#0648AB] text-white font-semibold text-sm inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Register via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmail}
                  className="h-11 px-6 rounded-full bg-white border border-[#0754C6] hover:bg-zinc-50 text-[#0754C6] font-semibold text-sm inline-flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Register via Email</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
