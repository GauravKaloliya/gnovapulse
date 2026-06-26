"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PARTNERS = ["AcmeCorp", "DataFlow", "CloudNova", "InnoTech", "PulseLabs", "StreamLine"];

export default function TrustedBySection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="trusted-by" className="trusted-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <p className={`trusted-label scroll-reveal${isVisible ? " visible" : ""}`}>Trusted by engineering teams at</p>
        <div className={`trusted-grid scroll-reveal${isVisible ? " visible" : ""}`}>
          {PARTNERS.map((name, i) => (
            <span key={i} className="trusted-logo">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
