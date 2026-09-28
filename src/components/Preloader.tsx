import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      setIsDismissed(true);
      return;
    }

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              setIsDismissed(true);
              onComplete();
            },
          });
        },
      });

      // Initial state
      gsap.set(".symbol-glyph", { opacity: 0, scale: 0 });
      gsap.set(".complete-brandmark", { opacity: 0, scale: 0.8 });

      // 1. Individual glyph entrances
      tl.to(".star-glyph", {
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 0.5,
        ease: "back.out(2)",
      })
        .to(
          ".dot-glyph",
          {
            opacity: 1,
            scale: 1,
            y: -10,
            duration: 0.4,
            ease: "back.out(2)",
            yoyo: true,
            repeat: 1,
          },
          "-=0.2"
        )
        .to(
          ".dash-glyph",
          {
            opacity: 1,
            scale: 1,
            scaleX: 1.2,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.2"
        );

      // 2. Orbital spin / dynamic circular motion
      tl.to(".symbol-orbit-container", {
        rotation: 360,
        scale: 1.1,
        duration: 0.7,
        ease: "power2.inOut",
      });

      // 3. Morph/snap into the full, crisp, entire "*.-" display mark
      tl.to(".symbol-orbit-container", {
        opacity: 0,
        scale: 0.6,
        duration: 0.25,
        ease: "power2.in",
      })
        .to(
          ".complete-brandmark",
          {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.8)",
          },
          "-=0.1"
        )
        // 4. Highlight pulse & pause to let the full "*.-" be admired
        .to(".complete-brandmark", {
          textShadow: "0 0 35px rgba(200, 147, 90, 0.9)",
          color: "#f2e9df",
          duration: 0.4,
          ease: "power2.out",
        })
        .to(".complete-brandmark", {
          duration: 0.3, // Brief pause
        });

      const handleSkip = () => {
        tl.progress(1);
      };

      window.addEventListener("keydown", handleSkip, { once: true });
      window.addEventListener("click", handleSkip, { once: true });

      return () => {
        window.removeEventListener("keydown", handleSkip);
        window.removeEventListener("click", handleSkip);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="preloader-overlay"
    >
      <div className="preloader-symbol-stage">
        {/* Orbital animation phase */}
        <div className="symbol-orbit-container">
          <span className="symbol-glyph star-glyph">*</span>
          <span className="symbol-glyph dot-glyph">.</span>
          <span className="symbol-glyph dash-glyph">-</span>
        </div>

        {/* Final complete *.- display mark */}
        <div className="complete-brandmark">
          *.-
        </div>
      </div>
    </div>
  );
}
