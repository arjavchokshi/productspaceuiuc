"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";
import RollingText from "@/components/RollingText";

const PILLARS = [
  {
    title: "Hands-On Experience",
    description:
      "Work on team projects, tackling genuine product challenges. You'll leave with resume-ready experience and a story to share in interviews.",
  },
  {
    title: "Interview Preparation",
    description:
      "Weekly mock interviews, case practice, and feedback sharpen your ability to think on your feet. By the end, you'll have the confidence and structure to ace PM interviews.",
  },
  {
    title: "Community & Growth",
    description:
      "Join a supportive network of fellows, mentors, and alumni. From coffee chats and socials to career workshops, you'll gain friendships, mentorship, and connections that last beyond the semester.",
  },
];

const FAQ = [
  {
    question: "Who is the fellowship for?",
    answer:
      "The fellowship is open to students interested in product management — no prior experience required. We're looking for curious, motivated people who want to learn and grow.",
  },
  {
    question: "What will I actually do as a fellow?",
    answer:
      "You'll attend weekly workshops, work on a real client project, and complete mock interviews and assignments to build PM skills. Along the way, you'll also take part in professional development and social activities.",
  },
  {
    question: "Where have past fellows gone after the program?",
    answer:
      "Our alumni have landed internships and full-time roles at Meta, Google, Microsoft, Apple, Amazon, and other top tech companies. The fellowship helps you stand out in recruiting with real experience and proven skills.",
  },
];

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

export default function FellowshipPage() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/logos/fellowship.jpeg"
            alt="Fellowship"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        {/* Hero content over image */}
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
            PM Bootcamp
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-6"
          >
            Equipping students with the skills, experience, and confidence to
            break into product management through workshops, team projects, and
            mentorship.
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

      {/* ── What We Do / Pillars ── */}
      <section className="w-full bg-[#e5e3e0] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center mb-4"
          >
            What You&apos;ll Get
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
            className="text-base md:text-lg text-black/70 leading-relaxed text-center max-w-2xl mx-auto mb-10"
          >
            Three pillars that make the fellowship more than just a course.
          </motion.p>

          <div className="space-y-0 divide-y divide-black/10">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
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
                className="group flex items-start gap-6 py-8 first:pt-0 last:pb-0"
              >
                <span className="text-3xl md:text-4xl font-black text-black/10 leading-none shrink-0 w-12 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-1 group-hover:text-violet-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-base text-black/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#e5e3e0] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center mb-10"
          >
            FAQ
          </motion.h2>

          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <motion.details
                key={item.question}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
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
                className="group p-6 rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-black/5 cursor-pointer"
              >
                <summary className="text-lg font-bold tracking-tight text-black list-none flex items-center justify-between">
                  {item.question}
                  <span className="ml-4 text-black/40 group-open:rotate-45 transition-transform duration-200 text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base text-black/70 leading-relaxed">
                  {item.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-black py-12 md:py-16">
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
            Get notified when applications open for the next cohort.
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
