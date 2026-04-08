import ScrollReveal from "./ScrollReveal";

export default function Section({
  index = 0,
  title,
  className = "",
  reveal = false,
  delay = 0,
  children,
}: {
  index?: number;
  title?: string;
  className?: string;
  reveal?: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  const regionId = title ? `section-${index}` : undefined;

  return (
    <ScrollReveal
      as="section"
      disabled={!reveal}
      delay={delay}
      id={regionId}
      aria-labelledby={title ? `${regionId}-title` : undefined}
      role="region"
      className={`section${className ? ` ${className}` : ""}`}
    >
      {title && (
        <h2 id={`${regionId}-title`} className="command">
          <span className="prompt" aria-hidden="true">
            &gt;
          </span>
          <span className="yellow">{title}</span>
        </h2>
      )}
      <div className="content">{children}</div>
    </ScrollReveal>
  );
}
