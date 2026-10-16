"use client";

import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseValue(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function formatDisplay(value: string): string {
  const d = parseValue(value);
  if (!d) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select a date",
  minDate,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openAbove, setOpenAbove] = React.useState(false);
  const [alignRight, setAlignRight] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ?? today;

  const selected = parseValue(value);
  const [viewYear, setViewYear] = React.useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(selected?.getMonth() ?? today.getMonth());

  const checkPlacement = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const minNeededHeight = 350;
    setOpenAbove(spaceBelow < minNeededHeight && spaceAbove > spaceBelow);
    setAlignRight(rect.left + 288 > window.innerWidth && rect.right >= 288);
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

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleSelect = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(toYMD(d));
    setOpen(false);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < min;
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const t = new Date();
    return t.getFullYear() === viewYear && t.getMonth() === viewMonth && t.getDate() === day;
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "rounded-xl border border-slate-200/90 px-4 py-3 text-sm bg-white",
          "focus:outline-none focus:border-[#0754C6] focus:ring-1 focus:ring-[#0754C6]",
          "transition-colors cursor-pointer text-left",
          open && "border-[#0754C6] ring-1 ring-[#0754C6]"
        )}
      >
        <span
          className={cn(
            "flex items-center gap-2 truncate flex-1 min-w-0 text-left",
            value ? "text-slate-900 font-medium" : "text-slate-400"
          )}
        >
          <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate">{value ? formatDisplay(value) : placeholder}</span>
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
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
              "absolute z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-4",
              openAbove ? "bottom-full mb-2" : "top-full mt-2",
              alignRight ? "right-0" : "left-0"
            )}
          >
            {/* Month / Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600" />
              </button>
              <span className="text-sm font-semibold text-slate-900">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[11px] font-semibold text-slate-400 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, idx) => {
                if (day === null) return <div key={`empty-${idx}`} />;
                const disabled = isDisabled(day);
                const sel = isSelected(day);
                const tod = isToday(day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelect(day)}
                    className={cn(
                      "h-9 w-full rounded-full text-sm font-medium transition-all cursor-pointer",
                      "flex items-center justify-center",
                      disabled && "text-slate-300 cursor-not-allowed",
                      !disabled && !sel && "text-slate-700 hover:bg-[#0754C6]/10 hover:text-[#0754C6]",
                      tod && !sel && "font-bold text-[#0754C6]",
                      sel && "bg-[#0754C6] text-white shadow-sm shadow-[#0754C6]/30"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Today shortcut */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onChange(toYMD(today));
                  setViewYear(today.getFullYear());
                  setViewMonth(today.getMonth());
                  setOpen(false);
                }}
                className="text-xs font-semibold text-[#0754C6] hover:underline cursor-pointer"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
