import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  brandColor?: "primary" | "fidelis-brown";
}

export const Logo: React.FC<LogoProps> = ({
  className,
  brandColor = "primary",
}) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group select-none", className)}
    >
      <div
        className={cn(
          "h-9 w-9 rounded-xl text-white flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105",
          brandColor === "fidelis-brown"
            ? "bg-white text-fidelis-brown shadow-black/15"
            : "bg-[#0754C6] shadow-[#0754C6]/25"
        )}
      >
        D
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-base font-bold tracking-tight",
            brandColor === "fidelis-brown"
              ? "text-white"
              : "text-zinc-900 dark:text-zinc-100"
          )}
        >
          Dangracif Homes
        </span>
        <span
          className={cn(
            "text-[9.5px] font-semibold tracking-wider uppercase",
            brandColor === "fidelis-brown"
              ? "text-white/70"
              : "text-zinc-400 dark:text-zinc-500"
          )}
        >
          Real Estate Developer
        </span>
      </div>
    </Link>
  );
};
