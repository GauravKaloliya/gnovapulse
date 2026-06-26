"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BADGES = [
  { title: "SOC 2 Type II", desc: "Enterprise-grade security controls audited annually by independent third parties." },
  { title: "GDPR Compliant", desc: "Full compliance with EU data protection regulations. Data residency controls included." },
  { title: "HIPAA Eligible", desc: "PHI-ready infrastructure with BAA agreements available for healthcare customers." },
  { title: "99.9% Uptime SLA", desc: "Guaranteed availability with multi-region failover and real-time monitoring." },
];

export default function SecuritySection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="security" className="security-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label" style={{ textAlign: "center" }}>Security</div>
        <h2 className={`section-title scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center" }}>Enterprise-Grade <span className="text-accent">Compliance</span></h2>
        <p className={`section-desc scroll-reveal${isVisible ? " visible" : ""}`} style={{ textAlign: "center", margin: "0 auto 3rem" }}>Your data is protected by industry-leading security standards.</p>
        <div className="security-grid">
          {BADGES.map((badge, i) => (
            <article key={i} className={`security-card scroll-reveal${isVisible ? " visible" : ""}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="security-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9932" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="security-title">{badge.title}</h3>
              <p className="security-desc">{badge.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
