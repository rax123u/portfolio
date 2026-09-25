import { useCallback, useEffect, useRef, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation";
import { ProjectIndex } from "./components/ProjectIndex";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { useLenis } from "./hooks/useLenis";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { scrollToTarget } from "./motion/bus";

export default function App() {
  const reduced = useReducedMotion();
  const lenisReady = useLenis(!reduced);
  const siteRef = useRef<HTMLDivElement>(null);
  const playIntro = useRef<() => void>(() => {});
  const booted = useRef(false);
  const [complete, setComplete] = useState(reduced);
  const [covered, setCovered] = useState(!reduced);

  useEffect(() => {
    if (!reduced && !lenisReady) return;

    let dead = false;
    let destroy = () => {};

    const boot = async () => {
      const fonts = Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, 1200)),
      ]);
      const minimum = new Promise((resolve) => window.setTimeout(resolve, reduced ? 0 : 420));

      if (!reduced) {
        const [{ mountMotion }] = await Promise.all([import("./motion/engine"), fonts, minimum]);
        if (dead || !siteRef.current) return;
        const motion = mountMotion(siteRef.current);
        destroy = motion.destroy;
        playIntro.current = motion.playIntro;
      } else {
        await fonts;
      }

      if (!dead) setComplete(true);
    };

    void boot();

    return () => {
      dead = true;
      destroy();
    };
  }, [lenisReady, reduced]);

  const finish = useCallback(() => {
    if (booted.current) return;
    booted.current = true;
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
      scrollToTarget(hash, true);
    }
    playIntro.current();
    setCovered(false);
  }, []);

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <div className="backdrop" aria-hidden="true" />
      <div className="progress-bar" data-progress />
      <Cursor />
      {!reduced && covered ? <Loader complete={complete} onExited={finish} /> : null}
      <div ref={siteRef} inert={covered ? true : undefined}>
        <Navigation />
        <main id="content">
          <Hero />
          <About />
          <Work />
          <ProjectIndex />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
