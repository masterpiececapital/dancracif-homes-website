"use client";

import * as React from "react";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "card" | "list";
  onChange: (view: "card" | "list") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/70">
      <button
        type="button"
        onClick={() => onChange("card")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
          view === "card"
            ? "bg-white text-[#00ABF0] shadow-2xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="Card Grid View"
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Cards</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
          view === "list"
            ? "bg-white text-[#00ABF0] shadow-2xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="Table List View"
      >
        <List className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
}
