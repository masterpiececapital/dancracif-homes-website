import * as React from "react";
import { FileText, Download } from "lucide-react";

export const BrochureBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="w-full bg-[#0754C6] rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#0754C6]/20 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text with Icon */}
          <div className="flex items-start gap-4 max-w-xl">
            <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Download the Fidelis Court brochure
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Prices, payment plan, fees, amenities and addresses — all in one PDF you can share.
              </p>
            </div>
          </div>

          {/* Right Download Button */}
          <a
            href="/fidelis-court-brochure.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#0754C6] font-semibold text-xs sm:text-sm shadow-sm hover:bg-zinc-50 active:scale-95 transition-all self-start md:self-auto cursor-pointer shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Download brochure</span>
          </a>
        </div>
      </div>
    </section>
  );
};
