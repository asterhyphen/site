import { projects } from "../data/content";
import TerminalHeader from "../components/TerminalHeader";
import Section from "../components/Section";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <div className="terminal no-animations">
      <TerminalHeader />

      <Section index={0} title="projects">
        <div className="project-list">
          {projects.map((project, i) => {
            const isExternal = /^https?:\/\//.test(project.href);

            return (
              <article key={i} className="project-item">
                <img
                  className="project-icon"
                  src={project.icon}
                  alt={`${project.label} placeholder`}
                />
                <div className="project-copy">
                  <p className="line project-title">
                    {isExternal ? (
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {project.label}
                      </a>
                    ) : (
                      <Link to={project.href}>{project.label}</Link>
                    )}
                  </p>
                  <p className="project-description">{project.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
