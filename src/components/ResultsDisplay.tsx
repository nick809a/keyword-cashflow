
import React from 'react';
import { RevenueData, formatCurrency, formatPercentage, formatNumber } from '@/lib/calculations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { exportToCSV, printToPDF } from '@/lib/export';
import { DownloadIcon, PrinterIcon } from 'lucide-react';
import RevenueChart from './RevenueChart';

interface ResultsDisplayProps {
  data: RevenueData[];
  keyword: string;
  searchVolume: number;
  conversionRate: number;
  aov: number;
  className?: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  data,
  keyword,
  searchVolume,
  conversionRate,
  aov,
  className = '',
}) => {
  if (!data.length) return null;
  
  const handleExportCSV = () => {
    exportToCSV(data, keyword);
  };
  
  const handlePrintPDF = () => {
    printToPDF(data, keyword, searchVolume, conversionRate, aov);
  };
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Revenue Forecast Results</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline" 
            size="sm"
            onClick={handleExportCSV}
            className="flex items-center space-x-1 btn-hover"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>CSV</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintPDF}
            className="flex items-center space-x-1 btn-hover"
          >
            <PrinterIcon className="h-4 w-4" />
            <span>PDF</span>
          </Button>
        </div>
      </div>
      
      <RevenueChart data={data} />
      
      <div className="rounded-lg border shadow-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Position</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>Est. Traffic</TableHead>
              <TableHead>Est. Conversions</TableHead>
              <TableHead className="text-right">Est. Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.position}>
                <TableCell className="font-medium">{row.position}</TableCell>
                <TableCell>{formatPercentage(row.ctr)}</TableCell>
                <TableCell>{formatNumber(row.traffic)}</TableCell>
                <TableCell>{formatNumber(row.conversions)}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(row.revenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResultsDisplay;
