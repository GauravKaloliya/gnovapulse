"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURES = [
  {
    title: "Smart Data Extraction",
    desc: "AI-powered parsing that extracts structured data from unstructured documents, emails, PDFs, and images with 99.7% accuracy.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 16 16" aria-hidden="true">
        <path fill="#172B36" d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
      </svg>
    ),
  },
  {
    title: "Real-time Analytics",
    desc: "Live dashboards with millisecond latency. Track KPIs, build charts, and share reports instantly.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" aria-hidden="true">
        <g fill="none" stroke="#172B36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
          <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
        </g>
      </svg>
    ),
  },
  {
    title: "Automated Workflows",
    desc: "No-code pipeline builder. Connect, transform, and route data between 200+ services with drag-and-drop simplicity.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="#172B36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: "Intelligent Monitoring",
    desc: "Proactive anomaly detection with ML-driven alerts. Catch issues before they impact your business.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 20 20" aria-hidden="true">
        <path fill="#172B36" d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
      </svg>
    ),
  },
  {
    title: "API Ecosystem",
    desc: "200+ native integrations with REST, GraphQL, and Webhook support. Connect your entire stack effortlessly.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#172B36" fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037a.75.75 0 0 1-.646 1.353a5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353a5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037a.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "Enterprise Security",
    desc: "End-to-end encryption, SOC 2 compliance, RBAC, and audit logs. Your data stays yours.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" aria-hidden="true">
        <g fill="none" stroke="#172B36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
          <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93c.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204c.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78c-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107c-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93c-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204c-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78c.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107c.397-.165.71-.505.78-.929l.15-.894Z" />
          <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
        </g>
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredBentoIndex, setHoveredBentoIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const prevMobileRef = useRef(false);
  const { ref: revealRef, isVisible: revealVisible } = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const check = () => {
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);
      if (nowMobile && !prevMobileRef.current && hoveredBentoIndex >= 0) {
        setActiveIndex(hoveredBentoIndex);
      }
      prevMobileRef.current = nowMobile;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [hoveredBentoIndex]);

  const toggleAccordion = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  }, []);

  return (
    <section id="features" className="features-section" ref={revealRef}>
      <div className="container">
        <div className="section-label">Features</div>
        <h2 className={`section-title scroll-reveal-left${revealVisible ? " visible" : ""}`}>
          Everything You Need to <span className="text-accent">Dominate Data</span>
        </h2>
        <p className={`section-desc scroll-reveal${revealVisible ? " visible" : ""}`}>
          From ingestion to visualization, GnovaPulse provides a complete toolkit for modern data teams.
        </p>

        <div className={`bento-grid scroll-reveal${revealVisible ? " visible" : ""}`} id="bento-grid" style={{ transitionDelay: "150ms" }}>
          {FEATURES.map((f, i) => {
            const classes = [
              "bento-item",
              i === 0 ? "bento-tall" : "",
              i === 3 ? "bento-wide" : "",
              i === 5 ? "bento-wide" : "",
              hoveredBentoIndex === i ? "hovered" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div
                key={i}
                className={classes}
                data-index={i}
                onMouseEnter={() => setHoveredBentoIndex(i)}
                onMouseLeave={() => setHoveredBentoIndex((prev) => (prev === i ? -1 : prev))}
              >
                <div className="bento-icon">{f.icon}</div>
                <h3 className="bento-title">{f.title}</h3>
                <p className="bento-desc">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <div className={`accordion scroll-reveal${revealVisible ? " visible" : ""}`} id="accordion" style={{ transitionDelay: "150ms" }}>
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`accordion-item${activeIndex === i ? " open" : ""}`}
              data-index={i}
            >
              <button
                className="accordion-trigger"
                aria-expanded={activeIndex === i}
                onClick={() => toggleAccordion(i)}
              >
                <span className="accordion-icon">{f.icon}</span>
                <span>{f.title}</span>
                <img src="/svgs/chevron-down.svg" alt="" width="20" height="20" className="accordion-chevron" aria-hidden="true" />
              </button>
              <div className="accordion-panel">
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
