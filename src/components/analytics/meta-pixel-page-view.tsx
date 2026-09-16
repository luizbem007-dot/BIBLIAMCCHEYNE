"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function MetaPixelPageView() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      window.fbq?.("track", "PageView");
      previousPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
