"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  showCount?: boolean;
  variant?: "default" | "primary";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      id,
      maxLength,
      value,
      defaultValue,
      onChange,
      showCount = false,
      required,
      disabled,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const [charLength, setCharLength] = React.useState<number>(
      value
        ? String(value).length
        : defaultValue
        ? String(defaultValue).length
        : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharLength(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {showCount && maxLength && (
            <span className="text-[11px] text-zinc-400">
              {charLength}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          className={cn(
            "w-full min-h-[110px] p-3.5 text-sm rounded-xl transition-all duration-200 outline-none resize-y",
            "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100",
            "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
            variant === "primary"
              ? "focus:border-[#00ABF0] dark:focus:border-[#00ABF0] focus:ring-2 focus:ring-[#0754C6]/20"
              : "focus:border-[#0754C6] dark:focus:border-[#0754C6] focus:ring-2 focus:ring-[#0754C6]/15",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800/50",
            error
              ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-100"
              : undefined,
            className
          )}
          {...props}
        />

        {error ? (
          <p
            id={`${textareaId}-error`}
            className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p
            id={`${textareaId}-helper`}
            className="text-xs text-zinc-500 dark:text-zinc-400"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
