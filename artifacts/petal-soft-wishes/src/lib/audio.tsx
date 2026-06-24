import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type AudioCtx = {
  start: () => void;
  playing: boolean;
  toggle: () => void;
  available: boolean;
};

const Ctx = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const a = new Audio();
    a.loop = true;
    a.volume = 0;
    a.preload = "none";
    ref.current = a;
    return () => {
      a.pause();
      ref.current = null;
    };
  }, []);

  const fadeTo = (target: number, ms = 1200) => {
    const a = ref.current;
    if (!a) return;
    const start = a.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      a.volume = start + (target - start) * k;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const start = () => {
    const a = ref.current;
    if (!a || !available || !a.paused) return;
    a.volume = 0;
    a.play()
      .then(() => {
        setPlaying(true);
        fadeTo(0.45);
      })
      .catch(() => {});
  };

  const toggle = () => {
    const a = ref.current;
    if (!a || !available) return;
    if (a.paused) {
      start();
    } else {
      fadeTo(0, 400);
      setTimeout(() => a.pause(), 420);
      setPlaying(false);
    }
  };

  return <Ctx.Provider value={{ start, playing, toggle, available }}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAudio outside provider");
  return c;
}
