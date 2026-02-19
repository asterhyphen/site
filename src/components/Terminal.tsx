import { intro, about, socials } from "../data/content";
import TerminalHeader from "./TerminalHeader";
import Section from "./Section";
import Line from "./Line";

function decodeEntities(value: string) {
  return value
    .replace(/&#58;/g, ":")
    .replace(/&#64;/g, "@")
    .replace(/&#46;/g, ".");
}

function SocialIcon({ type }: { type: "linkedin" | "github" | "instagram" | "email" }) {
  if (type === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.94 8.5v9.87H3.66V8.5h3.28Zm.2-3.05a1.9 1.9 0 1 1-3.8 0 1.9 1.9 0 0 1 3.8 0Zm13.2 7.26v5.66h-3.26V13.2c0-1.3-.46-2.18-1.63-2.18-.89 0-1.41.6-1.64 1.17-.09.2-.11.48-.11.75v5.43H10.4V8.5h3.12v1.4h.05c.42-.64 1.18-1.55 2.87-1.55 2.1 0 3.68 1.37 3.68 4.36Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Zm2.9 13.5a2.9 2.9 0 0 1-2.9 2.9h-9a2.9 2.9 0 0 1-2.9-2.9v-9a2.9 2.9 0 0 1 2.9-2.9h9a2.9 2.9 0 0 1 2.9 2.9v9Z"
          fill="currentColor"
        />
        <path
          d="M12 7.8A4.2 4.2 0 1 0 16.2 12 4.2 4.2 0 0 0 12 7.8Zm0 6.8a2.6 2.6 0 1 1 2.6-2.6A2.6 2.6 0 0 1 12 14.6Z"
          fill="currentColor"
        />
        <circle cx="16.9" cy="7.2" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3.5 6.5h17A1.5 1.5 0 0 1 22 8v8a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 16V8a1.5 1.5 0 0 1 1.5-1.5Zm0 1.8v.3l8.5 5.2 8.5-5.2v-.3h-17Zm17 7.4V10l-8.1 5a.7.7 0 0 1-.8 0l-8.1-5v5.7h17Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.95-.82-1.14-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.52 7.52 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 8 0Z"
          fill="currentColor"
        />
    </svg>
  );
}

export default function Terminal() {
  return (
    <div className="terminal">
      <TerminalHeader />

      <Section index={0}>
        {intro.map((i, idx) => (
          <Line key={idx}>{i.text}</Line>
        ))}
      </Section>

      <Section index={1} title="about">
        {about.map((l, i) => (
          <Line key={i}>{l}</Line>
        ))}
      </Section>

      <Section index={2} title="socials">
        <div className="social-icons">
        {socials.map((s, i) => (
          <a
            key={i}
            className="social-icon-link"
            href={decodeEntities(s.href)}
            aria-label={s.label}
            title={s.label}
            target={s.icon === "email" ? undefined : "_blank"}
            rel={s.icon === "email" ? undefined : "noopener noreferrer"}
          >
            <SocialIcon type={s.icon} />
          </a>
        ))}
        </div>
      </Section>

      <footer className="footer">
        <p className="line dim">
          # Made with ❤️ by Ahmed.-
        </p>
      </footer>
    </div>
  );
}
