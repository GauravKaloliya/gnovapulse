"use client";
import { useState, useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FAQS = [
  {
    q: "How does GnovaPulse AI handle my data security?",
    a: "We use end-to-end encryption, SOC 2 compliant infrastructure, RBAC, and full audit logs. Your data is encrypted at rest and in transit. We never share or sell customer data.",
  },
  {
    q: "Can I integrate GnovaPulse with my existing tools?",
    a: "Yes. GnovaPulse offers 200+ native integrations via REST, GraphQL, and Webhook APIs. We connect with major CRMs, data warehouses, and productivity tools out of the box.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Starter plans include email support. Professional plans get priority support with 4-hour SLA. Enterprise plans include a dedicated support team with 1-hour SLA and account management.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes, we offer a 14-day free trial on the Professional plan with no credit card required. You get full access to all features with a 100K record limit.",
  },
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Absolutely. You can change your plan at any time. Upgrades take effect immediately, downgrades apply at the next billing cycle. No penalties or hidden fees.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const { ref, isVisible } = useScrollReveal();

  const filtered = useMemo(
    () => FAQS.filter((f) => f.q.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <section id="faq" className="faq-section scroll-reveal" ref={ref as React.RefObject<HTMLElement>} style={{ opacity: isVisible ? 1 : undefined, transform: isVisible ? "none" : undefined }}>
      <div className="container">
        <div className="section-label">FAQ</div>
        <h2 className="section-title scroll-reveal-left" style={{ opacity: isVisible ? 1 : undefined, transform: isVisible ? "none" : undefined }}>
          Frequently Asked <span className="text-accent">Questions</span>
        </h2>
        <div className="faq-search-wrap">
          <svg className="faq-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            className="faq-search"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(-1); }}
            aria-label="Search frequently asked questions"
          />
        </div>
        <div className="faq-grid">
          {filtered.length === 0 ? (
            <p className="faq-empty">No matching questions found.</p>
          ) : (
            filtered.map((faq, i) => (
              <div key={i} className={`faq-item${openIndex === i ? " open" : ""}`}>
                <button
                  className="faq-question"
                  aria-expanded={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <span>{faq.q}</span>
                  <svg className="faq-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
