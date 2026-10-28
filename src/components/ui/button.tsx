"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | "primary"
  | "secondary"
  | "outline"
  | "fidelis-brown-outline"
  | "fidelis-brown"
  | "ghost"
  | "danger"
  | "dark";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[#0754C6] text-white hover:bg-[#0648AB] active:bg-[#043275] shadow-sm shadow-[#0754C6]/25",
  secondary:
    "border border-[#00ABF0] bg-white text-[#00ABF0] hover:bg-[#FAFCFE] active:bg-zinc-100",
  outline:
    "border border-[#00ABF0] bg-white dark:bg-transparent text-[#00ABF0] hover:bg-blue-50/60 dark:hover:bg-blue-950/20 active:bg-blue-100/60",
  "fidelis-brown-outline":
    "border border-fidelis-brown bg-white dark:bg-transparent text-fidelis-brown hover:bg-fidelis-brown/10 active:bg-fidelis-brown/20",
  "fidelis-brown":
    "bg-fidelis-brown text-white hover:brightness-90 active:brightness-75 shadow-sm shadow-fidelis-brown/25",
  ghost:
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm shadow-red-600/20",
  dark:
    "bg-[#05142B] text-white hover:bg-[#091F40] active:bg-[#040E1E] shadow-sm",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-xs gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
  icon: "h-11 w-11 p-0 justify-center items-center",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-out select-none cursor-pointer",
          "hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 active:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          variant === "fidelis-brown" || variant === "fidelis-brown-outline"
            ? "focus-visible:ring-fidelis-brown"
            : "focus-visible:ring-[#0754C6]",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
