"use client";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STUDIES = [
  {
    company: "FinServ Analytics",
    role: "Financial Services",
    quote: "GnovaPulse reduced our data processing time from 6 hours to 12 minutes. Their pipeline builder is the most intuitive we have ever used.",
    metric: "97%",
    metricLabel: "faster processing",
    author: "— VP of Data Engineering",
  },
  {
    company: "HealthBridge Tech",
    role: "Healthcare",
    quote: "Achieved HIPAA compliance in under 2 weeks. The built-in PHI detection and redaction saved us months of custom development.",
    metric: "3×",
    metricLabel: "faster compliance",
    author: "— CTO",
  },
  {
    company: "RetailPulse",
    role: "E-Commerce",
    quote: "We handle 50M+ daily events through GnovaPulse. Zero downtime in 8 months. Their real-time dashboard transformed our ops team.",
    metric: "50M+",
    metricLabel: "events/day",
    author: "— Head of Data",
  },
];

export default function CaseStudiesSection() {
  const { ref, isVisible } = useScrollReveal();
  const [expanded, setExpanded] = useState(-1);

  return (
    <section id="case-studies" className="case-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label">Case Studies</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`}>Real Results from <span className="text-accent">Real Teams</span></h2>
        <div className="case-grid">
          {STUDIES.map((study, i) => (
            <article key={i} className={`case-card${expanded === i ? " expanded" : ""} scroll-reveal${isVisible ? " visible" : ""}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="case-header">
                <div>
                  <div className="case-company">{study.company}</div>
                  <div className="case-role">{study.role}</div>
                </div>
                <div className="case-metric-wrap">
                  <span className="case-metric">{study.metric}</span>
                  <span className="case-metric-label">{study.metricLabel}</span>
                </div>
              </div>
              <blockquote className={`case-quote${expanded === i ? " expanded" : ""}`}>
                <p>{study.quote}</p>
                <footer><cite>{study.author}</cite></footer>
              </blockquote>
              <button
                className="case-toggle"
                aria-expanded={expanded === i}
                onClick={() => setExpanded(expanded === i ? -1 : i)}
              >
                {expanded === i ? "Show Less" : "Read Full Story"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded === i ? "rotate(180deg)" : "" }}>
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
