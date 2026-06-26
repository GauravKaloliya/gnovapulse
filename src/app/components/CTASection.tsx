"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CTASection() {
  const { ref: revealRef, isVisible: revealVisible } = useScrollReveal();
  return (
    <section className="cta-section" ref={revealRef as React.RefObject<HTMLElement>}>
      <div className="container cta-inner">
        <h2 className={`cta-title scroll-reveal-scale${revealVisible ? " visible" : ""}`}>
          Ready to <span className="text-accent">Accelerate</span> Your Data?
        </h2>
        <p className={`cta-desc scroll-reveal${revealVisible ? " visible" : ""}`}>
          Join 10,000+ teams already using GnovaPulse AI to transform their data
          workflows. Start free, no credit card required.
        </p>
        <a href="#pricing" className={`btn btn-primary btn-lg scroll-reveal${revealVisible ? " visible" : ""}`} style={{ transitionDelay: "100ms" }}>
          Start Free Trial
        </a>
      </div>
    </section>
  );
}
