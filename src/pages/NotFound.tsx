import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div className="home-container sketch-border" style={{ marginTop: "50px" }}>
      <h1 className="hero-title" style={{ color: "var(--accent-color)" }}>404</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "400px" }}>
        Oopsies, you weren't supposed to reach this page. Either it is secret or it doesn't exist.
      </p>
      <Link to="/" className="sketch-border" style={{ marginTop: "20px", display: "inline-block", padding: "10px 20px" }}>
        Go back to home
      </Link>
    </div>
  );
}
