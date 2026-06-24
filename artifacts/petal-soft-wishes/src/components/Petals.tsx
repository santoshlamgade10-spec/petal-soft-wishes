import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Props = { count?: number; sparkles?: number; hearts?: number };

export function Petals({ count = 14, sparkles = 18, hearts = 0 }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 18 + Math.random() * 14,
        size: 14 + Math.random() * 18,
        rotate: Math.random() * 360,
        hue: 10 + Math.random() * 30,
        drift: -40 + Math.random() * 80,
      })),
    [count],
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: sparkles }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      })),
    [sparkles],
  );

  const heartArr = useMemo(
    () =>
      Array.from({ length: hearts }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 10 + Math.random() * 12,
      })),
    [hearts],
  );

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={`p${p.id}`}
          className="absolute -top-10"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{
            y: "110vh",
            x: p.drift,
            rotate: p.rotate + 360,
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2c3 4 6 6 6 10a6 6 0 1 1-12 0c0-4 3-6 6-10z"
              fill={`oklch(0.82 0.18 ${p.hue})`}
              stroke={`oklch(0.70 0.22 ${p.hue})`}
              strokeWidth="0.5"
              opacity="0.92"
            />
          </svg>
        </motion.div>
      ))}

      {sparks.map((s) => (
        <motion.div
          key={`s${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "white",
            boxShadow: "0 0 8px 2px oklch(0.95 0.1 85 / 0.9)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {heartArr.map((h) => (
        <motion.div
          key={`h${h.id}`}
          className="absolute"
          style={{ left: `${h.left}%`, bottom: -20 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill="oklch(0.78 0.14 15)">
            <path d="M12 21s-7-4.5-9.5-9.5C.5 7 3 3 7 3c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4 4.5 8.5C19 16.5 12 21 12 21z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
