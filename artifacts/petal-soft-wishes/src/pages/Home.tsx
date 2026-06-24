import { Link } from "wouter";
import { motion } from "framer-motion";
import { Petals } from "@/components/Petals";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      <Petals count={6} sparkles={10} hearts={8} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 0%, transparent 0deg, oklch(0.95 0.06 85 / 0.35) 30deg, transparent 60deg, oklch(0.92 0.08 25 / 0.3) 120deg, transparent 180deg)",
          mixBlendMode: "screen",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl glass rounded-3xl px-6 sm:px-12 py-12 sm:py-16"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-hand text-xl mb-3"
          style={{ color: "var(--color-rose)" }}
        >
          ✦ a special day ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl leading-tight"
        >
          Happy Birthday,
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="font-script text-5xl sm:text-7xl md:text-8xl text-gold-gradient mt-2"
        >
          AAKRITI <span style={{ color: "var(--color-rose)" }}>❤</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-6 text-lg sm:text-xl italic max-w-xl mx-auto"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          "Today is all about celebrating the most beautiful person in my life."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-10"
        >
          <Link href="/gallery" className="btn-romantic btn-romantic-hover">
            Open Gallery <span>✨</span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
