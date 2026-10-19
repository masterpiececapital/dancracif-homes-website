import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
import { ESTATE_CONTACT } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface FooterProps {
  compact?: boolean;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ compact = false, className }) => {
  return (
    <footer className={cn("w-full bg-[#07183A] text-white text-sm border-t border-white/10", className)}>
      <div
        className={cn(
          "max-w-7xl mx-auto px-2 sm:px-3",
          compact ? "py-8 sm:py-11 lg:py-10" : "py-14 sm:py-18"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand & Head Office (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group select-none">
              <div className="bg-white rounded-2xl px-4 py-2.5 inline-flex items-center shadow-md transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Dangracif Homes Limited"
                  width={160}
                  height={108}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-sm">
              Building beautiful, durable and thoughtfully designed communities in Abuja.
            </p>

            <div className="space-y-3 pt-1 text-xs text-white">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-white shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Dangracif Homes Limited</p>
                  <p className="text-white/85 mt-0.5 leading-relaxed">
                    Suite B5, Bricks ‘N’ More Plaza, 6th Avenue, Gwarimpa, Abuja, FCT, Nigeria
                  </p>
                </div>
              </div>

              <a
                href={`tel:${ESTATE_CONTACT.phone}`}
                className="flex items-center gap-2.5 text-white hover:text-white/75 transition-colors"
              >
                <Phone className="h-4 w-4 text-white shrink-0" />
                <span className="font-medium">{ESTATE_CONTACT.phone}</span>
              </a>

              <a
                href={`mailto:${ESTATE_CONTACT.email}`}
                className="flex items-center gap-2.5 text-white hover:text-white/75 transition-colors"
              >
                <Mail className="h-4 w-4 text-white shrink-0" />
                <span className="font-medium">{ESTATE_CONTACT.email}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Explore Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#fidelis-court" className="text-white/90 hover:text-white transition-colors">
                  Fidelis Court
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-white/90 hover:text-white transition-colors">
                  Pricing & Payment Plan
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/90 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-white/90 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#agent" className="text-white/90 hover:text-white transition-colors">
                  Become an Agent
                </Link>
              </li>
              <li>
                <Link href="#open-house" className="text-white/90 hover:text-white transition-colors">
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
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-white">
              <MapPin className="h-4 w-4 text-white shrink-0 mt-0.5" />
              <p className="text-white/85 leading-relaxed">
                {ESTATE_CONTACT.address}
              </p>
            </div>
          </div>

          {/* Col 4: Follow Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Follow us
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                >
                  <Instagram className="h-3.5 w-3.5 text-white shrink-0" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                >
                  <Youtube className="h-3.5 w-3.5 text-white shrink-0" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/90 hover:text-white transition-colors"
                >
                  <Facebook className="h-3.5 w-3.5 text-white shrink-0" />
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          className={cn(
            "border-t border-white/10 text-center text-xs text-white/80",
            compact ? "pt-5 mt-7 sm:pt-6 sm:mt-8" : "pt-8 mt-10"
          )}
        >
          <p>© {new Date().getFullYear()} Dangracif Homes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
