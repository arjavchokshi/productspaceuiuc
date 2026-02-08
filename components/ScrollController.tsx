"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function ScrollController() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.8,
      smoothWheel: true,
      autoRaf: true,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
