import { useEffect, useState } from "react";
import { setLenisApi } from "../motion/bus";

export function useLenis(enabled: boolean) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let dead = false;
    let cleanup = () => {};

    void (async () => {
      const [{ default: Lenis }, gsapMod, scrollTriggerMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (dead) return;

      const gsap = gsapMod.default;
      const { ScrollTrigger } = scrollTriggerMod;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.05,
      });

      let skewEls: HTMLElement[] = [];

      const onScroll = () => {
        ScrollTrigger.update();
        const bar = document.querySelector<HTMLElement>("[data-progress]");
        if (bar) bar.style.transform = `scaleX(${lenis.progress})`;

        if (!skewEls.length || skewEls.some((node) => !node.isConnected)) {
          skewEls = [...document.querySelectorAll<HTMLElement>("[data-skew]")];
        }
        const amount = Math.max(-1.6, Math.min(1.6, lenis.velocity * 0.012));
        skewEls.forEach((node) => {
          const paused = Boolean(node.querySelector(".is-paused"));
          const value = paused ? 0 : amount;
          if (Math.abs(value) < 0.04) {
            if (node.style.transform) node.style.transform = "";
          } else {
            node.style.transform = `skewX(${value.toFixed(2)}deg)`;
          }
        });
      };

      lenis.on("scroll", onScroll);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      setLenisApi({
        scrollTo(target, immediate = false) {
          lenis.scrollTo(target, { immediate, force: true });
        },
        stop() {
          lenis.stop();
        },
        start() {
          lenis.start();
        },
      });

      if (!dead) setReady(true);

      cleanup = () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        skewEls.forEach((node) => {
          node.style.transform = "";
        });
        setLenisApi(null);
        setReady(false);
      };
    })();

    return () => {
      dead = true;
      cleanup();
    };
  }, [enabled]);

  return ready;
}
