"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  minDate?: Date;
  className?: string;
  variant?: "default" | "primary";
}

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  variant?: "default" | "primary";
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

export function parseDatePickerValue(value: string): string {
  if (!value) return "";
  const isoDate = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const parsed = isoDate
    ? new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]))
    : new Date(value);
  return isNaN(parsed.getTime()) ? "" : toYMD(parsed);
}

export function formatDatePickerValue(
  value: string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  const parsedValue = parseDatePickerValue(value);
  const date = parseValue(parsedValue);
  return date ? date.toLocaleDateString("en-US", options) : "";
}

function parseRangeDate(value: string): Date | null {
  const isExactDate =
    /^\d{4}-\d{2}-\d{2}$/.test(value) ||
    /^[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4}$/.test(value) ||
    /^\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}$/.test(value);
  if (!isExactDate) return null;

  const parsedValue = parseDatePickerValue(value);
  return parsedValue ? parseValue(parsedValue) : null;
}

function parseRangeValue(value: string): { start: Date | null; end: Date | null } {
  const range = value.split(/\s+(?:–|—|to|-)\s+/i);
  if (range.length === 2) {
    return { start: parseRangeDate(range[0]), end: parseRangeDate(range[1]) };
  }

  const date = parseRangeDate(value);
  return { start: date, end: null };
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  required,
  placeholder = "Select a date",
  minDate,
  className,
  variant = "default",
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
          variant === "primary"
            ? "focus:outline-none focus:border-[#00ABF0] focus:ring-2 focus:ring-[#0754C6]/20"
            : "focus:outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15",
          "transition-all cursor-pointer text-left",
          open && (
            variant === "primary"
              ? "border-[#00ABF0] ring-2 ring-[#00ABF0]/20"
              : "border-[#0754C6] ring-2 ring-[#0754C6]/15"
          )
        )}
      >
        <span
          className={cn(
            "flex items-center gap-2 truncate flex-1 min-w-0 text-left",
            value ? "text-slate-900 dark:text-slate-100 font-medium" : "text-zinc-400 dark:text-zinc-500"
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
              "absolute z-50 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/60 dark:shadow-black/40 p-4",
              openAbove ? "bottom-full mb-2" : "top-full mt-2",
              alignRight ? "right-0" : "left-0"
            )}
          >
            {/* Month / Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
              </button>
              <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
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
                      disabled && "text-slate-300 dark:text-zinc-600 cursor-not-allowed",
                      !disabled && !sel && (
                        variant === "primary"
                          ? "text-slate-700 dark:text-zinc-200 hover:bg-[#00ABF0]/10 hover:text-[#00ABF0]"
                          : "text-slate-700 dark:text-zinc-200 hover:bg-[#00ABF0]/10 hover:text-[#00ABF0]"
                      ),
                      tod && !sel && (
                        variant === "primary"
                          ? "font-bold text-[#00ABF0]"
                          : "font-bold text-[#00ABF0]"
                      ),
                      sel && (
                        variant === "primary"
                          ? "bg-[#0754C6] text-white shadow-sm shadow-[#0754C6]/30"
                          : "bg-[#0754C6] text-white shadow-sm shadow-[#0754C6]/30"
                      )
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Today shortcut */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onChange(toYMD(today));
                  setViewYear(today.getFullYear());
                  setViewMonth(today.getMonth());
                  setOpen(false);
                }}
                className={cn(
                  "text-xs font-semibold hover:underline cursor-pointer",
                  variant === "primary" ? "text-[#00ABF0]" : "text-[#00ABF0]"
                )}
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

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  label,
  required,
  placeholder = "Select a date range",
  className,
  variant = "default",
}) => {
  const initialRange = parseRangeValue(value);
  const [open, setOpen] = React.useState(false);
  const [openAbove, setOpenAbove] = React.useState(false);
  const [popupPosition, setPopupPosition] = React.useState({ top: 0, left: 0 });
  const [startDate, setStartDate] = React.useState<Date | null>(initialRange.start);
  const [endDate, setEndDate] = React.useState<Date | null>(initialRange.end);
  const ref = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = React.useState(
    initialRange.start?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = React.useState(
    initialRange.start?.getMonth() ?? today.getMonth()
  );

  const checkPlacement = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const shouldOpenAbove = spaceBelow < 350 && spaceAbove > spaceBelow;
    const popupWidth = Math.min(288, window.innerWidth - 32);
    const popupHeight = Math.min(350, window.innerHeight - 32);
    const maxTop = Math.max(16, window.innerHeight - popupHeight - 16);
    setOpenAbove(shouldOpenAbove);
    setPopupPosition({
      top: Math.max(
        16,
        Math.min(
          shouldOpenAbove
            ? rect.top - popupHeight - 8
            : rect.bottom + 8,
          maxTop
        )
      ),
      left: Math.max(
        16,
        Math.min(rect.left, window.innerWidth - popupWidth - 16)
      ),
    });
  }, []);

  const handleToggle = () => {
    if (!open) checkPlacement();
    setOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !ref.current?.contains(target) &&
        !popupRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handlePlacement = () => checkPlacement();
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    document.addEventListener("scroll", handlePlacement, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handlePlacement, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("scroll", handlePlacement, true);
      window.removeEventListener("resize", handlePlacement);
    };
  }, [open, checkPlacement]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : index - firstDay + 1
  );

  const handleSelect = (day: number) => {
    const chosenDate = new Date(viewYear, viewMonth, day);
    if (!startDate || endDate) {
      setStartDate(chosenDate);
      setEndDate(null);
      onChange(formatDisplay(toYMD(chosenDate)));
      return;
    }

    const [start, end] =
      chosenDate < startDate ? [chosenDate, startDate] : [startDate, chosenDate];
    setStartDate(start);
    setEndDate(end);
    onChange(
      `${formatDisplay(toYMD(start))} – ${formatDisplay(toYMD(end))}`
    );
    setOpen(false);
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(viewYear, viewMonth, day);
    return date >= startDate && date <= endDate;
  };
  const isToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };
  const displayValue = startDate
    ? endDate
      ? `${formatDisplay(toYMD(startDate))} – ${formatDisplay(toYMD(endDate))}`
      : formatDisplay(toYMD(startDate))
    : value;

  return (
    <div ref={ref} className={cn("relative w-full flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          "w-full h-11 flex items-center justify-between gap-2",
          "rounded-xl border border-zinc-200 dark:border-zinc-700 px-3.5 text-sm bg-white dark:bg-zinc-900",
          variant === "primary"
            ? "focus:outline-none focus:border-[#00ABF0] focus:ring-2 focus:ring-[#0754C6]/20"
            : "focus:outline-none focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15",
          "transition-all cursor-pointer text-left",
          open &&
            (variant === "primary"
              ? "border-[#00ABF0] ring-2 ring-[#00ABF0]/20"
              : "border-[#0754C6] ring-2 ring-[#0754C6]/15")
        )}
      >
        <span
          className={cn(
            "flex items-center gap-2 truncate flex-1 min-w-0 text-left",
            displayValue
              ? "text-slate-900 dark:text-slate-100 font-medium"
              : "text-zinc-400 dark:text-zinc-500"
          )}
        >
          <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate">{displayValue || placeholder}</span>
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
        </motion.div>
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={popupRef}
                initial={{ opacity: 0, y: openAbove ? 6 : -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: openAbove ? 6 : -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: popupPosition.top,
                  left: popupPosition.left,
                  maxHeight: "calc(100vh - 2rem)",
                  overflowY: "auto",
                }}
                className="z-[100] w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/60 dark:shadow-black/40 p-4"
              >
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => {
                  if (viewMonth === 0) {
                    setViewMonth(11);
                    setViewYear((year) => year - 1);
                  } else {
                    setViewMonth((month) => month - 1);
                  }
                }}
                aria-label="Previous month"
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
              </button>
              <span className="text-sm font-semibold text-slate-900 dark:text-zinc-100">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (viewMonth === 11) {
                    setViewMonth(0);
                    setViewYear((year) => year + 1);
                  } else {
                    setViewMonth((month) => month + 1);
                  }
                }}
                aria-label="Next month"
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
              </button>
            </div>

            <p className="mb-3 text-center text-xs text-slate-500">
              {!startDate || endDate ? "Choose a start date" : "Choose an end date"}
            </p>

            <div className="grid grid-cols-7 mb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-[11px] font-semibold text-slate-400 py-1"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, index) => {
                if (day === null) return <div key={`empty-${index}`} />;
                const date = new Date(viewYear, viewMonth, day);
                const isEndpoint =
                  (startDate?.getTime() === date.getTime()) ||
                  (endDate?.getTime() === date.getTime());
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelect(day)}
                    aria-label={date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    className={cn(
                      "h-9 w-full flex items-center justify-center text-sm font-medium transition-colors cursor-pointer",
                      isEndpoint
                        ? "rounded-full bg-[#0754C6] text-white"
                        : isInRange(day)
                          ? "bg-[#EAF2FE] text-[#0754C6]"
                          : "rounded-full text-slate-700 dark:text-zinc-200 hover:bg-[#00ABF0]/10 hover:text-[#00ABF0]",
                      isToday(day) && !isEndpoint && "font-bold text-[#00ABF0]"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
