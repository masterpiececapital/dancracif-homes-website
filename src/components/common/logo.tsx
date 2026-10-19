import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  brandColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center group select-none shrink-0", className)}
      aria-label="Dangracif Homes"
    >
      <div className="relative h-11 sm:h-12 w-[150px] sm:w-[180px] shrink-0 scale-x-115 origin-left">
        <Image
          src="/images/logo.png"
          alt="Dangracif Homes"
          fill
          sizes="200px"
          className="object-contain object-left transition-transform duration-200 group-hover:scale-105"
          priority
        />
      </div>
    </Link>
  );
};

