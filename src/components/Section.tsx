import { useRef, useEffect, useState } from "react";

export default function Section({
  index = 0,
  title,
  className = "",
  children,
}: {
  index?: number;
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const regionId = title ? `section-${index}` : undefined;

  return (
    <section
      ref={ref}
      id={regionId}
      aria-labelledby={title ? `${regionId}-title` : undefined}
      role="region"
      className={`section fade-in-section${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
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
    </section>
  );
}
