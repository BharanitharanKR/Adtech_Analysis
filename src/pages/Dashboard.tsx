import React from 'react';
import { BarChart2Icon, TrendingUpIcon, DollarSignIcon, EyeIcon } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import TopCampaignsChart from '../components/dashboard/TopCampaignsChart';
import BudgetDistributionChart from '../components/dashboard/BudgetDistributionChart';
import { useCampaigns } from '../contexts/CampaignContext';
import { calculateMetrics, mockDailyPerformance } from '../utils/mockData';
const Dashboard: React.FC = () => {
  const {
    campaigns,
    loading
  } = useCampaigns();
  const metrics = loading ? null : calculateMetrics(campaigns);
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-sm opacity-70">
          Overview of your advertising campaigns
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Impressions" value={loading ? '...' : metrics?.totalImpressions.toLocaleString() || '0'} icon={<EyeIcon size={24} />} change={{
        value: 12.5,
        isPositive: true
      }} loading={loading} />
        <MetricCard title="Click-Through Rate" value={loading ? '...' : `${metrics?.ctr.toFixed(2)}%` || '0%'} icon={<TrendingUpIcon size={24} />} change={{
        value: 3.2,
        isPositive: true
      }} loading={loading} />
        <MetricCard title="Budget Used" value={loading ? '...' : `$${metrics?.totalSpent.toLocaleString()}` || '$0'} icon={<BarChart2Icon size={24} />} change={{
        value: 8.1,
        isPositive: false
      }} loading={loading} />
        <MetricCard title="Revenue Earned" value={loading ? '...' : `$${metrics?.totalRevenue.toLocaleString()}` || '$0'} icon={<DollarSignIcon size={24} />} change={{
        value: 15.3,
        isPositive: true
      }} loading={loading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceChart data={mockDailyPerformance} loading={loading} />
        </div>
        <div>
          <BudgetDistributionChart campaigns={campaigns} loading={loading} />
        </div>
      </div>
      <div>
        <TopCampaignsChart campaigns={campaigns} loading={loading} />
      </div>
    </div>;
};
export default Dashboard;