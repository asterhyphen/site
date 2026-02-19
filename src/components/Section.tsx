export default function Section({
  title,
  children,
}: {
  index?: number;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      {title && (
        <p className="command">
          <span className="yellow">{title}</span>
        </p>
      )}
      <div className="content">{children}</div>
    </section>
  );
}
