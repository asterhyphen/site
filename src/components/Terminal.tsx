import { intro, about, socials } from "../data/content";
import Icon from "../assets/Icon.png";
import { useEffect } from "react";

function decodeEntities(value: string) {
  return value
    .replace(/&#58;/g, ":")
    .replace(/&#64;/g, "@")
    .replace(/&#46;/g, ".");
}

export default function Terminal() {
  useEffect(() => {
    document.title = "Ahmed.-";
  }, []);

  return (
    <div className="home-container sketch-border">
      <img src={Icon} alt="Ahmed's Profile" className="profile-pic" />
      
      <div>
        <h1 className="hero-title">Hey, I'm Ahmed! <span className="prompt">_</span></h1>
        <h2 className="hero-subtitle">
          {intro.map(i => i.text).join(' ')}
        </h2>
      </div>

      <div style={{ textAlign: "left", width: "100%", maxWidth: "600px", marginTop: "1rem" }}>
        <h3 className="section-title">About Me</h3>
        <ul>
          {about.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="social-links">
        {socials.map((s, idx) => (
          <a 
            key={idx} 
            href={decodeEntities(s.href)}
            target={s.icon === "email" ? undefined : "_blank"}
            rel={s.icon === "email" ? undefined : "noopener noreferrer"}
            className="sketch-border"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
