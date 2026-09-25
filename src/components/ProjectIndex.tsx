import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function ProjectIndex() {
  const previewRef = useRef<HTMLImageElement>(null);
  const fine = useMediaQuery("(pointer: fine) and (hover: hover)");
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!fine || reduced) return;
    const preview = previewRef.current;
    if (!preview) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let running = false;

    const render = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      preview.style.transform = `translate3d(${current.x + 32}px, ${current.y - 24}px, 0)`;
      if (Math.abs(target.x - current.x) > 0.4 || Math.abs(target.y - current.y) > 0.4) {
        frame = requestAnimationFrame(render);
      } else {
        running = false;
      }
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [fine, reduced]);

  useEffect(() => {
    if (!active) {
      setReveal(false);
      return;
    }
    setReveal(false);
    let inner = 0;
    const frame = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setReveal(true));
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(inner);
    };
  }, [active]);

  const activeProject = projects.find((item) => item.id === active) ?? projects[0];

  return (
    <section id="index" tabIndex={-1} className="sec index outline-none" data-theme="dark">
      <div className="tag-row">
        <p className="tag">03 — Index</p>
        <p className="tag-right">All projects</p>
        <span className="rule" data-draw-x />
      </div>

      <ol className="index-list" data-stagger>
        {projects.map((project) => {
          const content = (
            <>
              <span className="index-num it">{project.number}</span>
              <span className="index-name">{project.name}</span>
              <span className="index-cat">{project.category}</span>
              <span className="index-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </>
          );

          return (
            <li key={project.id}>
              {project.url ? (
                <a
                  className="index-row"
                  href={project.url}
                  data-cursor="View"
                  target="_blank"
                  rel="noreferrer noopener"
                  onPointerEnter={() => setActive(project.id)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(project.id)}
                  onBlur={() => setActive(null)}
                >
                  {content}
                </a>
              ) : (
                <div
                  className="index-row"
                  data-cursor="Project"
                  onPointerEnter={() => setActive(project.id)}
                  onPointerLeave={() => setActive(null)}
                >
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {fine && !reduced ? (
        <img
          ref={previewRef}
          className={`index-preview${reveal ? " is-on" : ""}`}
          alt=""
          width={640}
          height={357}
          decoding="async"
          src={activeProject.image}
        />
      ) : null}
    </section>
  );
}
