"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TIERS, BILLING, CURRENCIES, type BillingOption, type CurrencyOption } from "@/lib/pricingMatrix";
import PriceAmount from "./PriceAmount";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function cardTilt(e: React.MouseEvent) {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
}

function cardTiltReset(e: React.MouseEvent) {
  (e.currentTarget as HTMLElement).style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
}

function magneticMove(e: React.MouseEvent) {
  const btn = e.currentTarget as HTMLElement;
  const rect = btn.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
  const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

function magneticReset(e: React.MouseEvent) {
  (e.currentTarget as HTMLElement).style.transform = "";
}

const TIER_ICONS = [
  <svg key="starter" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="none" stroke="#172B36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
  <svg key="pro" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="none" stroke="#172B36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </g>
  </svg>,
  <svg key="enterprise" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 16 16" aria-hidden="true">
    <path fill="#172B36" d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z" />
  </svg>,
];

function dispatchPricingEvent(currency: CurrencyOption, billing: BillingOption) {
  window.dispatchEvent(
    new CustomEvent("pricing:update", {
      detail: { currency, billing },
    })
  );
}

export default function PricingSection() {
  const currencyRef = useRef<HTMLSelectElement>(null);
  const billingRef = useRef<HTMLDivElement>(null);
  const { ref: revealRef, isVisible: revealVisible } = useScrollReveal();
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const handleBillingChange = useCallback((billingKey: string) => {
    const billing = BILLING[billingKey];
    const currencyKey = currencyRef.current?.value || "USD";
    const currency = CURRENCIES[currencyKey];
    dispatchPricingEvent(currency, billing);

    if (billingRef.current) {
      billingRef.current.querySelectorAll(".toggle-btn").forEach((btn) => {
        btn.classList.toggle("active", (btn as HTMLElement).dataset.billing === billingKey);
      });
    }
  }, []);

  const handleCurrencyChange = useCallback(() => {
    const currencyKey = currencyRef.current?.value || "USD";
    const currency = CURRENCIES[currencyKey];
    const billingKey = billingRef.current?.querySelector(".toggle-btn.active")?.getAttribute("data-billing") || "monthly";
    const billing = BILLING[billingKey];
    dispatchPricingEvent(currency, billing);
  }, []);

  useEffect(() => {
    const currency = CURRENCIES.USD;
    const billing = BILLING.monthly;
    dispatchPricingEvent(currency, billing);
  }, []);

  return (
    <section id="pricing" className="pricing-section" ref={revealRef as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="section-label">Pricing</div>
        <h2 className={`section-title scroll-reveal-right${revealVisible ? " visible" : ""}`}>
          Simple, Transparent <span className="text-accent">Pricing</span>
        </h2>
        <p className={`section-desc scroll-reveal${revealVisible ? " visible" : ""}`}>
          Choose the plan that fits your needs. No hidden fees. No surprises.
        </p>

        <div className={`pricing-controls scroll-reveal${revealVisible ? " visible" : ""}`} style={{ transitionDelay: "100ms" }}>
          <div className="billing-toggle" ref={billingRef} role="radiogroup" aria-label="Billing cycle">
            <button
              className="toggle-btn active"
              data-billing="monthly"
              role="radio"
              aria-checked="true"
              onClick={() => handleBillingChange("monthly")}
            >
              Monthly
            </button>
            <button
              className="toggle-btn"
              data-billing="annual"
              role="radio"
              aria-checked="false"
              onClick={() => handleBillingChange("annual")}
            >
              Annual <span className="toggle-badge">Save 20%</span>
            </button>
          </div>
          <div className="currency-select-wrapper">
            <label htmlFor="currency-select" className="sr-only">
              Select currency
            </label>
            <select
              id="currency-select"
              className="currency-select"
              ref={currencyRef}
              onChange={handleCurrencyChange}
              aria-label="Select currency"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        <div
          className={`pricing-grid scroll-reveal${revealVisible ? " visible" : ""}`}
          id="pricing-grid"
          ref={gridRef}
          style={{ transitionDelay: "200ms", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={(e) => {
            const el = gridRef.current;
            if (!el || window.innerWidth >= 768) return;
            setIsDragging(true);
            dragStartX.current = e.pageX - el.offsetLeft;
            dragScrollLeft.current = el.scrollLeft;
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (!isDragging) return;
            const el = gridRef.current;
            if (!el) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            el.scrollLeft = dragScrollLeft.current - (x - dragStartX.current) * 1.5;
          }}
        >
          {TIERS.map((tier, i) => (
            <article
              key={tier.id}
              className={`pricing-card${i === 1 ? " pricing-featured" : ""}`}
              data-tier={tier.id}
              onMouseMove={cardTilt}
              onMouseLeave={cardTiltReset}
            >
              {i === 1 && <div className="pricing-badge glow-saffron">Most Popular</div>}
              <div className="pricing-header">
                <div className="pricing-icon">{TIER_ICONS[i]}</div>
                <h3 className="pricing-tier-name">{tier.name}</h3>
                <p className="pricing-desc">{tier.desc}</p>
              </div>

              <PriceAmount tierIndex={i} />

              <ul className="pricing-features">
                {tier.features.map((f, j) => (
                  <li key={j}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#172B36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m9 12 2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`btn magnetic-btn ${i === 2 ? "btn-outline" : "btn-primary"} btn-block`}
                onMouseMove={magneticMove}
                onMouseLeave={magneticReset}
              >
                {i === 2 ? "Contact Sales" : i === 1 ? "Start Free Trial" : "Get Started"}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
