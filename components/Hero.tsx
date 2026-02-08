"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import RollingText from "@/components/RollingText";

const Cubes = dynamic(() => import("@/components/Cubes"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[200px] bg-transparent" aria-hidden />
  ),
});

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mql.matches);
    const listener = () => setIsMobile(mql.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);
  return isMobile;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeContainerRef = useRef<HTMLDivElement>(null);
  const [exploreHovered, setExploreHovered] = useState(false);
  const [cubesInView, setCubesInView] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCubesInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background — white */}
      <div
        className="absolute inset-0 z-[-1] bg-[#f5f3ff]"
        aria-hidden
      />

      {/* Full-screen grid of cubes — only render when in view */}
      <div
        ref={cubeContainerRef}
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden
      >
        {cubesInView && (
          <Cubes
            containerRef={cubeContainerRef}
            className="h-full w-full"
            gridSize={12}
            maxAngle={45}
            radius={6}
            cellGap={2}
            borderStyle="1px dotted #7c3aed"
            faceColor="transparent"
            rippleColor="#7c3aed"
            rippleSpeed={1.5}
            logoSrc="/logo.png"
            autoAnimate
            rippleOnClick
          />
        )}
      </div>

      {/* Gradient blur from bottom — lighter blur on mobile for performance */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none overflow-hidden"
        style={{
          height: "75%",
          backdropFilter: isMobile ? "blur(20px)" : "blur(60px)",
          WebkitBackdropFilter: isMobile ? "blur(20px)" : "blur(60px)",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
        aria-hidden
      >
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* PS_Text + UIUC: logo and subtitle */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 top-0 flex flex-col items-center min-w-0 px-6 gap-2"
          style={{
            paddingTop: "calc((100vh - var(--nav-height)) / 18 - 1px + 2.5rem)",
          }}
        >
          <motion.img
            variants={item}
            src="/PS_Text.png"
            alt="PRODUCT SPACE"
            className="object-contain object-top w-auto max-w-[90vw] h-auto"
            style={{
              maxHeight: "calc((100vh - var(--nav-height)) * 2 / 18 + 2px)",
            }}
          />
          <motion.p
            variants={item}
            className="font-bold text-black/80 text-center leading-tight"
            style={{
              fontSize: "clamp(0.9rem, 3vh, 1.25rem)",
            }}
          >
            University of Illinois Urbana-Champaign
          </motion.p>
        </motion.div>

        {/* Blurb + Explore: bottom left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-10 md:right-auto max-w-xl flex flex-col gap-3 pointer-events-auto"
        >
          <motion.p
            variants={item}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-black/90 leading-relaxed"
          >
            A student-led initiative building the next generation of product
            thinkers, designers, and builders at the University of Illinois.
          </motion.p>
          <motion.span
            variants={item}
            className="purple-gradient-button group inline-block w-fit"
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="blurred-border">
              <a
                href="#our-mission"
                className="explore-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2"
                onMouseEnter={() => setExploreHovered(true)}
                onMouseLeave={() => setExploreHovered(false)}
              >
                <span className="explore-text">
                  <RollingText
                    text="Explore"
                    animate={exploreHovered}
                    transition={{ duration: 0.12, delay: 0.02, ease: "easeOut" }}
                    className="inline-block"
                  />
                </span>
              </a>
            </span>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
