import { Link } from "wouter";
import { motion } from "framer-motion";
import { Petals } from "@/components/Petals";

function LightRays() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: [
          "conic-gradient(from 200deg at 50% -10%, transparent 0deg, oklch(0.95 0.07 85 / 0.22) 18deg, transparent 36deg, oklch(0.93 0.06 25 / 0.18) 54deg, transparent 72deg, oklch(0.95 0.07 85 / 0.15) 90deg, transparent 120deg)",
          "radial-gradient(ellipse at 50% 0%, oklch(0.95 0.08 85 / 0.25) 0%, transparent 55%)",
          "radial-gradient(ellipse at 80% 90%, oklch(0.9 0.09 15 / 0.2) 0%, transparent 45%)",
          "radial-gradient(ellipse at 10% 80%, oklch(0.92 0.07 350 / 0.2) 0%, transparent 40%)",
        ].join(", "),
        mixBlendMode: "screen",
        filter: "blur(30px)",
      }}
    />
  );
}

function BlurredFloral() {
  return (
    <>
      <div
        className="pointer-events-none absolute"
        style={{
          width: 340,
          height: 340,
          top: "-8%",
          right: "-5%",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.88 0.12 15 / 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 280,
          height: 280,
          bottom: "-4%",
          left: "-4%",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.88 0.1 85 / 0.16) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 200,
          height: 200,
          top: "30%",
          left: "-3%",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.9 0.08 25 / 0.14) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />
    </>
  );
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      <Petals count={7} sparkles={16} hearts={6} />
      <LightRays />
      <BlurredFloral />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl glass rounded-3xl px-6 sm:px-14 py-12 sm:py-18"
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-hand text-xl mb-4"
          style={{ color: "oklch(0.72 0.12 15)" }}
        >
          ✦ a special day ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl leading-tight"
          style={{ color: "oklch(0.32 0.07 15)" }}
        >
          Happy Birthday,
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-script mt-2"
          style={{
            fontSize: "clamp(3rem, 10vw, 5.5rem)",
            background: "linear-gradient(135deg, oklch(0.7 0.14 30), oklch(0.82 0.14 85), oklch(0.72 0.16 15))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1.15,
          }}
        >
          AAKRITI{" "}
          <motion.span
            style={{ color: "oklch(0.72 0.18 15)", display: "inline-block" }}
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.3 }}
          className="mt-7 text-lg sm:text-xl italic max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.48 0.06 20)" }}
        >
          "Today is all about celebrating the most beautiful person in my life. Thank you for filling my days with happiness and love."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1.1 }}
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
