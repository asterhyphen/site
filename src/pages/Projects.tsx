import { projects } from "../data/content";
import TerminalHeader from "../components/TerminalHeader";
import Section from "../components/Section";
import LinkLine from "../components/LinkLine";

export default function Projects() {
  return (
    <div className="terminal">
      <TerminalHeader />

      <Section index={0} title="projects">
        {projects.map((project, i) => (
          <LinkLine key={i} label={project.label} href={project.href} />
        ))}
      </Section>

      <Section index={1} title="navigation">
        <LinkLine label="Back to Home" href="/" />
      </Section>
    </div>
  );
}
