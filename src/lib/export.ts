
import { RevenueData } from './calculations';

/**
 * Convert revenue forecast data to CSV format
 */
export function exportToCSV(data: RevenueData[], keyword: string): void {
  // Create CSV headers
  const headers = ['Position', 'CTR', 'Traffic', 'Conversions', 'Revenue'];
  
  // Format data rows
  const rows = data.map(item => [
    item.position.toString(),
    (item.ctr * 100).toFixed(2) + '%',
    item.traffic.toString(),
    item.conversions.toString(),
    '$' + item.revenue.toFixed(2)
  ]);
  
  // Combine headers and rows
  const csvContent = [
    `SEO Revenue Forecast for "${keyword}"`,
    '',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // Set up download attributes
  link.setAttribute('href', url);
  link.setAttribute('download', `seo-forecast-${keyword.toLowerCase().replace(/\s+/g, '-')}.csv`);
  link.style.display = 'none';
  
  // Add to document, trigger download, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Create a printable version of the data that can be saved as PDF via browser print functionality
 */
export function printToPDF(data: RevenueData[], keyword: string, searchVolume: number, conversionRate: number, aov: number): void {
  // Open a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print the report');
    return;
  }
  
  // Create HTML content
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>SEO Revenue Forecast for "${keyword}"</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }
        h1 { color: #0066ff; }
        .meta { margin-bottom: 30px; color: #555; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #f2f7ff; padding: 10px; text-align: left; border-bottom: 2px solid #0066ff; }
        td { padding: 10px; border-bottom: 1px solid #eee; }
        .footer { margin-top: 40px; color: #888; font-size: 12px; text-align: center; }
      </style>
    </head>
    <body>
      <h1>SEO Revenue Forecast</h1>
      <div class="meta">
        <p><strong>Keyword:</strong> ${keyword}</p>
        <p><strong>Search Volume:</strong> ${searchVolume.toLocaleString()}</p>
        <p><strong>Conversion Rate:</strong> ${conversionRate}%</p>
        <p><strong>Average Order Value:</strong> $${aov.toLocaleString()}</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>CTR</th>
            <th>Est. Traffic</th>
            <th>Est. Conversions</th>
            <th>Est. Revenue</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td>${item.position}</td>
              <td>${(item.ctr * 100).toFixed(2)}%</td>
              <td>${item.traffic.toLocaleString()}</td>
              <td>${item.conversions.toLocaleString()}</td>
              <td>$${item.revenue.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        <p>Generated with lovable.ai SEO Revenue Forecast Tool</p>
      </div>
      
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;
  
  // Write content and print
  printWindow.document.write(html);
  printWindow.document.close();
}
