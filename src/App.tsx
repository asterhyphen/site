import { Routes, Route } from "react-router-dom";
import Terminal from "./components/Terminal";
import CTF from "./pages/CTF";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <>
      <div className="overlay" />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Terminal />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ctf" element={<CTF />} />
        </Routes>
      </main>
    </>
  );
}
