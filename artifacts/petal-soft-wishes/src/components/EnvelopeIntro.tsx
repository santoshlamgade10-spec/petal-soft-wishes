import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useAudio } from "@/lib/audio";

function FloralDecor({ x, y, r, opacity = 0.55 }: { x: number; y: number; r: number; opacity?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`} opacity={opacity}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx={Math.cos((a * Math.PI) / 180) * 9}
          cy={Math.sin((a * Math.PI) / 180) * 9}
          rx="6"
          ry="3.5"
          transform={`rotate(${a}, ${Math.cos((a * Math.PI) / 180) * 9}, ${Math.sin((a * Math.PI) / 180) * 9})`}
          fill="oklch(0.88 0.1 15)"
        />
      ))}
      <circle r="4" fill="oklch(0.82 0.13 85)" />
    </g>
  );
}

function IntroPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 8,
        duration: 16 + Math.random() * 10,
        size: 13 + Math.random() * 12,
        rotate: Math.random() * 360,
        hue: 8 + Math.random() * 28,
        drift: -30 + Math.random() * 60,
      })),
    [],
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2.5 + Math.random() * 3.5,
        size: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-8"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{ y: "108vh", x: p.drift, rotate: p.rotate + 360, opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2c3 4 6 6 6 10a6 6 0 1 1-12 0c0-4 3-6 6-10z"
              fill={`oklch(0.87 0.08 ${p.hue})`}
              stroke={`oklch(0.76 0.12 ${p.hue})`}
              strokeWidth="0.5"
              opacity="0.9"
            />
          </svg>
        </motion.div>
      ))}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "white",
            boxShadow: "0 0 8px 3px oklch(0.95 0.1 85 / 0.9)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function EnvelopeIntro({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"closed" | "opening" | "exit">("closed");
  const { start } = useAudio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = () => {
    if (stage !== "closed") return;
    start();
    setStage("opening");
    setTimeout(() => setStage("exit"), 5000);
    setTimeout(() => onDone(), 6200);
  };

  if (!mounted) return null;

  const W = 400;
  const H = 260;

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, oklch(0.97 0.04 25) 0%, oklch(0.93 0.07 20) 55%, oklch(0.9 0.08 15) 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <IntroPetals />

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute rounded-full blur-3xl"
              style={{
                width: 520,
                height: 320,
                background:
                  "radial-gradient(ellipse, oklch(0.88 0.14 85 / 0.55) 0%, oklch(0.85 0.12 20 / 0.3) 60%, transparent 80%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative" style={{ width: W, maxWidth: "90vw", height: H }}>
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                style={{ filter: "drop-shadow(0 24px 48px oklch(0.55 0.1 15 / 0.35))" }}
              >
                <defs>
                  <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.96 0.04 25)" />
                    <stop offset="100%" stopColor="oklch(0.89 0.07 20)" />
                  </linearGradient>
                  <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.97 0.04 28)" />
                    <stop offset="100%" stopColor="oklch(0.9 0.07 22)" />
                  </linearGradient>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <rect x="0" y="0" width={W} height={H} rx="10" fill="url(#envBody)" />

                <line x1="0" y1="0" x2={W / 2} y2={H * 0.55} stroke="oklch(0.82 0.1 85 / 0.35)" strokeWidth="1" />
                <line x1={W} y1="0" x2={W / 2} y2={H * 0.55} stroke="oklch(0.82 0.1 85 / 0.35)" strokeWidth="1" />
                <line x1="0" y1={H} x2={W / 2} y2={H * 0.55} stroke="oklch(0.75 0.08 20 / 0.2)" strokeWidth="1" />
                <line x1={W} y1={H} x2={W / 2} y2={H * 0.55} stroke="oklch(0.75 0.08 20 / 0.2)" strokeWidth="1" />

                <rect x="0" y="0" width={W} height={H} rx="10" fill="none" stroke="oklch(0.82 0.1 85 / 0.6)" strokeWidth="1.5" />

                <FloralDecor x={30} y={H - 28} r={15} />
                <FloralDecor x={W - 30} y={H - 28} r={-20} />
                <FloralDecor x={30} y={32} r={5} opacity={0.3} />
                <FloralDecor x={W - 30} y={32} r={-10} opacity={0.3} />
              </svg>

              <motion.div
                className="absolute inset-x-0 top-0 origin-top overflow-hidden"
                style={{
                  height: "56%",
                  zIndex: 10,
                  transformStyle: "preserve-3d",
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: stage === "opening" ? -178 : 0 }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              >
                <svg
                  viewBox={`0 0 ${W} ${H * 0.6}`}
                  style={{ width: "100%", height: "100%", display: "block" }}
                >
                  <defs>
                    <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.97 0.04 28)" />
                      <stop offset="100%" stopColor="oklch(0.91 0.07 22)" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M0,0 L${W / 2},${H * 0.55} L${W},0 Z`}
                    fill="url(#flapGrad)"
                    stroke="oklch(0.82 0.1 85 / 0.5)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M20,0 L${W / 2},${H * 0.45} L${W - 20},0`}
                    fill="none"
                    stroke="oklch(0.88 0.09 85 / 0.4)"
                    strokeWidth="0.8"
                  />
                  <FloralDecor x={W / 2} y={H * 0.18} r={0} opacity={0.5} />
                </svg>
              </motion.div>

              <motion.div
                className="absolute"
                style={{
                  left: "8%",
                  right: "8%",
                  top: "10%",
                  bottom: "10%",
                  zIndex: 5,
                  borderRadius: 8,
                  background: "linear-gradient(160deg, oklch(0.99 0.01 30), oklch(0.95 0.04 25))",
                  boxShadow: "0 2px 20px oklch(0.5 0.08 20 / 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  textAlign: "center",
                }}
                initial={{ y: 0, scale: 0.88, opacity: 0 }}
                animate={
                  stage === "opening"
                    ? { y: "-18%", scale: 1, opacity: 1 }
                    : { y: 0, scale: 0.88, opacity: 0 }
                }
                transition={{ duration: 2.2, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <p
                    className="font-script leading-tight"
                    style={{
                      fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                      background: "linear-gradient(135deg, oklch(0.7 0.14 30), oklch(0.82 0.14 85), oklch(0.7 0.14 30))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Happy Birthday<br />AAKRITI
                  </p>
                  <p className="mt-1 text-2xl" style={{ lineHeight: 1 }}>❤️</p>
                </div>
              </motion.div>

              <motion.button
                onClick={open}
                aria-label="Open envelope"
                className="absolute z-20 rounded-full flex items-center justify-center font-script"
                style={{
                  width: 64,
                  height: 64,
                  left: "50%",
                  top: "42%",
                  transform: "translate(-50%, -50%)",
                  background: "radial-gradient(circle at 30% 30%, oklch(0.72 0.18 15), oklch(0.45 0.15 15))",
                  boxShadow: "0 6px 16px oklch(0.4 0.15 15 / 0.55), inset 0 -3px 6px oklch(0.3 0.1 15 / 0.5)",
                  color: "oklch(0.97 0.02 80)",
                  fontSize: "1.7rem",
                  border: "none",
                  cursor: stage === "closed" ? "pointer" : "default",
                }}
                animate={
                  stage === "opening"
                    ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] }
                    : { scale: [1, 1.06, 1], opacity: 1 }
                }
                transition={
                  stage === "opening"
                    ? { duration: 0.5, delay: 0.1 }
                    : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                }
                whileHover={stage === "closed" ? { scale: 1.14, boxShadow: "0 8px 24px oklch(0.4 0.18 15 / 0.7), 0 0 20px oklch(0.7 0.18 15 / 0.4)" } : {}}
              >
                <span>A</span>
              </motion.button>
            </div>

            <motion.p
              className="mt-10 font-hand text-xl"
              style={{ color: "oklch(0.72 0.12 15)" }}
              animate={{ opacity: stage === "closed" ? [0.5, 1, 0.5] : 0 }}
              transition={{ duration: 2, repeat: stage === "closed" ? Infinity : 0 }}
            >
              tap the envelope to open ✨
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
