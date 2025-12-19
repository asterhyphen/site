import { Routes, Route } from "react-router-dom";
import Terminal from "./components/Terminal";
import CTF from "./pages/CTF";

export default function App() {
  return (
    <>
      <div className="overlay" />
      <Routes>
        <Route path="/" element={<Terminal />} />
        <Route path="/ctf" element={<CTF />} />
      </Routes>
    </>
  );
}
