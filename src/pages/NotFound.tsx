import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Her love for me";
  }, []);

  return (
    <div className="not-found-page-container">
      <div className="not-found-card">
        <div className="section-eyebrow" aria-hidden="true">ERROR // 404</div>
        <h1 className="hero-title not-found-title">404</h1>
        <p className="not-found-desc">
          Oopsies, you weren't supposed to reach this page. Either it is TOP SECRET (shh) or it doesn't exist (oops).
        </p>
        <Link to="/" className="luxury-btn" data-cursor-hover>
          <span>Go back to home</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
