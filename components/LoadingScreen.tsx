"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fillComplete, setFillComplete] = useState(false);

  useEffect(() => {
    // Wait for everything to load
    const handleLoad = () => {
      // Give the fill animation a moment to finish, then fade out
      setFillComplete(true);
      setTimeout(() => {
        setLoading(false);
        // Tell the cubes to do an entrance ripple
        window.dispatchEvent(new CustomEvent("ps-entrance-ripple"));
      }, 600);
    };

    if (document.readyState === "complete") {
      // Already loaded — still show animation briefly
      setTimeout(handleLoad, 1200);
    } else {
      // Minimum display time so the animation is visible
      const minTime = new Promise((r) => setTimeout(r, 1200));
      const pageLoad = new Promise<void>((r) => {
        window.addEventListener("load", () => r(), { once: true });
      });

      Promise.all([minTime, pageLoad]).then(handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative w-24 h-32 md:w-32 md:h-44">
            {/* Ghost image for sizing — fully transparent */}
            <Image
              src="/logo.png"
              alt=""
              width={128}
              height={176}
              className="w-full h-full object-contain opacity-0"
              priority
            />

            {/* White silhouette (full, dim) */}
            <div className="absolute inset-0">
              <Image
                src="/logo.png"
                alt=""
                width={128}
                height={176}
                className="w-full h-full object-contain brightness-0 invert opacity-20"
                priority
              />
            </div>

            {/* White silhouette filling from bottom */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="/logo.png"
                alt="Product Space"
                width={128}
                height={176}
                className="w-full h-full object-contain brightness-0 invert"
                priority
              />
            </motion.div>

            {/* Bright flash after fill */}
            {fillComplete && (
              <>
                {/* Logo glow */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src="/logo.png"
                    alt=""
                    width={128}
                    height={176}
                    className="w-full h-full object-contain brightness-0 invert blur-lg"
                    priority
                  />
                </motion.div>
                {/* Radial light burst */}
                <motion.div
                  className="absolute inset-[-100%] rounded-full"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.3, 1.5] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="w-full h-full rounded-full bg-white/30 blur-3xl" />
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
