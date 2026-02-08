"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

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

/* Large text where each word fills in as you scroll, driven by a shared progress */
function ScrollFillText({
  text,
  className = "",
  progress,
  rangeStart,
  rangeEnd,
}: {
  text: string;
  className?: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  rangeStart: number;
  rangeEnd: number;
}) {
  const words = text.split(" ");

  return (
    <p className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        // Map each word within this paragraph's slice of the overall progress
        const wordStart = rangeStart + (i / words.length) * (rangeEnd - rangeStart);
        const wordEnd = rangeStart + ((i + 1) / words.length) * (rangeEnd - rangeStart);
        return (
          <ScrollFillWord
            key={`${word}-${i}`}
            word={word}
            progress={progress}
            start={wordStart}
            end={wordEnd}
          />
        );
      })}
    </p>
  );
}

function ScrollFillWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollFillSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Three paragraphs fill in sequentially: 0–0.4, 0.4–0.6, 0.6–1.0
  return (
    <>
      {/* ── Desktop: sticky + tall scroll runway ── */}
      <div
        ref={sectionRef}
        className="relative bg-[#e5e3e0] hidden md:block"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-5xl mx-auto px-6 md:px-10 space-y-10">
            <ScrollFillText
              text="Products shape how people live. The best ones feel inevitable in hindsight. In reality, they come from hard choices, clear strategy, and people who can turn ambiguity into action."
              className="text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight"
              progress={scrollYProgress}
              rangeStart={0}
              rangeEnd={0.35}
            />
            <ScrollFillText
              text="Product Space exists to build those people."
              className="text-4xl lg:text-5xl font-black text-black leading-tight"
              progress={scrollYProgress}
              rangeStart={0.35}
              rangeEnd={0.55}
            />
            <ScrollFillText
              text="Our mission is to cultivate the next generation of product leaders by teaching product strategy and giving students a place to practice product management, product marketing, and product design."
              className="text-3xl font-bold tracking-tight text-black/70 leading-snug"
              progress={scrollYProgress}
              rangeStart={0.55}
              rangeEnd={0.9}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile: scroll fill without sticky ── */}
      <MobileScrollFillSection />
    </>
  );
}

function MobileScrollFillSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });

  return (
    <div ref={ref} className="bg-[#e5e3e0] py-16 px-6 md:hidden space-y-8">
      <ScrollFillText
        text="Products shape how people live. The best ones feel inevitable in hindsight. In reality, they come from hard choices, clear strategy, and people who can turn ambiguity into action."
              className="text-2xl font-bold tracking-tight text-black leading-tight"
        progress={scrollYProgress}
        rangeStart={0}
        rangeEnd={0.35}
      />
      <ScrollFillText
        text="Product Space exists to build those people."
        className="text-2xl font-black text-black leading-tight"
        progress={scrollYProgress}
        rangeStart={0.35}
        rangeEnd={0.55}
      />
      <ScrollFillText
        text="Our mission is to cultivate the next generation of product leaders by teaching product strategy and giving students a place to practice product management, product marketing, and product design."
              className="text-xl font-bold tracking-tight text-black/70 leading-snug"
        progress={scrollYProgress}
        rangeStart={0.55}
        rangeEnd={0.9}
      />
    </div>
  );
}

/* Expanding circle + text section */
function WhyWeExistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scale from tiny (0.05) to full (1) as you scroll through the section
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.05, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={sectionRef} className="w-full bg-[#e5e3e0]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Expanding circle column */}
          <div className="hidden md:block relative">
            <div className="sticky top-[25vh] h-[50vh] flex items-center justify-center">
              <motion.div
                style={{ scale, opacity: circleOpacity }}
                className="w-[400px] h-[400px] rounded-full bg-violet-600"
              />
            </div>
          </div>

          {/* Scrolling text column */}
          <div className="py-16 md:py-24 space-y-24">
            {/* Why */}
            <div>
              <RevealBlock>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                  Why Product Space exists
                </h2>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-4">
                  A lot of students want to break into product. Many university
                  programs still teach business, engineering, and design in
                  separate lanes. Product lives at the intersection, so
                  students end up piecing it together on their own.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  Product Space is the community we wished existed. It is built
                  for students who want real product reps and a culture that
                  takes the craft seriously.
                </p>
              </RevealBlock>
            </div>

            {/* Our story */}
            <div>
              <RevealBlock>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                  Our story
                </h2>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-4">
                  Product Space started in August 2023. It began with a small
                  group of students trying to break into product management.
                  They looked around and saw the same problem. There was no
                  campus community built for product people. So they built it.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-4">
                  It is February 2026 now. That puts us about two and a half
                  years in.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-4">
                  In that time, the growth has been obvious. Every semester,
                  interest has been higher than the last. More students show
                  up. More teams form. More projects ship. That pattern is what
                  you see when a product is working.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  We have also watched members turn into alumni who land at
                  great companies and do real work on real teams. We have
                  watched our projects become more diverse, more ambitious, and
                  more creative each semester. That momentum is what
                  keeps pushing us forward.
                </p>
              </RevealBlock>
            </div>

            {/* Mobile-only circle placeholder */}
            <div className="md:hidden flex justify-center">
              <div className="w-48 h-48 rounded-full bg-violet-600" />
            </div>

            {/* What we do */}
            <div>
              <RevealBlock>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                  What we do
                </h2>
              </RevealBlock>

              <RevealBlock delay={0.05}>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-3">
                  We teach product strategy
                </h3>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-8">
                  We focus on the thinking that makes product work. Picking the
                  right problem. Understanding users in a way that changes
                  decisions. Defining success with metrics that matter.
                  Prioritizing when everything feels urgent. Communicating
                  tradeoffs and aligning people.
                </p>
              </RevealBlock>

              <RevealBlock delay={0.05}>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-3">
                  We give people real reps
                </h3>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-8">
                  Skill comes from doing the work. Working in teams. Owning
                  decisions. Presenting reasoning. Taking feedback. Iterating
                  fast. That cycle, repeated over and over, is how you build
                  real product instinct.
                </p>
              </RevealBlock>

              <RevealBlock delay={0.05}>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black mb-3">
                  We build a community that raises standards
                </h3>
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  Product Space is a place where you can walk in and be
                  surrounded by people who are building. You get peers who
                  challenge your thinking and mentors who can sharpen your
                  judgment. That environment compounds.
                </p>
              </RevealBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Reveal words as they scroll into view */
function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Full-bleed Hero ── */}
      <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/groupphoto.jpg"
            alt="Product Space team"
            fill
            className="object-cover"
            style={{ objectPosition: "55% center" }}
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Our Mission
          </motion.h1>
        </motion.div>
      </section>

      {/* ── Opening statement — scroll fill ── */}
      <ScrollFillSection />

      {/* ── Why we exist + expanding circle ── */}
      <WhyWeExistSection />


      {/* ── Where we are going — sticky image on right ── */}
      <section className="w-full bg-[#e5e3e0] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Scrolling text */}
            <div>
              <RevealBlock>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6">
                  Where we are going
                </h2>
              </RevealBlock>
              <RevealBlock delay={0.05}>
                <p className="text-base md:text-lg text-black/70 leading-relaxed mb-4">
                  We are proud of the growth, and we see how much further this
                  can go.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.05} className="mt-4">
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  We want to build more pathways for beginners so entry into
                  product feels possible. We want deeper tracks for experienced
                  members so Product Space stays challenging. We want stronger
                  mentorship and alumni involvement so learning accelerates. We
                  want bigger projects that feel closer to the real world. We
                  want events that make product culture visible across campus.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.1} className="mt-8">
                <p className="text-base md:text-lg text-black/70 leading-relaxed">
                  There is demand. There is momentum. The next step is scale.
                </p>
              </RevealBlock>
            </div>

            {/* Sticky image */}
            <div className="hidden md:block relative">
              <div className="sticky top-[25vh] rounded-2xl overflow-hidden max-h-[50vh]">
                <Image
                  src="/logos/hackathon.png"
                  alt="Product Space hackathon"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
