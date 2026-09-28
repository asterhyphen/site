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
      <div className="redirect-page-container">
        <div className="redirect-card">
          <div className="section-eyebrow" aria-hidden="true">NAVIGATING // EXTERNAL</div>
          <h1 className="hero-title">Redirecting...</h1>
          <p className="redirect-desc">Taking you to {targetUrl}</p>
          <a href={targetUrl} className="luxury-btn" data-cursor-hover>
            <span>Open link manually</span>
            <span className="btn-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="redirect-page-container">
      <div className="redirect-card">
        <div className="section-eyebrow" aria-hidden="true">ERROR // INVALID ROUTE</div>
        <h1 className="hero-title">App Link Not Found</h1>
        <p className="redirect-desc">No redirect file matched this app link.</p>
        <Link to="/" className="luxury-btn" data-cursor-hover>
          <span>Go back to home</span>
          <span className="btn-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
