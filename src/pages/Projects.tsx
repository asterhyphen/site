import { projects } from "../data/content";
import { useEffect } from "react";

const projectGroups = [
  { key: "websites-apps", title: "Websites/Apps" },
  { key: "tools", title: "Tools" },
  { key: "college-projects", title: "College Projects" },
] as const;

export default function Projects() {
  useEffect(() => {
    document.title = "Projects";
  }, []);

  return (
    <div className="projects-container sketch-border">
      <h1 className="hero-title" style={{ textAlign: "center", marginBottom: "30px" }}>My Projects</h1>
      
      {projectGroups.map((group) => {
        const items = projects.filter((project) => project.category === group.key);
        if (!items.length) return null;

        return (
          <div key={group.key} style={{ marginBottom: "40px", width: "100%", textAlign: "left" }}>
            <h2 className="section-title">{group.title}</h2>
            
            <div className="projects-grid">
              {items.map((project, i) => {
                const isExternal = /^https?:\/\//.test(project.href);

                return (
                  <a
                    key={`${group.key}-${i}`}
                    href={project.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="project-card sketch-border"
                  >
                    <img
                      className="project-icon"
                      src={project.icon}
                      alt={`${project.label} icon`}
                      loading="lazy"
                    />
                    <div className="project-title" title={project.label}>{project.label}</div>
                    <div className="project-desc">{project.description}</div>
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
