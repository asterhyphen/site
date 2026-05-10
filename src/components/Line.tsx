export default function Line({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`line ${className}`.trim()}>{children}</p>;
}
