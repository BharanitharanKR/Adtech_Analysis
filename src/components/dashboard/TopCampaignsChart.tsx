import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { Campaign } from '../../utils/mockData';
interface TopCampaignsChartProps {
  campaigns: Campaign[];
  loading?: boolean;
  metric?: 'impressions' | 'clicks' | 'conversions' | 'revenue';
}
const TopCampaignsChart: React.FC<TopCampaignsChartProps> = ({
  campaigns,
  loading = false,
  metric = 'revenue'
}) => {
  const {
    theme
  } = useTheme();
  const textColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const bgColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  // Get top 5 campaigns by the selected metric
  const topCampaigns = [...campaigns].sort((a, b) => b[metric] - a[metric]).slice(0, 5).map(campaign => ({
    name: campaign.name,
    value: campaign[metric]
  }));
  const metricLabels = {
    impressions: 'Impressions',
    clicks: 'Clicks',
    conversions: 'Conversions',
    revenue: 'Revenue ($)'
  };
  return <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm h-full`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">
          Top 5 Campaigns by {metricLabels[metric]}
        </h3>
      </div>
      {loading ? <div className="animate-pulse flex flex-col space-y-4 h-64">
          <div className="h-full w-full bg-gray-300 rounded"></div>
        </div> : <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topCampaigns} layout="vertical" margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" stroke={textColor} tick={{
            fill: textColor
          }} />
              <YAxis dataKey="name" type="category" stroke={textColor} tick={{
            fill: textColor
          }} width={100} />
              <Tooltip contentStyle={{
            backgroundColor: bgColor,
            borderColor: gridColor,
            color: textColor
          }} formatter={value => [`${value} ${metric === 'revenue' ? '$' : ''}`, metricLabels[metric]]} />
              <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>}
    </div>;
};
export default TopCampaignsChart;