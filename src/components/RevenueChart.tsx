
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { RevenueData, formatCurrency, formatNumber } from '@/lib/calculations';

interface RevenueChartProps {
  data: RevenueData[];
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as RevenueData;
    return (
      <div className="glass-card p-4 rounded-lg text-sm">
        <p className="font-medium">Position {data.position}</p>
        <p>CTR: {(data.ctr * 100).toFixed(2)}%</p>
        <p>Traffic: {formatNumber(data.traffic)}</p>
        <p>Conversions: {formatNumber(data.conversions)}</p>
        <p className="font-medium text-primary">Revenue: {formatCurrency(data.revenue)}</p>
      </div>
    );
  }

  return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data, className = '' }) => {
  return (
    <div className={`w-full h-[300px] mt-6 ${className} animate-fade-in`} style={{ animationDelay: '300ms' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="position" 
            label={{ value: 'Position', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value.toLocaleString()}`} 
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="revenue" 
            name="Revenue" 
            fill="rgba(0, 102, 255, 0.8)" 
            radius={[4, 4, 0, 0]}
            barSize={30}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
