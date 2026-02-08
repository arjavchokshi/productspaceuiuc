"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "fellowship", href: "/fellowship" },
  { label: "projects", href: "/projects" },
  { label: "hackathon", href: "/hackathon" },
  { label: "mission", href: "/about" },
];

const navLinkVariant = (i: number) => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
});

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavVisible(false);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        setNavVisible(true);
      }, 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end md:justify-center gap-6 md:gap-8 px-6 py-3 md:py-1.5 bg-[#f5f3ff] transition-transform duration-300 ease-out"
        style={{
          transform: navVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-bold tracking-tight text-black hover:text-violet-700 transition-all duration-300 hover:[text-shadow:0_0_12px_rgba(109,40,217,0.6)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile burger button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="block w-6 h-0.5 bg-black rounded-full" />
          <span className="block w-6 h-0.5 bg-black rounded-full" />
          <span className="block w-6 h-0.5 bg-black rounded-full" />
        </button>
      </nav>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] md:hidden bg-[#f5f3ff] flex flex-col items-center justify-center gap-2 pt-16 pb-24"
          >
            <button
              type="button"
              onClick={closeMenu}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                variants={navLinkVariant(i)}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-4 text-2xl font-bold tracking-tight text-black hover:text-violet-700 transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
