"use client";
import { useEffect, useRef } from "react";

export default function CinematicOverlays() {
  const vignetteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (vignetteRef.current) {
            vignetteRef.current.classList.toggle("active", scrollY > 100);
          }

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 8. Dynamic Vignette */}
      <div ref={vignetteRef} className="cine-vignette pulse" aria-hidden="true" />

      {/* 10. Light Leak */}
      <div className="cine-leak" aria-hidden="true">
        <div className="cine-leak-beam" />
      </div>

      {/* 11. Film Grain */}
      <div className="cine-grain" aria-hidden="true" />

      {/* 12. Aurora / Nebula */}
      <div className="cine-aurora" aria-hidden="true">
        <div className="cine-aurora-band" />
        <div className="cine-aurora-band" />
        <div className="cine-aurora-band" />
      </div>

      {/* 14. Depth Fog */}
      <div className="cine-fog" aria-hidden="true" />

      {/* 15. God Rays */}
      <div className="cine-rays" aria-hidden="true">
        <div className="cine-ray" style={{ "--ray-angle": "-15deg" } as React.CSSProperties} />
        <div className="cine-ray" style={{ "--ray-angle": "-8deg" } as React.CSSProperties} />
        <div className="cine-ray" style={{ "--ray-angle": "-20deg" } as React.CSSProperties} />
        <div className="cine-ray" style={{ "--ray-angle": "-12deg" } as React.CSSProperties} />
      </div>
    </>
  );
}
