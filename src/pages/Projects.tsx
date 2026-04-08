import type { ComponentType, ReactNode } from "react";
import { projects } from "../data/content";
import TerminalHeader from "../components/TerminalHeader";
import Section from "../components/Section";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { Link } from "react-router-dom";

const projectGroups = [
  { key: "websites-apps", title: "Websites/Apps" },
  { key: "tools", title: "Tools" },
  { key: "college-projects", title: "College Projects" },
] as const;

import { useEffect } from "react";

export default function Projects() {
  useEffect(() => {
    document.title = "Projects";
  }, []);

  return (
    <div className="terminal no-animations">
      <TerminalHeader />

      

      {projectGroups.map((group, sectionIndex) => {
        const items = projects.filter((project) => project.category === group.key);
        if (!items.length) return null;

        return (
          <Section
            key={group.key}
            index={sectionIndex}
            title={group.title}
            className="project-section"
            reveal
            delay={sectionIndex * 70}
          >
            <div className="project-list">
              {items.map((project, i) => {
                const isExternal = /^https?:\/\//.test(project.href);

                // make whole article clickable for better tap/click UX
                const Wrapper: ComponentType<{ children: ReactNode }> =
                  isExternal
                    ? ({ children }) => (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          {children}
                        </a>
                      )
                    : ({ children }) => (
                        <Link to={project.href} className="project-link">
                          {children}
                        </Link>
                      );

                return (
                  <ScrollReveal
                    key={`${group.key}-${i}`}
                    as="article"
                    className="project-item"
                    delay={100 + i * 70}
                  >
                    <Wrapper>
                      <img
                        className="project-icon"
                        src={project.icon}
                        alt={`${project.label} icon`}
                        loading="lazy"
                      />
                      <div className="project-copy">
                        <p className="line project-title" title={project.label}>{project.label}</p>
                        <p className="project-description">
                          {project.description}
                        </p>
                      </div>
                    </Wrapper>
                  </ScrollReveal>
                );
              })}
            </div>
          </Section>
        );
      })}

      <Footer />
    </div>
  );
}
