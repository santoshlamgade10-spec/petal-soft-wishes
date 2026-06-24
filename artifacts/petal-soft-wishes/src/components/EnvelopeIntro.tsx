import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"closed" | "opening" | "exit">("closed");

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => setStage("exit"), 4200);
    setTimeout(() => onDone(), 5200);
  };

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.96 0.04 25) 0%, oklch(0.92 0.06 25) 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.button
            onClick={open}
            className="relative cursor-pointer"
            style={{ perspective: 1200 }}
            initial={{ scale: 0.6, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={stage === "closed" ? { scale: 1.04 } : {}}
          >
            <motion.div
              className="absolute -inset-20 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.88 0.12 85 / 0.6), transparent 70%)",
              }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative" style={{ width: "min(86vw, 380px)", aspectRatio: "1.5 / 1" }}>
              <motion.div
                className="absolute left-[8%] right-[8%] top-[12%] bottom-[12%] rounded-md glass flex items-center justify-center px-6 text-center"
                initial={{ y: 0, scale: 0.95, opacity: 0 }}
                animate={
                  stage === "opening"
                    ? { y: "-65%", scale: 1.05, opacity: 1 }
                    : { y: 0, scale: 0.95, opacity: 0 }
                }
                transition={{ duration: 2.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-script text-3xl sm:text-4xl text-gold-gradient leading-tight">
                  Happy Birthday<br />AAKRITI <span className="text-rose">❤</span>
                </p>
              </motion.div>

              <div
                className="absolute inset-0 rounded-md"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.94 0.04 25), oklch(0.88 0.07 25))",
                  boxShadow:
                    "0 30px 60px -20px oklch(0.5 0.1 15 / 0.4), inset 0 0 0 1px oklch(0.82 0.12 85 / 0.6)",
                }}
              />
              <div
                className="absolute inset-0 rounded-md overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 48%, oklch(0.92 0.05 25) 48%)",
                }}
              >
                <svg className="absolute -left-2 -bottom-2 opacity-60" width="80" height="80" viewBox="0 0 80 80">
                  <g fill="oklch(0.82 0.12 85)">
                    <circle cx="20" cy="60" r="6" />
                    <circle cx="32" cy="68" r="4" />
                    <circle cx="14" cy="48" r="4" />
                  </g>
                </svg>
                <svg className="absolute -right-2 -bottom-2 opacity-60" width="80" height="80" viewBox="0 0 80 80">
                  <g fill="oklch(0.85 0.1 15)">
                    <circle cx="60" cy="60" r="6" />
                    <circle cx="48" cy="68" r="4" />
                    <circle cx="66" cy="48" r="4" />
                  </g>
                </svg>
              </div>

              <motion.div
                className="absolute inset-x-0 top-0 origin-top"
                style={{
                  height: "55%",
                  transformStyle: "preserve-3d",
                  background:
                    "linear-gradient(180deg, oklch(0.95 0.05 25), oklch(0.88 0.08 25))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  boxShadow: "0 4px 10px oklch(0.5 0.1 15 / 0.2)",
                  zIndex: 5,
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: stage === "opening" ? -175 : 0 }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
              />

              <motion.div
                className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full grid place-items-center font-script text-cream"
                style={{
                  width: 54,
                  height: 54,
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.7 0.18 15), oklch(0.45 0.15 15))",
                  boxShadow:
                    "0 6px 14px oklch(0.4 0.15 15 / 0.5), inset 0 -3px 6px oklch(0.3 0.1 15 / 0.6)",
                  zIndex: 6,
                  color: "oklch(0.97 0.02 80)",
                }}
                animate={
                  stage === "opening"
                    ? { scale: [1, 1.2, 0], opacity: [1, 1, 0] }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">A</span>
              </motion.div>
            </div>
          </motion.button>

          <motion.p
            className="mt-10 font-hand text-xl"
            style={{ color: "var(--color-rose)" }}
            animate={{ opacity: stage === "closed" ? [0.5, 1, 0.5] : 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            tap the envelope to open ✨
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
