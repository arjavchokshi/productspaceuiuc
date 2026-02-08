"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import RollingText from "@/components/RollingText";
import "./FellowshipSection.css";

export default function FellowshipSection() {
  const [missionLinkHovered, setMissionLinkHovered] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 45,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMarqueeEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.5, ease: "power2.out" });
    }
  };

  const handleMarqueeLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <section
      id="our-mission"
      className="relative w-full bg-[#e5e3e0] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto px-6 md:px-10">
        {/* Blurb + image layout */}
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.05 },
              },
            }}
            className="space-y-5"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight"
            >
              The Next Generation of Product Leaders
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
              className="text-base md:text-lg text-black/70 leading-relaxed"
            >
              We teach students the strategy, tradeoffs, and execution that
              define great product work during fellowship. Then they put it
              into practice through real client projects that prepare them
              1:1 for a product job.
            </motion.p>
            <motion.a
              href="/about"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
              className="inline-block text-violet-700 underline underline-offset-2 font-medium hover:text-violet-800 transition-colors"
              onMouseEnter={() => setMissionLinkHovered(true)}
              onMouseLeave={() => setMissionLinkHovered(false)}
            >
              <RollingText
                text="Our Mission →"
                animate={missionLinkHovered}
                transition={{ duration: 0.12, delay: 0.02, ease: "easeOut" }}
                className="inline-block"
              />
            </motion.a>
          </motion.div>

          {/* Group photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="flex items-center justify-center w-full"
          >
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <Image
                src="/groupphoto.jpg"
                alt="Product Space group"
                fill
                className="object-cover"
                style={{ objectPosition: "55% center" }}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Giant scrolling text */}
      <div
        className="mt-16 md:mt-24 overflow-hidden"
        onMouseEnter={handleMarqueeEnter}
        onMouseLeave={handleMarqueeLeave}
      >
        <div className="marquee-track">
          <div ref={marqueeRef} className="marquee-inner">
          <div className="marquee-content">
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep" aria-hidden>●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep" aria-hidden>●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep" aria-hidden>●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep" aria-hidden>●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep" aria-hidden>●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep" aria-hidden>●</span>
          </div>
          <div className="marquee-content" aria-hidden>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep">●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep">●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep">●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep">●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep">●</span>
            <span className="marquee-text">ALL MAJORS WELCOME</span>
            <span className="marquee-sep">●</span>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
