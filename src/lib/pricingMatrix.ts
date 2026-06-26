export interface Tier {
  id: string;
  name: string;
  desc: string;
  baseRate: number;
  features: string[];
}

export interface BillingOption {
  label: string;
  multiplier: number;
}

export interface CurrencyOption {
  symbol: string;
  rate: number;
  tariff: number;
}

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "For small teams & startups",
    baseRate: 29,
    features: [
      "Up to 5 users",
      "10K records/month",
      "Basic analytics",
      "Email support",
      "1 API key",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    desc: "For growing businesses",
    baseRate: 79,
    features: [
      "Up to 25 users",
      "100K records/month",
      "Advanced analytics",
      "Priority support",
      "10 API keys",
      "Custom workflows",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "For large organizations",
    baseRate: 199,
    features: [
      "Unlimited users",
      "Unlimited records",
      "Real-time dashboards",
      "Dedicated support",
      "Unlimited API keys",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

export const BILLING: Record<string, BillingOption> = {
  monthly: { label: "Monthly", multiplier: 1 },
  annual: { label: "Annual", multiplier: 0.8 },
};

export const CURRENCIES: Record<string, CurrencyOption> = {
  USD: { symbol: "$", rate: 1, tariff: 1 },
  INR: { symbol: "₹", rate: 83, tariff: 1 },
  EUR: { symbol: "€", rate: 0.92, tariff: 1 },
};

export function computePrice(
  baseRate: number,
  billingMultiplier: number,
  currencyRate: number,
  tariff: number
): string {
  return ((baseRate * billingMultiplier * currencyRate) * tariff).toFixed(2);
}

export interface PricingUpdateEventDetail {
  currency: CurrencyOption;
  billing: BillingOption;
}
