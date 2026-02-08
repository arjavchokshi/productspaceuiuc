"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import Footer from "@/components/Footer";
import RollingText from "@/components/RollingText";

const SERVICES = [
  {
    title: "UI/UX Design",
    description:
      "High-fidelity mockups and prototypes that set the bar for product teams.",
  },
  {
    title: "Market Research",
    description:
      "Competitive analysis, user interviews, and data-driven insights.",
  },
  {
    title: "GTM Strategy",
    description:
      "Go-to-market plans that founders and product teams can act on immediately.",
  },
  {
    title: "Data Analysis",
    description:
      "Metrics frameworks, dashboards, and actionable product analytics.",
  },
];

const TESTIMONIAL = {
  quote:
    "We use and rely on the functional specs and PRDs every week. Their high-fidelity Figma mockups set the bar for every new design and feature that followed.",
  author: "Jeremy Lam",
  role: "CEO, VenuAI",
};

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

const CLIENT_LOGOS = [
  { file: "venu.avif", name: "VenuAI" },
  { file: "circle.avif", name: "Circle" },
  { file: "courie.avif", name: "Courie" },
  { file: "et.avif", name: "ET" },
  { file: "hatch.avif", name: "Hatch" },
  { file: "sakura.avif", name: "Sakura" },
  { file: "truleo.avif", name: "Truleo" },
  { file: "vouch.avif", name: "Vouch" },
];

function ClientCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(trackRef.current, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (tweenRef.current)
      gsap.to(tweenRef.current, { timeScale: 0.3, duration: 0.5, ease: "power2.out" });
  };

  const handleLeave = () => {
    if (tweenRef.current)
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, ease: "power2.out" });
  };

  // Duplicate logos for seamless loop
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div
      className="overflow-hidden relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div ref={trackRef} className="flex gap-16 w-max">
        {logos.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex items-center justify-center shrink-0"
          >
            <img
              src={`/logos/client_logos/${client.file}`}
              alt={client.name}
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/logos/projects.JPG"
            alt="Projects"
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
          <motion.p
            variants={fadeUp}
            className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3"
          >
            Semester-Long Collaborations
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
          >
            Client Projects
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mb-6"
          >
            Our student teams partner with tech companies to tackle real-world
            business challenges — from user research and product roadmapping to
            go-to-market strategy and design.
          </motion.p>
          <motion.a
            variants={fadeUp}
            href="https://product-space-uiuc.kit.com/6fe917e91b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white/90 underline underline-offset-4 font-medium hover:text-white transition-colors"
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

      {/* ── Our Services ── */}
      <section className="w-full bg-[#e5e3e0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-4"
          >
            Our Services
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
            className="text-base md:text-lg text-black/80 leading-relaxed text-center max-w-2xl mx-auto mb-10"
          >
            End-to-end product work — from running user interviews to shaping
            product strategy and building clear roadmaps.
          </motion.p>

          <div className="space-y-0 divide-y divide-black/10">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  ...fadeUp,
                  visible: {
                    ...fadeUp.visible,
                    transition: {
                      ...fadeUp.visible.transition,
                      delay: i * 0.08,
                    },
                  },
                }}
                className="group flex items-start gap-6 py-8 first:pt-0 last:pb-0"
              >
                <span className="text-3xl md:text-4xl font-black text-black/10 leading-none shrink-0 w-12 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-1 group-hover:text-violet-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-black/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Clients ── */}
      <section className="w-full bg-[#e5e3e0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-10"
          >
            Past Clients
          </motion.h2>

          <ClientCarousel />
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="w-full bg-black py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <svg
              className="w-10 h-10 text-violet-400 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>
          <motion.blockquote
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
            className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6"
          >
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </motion.blockquote>
          <motion.p
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
            className="text-base text-white/50 font-medium"
          >
            {TESTIMONIAL.author} — {TESTIMONIAL.role}
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#e5e3e0] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4"
          >
            Want to Work With Us?
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
            className="text-base md:text-lg text-black/60 leading-relaxed mb-8"
          >
            Have a product challenge your team is tackling? We&apos;d love to
            partner with you.
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
              href="mailto:productspaceuiuc@gmail.com?subject=Interested%20in%20Working%20With%20Product%20Space"
              className="inline-block bg-black text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-black/80 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
