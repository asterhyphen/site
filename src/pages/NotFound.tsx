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
          Oopsies, you weren&rsquo;t supposed to be reach this page, either it is secret or it doesn&rsquo;t exist, either way,
        </p>
        <p className="line">
          <Link to="/">go back to home</Link>
        </p>
      </Section>
      <Footer />
    </div>
  );
}
