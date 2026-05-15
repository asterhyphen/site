import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-container">
      <div className="pc-outline">
        <div className="pc-header sketch-border-bottom">
          <div className="pc-buttons">
            <span className="pc-btn close"></span>
            <span className="pc-btn min"></span>
            <span className="pc-btn max"></span>
          </div>
          <div className="pc-title">ahmed_portfolio.exe</div>
          <div style={{ width: "60px" }}></div> {/* Spacer to center title */}
        </div>
        <div className="app-layout">
          <nav className="nav-bar sketch-border">
            <div className="nav-logo">
              <Link to="/">Ahmed.-</Link>
            </div>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/projects" className="nav-link">Projects</Link>
            </div>
          </nav>
          <main className="page-content" role="main">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
