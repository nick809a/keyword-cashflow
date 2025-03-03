
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConversionInputProps {
  conversionRate: number | string;
  setConversionRate: (value: number) => void;
  aov: number | string;
  setAOV: (value: number) => void;
  className?: string;
}

const ConversionInput: React.FC<ConversionInputProps> = ({
  conversionRate,
  setConversionRate,
  aov,
  setAOV,
  className = '',
}) => {
  const handleConversionRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setConversionRate(0);
    } else {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
        setConversionRate(numericValue);
      }
    }
  };

  const handleAOVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAOV(0);
    } else {
      // Remove currency symbol and commas, then parse as float
      const numericValue = parseFloat(value.replace(/[$,]/g, ''));
      if (!isNaN(numericValue) && numericValue >= 0) {
        setAOV(numericValue);
      }
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <Label htmlFor="conversion-rate" className="text-sm font-medium">
          Conversion Rate (%)
        </Label>
        <Input
          id="conversion-rate"
          type="text"
          placeholder="e.g. 2.5"
          value={conversionRate}
          onChange={handleConversionRateChange}
          className="input-transition focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <Label htmlFor="aov" className="text-sm font-medium">
          Average Order Value ($)
        </Label>
        <Input
          id="aov"
          type="text"
          placeholder="e.g. 100"
          value={typeof aov === 'number' ? aov.toLocaleString() : aov}
          onChange={handleAOVChange}
          className="input-transition focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default ConversionInput;
