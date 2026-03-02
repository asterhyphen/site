import { Link } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import TerminalHeader from "../components/TerminalHeader";
import Section from "../components/Section";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return (
    <div className="terminal no-animations">
      <TerminalHeader />
      <Section index={0} title="404">
        <p className="line">
          Oops, the page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <p className="line">
          <Link to="/">Return home</Link>
        </p>
      </Section>
      <Footer />
    </div>
  );
}
