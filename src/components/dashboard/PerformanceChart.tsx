import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { DailyPerformance } from '../../utils/mockData';
interface PerformanceChartProps {
  data: DailyPerformance[];
  loading?: boolean;
}
type MetricKey = 'impressions' | 'clicks' | 'conversions' | 'revenue';
const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  loading = false
}) => {
  const {
    theme
  } = useTheme();
  const [activeMetrics, setActiveMetrics] = useState<MetricKey[]>(['impressions', 'clicks']);
  const toggleMetric = (metric: MetricKey) => {
    setActiveMetrics(prev => prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]);
  };
  const metricColors = {
    impressions: '#3B82F6',
    clicks: '#10B981',
    conversions: '#8B5CF6',
    revenue: '#F59E0B' // amber
  };
  const metricLabels = {
    impressions: 'Impressions',
    clicks: 'Clicks',
    conversions: 'Conversions',
    revenue: 'Revenue'
  };
  const textColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const bgColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  return <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm h-full`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">Performance Over Time</h3>
        <div className="flex space-x-2">
          {(Object.keys(metricLabels) as MetricKey[]).map(metric => <button key={metric} onClick={() => toggleMetric(metric)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeMetrics.includes(metric) ? `bg-${metricColors[metric].slice(1)} text-white` : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`} style={{
          backgroundColor: activeMetrics.includes(metric) ? metricColors[metric] : theme === 'dark' ? '#374151' : '#E5E7EB'
        }}>
              {metricLabels[metric]}
            </button>)}
        </div>
      </div>
      {loading ? <div className="animate-pulse flex flex-col space-y-4 h-64">
          <div className="h-full w-full bg-gray-300 rounded"></div>
        </div> : <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{
          top: 5,
          right: 20,
          left: 10,
          bottom: 5
        }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={textColor} tick={{
            fill: textColor
          }} tickFormatter={value => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }} />
              <YAxis stroke={textColor} tick={{
            fill: textColor
          }} />
              <Tooltip contentStyle={{
            backgroundColor: bgColor,
            borderColor: gridColor,
            color: textColor
          }} formatter={(value, name) => [value, metricLabels[name as MetricKey]]} labelFormatter={label => {
            const date = new Date(label);
            return date.toLocaleDateString();
          }} />
              <Legend />
              {activeMetrics.includes('impressions') && <Line type="monotone" dataKey="impressions" stroke={metricColors.impressions} strokeWidth={2} dot={false} activeDot={{
            r: 4
          }} />}
              {activeMetrics.includes('clicks') && <Line type="monotone" dataKey="clicks" stroke={metricColors.clicks} strokeWidth={2} dot={false} activeDot={{
            r: 4
          }} />}
              {activeMetrics.includes('conversions') && <Line type="monotone" dataKey="conversions" stroke={metricColors.conversions} strokeWidth={2} dot={false} activeDot={{
            r: 4
          }} />}
              {activeMetrics.includes('revenue') && <Line type="monotone" dataKey="revenue" stroke={metricColors.revenue} strokeWidth={2} dot={false} activeDot={{
            r: 4
          }} />}
            </LineChart>
          </ResponsiveContainer>
        </div>}
    </div>;
};
export default PerformanceChart;