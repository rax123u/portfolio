import { kineticStack, practice, services, skillGroups } from "../data/skills";
import { Badge } from "./Badge";
import { Marquee } from "./Marquee";

export function Services() {
  return (
    <section id="stack" tabIndex={-1} className="sec caps outline-none" data-theme="light">
      <div className="tag-row">
        <p className="tag">04 — Capabilities</p>
        <p className="tag-right">Interface to infrastructure</p>
        <span className="rule" data-draw-x />
      </div>

      <div className="caps-grid">
        <div className="caps-side">
          <h2 className="h-xl caps-title">
            <span className="block overflow-hidden">
              <span data-line className="block">
                What
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-line className="block">
                I <span className="it">build</span>
              </span>
            </span>
          </h2>
          <Badge text="Available for work — Freelance — Remote" />
        </div>

        <ol className="caps-list">
          {services.map((service) => (
            <li key={service.number} className="cap-row" data-reveal>
              <span className="cap-num it">{service.number}</span>
              <div className="cap-body">
                <h3 className="cap-title">{service.title}</h3>
                <p className="cap-desc it">{service.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="marquees">
        <Marquee items={kineticStack} className="marquee-large" />
        <Marquee items={practice} reverse className="marquee-small" />
      </div>

      <div className="stack-groups">
        {skillGroups.map((group) => (
          <div key={group.id} className="stack-group">
            <p className="tag">
              {group.number} — {group.label}
            </p>
            <p className="stack-summary it">{group.summary}</p>
            <ul data-stagger>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
