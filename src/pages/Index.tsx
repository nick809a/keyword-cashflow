
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalculatorIcon } from "lucide-react";
import { toast } from "sonner";

import KeywordInput from '@/components/KeywordInput';
import ConversionInput from '@/components/ConversionInput';
import ResultsDisplay from '@/components/ResultsDisplay';
import { calculateRevenueForecast, RevenueData } from '@/lib/calculations';

const Index = () => {
  // State for input values
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState<number>(0);
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [aov, setAOV] = useState<number>(100);
  
  // State for results
  const [results, setResults] = useState<RevenueData[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Calculate revenue forecast
  const handleCalculate = () => {
    if (!keyword) {
      toast.error('Please enter a keyword');
      return;
    }
    
    if (!searchVolume || searchVolume <= 0) {
      toast.error('Please enter a valid search volume');
      return;
    }
    
    if (!conversionRate || conversionRate <= 0) {
      toast.error('Please enter a valid conversion rate');
      return;
    }
    
    if (!aov || aov <= 0) {
      toast.error('Please enter a valid average order value');
      return;
    }
    
    const forecast = calculateRevenueForecast(searchVolume, conversionRate, aov);
    setResults(forecast);
    setHasCalculated(true);
    
    if (forecast.length > 0) {
      toast.success('Revenue forecast calculated successfully');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-primary">SEO</span> Revenue Forecast Tool
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Calculate potential revenue based on SERP positions, conversion rates, and search volume.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card premium-shadow animate-blur-in">
              <CardHeader>
                <CardTitle className="text-xl">Input Parameters</CardTitle>
                <CardDescription>
                  Enter your keyword and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KeywordInput
                  keyword={keyword}
                  setKeyword={setKeyword}
                  searchVolume={searchVolume}
                  setSearchVolume={setSearchVolume}
                />
                
                <Separator className="my-6" />
                
                <ConversionInput
                  conversionRate={conversionRate}
                  setConversionRate={setConversionRate}
                  aov={aov}
                  setAOV={setAOV}
                />
                
                <Button 
                  className="w-full mt-8 btn-hover"
                  size="lg"
                  onClick={handleCalculate}
                >
                  <CalculatorIcon className="mr-2 h-4 w-4" />
                  Calculate Revenue
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-2">
            <Card className="glass-card premium-shadow h-full animate-blur-in" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle className="text-xl">Revenue Forecast</CardTitle>
                <CardDescription>
                  Estimated revenue by SERP position
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasCalculated ? (
                  <ResultsDisplay
                    data={results}
                    keyword={keyword}
                    searchVolume={searchVolume}
                    conversionRate={conversionRate}
                    aov={aov}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <div className="rounded-full bg-primary/10 p-6 mb-4">
                      <CalculatorIcon className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Data Yet</h3>
                    <p className="text-muted-foreground max-w-md">
                      Enter your keyword, search volume, and conversion metrics, then click "Calculate Revenue" to see your forecast.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <footer className="text-center text-muted-foreground text-sm mt-12">
          <p>Powered by lovable.ai - Built with premium design principles</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
