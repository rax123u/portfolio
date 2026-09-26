import { useEffect, useState } from "react";
import { focusSection, type WipePhase } from "../animations/pageTransitions";
import { site } from "../data/site";
import { useClock } from "../hooks/useClock";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getLenisApi, scrollToTarget } from "../motion/bus";
import { PageTransition } from "./PageTransition";
import { Roll } from "./Roll";

const items = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "index", label: "Index" },
  { id: "stack", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

const quick = items.filter((item) => item.id === "work" || item.id === "contact");

export function Navigation() {
  const reduced = useReducedMotion();
  const time = useClock();
  const [open, setOpen] = useState(false);
  const [wipe, setWipe] = useState<{ phase: WipePhase; id: string; label: string }>({
    phase: "idle",
    id: "",
    label: "",
  });

  useEffect(() => {
    if (wipe.phase === "idle") return;
    const timeout = window.setTimeout(() => {
      if (wipe.phase === "in") {
        scrollToTarget(wipe.id === "top" ? 0 : `#${wipe.id}`, true);
        if (wipe.id !== "top") focusSection(wipe.id);
        setWipe((current) => ({ ...current, phase: "out" }));
        return;
      }
      setWipe((current) => ({ ...current, phase: "idle" }));
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, [wipe]);

  useEffect(() => {
    if (!open) return;
    getLenisApi()?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      getLenisApi()?.start();
    };
  }, [open]);

  const go = (id: string, label: string) => {
    setOpen(false);
    if (reduced) {
      scrollToTarget(id === "top" ? 0 : `#${id}`);
      if (id !== "top") focusSection(id);
      return;
    }
    setWipe({ phase: "in", id, label });
  };

  return (
    <>
      <header className={`site-header${open ? " is-open" : ""}`}>
        <a
          href="#top"
          className="wordmark"
          onClick={(event) => {
            event.preventDefault();
            go("top", "Top");
          }}
        >
          <Roll text={site.name} />
        </a>

        <p className="header-time tag" aria-label={`Local time in ${site.location}`}>
          {site.location} · {time || "--:--"}
        </p>

        <div className="header-actions">
          <nav className="header-links" aria-label="Quick">
            {quick.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="header-link"
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id, item.label);
                }}
              >
                <Roll text={item.label} />
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle-dot" aria-hidden="true" />
            <span className="menu-toggle-text">
              <span className={`menu-toggle-word${open ? " is-hidden" : ""}`}>Menu</span>
              <span className={`menu-toggle-word${open ? "" : " is-hidden"}`}>Close</span>
            </span>
          </button>
        </div>
      </header>

      <nav id="site-menu" className={`menu${open ? " is-open" : ""}`} aria-label="Site" aria-hidden={!open}>
        <div className="menu-inner" data-lenis-prevent>
          <ol className="menu-list">
            {items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="menu-link"
                  tabIndex={open ? 0 : -1}
                  onClick={(event) => {
                    event.preventDefault();
                    go(item.id, item.label);
                  }}
                >
                  <span className="menu-mask">
                    <span className="menu-line" style={{ transitionDelay: open ? `${180 + index * 70}ms` : "0ms" }}>
                      <span className="menu-index it">0{index + 1}</span>
                      <Roll text={item.label} />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className="menu-foot">
            <div>
              <p className="tag">Call</p>
              <a href={site.phoneHref} className="menu-phone" tabIndex={open ? 0 : -1}>
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="tag">Status</p>
              <p className="it menu-status">{site.availability}</p>
            </div>
          </div>
        </div>
      </nav>

      <PageTransition
        phase={wipe.phase}
        label={wipe.label}
        onMidpoint={() => {
          scrollToTarget(wipe.id === "top" ? 0 : `#${wipe.id}`, true);
          if (wipe.id !== "top") focusSection(wipe.id);
          setWipe((current) => ({ ...current, phase: "out" }));
        }}
        onDone={() => setWipe((current) => ({ ...current, phase: "idle" }))}
      />
    </>
  );
}
