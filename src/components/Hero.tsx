import { site } from "../data/site";
import { useFitText } from "../hooks/useFitText";

const NAME = "Rayyan";

export function Hero() {
  const fitRef = useFitText<HTMLHeadingElement>();

  return (
    <section id="top" tabIndex={-1} className="hero outline-none" data-theme="dark">
      <div className="hero-inner" data-exit>
        <div className="hero-top">
          <p data-hero-fade className="tag">
            Portfolio — {site.year}
          </p>
          <p data-hero-fade className="hero-roles">
            <span>{site.title}</span>
            <span>{site.secondary}</span>
          </p>
        </div>

        <div className="hero-name" data-parallax="5">
          <span data-hero-fade className="hero-first it" aria-hidden="true">
            Muhammad
          </span>
          <h1 ref={fitRef} className="fit hero-word">
            <span className="sr-only">{site.name}</span>
            {NAME.split("").map((char, index) => (
              <span className="hero-char" key={`${char}-${index}`} aria-hidden="true">
                <span data-hero-line>{char}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-foot">
          <p data-hero-fade className="hero-statement">
            {site.statement}
          </p>
          <div data-hero-fade className="hero-cue" aria-hidden="true">
            <span className="cue-line" />
            <span className="tag">Scroll</span>
          </div>
          <p data-hero-fade className="hero-place it">
            {site.location}, building globally.
          </p>
        </div>
      </div>
    </section>
  );
}
