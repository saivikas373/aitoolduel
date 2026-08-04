"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared entrance/hover primitives — kept in one place so every page uses
// the same timing/easing and respects prefers-reduced-motion consistently.

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function useVariants(distance: number): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: { opacity: 0, y: reduced ? 0 : distance },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.5, ease: EASE_OUT } },
  };
}

export function FadeIn({
  children,
  className,
  delay = 0,
  distance = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const variants = useVariants(distance);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : staggerDelay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const variants = useVariants(14);
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

// Subtle lift/scale for cards and buttons — transform-only, no layout shift.
export function HoverLift({
  children,
  className,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? undefined : { y: -4, scale, transition: { duration: 0.2, ease: EASE_OUT } }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
