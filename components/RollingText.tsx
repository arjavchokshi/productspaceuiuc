"use client";

import { motion, type Transition } from "framer-motion";
import * as React from "react";

const ENTRY_ANIMATION = {
  initial: { rotateX: 0 },
  animate: { rotateX: 90 },
};

const EXIT_ANIMATION = {
  initial: { rotateX: 90 },
  animate: { rotateX: 0 },
};

const NO_TRANSITION = { duration: 0 };

const formatCharacter = (char: string) => (char === " " ? "\u00A0" : char);

type RollingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  transition?: Transition;
  text: string;
  animate: boolean;
};

function RollingText({
  transition = { duration: 0.3, delay: 0.05, ease: "easeOut" },
  text,
  animate,
  ...props
}: RollingTextProps) {
  const characters = React.useMemo(() => text.split(""), [text]);
  const delayPerLetter = transition?.delay ?? 0.05;
  const baseDelay = (idx: number) => idx * delayPerLetter;

  return (
    <span
      data-slot="rolling-text"
      className="inline-flex"
      style={{ perspective: 9999999 }}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {characters.map((char, idx) => (
        <span
          aria-hidden="true"
          className="relative inline-block w-auto"
          key={idx}
          style={{
            transformStyle: "preserve-3d",
            perspective: 9999999,
          }}
        >
          <motion.span
            animate={animate ? ENTRY_ANIMATION.animate : ENTRY_ANIMATION.initial}
            className="absolute inline-block left-0 top-0 whitespace-nowrap"
            initial={false}
            style={{
              backfaceVisibility: "hidden",
              transformOrigin: "50% 25%",
            }}
            transition={
              animate
                ? { ...transition, delay: baseDelay(idx) }
                : NO_TRANSITION
            }
          >
            {formatCharacter(char)}
          </motion.span>
          <motion.span
            animate={animate ? EXIT_ANIMATION.animate : EXIT_ANIMATION.initial}
            className="absolute inline-block left-0 top-0 whitespace-nowrap"
            initial={false}
            style={{
              backfaceVisibility: "hidden",
              transformOrigin: "50% 100%",
            }}
            transition={
              animate
                ? { ...transition, delay: baseDelay(idx) + 0.12 }
                : NO_TRANSITION
            }
          >
            {formatCharacter(char)}
          </motion.span>
          <span className="invisible" aria-hidden="true">
            {formatCharacter(char)}
          </span>
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}

export { RollingText, type RollingTextProps };
export default RollingText;
