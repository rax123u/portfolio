import { useEffect, useRef } from "react";

type BadgeProps = {
  text: string;
};

/** Rotating circular text. The spin pauses while the badge is off screen. */
export function Badge({ text }: BadgeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("is-paused", !entry?.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="badge" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="badge-ring">
        <defs>
          <path id="badge-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text>
          <textPath href="#badge-path" textLength="462" lengthAdjust="spacing">
            {`${text} — `}
          </textPath>
        </text>
      </svg>
      <span className="badge-dot" />
    </div>
  );
}
