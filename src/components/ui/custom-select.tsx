"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}
export type CustomSelectOption = SelectOption;

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  variant?: "default" | "fidelis-brown";
}

export const CustomSelect: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  label,
  required,
  variant = "default",
}) => {
  const [open, setOpen] = React.useState(false);
  const [openAbove, setOpenAbove] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.value === value);

  const checkPlacement = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const minNeededHeight = 250;
    setOpenAbove(spaceBelow < minNeededHeight && spaceAbove > spaceBelow);
  }, []);

  const handleToggle = () => {
    if (!open) {
      checkPlacement();
    }
    setOpen((prev) => !prev);
  };

  // Recheck placement on scroll/resize while open
  React.useEffect(() => {
    if (!open) return;
    const handleScrollOrResize = () => {
      checkPlacement();
    };
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, checkPlacement]);

  // Close on outside click or Escape
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative w-full flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          "w-full h-11 flex items-center justify-between gap-2",
          "rounded-xl border border-zinc-200 dark:border-zinc-700 px-3.5 text-sm bg-white dark:bg-zinc-900",
          variant === "fidelis-brown"
            ? "focus:outline-none focus:border-fidelis-brown focus:ring-2 focus:ring-fidelis-brown/20"
            : "focus:outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15",
          "transition-all cursor-pointer text-left",
          open && (
            variant === "fidelis-brown"
              ? "border-fidelis-brown ring-2 ring-fidelis-brown/20"
              : "border-[#0754C6] ring-2 ring-[#0754C6]/15"
          )
        )}
      >
        <span
          className={cn(
            "truncate flex-1 min-w-0 text-left",
            selected ? "text-slate-900 dark:text-slate-100 font-medium" : "text-zinc-400 dark:text-zinc-500"
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: openAbove ? 6 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openAbove ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute z-50 w-full left-0 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/60 dark:shadow-black/40 py-1.5 overflow-hidden max-h-60 overflow-y-auto",
              openAbove ? "bottom-full mb-2" : "top-full mt-2"
            )}
          >
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left",
                    "transition-colors cursor-pointer",
                    isActive
                      ? variant === "fidelis-brown"
                        ? "bg-fidelis-brown/10 text-fidelis-brown font-semibold"
                        : "bg-[#EAF2FE] text-[#0754C6] font-semibold"
                      : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60"
                  )}
                >
                  <span className="truncate flex-1 min-w-0">{opt.label}</span>
                  {isActive && (
                    <Check
                      className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        variant === "fidelis-brown" ? "text-fidelis-brown" : "text-[#0754C6]"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
