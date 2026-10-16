import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Admin Portal | Dangracif Homes",
  description: "Executive Management Portal for Fidelis Court and Dangracif Homes",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#064456] selection:text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#053B4B",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.15)",
          },
        }}
      />
      {children}
    </div>
  );
}
