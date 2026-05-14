import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
      <div className="home-container sketch-border" style={{ marginTop: "50px" }}>
        <h1 className="hero-title">Redirecting...</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "400px" }}>Taking you to {targetUrl}</p>
        <a href={targetUrl} className="sketch-border" style={{ marginTop: "20px", display: "inline-block", padding: "10px 20px" }}>
          Open link manually
        </a>
      </div>
    );
  }

  return (
    <div className="home-container sketch-border" style={{ marginTop: "50px" }}>
      <h1 className="hero-title" style={{ color: "var(--accent-color)" }}>App Link Not Found</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "400px" }}>No redirect file matched this app link.</p>
      <Link to="/" className="sketch-border" style={{ marginTop: "20px", display: "inline-block", padding: "10px 20px" }}>
        Go back to home
      </Link>
    </div>
  );
}
