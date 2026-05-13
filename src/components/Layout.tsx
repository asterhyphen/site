import type { ReactNode } from "react";
import TopNav from "./TopNav";

const desktopShortcuts = ["Desktop", "Projects", "Internet", "My Life"];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="overlay scanlines" />
      <main className="page-shell" role="main">
        <div className="desktop-frame" aria-hidden="true">
          <div className="desktop-menu">
            <span className="menu-mark">A5</span>
            <span>Play</span>
            <span>Edit</span>
            <span>Video</span>
            <span>Window</span>
            <span>Enjoy</span>
            <strong>/home/aster - portfolio</strong>
          </div>
          <div className="desktop-shortcuts">
            {desktopShortcuts.map((shortcut) => (
              <span className="desktop-shortcut" key={shortcut}>
                <span className="desktop-shortcut-icon" />
                {shortcut}
              </span>
            ))}
          </div>
        </div>
        <TopNav />
        <div id="main-content" className="page-content">
          {children}
        </div>
      </main>
    </>
  );
}
