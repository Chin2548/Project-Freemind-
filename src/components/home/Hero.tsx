"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReservationButton } from "@/components/ReservationButton";
import type { HomepageContent, SiteSettings } from "@/lib/types";

export function Hero({
  settings,
  content,
}: {
  settings: SiteSettings;
  content: HomepageContent;
}) {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-obsidian">
      <Image
        src={content.heroImageUrl}
        alt="Dim, warm-lit interior of Freemind BKK at night"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs uppercase tracking-[0.32em] text-brass"
        >
          {content.heroLabel}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-serif text-[15vw] leading-[0.95] tracking-tight text-ivory sm:text-[10vw] md:text-[7vw] lg:text-[6.5rem]"
        >
          {content.heroHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-serif text-2xl italic text-cream md:text-3xl"
        >
          {content.heroTagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md font-sans text-sm leading-relaxed text-taupe md:text-base"
        >
          {content.heroSubtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-10"
        >
          <a
            href="#the-space"
            data-cursor="explore"
            className="font-sans text-xs uppercase tracking-[0.28em] text-ivory underline decoration-brass/60 decoration-1 underline-offset-8 transition-colors hover:text-brass"
          >
            Enter
          </a>
          <ReservationButton href={settings.reservationUrl}>
            Reserve
          </ReservationButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 right-6 z-10 flex flex-col items-center gap-2 md:right-10"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-taupe [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-taupe"
        />
      </motion.div>
    </section>
  );
}
