import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group select-none", className)}
    >
      <div className="h-9 w-9 rounded-xl bg-[#0754C6] text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-[#0754C6]/25 transition-transform group-hover:scale-105">
        D
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Dancracif Homes
        </span>
        <span className="text-[9.5px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
          Real Estate Developer
        </span>
      </div>
    </Link>
  );
};
