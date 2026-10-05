"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useEffect } from "react";

type Skiper28Props = {
  children: React.ReactNode;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function updateScrollZoom() {
  const viewportHeight = window.innerHeight;

  document.querySelectorAll<HTMLElement>(".rv").forEach((element) => {
    const rect = element.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
    const progress = clamp(distance / (viewportHeight * 0.7), 0, 1);
    element.style.setProperty("--skiper-scale", (1 - progress * 0.12).toFixed(3));
  });

}

const Skiper28 = ({ children }: Skiper28Props) => {
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", updateScrollZoom);
  useEffect(() => {
    updateScrollZoom();
    window.addEventListener("resize", updateScrollZoom);
    return () => window.removeEventListener("resize", updateScrollZoom);
  }, []);

  return <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>{children}</ReactLenis>;
};

export { Skiper28 };

/**
 * Skiper 28 PerspectiveTextScroll — React + framer motion + lenis
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
