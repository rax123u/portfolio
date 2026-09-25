import { useEffect, useRef } from "react";

type MarqueeProps = {
  items: readonly string[];
  reverse?: boolean;
  className?: string;
};

/** Infinite text line. Paused off screen; skews with scroll velocity via [data-skew]. */
export function Marquee({ items, reverse = false, className = "" }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    const track = node?.querySelector<HTMLElement>(".marquee-track");
    if (!node || !track) return;

    const observer = new IntersectionObserver(([entry]) => {
      track.classList.toggle("is-paused", !entry?.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sequence = Array.from({ length: 4 }, () => items).flat();

  return (
    <div ref={ref} className={`marquee ${className}`}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="marquee-skew" data-skew>
        <div className={`marquee-track${reverse ? " is-reverse" : ""}`} aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-group">
              {sequence.map((item, index) => (
                <span key={`${copy}-${item}-${index}`}>
                  {item}
                  <i className="marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
