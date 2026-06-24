import { Link } from "wouter";
import { motion } from "framer-motion";

type Item =
  | { type: "photo"; gradient: string; alt: string; tall?: boolean; overlay?: string }
  | { type: "note"; text: string };

const items: Item[] = [
  {
    type: "photo",
    gradient: "linear-gradient(135deg, oklch(0.88 0.08 10) 0%, oklch(0.82 0.12 350) 40%, oklch(0.78 0.1 15) 100%)",
    overlay: "oklch(0.94 0.04 25 / 0.15)",
    alt: "Aakriti",
    tall: true,
  },
  { type: "note", text: "💌 Your smile brightens every day." },
  {
    type: "photo",
    gradient: "linear-gradient(160deg, oklch(0.92 0.06 80) 0%, oklch(0.86 0.1 40) 50%, oklch(0.82 0.08 25) 100%)",
    overlay: "oklch(0.98 0.02 30 / 0.1)",
    alt: "Aakriti",
  },
  {
    type: "photo",
    gradient: "linear-gradient(145deg, oklch(0.85 0.09 15) 0%, oklch(0.78 0.13 350) 40%, oklch(0.72 0.1 10) 100%)",
    overlay: "oklch(0.95 0.03 20 / 0.2)",
    alt: "Aakriti",
    tall: true,
  },
  { type: "note", text: "✨ Life feels beautiful with you." },
  {
    type: "photo",
    gradient: "linear-gradient(125deg, oklch(0.9 0.07 30) 0%, oklch(0.84 0.11 15) 50%, oklch(0.79 0.09 350) 100%)",
    overlay: "oklch(0.96 0.04 40 / 0.1)",
    alt: "Aakriti",
  },
  { type: "note", text: "💕 Every picture of you is my favorite." },
  { type: "note", text: "🌹 Forever grateful to have you." },
];

function PhotoCard({ item }: { item: Extract<Item, { type: "photo" }> }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl glass p-2">
      <div className="overflow-hidden rounded-2xl">
        <div
          className={`w-full ${item.tall ? "aspect-[3/4]" : "aspect-[4/5]"} transition-transform duration-700 ease-out group-hover:scale-105 relative flex items-center justify-center`}
          style={{ background: item.gradient }}
        >
          <div
            className="absolute inset-0"
            style={{ background: item.overlay ?? "transparent" }}
          />
          <div className="relative z-10 text-center px-4">
            <svg
              className="mx-auto mb-3 opacity-40"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="oklch(0.98 0.02 30)"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <p
              className="font-script text-2xl opacity-60"
              style={{ color: "oklch(0.98 0.02 30)" }}
            >
              {item.alt}
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40" />
    </div>
  );
}

export default function Gallery() {
  return (
    <main className="relative min-h-screen px-5 sm:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-14"
      >
        <p className="font-hand text-xl" style={{ color: "var(--color-rose)" }}>
          a little gallery of you
        </p>
        <h1 className="font-script text-5xl sm:text-7xl text-gold-gradient mt-2">
          Her Gallery <span style={{ color: "var(--color-rose)" }}>❤</span>
        </h1>
        <p
          className="mt-4 font-display text-lg italic max-w-xl mx-auto"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          every photo a memory, every memory a wish.
        </p>
      </motion.div>

      <div className="mx-auto max-w-6xl columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
            className="break-inside-avoid"
          >
            {it.type === "photo" ? (
              <PhotoCard item={it} />
            ) : (
              <div className="glass rounded-3xl px-6 py-10 text-center">
                <p
                  className="font-hand text-2xl leading-snug"
                  style={{ color: "var(--color-rose)" }}
                >
                  {it.text}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-16 flex justify-center"
      >
        <Link href="/letter" className="btn-romantic btn-romantic-hover">
          Read My Letter <span>❤</span>
        </Link>
      </motion.div>
    </main>
  );
}
