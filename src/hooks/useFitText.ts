import { useLayoutEffect, useRef } from "react";

/**
 * Scales an inline-block, single-line element so its text spans its parent's width.
 * Layout-only measurement; transforms applied by GSAP do not affect the result.
 */
export function useFitText<T extends HTMLElement>(ratio = 1) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    const parent = node?.parentElement;
    if (!node || !parent) return;

    let frame = 0;

    const fit = () => {
      node.style.fontSize = "100px";
      const width = node.getBoundingClientRect().width;
      const available = parent.clientWidth * ratio;
      if (width > 0 && available > 0) {
        node.style.fontSize = `${Math.floor((available / width) * 10000) / 100}px`;
      }
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();
    void document.fonts?.ready.then(schedule);

    const observer = new ResizeObserver(schedule);
    observer.observe(parent);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [ratio]);

  return ref;
}
