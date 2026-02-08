"use client";

import { motion } from "framer-motion";
import "./WhereWeGoSection.css";

const LOGO_FILES = [
  "accenture.png",
  "apple.png",
  "bcg.png",
  "blackrock.png",
  "cisco.png",
  "ey.png",
  "google.png",
  "ibm.png",
  "meta.png",
  "microsoft.png",
  "pwc.png",
  "Rivian-Logo.png",
  "robinhood.png",
  "spacex.png",
  "statefarm.png",
  "synchrony.png",
  "TikTok-Logomark&Wordmark-Vertical-Logo.wine.svg",
  "uber.png",
  "united.png",
  "visa.png",
];

const LOGO_SIZE = 64;

const EXTERNAL_LOGO_URLS: Record<string, string> = {
  "apple.png": "/api/logo/apple",
};

const BIG_LOGO_FILES = new Set([
  "united.png",
  "microsoft.png",
  "blackrock.png",
  "spacex.png",
  "accenture.png",
  "TikTok-Logomark&Wordmark-Vertical-Logo.wine.svg",
  "Rivian-Logo.png",
]);
const EXTRA_BIG_LOGO_FILES = new Set(["robinhood.png", "synchrony.png"]);
const SMALL_LOGO_FILES = new Set(["ey.png"]);

// Staggered rows: alternating 5 and 4 per row
const ROWS = [
  LOGO_FILES.slice(0, 5),
  LOGO_FILES.slice(5, 9),
  LOGO_FILES.slice(9, 14),
  LOGO_FILES.slice(14, 18),
  LOGO_FILES.slice(18, 20),
];

function LogoBubble({ file, index }: { file: string; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3, delay: index * 0.03, ease: "easeOut" },
        },
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="where-we-go-logo-wrap"
    >
      <div
        className="logo-cell logo-float"
        style={{
          width: LOGO_SIZE,
          height: LOGO_SIZE,
          animationDelay: `${(index % 6) * 0.4}s`,
        }}
      >
        <img
          src={EXTERNAL_LOGO_URLS[file] ?? `/logos/${encodeURIComponent(file)}`}
          alt=""
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          className={
            EXTRA_BIG_LOGO_FILES.has(file)
              ? "logo-img logo-img-extra-big"
              : BIG_LOGO_FILES.has(file)
                ? "logo-img logo-img-big"
                : SMALL_LOGO_FILES.has(file)
                  ? "logo-img logo-img-small"
                  : "logo-img"
          }
        />
      </div>
    </motion.div>
  );
}

export default function WhereWeGoSection() {
  return (
    <section
      id="where-we-go"
      className="relative w-full bg-[#e5e3e0] py-10 md:py-14 overflow-hidden"
    >
      <div className="where-we-go-layout">
        {/* Text above everything */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
          className="where-we-go-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black text-center">
            Where We Go
          </h2>
          <p className="text-base md:text-lg font-medium text-black/70 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            Our members work at top tech companies including FAANG+, exciting
            startups, and some have gone on to become founders themselves.
          </p>
        </motion.div>

        {/* Staggered bubble rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.03 } },
          }}
          className="where-we-go-rows"
        >
          {ROWS.map((row, ri) => {
            let idx = 0;
            for (let r = 0; r < ri; r++) idx += ROWS[r].length;
            return (
              <div key={ri} className={`bubble-row ${ri % 2 === 1 ? "bubble-row-offset" : ""}`}>
                {row.map((file, ci) => (
                  <LogoBubble key={file} file={file} index={idx + ci} />
                ))}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
