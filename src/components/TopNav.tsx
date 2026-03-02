import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <nav className="top-nav" role="navigation" aria-label="Primary">
      <NavLink
        to="/"
        end
        aria-label="Go to home page"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/projects"
        aria-label="View projects"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Projects
      </NavLink>
    </nav>
  );
}
