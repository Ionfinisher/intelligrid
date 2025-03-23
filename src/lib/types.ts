export interface PricingTier {
  name: string;
  description: string;
  price: number;
  billingCycle?: string;
  features: string[];
  recommended: boolean;
  ctaText?: string;
}
