"use client";

import React, { type ReactNode } from "react";
import "./ScrollStack.css";

export function ScrollStackItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`scroll-stack-card ${className}`.trim()}>{children}</div>
  );
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  /** vh from top of viewport where cards pin */
  stickyTopVh?: number;
  /** vh of scroll distance between cards */
  runwayVh?: number;
}

export default function ScrollStack({
  children,
  className = "",
  stickyTopVh = 15,
  runwayVh = 50,
}: ScrollStackProps) {
  const items = React.Children.toArray(children);

  return (
    <div className={`scroll-stack-wrapper ${className}`.trim()}>
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {/* The sticky card */}
          <div
            className="scroll-stack-sticky"
            style={{
              position: "sticky",
              top: `${stickyTopVh}vh`,
              zIndex: i + 1,
            }}
          >
            {child}
          </div>
          {/* Spacer between cards */}
          {i < items.length - 1 && (
            <div style={{ height: `${runwayVh}vh` }} />
          )}
        </React.Fragment>
      ))}
      {/* Extra runway after last card so it stays pinned a bit */}
      <div style={{ height: `${runwayVh}vh` }} />
    </div>
  );
}
