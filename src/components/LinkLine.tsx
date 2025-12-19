export default function LinkLine({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <p className="line">
      ▶{" "}
      <a href={href} target="_blank" rel="noopener">
        {label}
      </a>
    </p>
  );
}
