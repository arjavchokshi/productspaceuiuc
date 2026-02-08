"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import RollingText from "@/components/RollingText";

const CARDS = [
  {
    title: "Fellowship",
    href: "#our-mission",
    description:
      "Join our core program to learn product strategy, user research, and execution, then apply it to projects and careers in PM, PMM, and Product Design.",
    image: "/logos/fellowship.jpeg",
    bg: "bg-violet-50",
  },
  {
    title: "Projects",
    href: "#projects",
    description:
      "Ship real products with teams. Work on semester-long initiatives with companies and peers to build your portfolio and impact.",
    image: "/logos/projects.JPG",
    bg: "bg-blue-50",
  },
  {
    title: "Hackathon",
    href: "#hackathon",
    description:
      "Build and compete. Our hackathon brings together product, design, and engineering for a weekend of building and judging.",
    image: "/logos/hackathon.png",
    bg: "bg-amber-50",
  },
];

const BG_COLORS: Record<string, string> = {
  "bg-violet-50": "#f5f3ff",
  "bg-blue-50": "#eff6ff",
  "bg-amber-50": "#fffbeb",
};

function CardContent({ card }: { card: (typeof CARDS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={card.href}
      className={`block ${card.bg} overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-shadow duration-300 border border-black/5 rounded-3xl`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-[20rem]">
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
            {card.title}
          </h3>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            {card.description}
          </p>
          <span className="mt-4 inline-block text-blue-600 underline underline-offset-2 font-medium hover:text-blue-700 transition-colors">
            <RollingText
              text={`Explore ${card.title} →`}
              animate={hovered}
              transition={{ duration: 0.12, delay: 0.02, ease: "easeOut" }}
              className="inline-block"
            />
          </span>
        </div>
        <div className="relative min-h-[200px] md:min-h-0">
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
          {/* Gradient blur fade from bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${BG_COLORS[card.bg]} 0%, transparent 60%)`,
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function WhatDoWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="relative w-full bg-[#e5e3e0] pt-8 md:pt-12 pb-8"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-4"
        >
          What We Do
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-base md:text-lg text-black/80 leading-relaxed text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          Three ways to get involved—each designed to sharpen a different edge of
          product thinking.
        </motion.p>

        <ScrollStack stickyTopVh={15}>
          {CARDS.map((card) => (
            <ScrollStackItem key={card.title}>
              <CardContent card={card} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
