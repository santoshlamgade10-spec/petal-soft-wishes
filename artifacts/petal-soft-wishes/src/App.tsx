import { Switch, Route, Router as WouterRouter } from "wouter";
import { useState } from "react";
import { AudioProvider, useAudio } from "@/lib/audio";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { Petals } from "@/components/Petals";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Letter from "@/pages/Letter";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-7xl font-bold">404</h1>
        <p className="mt-4 font-hand text-xl" style={{ color: "var(--color-rose)" }}>
          Page not found
        </p>
        <a href="/" className="btn-romantic btn-romantic-hover mt-6 inline-flex">
          Go home
        </a>
      </div>
    </div>
  );
}

function AppShell() {
  const [introDone, setIntroDone] = useState(false);
  const { playing, toggle, available } = useAudio();

  return (
    <div className="relative min-h-screen">
      <Petals count={12} sparkles={18} />
      {!introDone && <EnvelopeIntro onDone={() => setIntroDone(true)} />}
      <div className="relative z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/letter" component={Letter} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {introDone && available && (
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full glass hover:scale-110 transition-transform"
        >
          <span className="text-xl">{playing ? "🎵" : "🔇"}</span>
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppShell />
      </WouterRouter>
    </AudioProvider>
  );
}

export default App;
