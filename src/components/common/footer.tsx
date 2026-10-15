import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
import { ESTATE_CONTACT } from "@/constants/navigation";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#05142B] text-zinc-400 text-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-14 sm:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand & Head Office (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Dancracif Homes
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Building beautiful, durable and thoughtfully designed communities in Abuja.
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#0754C6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Dancracif Homes Limited</p>
                  <p className="text-zinc-400">
                    Suite B5, Bricks ‘N’ More Plaza, 6th Avenue, Gwarimpa, Abuja, FCT, Nigeria
                  </p>
                </div>
              </div>

              <a
                href={`tel:${ESTATE_CONTACT.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-[#0754C6] shrink-0" />
                <span>{ESTATE_CONTACT.phone}</span>
              </a>

              <a
                href={`mailto:${ESTATE_CONTACT.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-[#0754C6] shrink-0" />
                <span>{ESTATE_CONTACT.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Explore Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#fidelis-court" className="hover:text-white transition-colors">
                  Fidelis Court
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition-colors">
                  Pricing & Payment Plan
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#agent" className="hover:text-white transition-colors">
                  Become an Agent
                </Link>
              </li>
              <li>
                <Link href="#open-house" className="hover:text-white transition-colors">
                  Book / Reserve / Buy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Fidelis Court Estate Location (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Fidelis Court
            </h4>
            <div className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
              <MapPin className="h-4 w-4 text-[#0754C6] shrink-0 mt-0.5" />
              <p className="text-zinc-400 leading-relaxed">
                {ESTATE_CONTACT.address}
              </p>
            </div>
          </div>

          {/* Col 4: Follow Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Follow us
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Youtube className="h-3.5 w-3.5 text-zinc-400" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Facebook className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-10 border-t border-white/5 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Dancracif Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
