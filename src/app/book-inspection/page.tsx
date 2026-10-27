"use client";

import * as React from "react";
import { MessageCircle, Mail, ChevronDown } from "lucide-react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { UNIT_OPTIONS } from "@/constants/navigation";
import { submitLeadInquiry } from "@/app/actions/admin-dashboard";

export default function BookInspectionPage() {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [unitType, setUnitType] = React.useState("2-bed");
  const [preferredDate, setPreferredDate] = React.useState("");
  const [message, setMessage] = React.useState("");

  const getActiveUnitLabel = () => {
    const found = UNIT_OPTIONS.find((u) => u.value === unitType);
    return found ? found.label : "2-Bedroom Apartment — ₦80,000,000";
  };

  const recordLead = () => {
    submitLeadInquiry({
      type: "inspection",
      fullName: fullName.trim() || "Website Visitor",
      phone: phone.trim() || "N/A",
      email: email.trim() || "N/A",
      unitType,
      preferredDate: preferredDate || undefined,
      message: message.trim() || undefined,
    }).catch((err) => {
      console.warn("Could not record lead:", err);
    });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    recordLead();
    const text = `Hello Dangracif Homes, I would like to book an inspection for Fidelis Court.\n\nFull Name: ${fullName || "N/A"
      }\nPhone: ${phone || "N/A"}\nEmail: ${email || "N/A"}\nUnit: ${getActiveUnitLabel()}\nPreferred Date: ${preferredDate || "N/A"
      }\nMessage: ${message || "N/A"}`;
    window.open(
      `https://wa.me/2348133187860?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    recordLead();
    const subject = `Inspection Booking - ${fullName || "Fidelis Court"}`;
    const body = `Request: Book an Inspection\n\nFull Name: ${fullName || "N/A"
      }\nPhone: ${phone || "N/A"}\nEmail: ${email || "N/A"}\nUnit: ${getActiveUnitLabel()}\nPreferred Date: ${preferredDate || "N/A"
      }\nMessage: ${message || "N/A"}`;
    window.location.href = `mailto:info@dangracif.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFCFE] text-zinc-900 flex flex-col antialiased">
      <Header />

      <main className="flex-1 w-full bg-[#FAFCFE] py-8 sm:py-10 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Eyebrow */}
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#0754C6] block">
            FIDELIS COURT · KUBWA F01
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#081734] tracking-tight mt-2 mb-8 sm:mb-10">
            Book an Inspection
          </h1>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Full name */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-1.5 block">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6] transition-colors shadow-xs"
              />
            </div>

            {/* Phone / WhatsApp & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-800 mb-1.5 block">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6] transition-colors shadow-xs"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-800 mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6] transition-colors shadow-xs"
                />
              </div>
            </div>

            {/* Unit type & Preferred inspection date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-800 mb-1.5 block">
                  Unit type
                </label>
                <div className="relative">
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200/90 bg-white px-4 py-3 pr-10 text-slate-900 text-sm focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6] transition-colors shadow-xs cursor-pointer"
                  >
                    {UNIT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-800 mb-1.5 block">
                  Preferred inspection date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6] transition-colors shadow-xs cursor-pointer"
                />
              </div>
            </div>

            {/* Message (optional) */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-1.5 block">
                Message (optional)
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6] transition-colors shadow-xs resize-y"
              />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-[#0754C6] hover:bg-[#0648AB] text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#0754C6]/20 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmail}
                className="w-full bg-white hover:bg-blue-50/50 text-[#0754C6] border-2 border-[#0754C6] font-semibold py-3.5 px-6 rounded-full flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <Mail className="w-5 h-5 text-[#0754C6]" />
                <span>Send via Email</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
