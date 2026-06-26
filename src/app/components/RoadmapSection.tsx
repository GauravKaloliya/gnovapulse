"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ROADMAP = [
  { quarter: "Q2 2025", items: ["AI-assisted pipeline builder", "Native dbt integration", "Role-based access control"], status: "past" as const },
  { quarter: "Q3 2025", items: ["Real-time streaming (Kafka)", "Custom alert rules", "Audit log export"], status: "past" as const },
  { quarter: "Q4 2025", items: ["ML model deployment", "A/B testing framework", "Cost analytics dashboard"], status: "present" as const },
  { quarter: "Q1 2026", items: ["Multi-cloud orchestration", "Data lineage visualization", "Natural language query"], status: "future" as const },
  { quarter: "Q2 2026", items: ["Edge processing nodes", "Auto-scaling pipelines", "Marketplace for connectors"], status: "future" as const },
];

export default function RoadmapSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="roadmap" className="roadmap-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>Roadmap</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>What&apos;s Coming <span className="text-accent">Next</span></h2>
        <p className={`section-desc scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center", margin: "0 auto 3rem" }}>We ship every quarter. Here is what is on the horizon.</p>
        <div className={`roadmap-timeline scroll-reveal${isVisible ? " visible" : ""}`}>
          {ROADMAP.map((phase, i) => (
            <div key={i} className={`roadmap-phase phase-${phase.status}`}>
              <div className="roadmap-dot" aria-hidden="true" />
              <div className="roadmap-content">
                <div className="roadmap-quarter">{phase.quarter}</div>
                <ul className="roadmap-items">
                  {phase.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
