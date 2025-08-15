import React from 'react';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import { mockDailyPerformance } from '../utils/mockData';
const Analytics: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-sm opacity-70">Detailed performance analytics</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-medium mb-6">Performance Trends</h2>
        <div className="h-96">
          <PerformanceChart data={mockDailyPerformance} />
        </div>
      </div>
      <div className="text-center py-8 opacity-70">
        <p>More analytics features coming soon!</p>
      </div>
    </div>;
};
export default Analytics;