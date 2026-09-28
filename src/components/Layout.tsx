import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="app-shell">
      <Preloader onComplete={() => setHasLoaded(true)} />
      <CustomCursor />
      
      {/* Background ambient lighting and noise */}
      <div aria-hidden="true" className="noise-overlay" />
      <div aria-hidden="true" className="ambient-glow" />

      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="nav-logo">
            <Link to="/" className="logo-link">
              <span className="logo-text">Ahmed.-</span>
            </Link>
          </div>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <div className="nav-links">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className={`nav-link ${location.pathname === "/projects" ? "active" : ""}`}
              >
                Projects
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className={`menu-toggle-btn ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="menu-btn-line top" aria-hidden="true" />
            <span className="menu-btn-line bottom" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fullscreen-menu-overlay ${isMenuOpen ? "active" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
        <div className="menu-inner">
          <div className="menu-nav-links">
            <Link
              to="/"
              className={`menu-nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="menu-num" aria-hidden="true">01</span>
              <span className="menu-text">Home</span>
            </Link>
            <Link
              to="/projects"
              className={`menu-nav-link ${location.pathname === "/projects" ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="menu-num" aria-hidden="true">02</span>
              <span className="menu-text">Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Page Content */}
      <main className={`page-content-wrapper ${hasLoaded ? "loaded" : ""}`} role="main">
        {children}
      </main>
    </div>
  );
}
