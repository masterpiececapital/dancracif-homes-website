import * as React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { ESTATE_CONTACT } from "@/constants/navigation";

export const EstateInfoCard: React.FC = () => {
  return (
    <div className="w-full bg-[#05142B] text-white rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-8 shadow-xl shadow-[#05142B]/30 border border-white/5">
      {/* Top Contact Details */}
      <div className="space-y-4">
        <a
          href={`tel:${ESTATE_CONTACT.phone}`}
          className="flex items-center gap-3 text-zinc-200 hover:text-white transition-colors group"
        >
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
            <Phone className="h-4 w-4 text-[#00ABF0]" />
          </div>
          <span className="text-sm font-medium tracking-wide">
            {ESTATE_CONTACT.phone}
          </span>
        </a>

        <a
          href={`mailto:${ESTATE_CONTACT.email}`}
          className="flex items-center gap-3 text-zinc-200 hover:text-white transition-colors group"
        >
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
            <Mail className="h-4 w-4 text-[#00ABF0]" />
          </div>
          <span className="text-sm font-medium tracking-wide">
            {ESTATE_CONTACT.email}
          </span>
        </a>
      </div>

      {/* Middle Estate Details */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-bold text-white tracking-tight">
          {ESTATE_CONTACT.estateName}
        </h3>

        <div className="flex items-start gap-3 text-zinc-300">
          <MapPin className="h-4 w-4 text-[#00ABF0] shrink-0 mt-1" />
          <p className="text-xs sm:text-sm leading-relaxed">
            {ESTATE_CONTACT.address}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-2">
          {ESTATE_CONTACT.description}
        </p>
      </div>

      {/* Bottom Schedule Notice */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-zinc-300/90 leading-relaxed font-medium">
          {ESTATE_CONTACT.inspectionHours}
        </p>
      </div>
    </div>
  );
};
