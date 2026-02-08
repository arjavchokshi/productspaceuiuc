"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import RollingText from "@/components/RollingText";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const HIGHLIGHTS = [
  {
    stat: "48",
    unit: "hrs",
    label: "of building",
  },
  {
    stat: "200+",
    unit: "",
    label: "participants",
  },
  {
    stat: "10+",
    unit: "",
    label: "industry sponsors",
  },
];

export default function HackathonPage() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/logos/hackathon.png"
            alt="Hackathon"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pb-12 md:pb-20 w-full"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4"
          >
            Hackathon
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-6"
          >
            Our hackathon brings together product, design, and engineering for a
            weekend of building and judging. Ship something real in 48 hours.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="https://product-space-uiuc.kit.com/6fe917e91b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white/70 underline underline-offset-4 font-medium hover:text-white transition-colors"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            <RollingText
              text="Join Mailing List →"
              animate={ctaHovered}
              transition={{ duration: 0.12, delay: 0.02, ease: "easeOut" }}
              className="inline-block"
            />
          </motion.a>
        </motion.div>
      </section>

      {/* ── Stats strip ── */}
      <section className="w-full bg-black py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-3 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  ...fadeUp,
                  visible: {
                    ...fadeUp.visible,
                    transition: {
                      ...fadeUp.visible.transition,
                      delay: i * 0.1,
                    },
                  },
                }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-white leading-none">
                  {h.stat}
                  {h.unit && (
                    <span className="text-lg md:text-xl font-bold tracking-tight text-violet-400 ml-1">
                      {h.unit}
                    </span>
                  )}
                </p>
                <p className="text-sm md:text-base text-white/40 mt-2 font-medium">
                  {h.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Details ── */}
      <section className="w-full bg-[#e5e3e0] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              ...fadeUp,
              visible: {
                ...fadeUp.visible,
                transition: { ...fadeUp.visible.transition, delay: 0.1 },
              },
            }}
            className="text-base md:text-lg font-medium text-black/70 leading-relaxed text-center max-w-2xl mx-auto mb-14"
          >
            Form a team, pick a track, and build something that solves a real
            problem — all in one weekend.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Form Teams",
                desc: "Find your crew or get matched. Cross-functional teams of 3–5 across product, design, and engineering.",
              },
              {
                step: "02",
                title: "Build",
                desc: "48 hours of hacking with mentorship, workshops, and all the caffeine you need.",
              },
              {
                step: "03",
                title: "Ship & Present",
                desc: "Demo to judges from top companies. Win prizes and get your work in front of real decision-makers.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  ...fadeUp,
                  visible: {
                    ...fadeUp.visible,
                    transition: {
                      ...fadeUp.visible.transition,
                      delay: i * 0.1,
                    },
                  },
                }}
                className="group p-7 md:p-8 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 border border-black/5"
              >
                <p className="text-4xl font-black text-violet-500/20 mb-4">
                  {card.step}
                </p>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-2 group-hover:text-violet-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-base font-medium text-black/70 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-black py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Stay in the Loop
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              ...fadeUp,
              visible: {
                ...fadeUp.visible,
                transition: { ...fadeUp.visible.transition, delay: 0.1 },
              },
            }}
            className="text-base md:text-lg text-white/40 leading-relaxed mb-8"
          >
            Be the first to know when registration opens.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              ...fadeUp,
              visible: {
                ...fadeUp.visible,
                transition: { ...fadeUp.visible.transition, delay: 0.2 },
              },
            }}
          >
            <a
              href="https://product-space-uiuc.kit.com/6fe917e91b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black font-bold tracking-tight px-10 py-4 rounded-full text-lg hover:bg-white/90 transition-colors"
            >
              Join Mailing List
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
