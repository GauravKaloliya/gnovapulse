"use client";

import { useEffect, useRef } from "react";
import { computePrice, TIERS, type PricingUpdateEventDetail } from "@/lib/pricingMatrix";

interface PriceAmountProps {
  tierIndex: number;
}

export default function PriceAmount({ tierIndex }: PriceAmountProps) {
  const currencyRef = useRef<HTMLSpanElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const { currency, billing } = (e as CustomEvent<PricingUpdateEventDetail>).detail;
      const tier = TIERS[tierIndex];
      const price = computePrice(tier.baseRate, billing.multiplier, currency.rate, currency.tariff);
      if (currencyRef.current) currencyRef.current.textContent = currency.symbol;
      if (valueRef.current) valueRef.current.textContent = price;
      if (periodRef.current) periodRef.current.textContent = billing.label === "Annual" ? "/year" : "/month";
    };

    window.addEventListener("pricing:update", handler);
    return () => window.removeEventListener("pricing:update", handler);
  }, [tierIndex]);

  return (
    <div className="pricing-amount" aria-live="polite" aria-atomic="true" aria-label={`Price for ${TIERS[tierIndex].name} tier`}>
      <span ref={currencyRef} className="pricing-currency" id={`currency-${TIERS[tierIndex].id}`}>
        $
      </span>
      <span ref={valueRef} className="pricing-value" id={`value-${TIERS[tierIndex].id}`}>
        {TIERS[tierIndex].baseRate.toFixed(2)}
      </span>
      <span ref={periodRef} className="pricing-period" id={`period-${TIERS[tierIndex].id}`}>
        /month
      </span>
    </div>
  );
}
