"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AWARDS = [
  { title: "Top 10 Data Platforms 2025", org: "TechCrunch", year: "2025" },
  { title: "Best Developer Experience", org: "G2 Crowd", year: "2025" },
  { title: "AI Innovation Award", org: "Data Summit", year: "2024" },
  { title: "Highest Customer Satisfaction", org: "Gartner Peer Insights", year: "2024" },
  { title: "Fastest Growing Startup", org: "Inc. 5000", year: "2024" },
  { title: "Enterprise Choice Award", org: "SoftwareReviews", year: "2025" },
];

export default function AwardsSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="awards" className="awards-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>Recognition</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>Awards & <span className="text-accent">Accolades</span></h2>
        <div className={`awards-grid scroll-reveal${isVisible ? " visible" : ""}`}>
          {AWARDS.map((award, i) => (
            <div key={i} className="award-card" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="award-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9932" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 6 9 6 9Z"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 18 9 18 9Z"/>
                  <path d="M4 22h16"/>
                  <path d="M10 22V8h4v14"/>
                  <path d="M9 22h6"/>
                </svg>
              </div>
              <h4 className="award-title">{award.title}</h4>
              <p className="award-org">{award.org} — {award.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
