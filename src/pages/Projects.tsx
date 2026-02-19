import { projects } from "../data/content";
import TerminalHeader from "../components/TerminalHeader";
import Section from "../components/Section";
import { Link } from "react-router-dom";

const projectGroups = [
  { key: "websites-apps", title: "Websites/Apps" },
  { key: "tools", title: "Tools" },
  { key: "college-projects", title: "College Projects" },
] as const;

export default function Projects() {
  return (
    <div className="terminal no-animations">
      <TerminalHeader />

      <Section index={0} title="projects">
        {projectGroups.map((group) => {
          const items = projects.filter((project) => project.category === group.key);
          if (!items.length) return null;

          return (
            <div key={group.key} className="project-group">
              <h3 className="project-group-title">{group.title}</h3>

              <div className="project-list">
                {items.map((project, i) => {
                  const isExternal = /^https?:\/\//.test(project.href);

                  return (
                    <article key={`${group.key}-${i}`} className="project-item">
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
            </div>
          );
        })}
      </Section>
    </div>
  );
}
