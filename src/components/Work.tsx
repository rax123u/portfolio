import { projects } from "../data/projects";

const total = String(projects.length).padStart(2, "0");

export function Work() {
  return (
    <section id="work" tabIndex={-1} className="sec work outline-none" data-theme="dark">
      <header className="work-head">
        <div className="tag-row">
          <p className="tag">02 — Selected Work</p>
          <p className="tag-right">{total} projects</p>
          <span className="rule" data-draw-x />
        </div>
        <h2 className="h-xl work-title">
          <span className="block overflow-hidden">
            <span data-line className="block">
              Selected
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block">
              <span className="it">work</span>
            </span>
          </span>
        </h2>
      </header>

      <div className="stack" data-stack>
        {projects.map((project, index) => (
          <article key={project.id} className="panel" data-panel aria-label={`${project.number} ${project.name}`}>
            <div className="panel-inner" data-panel-inner>
              <div className="panel-top">
                <span className="panel-num it">{project.number}</span>
                <span className="panel-cat">{project.category}</span>
              </div>

              <h3 className="panel-title">{project.name}</h3>

              <div className="panel-media" data-pan data-cursor="Project">
                <div className="panel-frame" data-mask>
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    width={1680}
                    height={936}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                    data-pan-target
                    data-zoom
                  />
                </div>
              </div>

              <p className="panel-desc">{project.description}</p>

              <div className="panel-foot">
                <ul className="panel-tech">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="panel-meta">
                  <span>
                    {project.number} / {total}
                  </span>
                  {project.url ? (
                    <a className="ulink" href={project.url} data-cursor="View" target="_blank" rel="noreferrer noopener">
                      View project
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
