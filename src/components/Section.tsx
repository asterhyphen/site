export default function Section({
  index,
  title,
  children,
}: {
  index: number;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="section"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {title && (
        <p className="command">
          <span className="yellow">&gt; {title}</span>
        </p>
      )}
      <div className="content">{children}</div>
    </section>
  );
}
