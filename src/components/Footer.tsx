import { site } from "../data/site";
import { useClock } from "../hooks/useClock";
import { useFitText } from "../hooks/useFitText";
import { useMagnetic } from "../hooks/useMagnetic";
import { scrollToTarget } from "../motion/bus";
import { ContactLink } from "./ContactLink";
import { Roll } from "./Roll";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "index", label: "Index" },
  { id: "stack", label: "Capabilities" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const fitRef = useFitText<HTMLParagraphElement>();
  const topRef = useMagnetic<HTMLButtonElement>(0.3);
  const time = useClock();

  return (
    <footer className="footer" data-theme="dark">
      <div className="footer-top">
        <div className="footer-col">
          <p className="tag">Navigate</p>
          <ul>
            {links.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="footer-link"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToTarget(`#${item.id}`);
                  }}
                >
                  <Roll text={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <p className="tag">Connect</p>
          <ul>
            <li>
              <a href={site.phoneHref} className="footer-link" data-cursor="Open">
                <Roll text={site.phoneDisplay} />
              </a>
            </li>
            <li>
              <ContactLink href={site.email} kind="email" label="Email" className="footer-link" />
            </li>
            <li>
              <ContactLink href={site.github} label="GitHub" className="footer-link" />
            </li>
            <li>
              <ContactLink href={site.linkedin} label="LinkedIn" className="footer-link" />
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="tag">Local time</p>
          <p className="footer-time">
            <span className="footer-clock">{time || "--:--"}</span>
            <span className="it"> {site.location}</span>
          </p>
          <p className="footer-note">{site.availability}</p>
        </div>

        <button
          ref={topRef}
          type="button"
          className="to-top"
          data-cursor="Open"
          data-magnetic
          aria-label="Back to top"
          onClick={() => scrollToTarget(0)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div className="footer-name" aria-hidden="true">
        <p ref={fitRef} className="fit footer-word" data-parallax="4">
          Rayyan
        </p>
      </div>

      <div className="footer-bar">
        <p>
          © {site.year} {site.name}
        </p>
        <p>
          {site.title} · {site.secondary}
        </p>
      </div>
    </footer>
  );
}
