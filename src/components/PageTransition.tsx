import { useLayoutEffect, useState } from "react";
import type { WipePhase } from "../animations/pageTransitions";

type PageTransitionProps = {
  phase: WipePhase;
  label: string;
  onMidpoint: () => void;
  onDone: () => void;
};

export function PageTransition({ phase, label, onMidpoint, onDone }: PageTransitionProps) {
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    if (phase !== "in") return;
    setShown(false);
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [phase]);

  if (phase === "idle") return null;

  const className = phase === "out" ? "wipe is-out" : shown ? "wipe is-in" : "wipe";

  return (
    <div
      className={className}
      aria-hidden="true"
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
        if (phase === "in" && shown) onMidpoint();
        if (phase === "out") onDone();
      }}
    >
      <span>{label}</span>
    </div>
  );
}
