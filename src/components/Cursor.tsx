import { useEffect, useRef } from "react";
import { attachCursor } from "../animations/cursorAnimations";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery("(pointer: fine) and (hover: hover)");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || !rootRef.current) return;
    return attachCursor(rootRef.current.parentElement ?? document.body);
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-ring">
        <span className="cursor-label" />
      </div>
    </div>
  );
}
