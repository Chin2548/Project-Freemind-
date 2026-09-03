"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  fill = true,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative overflow-hidden bg-chocolate", className)}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imgClassName)}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1500}
            sizes={sizes}
            priority={priority}
            className={cn("h-full w-full object-cover", imgClassName)}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
