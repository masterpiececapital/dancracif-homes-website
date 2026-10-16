import { twMerge } from "tailwind-merge";

export type ClassValue =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassValue[];

function resolveClasses(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = resolveClasses(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ").trim();
}

/**
 * Merges class names with tailwind-merge so conflicting
 * Tailwind utilities are properly resolved (last one wins).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(resolveClasses(...inputs));
}
