import { intro, about, projects, socials } from "../data/content";
import TerminalHeader from "./TerminalHeader";
import Section from "./Section";
import Line from "./Line";
import LinkLine from "./LinkLine";

export default function Terminal() {
  return (
    <div className="terminal">
      <TerminalHeader />

      <Section index={0}>
        {intro.map((i, idx) => (
          <Line key={idx}>
            <span className="yellow">&gt; {i.text}</span>
          </Line>
        ))}
      </Section>

      <Section index={1} title="about">
        {about.map((l, i) => (
          <Line key={i}>▶ {l}</Line>
        ))}
      </Section>

      <Section index={2} title="projects">
        {projects.map((p, i) => (
          <LinkLine key={i} label={p.label} href={p.href} />
        ))}
      </Section>

      <Section index={3} title="socials">
        {socials.map((s, i) => (
          <LinkLine key={i} label={s.label} href={s.href} />
        ))}
      </Section>

      <footer className="footer">
        <p className="line dim">
          # Made with ❤️ by Aster. | ahmed@asterhyphen.xyz -
        </p>
      </footer>
    </div>
  );
}
