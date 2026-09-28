import { useEffect, useRef } from "react";
import { projects } from "../data/content";
import Marquee from "../components/Marquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectGroups = [
  { key: "websites-apps", title: "Websites/Apps" },
  { key: "tools", title: "Tools" },
  { key: "college-projects", title: "College Projects" },
] as const;

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Projects";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate project group headings and cards
      projectGroups.forEach((group) => {
        const groupEl = document.querySelector(`.project-group-${group.key}`);
        if (!groupEl) return;

        const cards = groupEl.querySelectorAll(".project-card");
        gsap.from(cards, {
          scrollTrigger: {
            trigger: groupEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="projects-page-container">
      {/* Projects Header */}
      <section className="projects-hero-header">
      <div className="section-eyebrow" aria-hidden="true">SHOWCASE // COLLECTION</div>
        <h1 className="hero-title">My Projects</h1>
        <p className="projects-hero-subtitle" aria-hidden="true">
          Selected works spanning web applications, developer utilities, and academic systems.
        </p>
      </section>

      <Marquee text="NO SLEEP • MORE CAFFEINE • PROCRASTINATION •" />

      {/* Project Categories */}
      <div className="projects-content-wrapper">
        {projectGroups.map((group, groupIdx) => {
          const items = projects.filter((project) => project.category === group.key);
          if (!items.length) return null;

          return (
            <section
              key={group.key}
              className={`project-group-section project-group-${group.key}`}
            >
              <div className="project-group-header">
                <span className="project-group-index" aria-hidden="true">0{groupIdx + 1}</span>
                <h2 className="section-title">{group.title}</h2>
                <div className="project-group-line" aria-hidden="true" />
              </div>

              <div className="projects-grid">
                {items.map((project, i) => {
                  const isExternal = /^https?:\/\//.test(project.href);

                  return (
                    <a
                      key={`${group.key}-${i}`}
                      href={project.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="project-card"
                      data-cursor-hover
                    >
                      <div className="project-card-glass" aria-hidden="true" />
                      
                      <div className="project-card-top">
                        <div className="project-icon-wrapper">
                          <img
                            className="project-icon"
                            src={project.icon}
                            alt={`${project.label} icon`}
                            loading="lazy"
                          />
                        </div>
                        <span className="project-card-arrow" aria-hidden="true">↗</span>
                      </div>

                      <div className="project-card-body">
                        <div className="project-title" title={project.label}>
                          {project.label}
                        </div>
                        <div className="project-desc">
                          {project.description}
                        </div>
                      </div>

                      <div className="project-card-glow" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
