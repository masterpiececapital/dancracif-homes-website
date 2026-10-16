"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onBookInspectionClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookInspectionClick }) => {
  const pathname = usePathname();
  const isFidelisCourtPage = pathname === "/fidelis-court";
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookInspection = () => {
    if (onBookInspectionClick) {
      onBookInspectionClick();
    } else {
      router.push("/contact");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-zinc-200/70 shadow-sm"
          : "bg-white border-b border-zinc-100",
      )}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-3 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Right side: Nav + CTA grouped together */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === pathname ||
                (item.href.startsWith("/") && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isFidelisCourtPage
                      ? "hover:text-fidelis-brown"
                      : "hover:text-[#0754C6]",
                    isActive
                      ? isFidelisCourtPage
                        ? "text-fidelis-brown font-semibold"
                        : "text-[#0754C6] font-semibold"
                      : "text-zinc-700",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Button
            variant={isFidelisCourtPage ? "fidelis-brown" : "primary"}
            size="md"
            onClick={handleBookInspection}
          >
            Book Inspection
          </Button>
        </div>
      </div>
    </header>
  );
};
