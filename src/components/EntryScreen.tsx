"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function EntryScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("freemind-entered")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time check of browser-only storage on mount, SSR-safe default above
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("freemind-entered", "1");
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.24em" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-2xl text-ivory md:text-3xl"
          >
            FREEMIND BKK
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-taupe"
          >
            Entering after dark...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
