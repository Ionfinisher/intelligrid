"use client";

import type React from "react";

import { Button } from "@progress/kendo-react-buttons";
import {
  Input,
  TextArea,
  Slider,
  SliderLabel,
} from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { Label } from "@progress/kendo-react-labels";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useFormValidation } from "@/hooks/use-form-validation";

interface ConfigurationFormProps {
  initialValues: {
    productName: string;
    productDescription: string;
    industry: string;
    targetAudience: string;
    tierCount: number;
  };
  onSubmit: (values: ConfigurationFormProps["initialValues"]) => void;
  isSubmitting: boolean;
}

export function ConfigurationForm({
  initialValues,
  onSubmit,
  isSubmitting,
}: ConfigurationFormProps) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    touchAll,
  } = useFormValidation(initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    touchAll();

    if (validateForm()) {
      onSubmit(values);
    }
  };

  const industries = [
    "Software/SaaS",
    "E-commerce",
    "Healthcare",
    "Education",
    "Finance",
    "Marketing",
    "Consulting",
    "Other",
  ];

  const audiences = [
    "Small Businesses",
    "Enterprise",
    "Consumers",
    "Freelancers",
    "Startups",
    "Students",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label editorId="productName">Product/Service Name</Label>
          <Input
            id="productName"
            value={values.productName}
            onChange={(e) => handleChange("productName", e.target.value)}
            onBlur={() => handleBlur("productName")}
            placeholder="e.g., DesignPro, CloudStorage"
            style={{ width: "100%" }}
            valid={!touched.productName || !errors.productName}
          />
          {touched.productName && errors.productName && (
            <Error>{errors.productName}</Error>
          )}
        </div>

        <div className="space-y-2">
          <Label editorId="industry">Industry</Label>
          <DropDownList
            id="industry"
            data={industries}
            value={values.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            onBlur={() => handleBlur("industry")}
            style={{ width: "100%" }}
            valid={!touched.industry || !errors.industry}
          />
          {touched.industry && errors.industry && (
            <Error>{errors.industry}</Error>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label editorId="productDescription">Product/Service Description</Label>
        <TextArea
          id="productDescription"
          value={values.productDescription}
          onChange={(e) => handleChange("productDescription", e.target.value)}
          onBlur={() => handleBlur("productDescription")}
          placeholder="Briefly describe your product or service..."
          rows={3}
          resizable="none"
          valid={!touched.productDescription || !errors.productDescription}
        />
        {touched.productDescription && errors.productDescription && (
          <Error>{errors.productDescription}</Error>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label editorId="targetAudience">Target Audience</Label>
          <DropDownList
            id="targetAudience"
            data={audiences}
            value={values.targetAudience}
            onChange={(e) => handleChange("targetAudience", e.target.value)}
            onBlur={() => handleBlur("targetAudience")}
            style={{ width: "100%" }}
            valid={!touched.targetAudience || !errors.targetAudience}
          />
          {touched.targetAudience && errors.targetAudience && (
            <Error>{errors.targetAudience}</Error>
          )}
        </div>

        <div className="w-full space-y-2">
          <div className="flex justify-between">
            <Label editorId="tierCount">Number of Pricing Tiers</Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(values.tierCount)}
            </span>
          </div>
          <Slider
            id="tierCount"
            min={2}
            max={5}
            step={1}
            value={values.tierCount}
            onChange={(e) => handleChange("tierCount", Math.round(e.value))}
            style={{ width: "100%" }}
          >
            <SliderLabel position={2}>2</SliderLabel>
            <SliderLabel position={3}>3</SliderLabel>
            <SliderLabel position={4}>4</SliderLabel>
            <SliderLabel position={5}>5</SliderLabel>
          </Slider>
        </div>
      </div>

      <Button
        type="submit"
        themeColor={"primary"}
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Generating..." : "Generate Pricing Grid"}
      </Button>
    </form>
  );
}
