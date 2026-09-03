"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/SectionLabel";
import type { IngredientStep } from "@/lib/types";

export function IngredientJourney({ steps }: { steps: IngredientStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(steps.length - 1, Math.floor(v * steps.length));
    setActive(index);
  });

  const step = steps[active];
  const isFinal = active === steps.length - 1;

  return (
    <section ref={containerRef} className="relative bg-obsidian" style={{ height: `${steps.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={step.image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={step.image} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-obsidian/55" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <SectionLabel light className="mb-6">
            The Ingredient Journey
          </SectionLabel>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className={`font-serif leading-[0.95] tracking-tight text-ivory ${
                  isFinal
                    ? "text-[11vw] italic sm:text-[7vw] md:text-[5.5vw]"
                    : "text-[14vw] sm:text-[9vw] md:text-[7vw]"
                }`}
              >
                {step.label}
              </h2>
              <p className="mt-5 max-w-sm font-sans text-sm text-taupe md:text-base">
                {step.note}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            {steps.map((s, i) => (
              <span
                key={s.label}
                className={`h-px transition-all duration-500 ${
                  i === active ? "w-10 bg-brass" : "w-4 bg-taupe/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
