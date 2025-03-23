"use server";

import openai from "@/config/openai";
import type { PricingTier } from "@/lib/types";
import { z } from "zod";

// Define a Zod schema for PricingTier validation
const PricingTierSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  billingCycle: z.enum(["month", "year"]),
  features: z.array(z.string()).min(1),
  recommended: z.boolean(),
  ctaText: z.string(),
});

const PricingTiersSchema = z.array(PricingTierSchema);

interface PricingGridInput {
  productName: string;
  productDescription: string;
  industry: string;
  targetAudience: string;
  tierCount: number;
}

export async function generatePricingGrid(
  input: PricingGridInput
): Promise<PricingTier[]> {
  try {
    const prompt = `
      Generate a pricing grid for a ${input.productName} in the ${input.industry} industry, 
      targeting ${input.targetAudience}. 
      
      Product description: ${input.productDescription}
      
      Create exactly ${input.tierCount} pricing tiers with the following information for each tier:
      - name: A short, catchy name for the tier (e.g., "Basic", "Pro", "Enterprise")
      - description: A brief description of who this tier is for
      - price: A reasonable monthly price in USD (use 0 for free tier if applicable)
      - billingCycle: "month" or "year"
      - features: An array of 4-6 features included in this tier, with more premium features in higher tiers
      - recommended: boolean indicating if this is the recommended tier (only one tier should be recommended)
      - ctaText: Call-to-action button text
      
      Return the result as a valid JSON array of pricing tier objects. 
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const text = completion.choices[0].message.content;
    if (!text) throw new Error("Empty response from OpenAI");

    try {
      const parsedJson = JSON.parse(text);
      const validatedTiers = PricingTiersSchema.parse(parsedJson);
      if (validatedTiers.length !== input.tierCount) {
        throw new Error(
          `Expected ${input.tierCount} tiers but got ${validatedTiers.length}`
        );
      }
      const recommendedTiers: PricingTier[] = validatedTiers.filter(
        (tier: PricingTier) => tier.recommended
      );
      if (recommendedTiers.length !== 1) {
        throw new Error(
          `Expected exactly one recommended tier but got ${recommendedTiers.length}`
        );
      }

      return validatedTiers;
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error) {
    console.error("Error generating pricing grid:", error);
    return generateFallbackPricingTiers(input);
  }
}

function generateFallbackPricingTiers(input: PricingGridInput): PricingTier[] {
  const tiers: PricingTier[] = [];

  // Basic tier
  tiers.push({
    name: "Basic",
    description: "For individuals and small teams just getting started",
    price: 0,
    billingCycle: "month",
    features: [
      "Core functionality",
      "Basic support",
      "1 user",
      "Limited storage",
    ],
    recommended: false,
    ctaText: "Start for Free",
  });

  // Pro tier
  tiers.push({
    name: "Pro",
    description: "For professionals who need more power and flexibility",
    price: 29,
    billingCycle: "month",
    features: [
      "All Basic features",
      "Priority support",
      "5 users",
      "Advanced features",
      "More storage",
      "Analytics",
    ],
    recommended: true,
    ctaText: "Upgrade to Pro",
  });

  // Add Enterprise tier if needed
  if (input.tierCount >= 3) {
    tiers.push({
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      price: 99,
      billingCycle: "month",
      features: [
        "All Pro features",
        "24/7 dedicated support",
        "Unlimited users",
        "Custom integrations",
        "Maximum storage",
        "Advanced security",
      ],
      recommended: false,
      ctaText: "Contact Sales",
    });
  }

  // Add additional tiers if needed
  if (input.tierCount >= 4) {
    tiers.push({
      name: "Ultimate",
      description: "For power users who need everything",
      price: 199,
      billingCycle: "month",
      features: [
        "All Enterprise features",
        "White-glove onboarding",
        "Custom development",
        "Dedicated account manager",
        "SLA guarantees",
        "Advanced analytics",
      ],
      recommended: false,
      ctaText: "Get Ultimate",
    });
  }

  // Limit to the requested number of tiers
  return tiers.slice(0, input.tierCount);
}
