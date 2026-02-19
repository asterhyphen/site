import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <nav className="top-nav" aria-label="Primary">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Projects
      </NavLink>
    </nav>
  );
}
