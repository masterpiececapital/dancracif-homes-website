import * as React from "react";
import { InspectionForm } from "./inspection-form";
import { EstateInfoCard } from "./estate-info-card";

export const InspectionSection: React.FC = () => {
  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-[#FAFCFE] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inspection Form (8 cols on large screens) */}
          <div className="lg:col-span-8">
            <InspectionForm />
          </div>

          {/* Right Navy Info Sidebar (4 cols on large screens) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <EstateInfoCard />
          </div>
        </div>
      </div>
    </section>
  );
};
