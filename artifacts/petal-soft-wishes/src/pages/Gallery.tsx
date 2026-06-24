import { Link } from "wouter";
import { motion } from "framer-motion";
import photo1 from "@assets/WhatsApp_Image_2026-06-24_at_12.47.11_PM_1782287427513.jpeg";
import photo2 from "@assets/image_1782287442716.png";
import photo3 from "@assets/image_1782287451170.png";
import photo4 from "@assets/image_1782287473609.png";

type Item =
  | { type: "photo"; src: string; alt: string; tall?: boolean }
  | { type: "note"; text: string };

const items: Item[] = [
  { type: "photo", src: photo1, alt: "Aakriti", tall: true },
  { type: "note", text: "💌 Your smile brightens every day." },
  { type: "photo", src: photo2, alt: "Aakriti" },
  { type: "photo", src: photo3, alt: "Aakriti", tall: true },
  { type: "note", text: "✨ Life feels beautiful with you." },
  { type: "photo", src: photo4, alt: "Aakriti" },
  { type: "note", text: "💕 Every picture of you is my favorite." },
  { type: "note", text: "🌹 Forever grateful to have you." },
];

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
              <div className="group relative overflow-hidden rounded-3xl glass p-2">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={it.src}
                    alt={it.alt}
                    loading="lazy"
                    className={`w-full ${it.tall ? "aspect-[3/4]" : "aspect-[4/5]"} object-cover transition-transform duration-700 ease-out group-hover:scale-110`}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40" />
              </div>
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
