import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Terminal from "./components/Terminal";
import CTF from "./pages/CTF";
import Letter from "./pages/letter";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import TopNav from "./components/TopNav";

export default function App() {
  const location = useLocation();

  // scroll to top whenever the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="overlay" />
      <main className="page-shell" role="main">
        <TopNav />
        <div id="main-content" className="page-content">
          <Routes>
            <Route path="/" element={<Terminal />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/ctf" element={<CTF />} />
            <Route path="/letter" element={<Letter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
