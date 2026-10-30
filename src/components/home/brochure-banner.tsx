import * as React from "react";
import { FileText, Download } from "lucide-react";
import { useBrochureUrl } from "@/components/common/site-images-provider";

export const BrochureBanner: React.FC = () => {
  const brochureUrl = useBrochureUrl();

  return (
    <section className="w-full bg-[#FAFCFE] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="w-full bg-gradient-to-r from-[#0064CF] to-[#0093ED] rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#0754C6]/20 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text with Icon */}
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                Download the Fidelis Court brochure
              </h3>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                Prices, payment plan, fees, amenities and addresses — all in one PDF you can share.
              </p>
            </div>
          </div>

          {/* Right Download Button */}
          <a
            href={brochureUrl}
            download
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#00ABF0] font-semibold text-sm sm:text-base shadow-sm hover:bg-zinc-50 active:scale-95 transition-all self-start md:self-auto cursor-pointer shrink-0"
          >
            <Download className="h-5 w-5" />
            <span>Download brochure</span>
          </a>
        </div>
      </div>
    </section>
  );
};
