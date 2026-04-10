import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Section from "../components/Section";
import TerminalHeader from "../components/TerminalHeader";

const appFiles = import.meta.glob("./app/*", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const redirectMap = Object.entries(appFiles).reduce<Record<string, string>>((map, [path, content]) => {
  const fileName = path.split("/").pop();

  if (!fileName) {
    return map;
  }

  const slug = fileName.replace(/\.[^/.]+$/, "");
  const url = content.trim();

  if (slug && url) {
    map[slug] = url;
  }

  return map;
}, {});

export default function AppRedirect() {
  const { slug } = useParams();
  const targetUrl = slug ? redirectMap[slug] : undefined;

  useEffect(() => {
    if (targetUrl) {
      document.title = `Redirecting to ${slug}`;
      window.location.replace(targetUrl);
      return;
    }

    document.title = "App link not found";
  }, [slug, targetUrl]);

  if (targetUrl) {
    return (
      <div className="terminal no-animations">
        <TerminalHeader />
        <Section index={0} title="Redirecting">
          <p className="line">Taking you to {targetUrl}</p>
          <p className="line">
            If nothing happens, <a href={targetUrl}>open the link manually</a>.
          </p>
        </Section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="terminal no-animations">
      <TerminalHeader />
      <Section index={0} title="App Link Not Found">
        <p className="line">No redirect file matched this app link.</p>
        <p className="line">
          Add a file in <code>src/pages/app</code> named after the slug and put the destination URL inside it.
        </p>
        <p className="line">
          <Link to="/">go back to home</Link>
        </p>
      </Section>
      <Footer />
    </div>
  );
}
