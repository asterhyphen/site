import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Terminal from "./components/Terminal";
import Letter from "./pages/letter";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import AppRedirect from "./pages/AppRedirect";
import Layout from "./components/Layout";

export default function App() {
  const location = useLocation();

  // scroll to top whenever the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Terminal />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/app/:slug" element={<AppRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
