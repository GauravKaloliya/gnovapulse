"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";
import CircularProgress from "./CircularProgress";
import PathDrawingSVG from "./PathDrawingSVG";

function AnimatedStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          if (hasAnimated) return;
          setHasAnimated(true);
          let start = performance.now();
          const duration = 1500;
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  const display = target >= 1000 ? count.toLocaleString() : count;

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-num">{display}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const PHRASES = ["Actionable Intelligence", "Real-time Analytics", "Scalable Pipelines"];
const CHAR_SCRAMBLE = "!<>-_\\/[]{}—=+*^?#________";

function scrambleText(target: string, setter: (s: string) => void, duration = 400) {
  const chars = target.split("");
  const len = chars.length;
  const frameCount = Math.floor(duration / 30);
  let frame = 0;

  const interval = setInterval(() => {
    frame++;
    const progress = frame / frameCount;
    const revealCount = Math.floor(progress * len);
    const result = chars.map((c, i) =>
      i < revealCount ? c : CHAR_SCRAMBLE[Math.floor(Math.random() * CHAR_SCRAMBLE.length)]
    );
    setter(result.join(""));

    if (frame >= frameCount) {
      clearInterval(interval);
      setter(target);
    }
  }, 30);

  return () => clearInterval(interval);
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const scrambleCleanupRef = useRef<(() => void) | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  // 16. Split Character Reveal
  const [charsRevealed, setCharsRevealed] = useState(false);
  const splitRef = useRef<HTMLSpanElement>(null);
  // 19. Glitch
  const [glitching, setGlitching] = useState(false);
  // 34. Floating Depth Layers
  const depthRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // Entry animations
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".animate-entry").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 100);
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Multi-phrase Typewriter
  useEffect(() => {
    let cancelled = false;
    const phrase = PHRASES[phraseIndex];
    let i = 0;
    let deleting = false;

    const step = () => {
      if (cancelled) return;

      if (!deleting) {
        if (i <= phrase.length) {
          setTypedText(phrase.slice(0, i));
          i++;
          setTimeout(step, 45);
        } else {
          setTimeout(() => {
            deleting = true;
            step();
          }, 2000);
        }
      } else {
        if (i >= 0) {
          setTypedText(phrase.slice(0, i));
          i--;
          setTimeout(step, 30);
        } else {
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    };

    const timeout = setTimeout(step, 600);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [phraseIndex]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Parallax
  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${sy * 0.25}px)`;
      if (visualRef.current) visualRef.current.style.transform = `translateY(${sy * 0.12}px)`;
      if (contentRef.current) contentRef.current.style.transform = `translateY(${sy * 0.04}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text scramble on heading hover
  const handleHeadingEnter = useCallback(() => {
    const current = typedText || PHRASES[phraseIndex];
    if (scrambleCleanupRef.current) scrambleCleanupRef.current();
    scrambleCleanupRef.current = scrambleText(current, setTypedText, 300);
  }, [typedText, phraseIndex]);

  // Canvas wave
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const amplitude = 12;
      const frequency = 0.02;
      const speed = 2;

      ctx.beginPath();
      ctx.moveTo(0, h);

      for (let x = 0; x <= w; x += 2) {
        const y = h / 2 + Math.sin(x * frequency + time * speed) * amplitude
          + Math.sin(x * frequency * 0.5 + time * speed * 0.7) * (amplitude * 0.5);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, h);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(255, 153, 50, 0.08)");
      gradient.addColorStop(1, "rgba(255, 153, 50, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 16. Split Character Reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setCharsRevealed(true), 800);
    return () => clearTimeout(t);
  }, []);

  // 19. Glitch Text on hover
  const handleGlitchEnter = useCallback(() => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);
  }, []);

  // Cursor glow trail
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const trailRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    const animate = () => {
      const el = trailRef.current;
      if (el) {
        const dx = mouseRef.current.x - trail.x;
        const dy = mouseRef.current.y - trail.y;
        setTrail((prev) => ({ x: prev.x + dx * 0.1, y: prev.y + dy * 0.1 }));
        el.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
      }
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(id); window.removeEventListener("mousemove", handleMouse); };
  }, [trail.x, trail.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const hero = ref.current;
    const cube = cubeRef.current;
    if (!hero || !cube) return;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cube.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    hero.style.setProperty("--mx", `${e.clientX}px`);
    hero.style.setProperty("--my", `${e.clientY}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  }, []);

  // 34. Floating Depth Layers
  const setDepthRef = (i: number) => (el: HTMLDivElement | null) => { depthRefs.current[i] = el; };

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      depthRefs.current.forEach((el, i) => {
        if (el) {
          el.style.transform = `translateY(${sy * (0.06 + i * 0.04)}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="hero-section" ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="hero-dot-grid" aria-hidden="true" />
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-blob" aria-hidden="true" />
      <canvas ref={waveCanvasRef} className="hero-wave-canvas" aria-hidden="true" />
      <ParticleNetwork />
      <div className="cursor-glow-trail" ref={trailRef} aria-hidden="true" />
      {/* 34. Floating Depth Layers */}
      <div ref={setDepthRef(0)} className="depth-layer depth-layer-1" style={{ width: 200, height: 200, borderRadius: "50%", background: "rgba(255,153,50,0.03)", top: "20%", right: "10%", filter: "blur(40px)" }} />
      <div ref={setDepthRef(1)} className="depth-layer depth-layer-2" style={{ width: 140, height: 140, borderRadius: "50%", background: "rgba(23,43,54,0.04)", top: "60%", left: "5%", filter: "blur(30px)" }} />
      <div ref={setDepthRef(2)} className="depth-layer depth-layer-3" style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,153,50,0.02)", top: "40%", left: "50%", filter: "blur(20px)" }} />
      <div className="container hero-inner">
        <div className="hero-content" ref={contentRef}>
          <div className="hero-badge animate-entry">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>AI-Powered Data Automation</span>
          </div>
          <h1
            className={`hero-title animate-entry scramble-trigger${glitching ? " glitch-text" : ""}`}
            ref={headingRef}
            data-text="Transform Raw Data Into"
            onMouseEnter={() => { handleHeadingEnter(); handleGlitchEnter(); }}
          >
            {/* 16. Split Character Reveal */}
            <span ref={splitRef} className={charsRevealed ? "" : ""}>
              {"Transform Raw Data Into ".split("").map((char, i) => (
                <span
                  key={i}
                  className="split-char"
                  style={{
                    transitionDelay: `${i * 20}ms`,
                    opacity: charsRevealed ? 1 : undefined,
                    transform: charsRevealed ? "translateY(0)" : undefined,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="text-accent gradient-text">
              {typedText}
              <span className="typing-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
            </span>
          </h1>
          <p className="hero-desc animate-entry">
            GnovaPulse AI ingests, processes, and analyzes your data at scale —
            delivering real-time insights without the engineering overhead.
          </p>
          <div className="hero-actions animate-entry">
            <a href="#pricing" className="btn btn-primary btn-lg beacon-btn">
              Start Free Trial
            </a>
            <a href="#features" className="btn btn-outline btn-lg">
              Explore Features
            </a>
          </div>
          <div className="hero-stats animate-entry">
            <AnimatedStat target={10000} suffix="+" label="Active Users" />
            <AnimatedStat target={99} suffix=".9%" label="Uptime" />
            <AnimatedStat target={50000000} suffix="+" label="Records Processed" />
          </div>
          <div className="hero-progress-rings animate-entry" style={{ transitionDelay: "300ms" }}>
            <CircularProgress value={98} label="Accuracy" />
            <CircularProgress value={96} label="Precision" />
            <CircularProgress value={94} label="Recall" />
          </div>
        </div>
        <div className="hero-visual" ref={visualRef}>
          <div className="hero-cube-wrapper">
            <div className="hero-cube-3d" ref={cubeRef}>
              <div className="hero-cube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="512"
                  viewBox="0 0 16 16"
                  className="cube-icon"
                  aria-hidden="true"
                >
                  <path
                    fill="#FF9932"
                    d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="hero-orbs">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>
          <PathDrawingSVG
            className="hero-draw"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            delay={1.2}
          >
            <path d="M20,100 Q50,20 100,100 T180,100" fill="none" stroke="#FF9932" strokeWidth="2" opacity="0.3" />
            <path d="M20,120 Q60,60 100,120 T180,120" fill="none" stroke="#FF9932" strokeWidth="1.5" opacity="0.2" />
            <path d="M40,140 Q70,90 100,140 T160,140" fill="none" stroke="#FF9932" strokeWidth="1" opacity="0.15" />
          </PathDrawingSVG>
        </div>
      </div>
    </section>
  );
}
