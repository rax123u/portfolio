import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";

type LoaderProps = {
  complete: boolean;
  onExited: () => void;
};

const SLICES = [0, 1, 2, 3, 4];

export function Loader({ complete, onExited }: LoaderProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const lastSliceRef = useRef<HTMLSpanElement>(null);
  const completeRef = useRef(complete);
  const doneRef = useRef(false);
  const [leave, setLeave] = useState(false);

  completeRef.current = complete;

  useEffect(() => {
    let progress = 0;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const target = completeRef.current ? 100 : Math.min(88, (elapsed / 900) * 88);
      progress += (target - progress) * (completeRef.current ? 0.2 : 0.07);

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(progress, 100) / 100})`;
      }
      if (numRef.current) {
        numRef.current.textContent = String(Math.min(100, Math.round(progress))).padStart(3, "0");
      }

      if (completeRef.current && (progress > 99.3 || elapsed > 2200)) {
        if (numRef.current) numRef.current.textContent = "100";
        setLeave(true);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!leave) return;
    const timeout = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onExited();
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [leave, onExited]);

  return (
    <div
      className={`loader${leave ? " is-leaving" : ""}`}
      aria-hidden="true"
      onTransitionEnd={(event) => {
        if (event.target !== lastSliceRef.current || event.propertyName !== "transform") return;
        if (!leave || doneRef.current) return;
        doneRef.current = true;
        onExited();
      }}
    >
      <div className="loader-slices">
        {SLICES.map((index) => (
          <span
            key={index}
            ref={index === SLICES.length - 1 ? lastSliceRef : undefined}
            style={{ "--i": index } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="loader-ui">
        <div className="loader-row">
          <span className="tag">{site.name}</span>
          <span className="tag">Portfolio — {site.year}</span>
        </div>
        <div className="loader-center">
          <span ref={numRef} className="loader-count">
            000
          </span>
          <span className="loader-percent it">%</span>
        </div>
        <div className="loader-row loader-bottom">
          <div className="loader-bar">
            <div ref={barRef} className="loader-bar-fill" style={{ transform: "scaleX(0)" }} />
          </div>
          <span className="tag">
            {site.title} · {site.secondary}
          </span>
        </div>
      </div>
    </div>
  );
}
