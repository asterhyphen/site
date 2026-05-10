import type { ReactNode } from "react";
import TopNav from "./TopNav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="overlay scanlines" />
      <main className="page-shell" role="main">
        <TopNav />
        <div id="main-content" className="page-content">
          {children}
        </div>
      </main>
    </>
  );
}
