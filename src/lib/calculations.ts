
// CTR (Click-Through Rate) data by position
// These values represent the average CTR for each position on Google's search results
export const ctrByPosition: Record<number, number> = {
  1: 0.3132, // 31.32%
  2: 0.1520, // 15.20%
  3: 0.0789, // 7.89%
  4: 0.0477, // 4.77%
  5: 0.0301, // 3.01%
  6: 0.0211, // 2.11%
  7: 0.0164, // 1.64%
  8: 0.0132, // 1.32%
  9: 0.0101, // 1.01%
  10: 0.0087, // 0.87%
};

export interface RevenueData {
  position: number;
  ctr: number;
  traffic: number;
  conversions: number;
  revenue: number;
}

/**
 * Calculate revenue forecast based on search volume, conversion rate, and average order value
 */
export function calculateRevenueForecast(
  searchVolume: number,
  conversionRate: number,
  aov: number
): RevenueData[] {
  const results: RevenueData[] = [];

  // Calculate for positions 1-10
  for (let position = 1; position <= 10; position++) {
    const ctr = ctrByPosition[position];
    const traffic = Math.round(searchVolume * ctr);
    const conversions = Math.round(traffic * (conversionRate / 100));
    const revenue = conversions * aov;

    results.push({
      position,
      ctr,
      traffic,
      conversions,
      revenue,
    });
  }

  return results;
}

/**
 * Format currency values
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage values
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format large numbers with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
