"use client";

import * as React from "react";

type SiteImageOverrides = Record<string, string>;

const SiteImagesContext = React.createContext<{
  overrides: SiteImageOverrides;
  brochureUrl: string;
}>({ overrides: {}, brochureUrl: "" });

export function SiteImagesProvider({
  overrides,
  brochureUrl,
  children,
}: {
  overrides: SiteImageOverrides;
  brochureUrl: string;
  children: React.ReactNode;
}) {
  return (
    <SiteImagesContext.Provider value={{ overrides, brochureUrl }}>
      {children}
    </SiteImagesContext.Provider>
  );
}

export function useSiteImage(src: string) {
  const { overrides } = React.useContext(SiteImagesContext);
  return overrides[src] || src;
}

export function useSiteImageResolver() {
  const { overrides } = React.useContext(SiteImagesContext);
  return React.useCallback(
    (src: string) => overrides[src] || src,
    [overrides]
  );
}

export function useBrochureUrl() {
  const { brochureUrl } = React.useContext(SiteImagesContext);
  return brochureUrl || "/downloads/fidelis-court-brochure.pdf";
}
