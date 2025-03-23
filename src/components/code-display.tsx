"use client";
import type { PricingTier } from "@/lib/types";
import { Button } from "@progress/kendo-react-buttons";
import { copyIcon } from "@progress/kendo-svg-icons";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import { useState } from "react";

interface CodeDisplayProps {
  pricingTiers: PricingTier[];
}

interface State {
  success: boolean;
  error: boolean;
}

export function CodeDisplay({ pricingTiers }: CodeDisplayProps) {
  const [state, setState] = useState<State>({ success: false, error: false });
  const reactCode = generateReactCode(pricingTiers);

  const handleNotification = (type: keyof State) => {
    setState({ success: false, error: false });
    setState((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    if (state.success || state.error) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        handleNotification("success");
      })
      .catch(() => {
        handleNotification("error");
      });
  };

  const { success, error } = state;

  return (
    <>
      <div className="border rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">KendoReact Pricing Grid</h3>
          <Button
            onClick={() => copyToClipboard(reactCode)}
            className="flex items-center gap-1 action-button"
            svgIcon={copyIcon}
          >
            <span>Copy</span>
          </Button>
        </div>
        <div className="bg-black rounded-b-lg p-4 overflow-x-auto relative">
          <pre
            className="text-sm pr-20 text-left text-gray-400 whitespace-pre-wrap break-words"
            data-langage="TypeScript"
          >
            <code>{reactCode}</code>
          </pre>
        </div>
      </div>
      <NotificationGroup
        style={{
          right: 0,
          bottom: 0,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
        className="pb-4 pr-4"
      >
        <Fade>
          {success && (
            <Notification type={{ style: "success", icon: true }}>
              <span>The code has been copied to your clipboard.</span>
            </Notification>
          )}
        </Fade>
        <Fade>
          {error && (
            <Notification type={{ style: "error", icon: true }}>
              <span>There was an error copying the code.</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
    </>
  );
}

function generateReactCode(tiers: PricingTier[]): string {
  return `import React from 'react';

const PricingTier = ({ tier, featured = false }) => {
  return (
    <div className={\`flex flex-col border rounded-lg overflow-hidden bg-white \${featured ? 'border-primary shadow-lg relative' : 'border-gray-200 shadow-sm'}\`}>
      {featured && (
        <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
          Recommended
        </div>
      )}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
        <p className="text-gray-500 text-sm">{tier.description}</p>
      </div>
      <div className="p-6 flex-1">
        <div className="mb-6">
          <p className="text-3xl font-bold">
            {tier.price === 0 ? 'Free' : \`\$\${tier.price}\`}
            {tier.price > 0 && tier.billingCycle && (
              <span className="text-sm font-normal text-gray-500">/{tier.billingCycle}</span>
            )}
          </p>
        </div>
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-primary shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t border-gray-200">
        <button 
          className={\`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors \${
            featured 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
          }\`}
        >
          {tier.ctaText || "Get Started"}
        </button>
      </div>
    </div>
  );
};

export const PricingGrid = ({ tiers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <PricingTier 
          key={tier.name} 
          tier={tier} 
          featured={tier.recommended} 
        />
      ))}
    </div>
  );
};

// Example usage
const pricingTiers = ${JSON.stringify(tiers, null, 2)};

export default function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Our Pricing Plans
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Choose the perfect plan for your needs
        </p>
      </div>
      <div className="mt-12">
        <PricingGrid tiers={pricingTiers} />
      </div>
    </div>
  );
}`;
}
