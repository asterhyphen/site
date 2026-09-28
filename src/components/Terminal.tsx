import { useEffect, useRef } from "react";
import { intro, about, socials } from "../data/content";
import Icon from "../assets/Icon.png";
import HeroScene from "./HeroScene";
import Marquee from "./Marquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function decodeEntities(value: string) {
  return value
    .replace(/&#58;/g, ":")
    .replace(/&#64;/g, "@")
    .replace(/&#46;/g, ".");
}

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Ahmed.-";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero headline entrance
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // About editorial text lines scroll reveal
      const aboutLines = gsap.utils.toArray<HTMLElement>(".about-narrative-line");
      if (aboutLines.length > 0) {
        gsap.from(aboutLines, {
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <HeroScene />

        <div className="hero-content-wrapper">

          <div className="hero-profile-container">
            <div className="profile-frame">
              <img
                src={Icon}
                alt="Ahmed's Profile"
                className="profile-pic"
                loading="eager"
              />
              <div className="profile-frame-border" aria-hidden="true" />
            </div>
          </div>

          <div className="hero-title-group">
            <h1 ref={heroTextRef} className="hero-title">
              Hey, I'm Ahmed! <span className="prompt" aria-hidden="true">_</span>
            </h1>
            <h2 className="hero-subtitle">
              {intro.map((i) => i.text).join(" ")}
            </h2>
          </div>

          <div className="hero-scroll-prompt" aria-hidden="true">
            <span className="scroll-arrow">↓</span>
            <span className="scroll-label">SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      {/* Decorative Marquee strip */}
      <Marquee text="AVID CAFFEINE CONSUMER • CARPE DIEM • MEMENTO MORI • DPS HAS MY HEART •" />

      {/* About Section - Seamless Editorial Narrative */}
      <section ref={aboutSectionRef} className="about-section">
        <div className="about-editorial-container">
          <div className="section-header">
            <div className="section-eyebrow" aria-hidden="true">01 // INFORMATION</div>
            <h3 className="section-title">About Me</h3>
          </div>

          <div className="about-narrative-flow">
            <ul className="about-lines-list">
              {about.map((line, idx) => (
                <li key={idx} className="about-narrative-line">
                  <span className="about-bullet-dash" aria-hidden="true">—</span>
                  <p className="about-line-text">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Socials / Connect Section */}
      <section className="socials-section">
        <div className="section-header">
          <div className="section-eyebrow" aria-hidden="true">02 // NETWORK</div>
          <h3 className="section-title">Connect</h3>
        </div>

        <div className="social-links-grid">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href={decodeEntities(s.href)}
              target={s.icon === "email" ? undefined : "_blank"}
              rel={s.icon === "email" ? undefined : "noopener noreferrer"}
              className="social-card-btn"
              data-cursor-hover
            >
              <div className="social-card-inner">
                <span className="social-label">{s.label}</span>
                <span className="social-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="social-glow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
