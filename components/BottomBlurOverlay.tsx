"use client";

import GradualBlur from "@/components/GradualBlur";

/**
 * Fixed blur at the bottom of the viewport. Content de-blurs as it
 * scrolls up and leaves the blur zone.
 */
export default function BottomBlurOverlay() {
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="4rem"
      strength={2.5}
      divCount={6}
      curve="bezier"
      exponential
      opacity={1}
    />
  );
}
