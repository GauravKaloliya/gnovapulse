"use client";
import { useEffect, useRef } from "react";

export default function ScrollController() {
  const parallaxLayers = useRef<(HTMLDivElement | null)[]>([]);
  const kenBurnsBg = useRef<HTMLDivElement | null>(null);
  const lensShiftEls = useRef<(HTMLElement | null)[]>([]);

  const setParallaxRef = (i: number) => (el: HTMLDivElement | null) => {
    parallaxLayers.current[i] = el;
  };
  const setKenBurnsRef = (el: HTMLDivElement | null) => { kenBurnsBg.current = el; };
  const setLensShiftRef = (i: number) => (el: HTMLElement | null) => {
    lensShiftEls.current[i] = el;
  };

  useEffect(() => {
    const SPEEDS = [0.05, 0.12, 0.2, 0.08, 0.03];
    const LENS_AMPLITUDE = 20;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sy = window.scrollY;
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = maxScroll > 0 ? sy / maxScroll : 0;

          // 1. Multi-layer Parallax
          parallaxLayers.current.forEach((el, i) => {
            if (el) {
              el.style.transform = `translateY(${sy * SPEEDS[i]}px)`;
            }
          });

          // 4. Ken Burns
          if (kenBurnsBg.current) {
            const scale = 1 + progress * 0.15;
            kenBurnsBg.current.style.transform = `scale(${scale})`;
          }

          // 7. Lens Shift
          lensShiftEls.current.forEach((el) => {
            if (el) {
              const shift = Math.sin(sy * 0.001) * LENS_AMPLITUDE;
              el.style.transform = `translateX(${shift}px)`;
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. Multi-layer Parallax — invisible depth layers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={setParallaxRef(i)}
          className={`parallax-layer parallax-${i}`}
          aria-hidden="true"
          style={{
            inset: 0,
            background: i === 2
              ? "radial-gradient(ellipse at 30% 40%, rgba(255,153,50,0.03) 0%, transparent 60%)"
              : i === 4
              ? "radial-gradient(ellipse at 70% 60%, rgba(23,43,54,0.02) 0%, transparent 50%)"
              : "none",
            borderRadius: "50%",
            width: i === 0 ? "300px" : i === 1 ? "200px" : i === 3 ? "150px" : "100%",
            height: i === 0 ? "300px" : i === 1 ? "200px" : i === 3 ? "150px" : "100%",
            top: i === 0 ? "15%" : i === 1 ? "40%" : i === 3 ? "60%" : "auto",
            left: i === 0 ? "10%" : i === 1 ? "70%" : i === 3 ? "20%" : "auto",
          }}
        />
      ))}

      {/* 4. Ken Burns Background */}
      <div ref={setKenBurnsRef} className="ken-burns-bg" aria-hidden="true" />
    </>
  );
}

export function useScrollRevealEffects() {
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? sy / maxScroll : 0;

      // 3. Mask Reveal elements
      document.querySelectorAll<HTMLElement>(".mask-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const elProgress = Math.max(0, Math.min(1, (viewHeight - rect.top) / (viewHeight + rect.height)));
        const reveal = Math.min(1, elProgress * 2);
        el.style.clipPath = `inset(0 ${(1 - reveal) * 100}% 0 0)`;
      });

      // 6. Blur Reveal elements
      document.querySelectorAll<HTMLElement>(".blur-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const elProgress = Math.max(0, Math.min(1, (viewHeight - rect.top) / (viewHeight + rect.height)));
        const blurVal = Math.max(0, 8 * (1 - Math.min(1, elProgress * 2)));
        el.style.filter = `blur(${blurVal}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
