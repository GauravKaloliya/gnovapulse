"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  { num: "01", title: "Connect Your Data", desc: "Integrate your databases, APIs, and cloud storage with one click. Supports 200+ data sources natively." },
  { num: "02", title: "Configure Pipelines", desc: "Use our visual builder or YAML config to define transformations, enrichment rules, and output destinations." },
  { num: "03", title: "Deploy & Monitor", desc: "Go live in minutes. Monitor throughput, latency, and error rates from a single real-time dashboard." },
];

export default function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="how-it-works" className="how-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>How It Works</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>From Data to Insights in <span className="text-accent">3 Steps</span></h2>
        <p className={`section-desc scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center", margin: "0 auto 3rem" }}>No complex setup. No endless documentation. Just results.</p>
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <div key={i} className={`step-card scroll-reveal${isVisible ? " visible" : ""}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="step-number">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="step-connector" aria-hidden="true">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 20h20M22 14l8 6-8 6" stroke="#FF9932" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
