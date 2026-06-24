import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Petals } from "@/components/Petals";

const LETTER =
  "Happy Birthday! 🎉 Wishing you a day filled with happiness, laughter, and beautiful moments. May this year bring you lots of success and endless reasons to smile. Stay amazing and enjoy your special day! 💖";

export default function Letter() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTyped("");
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(LETTER.slice(0, i));
      if (i >= LETTER.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 35);
    return () => window.clearInterval(id);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      <Petals count={6} sparkles={26} />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl glass rounded-3xl px-7 sm:px-12 py-12 sm:py-14"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.98 0.02 80 / 0.85), oklch(0.95 0.04 25 / 0.7))",
        }}
      >
        <p className="font-hand text-xl" style={{ color: "var(--color-rose)" }}>
          my dearest Aakriti,
        </p>
        <h1 className="font-script text-4xl sm:text-6xl text-gold-gradient mt-3">
          A Letter For You
        </h1>

        <p className="mt-8 font-display text-xl sm:text-2xl leading-relaxed text-left min-h-[12rem]" style={{ color: "var(--color-foreground)" }}>
          {typed}
          <motion.span
            className="inline-block w-[2px] h-6 align-middle ml-0.5"
            style={{ background: "var(--color-rose)" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="mt-10"
        >
          <p className="font-script text-3xl sm:text-4xl text-gold-gradient">
            Forever grateful to have you.
          </p>
          <p className="font-display text-xl mt-2" style={{ color: "var(--color-rose)" }}>
            Happy Birthday <span>❤</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.location.assign("/")}
              className="btn-romantic btn-romantic-hover"
            >
              Replay <span>✨</span>
            </button>
            <Link href="/gallery" className="btn-romantic btn-romantic-hover">
              Back to Gallery
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
