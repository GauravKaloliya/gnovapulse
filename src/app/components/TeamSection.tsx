"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TEAM = [
  { initials: "AK", name: "Aarav Kapoor", role: "CEO & Co-Founder" },
  { initials: "PM", name: "Priya Mehta", role: "CTO & Co-Founder" },
  { initials: "RJ", name: "Rohan Joshi", role: "Head of Engineering" },
  { initials: "SN", name: "Sana Nair", role: "VP of Design" },
];

export default function TeamSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="team" className="team-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>Team</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>Built by Engineers, for <span className="text-accent">Engineers</span></h2>
        <p className={`section-desc scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center", margin: "0 auto 3rem" }}>We eat our own dogfood. Every team member ships code daily.</p>
        <div className="team-grid">
          {TEAM.map((member, i) => (
            <div key={i} className={`team-card scroll-reveal${isVisible ? " visible" : ""}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="team-avatar">{member.initials}</div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
