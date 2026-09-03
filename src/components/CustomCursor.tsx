"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const LABELS: Record<string, string> = {
  view: "View",
  explore: "Explore",
  open: "Open",
  read: "Read",
  reserve: "Reserve",
};

export function CustomCursor() {
  // Default to "touch" so the server-rendered markup (no window) matches the
  // client's first hydration pass; this effect corrects it right after mount.
  const [isTouch, setIsTouch] = useState(true);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 28, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    const touchCapable = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability detection on mount, SSR-safe default above
    setIsTouch(touchCapable);
    if (touchCapable) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      const cursorType = target?.getAttribute("data-cursor");
      setLabel(cursorType ? LABELS[cursorType] ?? null : null);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference md:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <AnimatePresence mode="wait">
        {label ? (
          <motion.div
            key={label}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/70"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ivory">
              {label}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            className="h-2 w-2 rounded-full bg-ivory"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
