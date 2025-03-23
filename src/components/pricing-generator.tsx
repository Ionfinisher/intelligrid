"use client";

import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { ConfigurationForm } from "@/components/configuration-form";
import { PricingGrid } from "@/components/pricing-grid";
import { generatePricingGrid } from "@/lib/action";
import type { PricingTier } from "@/lib/types";
import { CodeDisplay } from "@/components/code-display";
import { SvgIcon } from "@progress/kendo-react-common";
import { downloadIcon, codeIcon, eyeIcon } from "@progress/kendo-svg-icons";
import { Loader } from "@progress/kendo-react-indicators";

export function PricingGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productDescription: "",
    industry: "Software/SaaS",
    targetAudience: "Small Businesses",
    tierCount: 3,
  });
  const [activeTab, setActiveTab] = useState(0);

  const handleGenerate = async (formData: typeof productInfo) => {
    setIsGenerating(true);
    setProductInfo(formData);

    try {
      const generatedTiers = await generatePricingGrid(formData);
      setPricingTiers(generatedTiers);
    } catch (error) {
      console.error("Error generating pricing grid:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCode = () => {
    if (pricingTiers.length === 0) return;

    // Generate the code as a string
    const reactCode = generateReactCode(pricingTiers);

    // Create a blob and download it
    const blob = new Blob([reactCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pricing-grid-tailwind.jsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setActiveTab(e.selected);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Configure Your Pricing Grid
        </h2>
        <ConfigurationForm
          initialValues={productInfo}
          onSubmit={handleGenerate}
          isSubmitting={isGenerating}
        />
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader size="large" type="converging-spinner" />
          <p className="text-muted-foreground">
            Generating your pricing grid...
          </p>
        </div>
      ) : pricingTiers.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Generated Pricing Grid</h2>
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                onClick={() => handleGenerate(productInfo)}
                disabled={isGenerating}
              >
                Regenerate
              </Button>
              <Button
                onClick={handleDownloadCode}
                disabled={isGenerating}
                className="flex items-center gap-1"
                themeColor={"secondary"}
              >
                {/* <downloadIcon className="h-4 w-4" /> */}
                <SvgIcon icon={downloadIcon} size="medium" />{" "}
                <span>Download Code</span>
              </Button>
            </div>
          </div>
          <TabStrip
            selected={activeTab}
            onSelect={handleSelect}
            tabPosition="top"
            // className="w-full"
          >
            <TabStripTab title="Preview">
              <PricingGrid tiers={pricingTiers} />
            </TabStripTab>
            <TabStripTab title="Code">
              <CodeDisplay pricingTiers={pricingTiers} />
            </TabStripTab>
          </TabStrip>
        </div>
      ) : null}
    </div>
  );
}

function generateReactCode(tiers: PricingTier[]): string {
  return `import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter
} from '@progress/kendo-react-layout';
import { Badge } from '@progress/kendo-react-indicators';
import { SvgIcon } from '@progress/kendo-react-common';
import { checkIcon } from '@progress/kendo-svg-icons';

const PricingTierCard = ({ tier, featured = false }) => {
  return (
    <Card className={\`flex flex-col \${featured ? "border-primary shadow-lg relative" : ""}\`}>
      {featured && (
        <Badge className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2">
          Recommended
        </Badge>
      )}
      <CardHeader>
        <CardTitle>{tier.name}</CardTitle>
        <CardSubtitle>{tier.description}</CardSubtitle>
      </CardHeader>
      <CardBody className="flex-1">
        <div className="mb-6">
          <p className="text-3xl font-bold">
            {tier.price === 0 ? "Free" : \`\$\${tier.price}\`}
            {tier.price > 0 && tier.billingCycle && (
              <span className="text-sm font-normal text-muted-foreground">
                /{tier.billingCycle}
              </span>
            )}
          </p>
        </div>
        <ul className="space-y-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <SvgIcon
                icon={checkIcon}
                className="h-5 w-5 text-primary shrink-0 mr-2"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter>
        <Button className="w-full">{tier.ctaText || "Get Started"}</Button>
      </CardFooter>
    </Card>
  );
};

export const PricingGrid = () => {
  // Actual pricing tiers data
  const pricingTiers = ${JSON.stringify(tiers, null, 2)};
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {pricingTiers.map((tier) => (
        <PricingTierCard 
          key={tier.name} 
          tier={tier} 
          featured={tier.recommended} 
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">
          Our Pricing Plans
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Choose the perfect plan for your needs
        </p>
      </div>
      <div className="mt-12">
        <PricingGrid />
      </div>
    </div>
  );
}`;
}
