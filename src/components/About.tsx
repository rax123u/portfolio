import { disciplines, facts, site } from "../data/site";
import { useMagnetic } from "../hooks/useMagnetic";

export function About() {
  const phoneRef = useMagnetic<HTMLAnchorElement>(0.25);
  const words = site.statement.split(" ");

  return (
    <section id="about" tabIndex={-1} className="sec about outline-none" data-theme="light">
      <div className="tag-row">
        <p className="tag">01 — About</p>
        <p className="tag-right">
          {site.name} · {site.location}
        </p>
        <span className="rule" data-draw-x />
      </div>

      <p className="sr-only">{site.statement}</p>
      <p className="words" data-words aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} data-word>
            {word}{" "}
          </span>
        ))}
      </p>

      <div className="about-grid">
        <aside className="about-side">
          <p data-reveal className="about-lead it">
            {site.aboutLead}
          </p>
          <dl className="facts" data-stagger>
            {facts.map((fact) => (
              <div key={fact.label} className="fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a ref={phoneRef} className="pill" href={site.phoneHref} data-cursor="Open" data-magnetic>
            <span className="pill-dot" />
            {site.phoneDisplay}
          </a>
        </aside>

        <div className="about-copy">
          <p data-reveal>
            I’m Muhammad Rayyan, a full stack developer in Pakistan. I build production-ready web
            applications across the interface, the API, and the server they ship on.
          </p>
          <p data-reveal>
            Frontend engineering, authenticated backends, databases, CMS and e-commerce integrations,
            and deployment. The work is one system, not a screen handed off from the rest.
          </p>
          <ol className="disciplines" data-stagger>
            {disciplines.map((item) => (
              <li key={item.number}>
                <span className="it">{item.number}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
