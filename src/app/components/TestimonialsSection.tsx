"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    text: "GnovaPulse transformed our data pipeline. We went from 3 days of manual processing to real-time automation. The ROI was immediate.",
    name: "Sarah Kim",
    role: "CTO, DataStream Inc.",
    initials: "SK",
  },
  {
    text: "The intelligent monitoring caught a critical data anomaly before it reached production. This platform is indispensable for any data-driven organization.",
    name: "Marcus Rivera",
    role: "Data Engineer, FinCore",
    initials: "MR",
  },
  {
    text: "We reduced our data processing costs by 60% after switching to GnovaPulse. The no-code workflows are a game changer for our non-technical team members.",
    name: "Aisha Lopez",
    role: "VP Product, CloudScale",
    initials: "AL",
  },
];

export default function TestimonialsSection() {
  const { ref: revealRef, isVisible: revealVisible } = useScrollReveal();
  return (
    <section id="testimonials" className="testimonials-section" ref={revealRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label">Testimonials</div>
        <h2 className={`section-title scroll-reveal-left${revealVisible ? " visible" : ""}`}>
          Trusted by <span className="text-accent">Innovators</span>
        </h2>
        <div className={`testimonials-grid scroll-reveal${revealVisible ? " visible" : ""}`} style={{ transitionDelay: "150ms" }}>
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className={`testimonial-card card-stack-${i}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FF9932" stroke="#FF9932" strokeWidth="1" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <footer className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <cite className="testimonial-name">{t.name}</cite>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
