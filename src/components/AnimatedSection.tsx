"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
