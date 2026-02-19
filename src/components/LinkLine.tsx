import { Link } from "react-router-dom";

export default function LinkLine({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <p className="line">
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link to={href}>{label}</Link>
      )}
    </p>
  );
}
