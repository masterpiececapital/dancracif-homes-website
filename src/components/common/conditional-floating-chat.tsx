"use client";

import { usePathname } from "next/navigation";
import { FloatingChat } from "@/components/common/floating-chat";

export function ConditionalFloatingChat() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <FloatingChat />;
}
