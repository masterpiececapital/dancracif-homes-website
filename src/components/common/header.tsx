"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onBookInspectionClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookInspectionClick }) => {
  const pathname = usePathname();
  const isFidelisCourtPage = pathname === "/fideliscourts" || pathname === "/fidelis-court";
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile nav on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleBookInspection = () => {
    setIsOpen(false);
    if (onBookInspectionClick) {
      onBookInspectionClick();
    } else {
      router.push("/book-inspection");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-zinc-200/80 transition-all duration-300",
        isOpen || isScrolled
          ? "bg-white shadow-xs"
          : "bg-white",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 h-20 sm:h-22 lg:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Nav + CTA */}
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
                      : "hover:text-[#00ABF0]",
                    isActive
                      ? isFidelisCourtPage
                        ? "text-fidelis-brown font-semibold"
                        : "text-[#00ABF0] font-semibold"
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

        {/* Mobile Hamburger / Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 bg-white text-zinc-700 hover:bg-zinc-50 active:bg-zinc-100 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0754C6]/20 cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-zinc-700" />
          ) : (
            <Menu className="w-5 h-5 text-zinc-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-zinc-100 bg-white"
          >
            <div className="px-5 sm:px-6 pt-4 pb-7 flex flex-col">
              <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === pathname ||
                    (item.href !== "/" && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-[17px] font-medium tracking-tight py-1",
                        isActive
                          ? isFidelisCourtPage
                            ? "text-fidelis-brown"
                            : "text-[#00ABF0]"
                          : "text-zinc-900 hover:text-[#00ABF0]",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 pt-1">
                <Button
                  variant={isFidelisCourtPage ? "fidelis-brown" : "primary"}
                  size="lg"
                  className="w-full text-base font-semibold rounded-full h-12 shadow-sm"
                  onClick={handleBookInspection}
                >
                  Book Inspection
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
