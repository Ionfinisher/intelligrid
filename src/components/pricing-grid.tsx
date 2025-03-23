"use client";

import type { PricingTier } from "@/lib/types";
import { PricingTierCard } from "@/components/pricing-tier-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { useState } from "react";

interface PricingGridProps {
  tiers: PricingTier[];
}

export function PricingGrid({ tiers }: PricingGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setActiveTab(e.selected);
  };

  if (isMobile) {
    return (
      <TabStrip
        selected={activeTab}
        onSelect={handleSelect}
        tabPosition="top"
        className="w-full"
      >
        {tiers.map((tier) => (
          <TabStripTab key={tier.name} title={tier.name}>
            <PricingTierCard tier={tier} featured={tier.recommended} />
          </TabStripTab>
        ))}
      </TabStrip>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <PricingTierCard
          key={tier.name}
          tier={tier}
          featured={tier.recommended}
        />
      ))}
    </div>
  );
}
