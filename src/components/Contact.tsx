import { site } from "../data/site";
import { useFitText } from "../hooks/useFitText";
import { useMagnetic } from "../hooks/useMagnetic";
import { ContactLink } from "./ContactLink";

const HEADLINE = "Let’s talk";

export function Contact() {
  const fitRef = useFitText<HTMLHeadingElement>();
  const callRef = useMagnetic<HTMLAnchorElement>(0.2);

  return (
    <section id="contact" tabIndex={-1} className="sec contact outline-none" data-theme="accent">
      <div className="tag-row">
        <p className="tag">05 — Contact</p>
        <p className="tag-right">{site.availability}</p>
        <span className="rule" data-draw-x />
      </div>

      <div className="contact-fit">
        <h2 ref={fitRef} className="fit contact-word" data-chars>
          <span className="sr-only">{HEADLINE}</span>
          {HEADLINE.split("").map((char, index) => (
            <span className="char" key={`${char}-${index}`} aria-hidden="true">
              <span data-char>{char === " " ? "\u00A0" : char}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="contact-grid">
        <a ref={callRef} className="call" href={site.phoneHref} data-cursor="Open" data-magnetic data-reveal>
          <span className="call-label tag">Call or message</span>
          <span className="call-num">{site.phoneDisplay}</span>
          <span className="call-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </a>

        <dl className="contact-facts" data-stagger>
          <div>
            <dt className="tag">Name</dt>
            <dd>{site.name}</dd>
          </div>
          <div>
            <dt className="tag">Practice</dt>
            <dd>
              {site.title}
              <br />
              {site.secondary}
            </dd>
          </div>
          <div>
            <dt className="tag">Location</dt>
            <dd>{site.location}</dd>
          </div>
          <div>
            <dt className="tag">Elsewhere</dt>
            <dd>
              <ul className="contact-links">
                <li>
                  <ContactLink href={site.email} kind="email" label="Email" className="ulink" />
                </li>
                <li>
                  <ContactLink href={site.github} label="GitHub" className="ulink" />
                </li>
                <li>
                  <ContactLink href={site.linkedin} label="LinkedIn" className="ulink" />
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
