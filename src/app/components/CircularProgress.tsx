"use client";
import { useEffect, useRef, useState } from "react";

export default function CircularProgress({ value, label }: { value: number; label: string }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const r = 30;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated ? value / 100 : 0) * circ;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 300);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="circular-progress">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255, 153, 50, 0.08)" strokeWidth="4" />
        <circle
          cx="40" cy="40" r={r}
          fill="none" stroke="#FF9932" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
        <text x="40" y="40" textAnchor="middle" dominantBaseline="central" fill="#172B36" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {Math.round(value)}%
        </text>
      </svg>
      <span className="circular-label">{label}</span>
    </div>
  );
}
