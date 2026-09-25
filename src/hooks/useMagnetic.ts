import { useEffect, useRef } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 0.32) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let dead = false;
    let cleanup = () => {};

    void import("gsap").then(({ default: gsap }) => {
      if (dead) return;
      const xTo = gsap.quickTo(node, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);

      cleanup = () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
        gsap.set(node, { clearProps: "transform" });
      };
    });

    return () => {
      dead = true;
      cleanup();
    };
  }, [strength]);

  return ref;
}
