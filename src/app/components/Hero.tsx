"use client";

import { useEffect, useRef, useState } from "react";
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

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-blob" aria-hidden="true" />
      {mounted && (
        <>
          <canvas className="hero-wave-canvas" aria-hidden="true" />
          <ParticleNetwork />
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
        </>
      )}
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>AI-Powered Data Automation</span>
          </div>
          <h1 className="hero-title">
            Transform Raw Data Into <span className="text-accent gradient-text">Actionable Intelligence</span>
          </h1>
          <p className="hero-desc">
            GnovaPulse AI ingests, processes, and analyzes your data at scale —
            delivering real-time insights without the engineering overhead.
          </p>
          <div className="hero-actions">
            <a href="#pricing" className="btn btn-primary btn-lg beacon-btn">
              Start Free Trial
            </a>
            <a href="#features" className="btn btn-outline btn-lg">
              Explore Features
            </a>
          </div>
          <div className="hero-stats">
            <AnimatedStat target={10000} suffix="+" label="Active Users" />
            <AnimatedStat target={99} suffix=".9%" label="Uptime" />
            <AnimatedStat target={50000000} suffix="+" label="Records Processed" />
          </div>
          <div className="hero-progress-rings">
            <CircularProgress value={98} label="Accuracy" />
            <CircularProgress value={96} label="Precision" />
            <CircularProgress value={94} label="Recall" />
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-cube-wrapper">
            <div className="hero-cube-3d">
              <div className="hero-cube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512" height="512" viewBox="0 0 16 16"
                  className="cube-icon" aria-hidden="true"
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
        </div>
      </div>
    </section>
  );
}
