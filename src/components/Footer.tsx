export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="line dim">© {year} Ahmed Siddiqua. All rights reserved.</p>
    </footer>
  );
}
