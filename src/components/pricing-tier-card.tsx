// import { Check } from "lucide-react";
import { Button } from "@progress/kendo-react-buttons";
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  CardHeader,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import {
  Badge,
  BadgeContainer,
  BadgePosition,
} from "@progress/kendo-react-indicators";
import type { PricingTier } from "@/lib/types";
import { SvgIcon } from "@progress/kendo-react-common";
import { checkIcon } from "@progress/kendo-svg-icons";

interface PricingTierCardProps {
  tier: PricingTier;
  featured?: boolean;
}

export function PricingTierCard({
  tier,
  featured = false,
}: PricingTierCardProps) {
  return (
    <Card
      type={`${featured ? "primary" : ""}`}
      className={`flex flex-col ${
        featured ? "border-primary border-2 shadow-lg" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>
          <BadgeContainer>
            {tier.name}
            {featured && (
              <Badge
                themeColor={"primary"}
                position={"outside"}
                className="mt-2"
              >
                Recommended
              </Badge>
            )}
          </BadgeContainer>
        </CardTitle>
        <CardSubtitle>{tier.description}</CardSubtitle>
      </CardHeader>
      <CardBody className="flex-1">
        <div className="mb-6">
          <p className="text-3xl font-bold">
            {tier.price === 0 ? "Free" : `$${tier.price}`}
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
        <Button className="w-full" themeColor={"primary"}>
          {tier.ctaText || "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
}
