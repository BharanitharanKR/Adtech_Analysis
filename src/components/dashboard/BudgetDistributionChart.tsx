import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { Campaign } from '../../utils/mockData';
interface BudgetDistributionChartProps {
  campaigns: Campaign[];
  loading?: boolean;
}
const BudgetDistributionChart: React.FC<BudgetDistributionChartProps> = ({
  campaigns,
  loading = false
}) => {
  const {
    theme
  } = useTheme();
  // Group campaigns by status and calculate total budget for each status
  const budgetByStatus = campaigns.reduce((acc, campaign) => {
    const {
      status,
      budget
    } = campaign;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status] += budget;
    return acc;
  }, {} as Record<string, number>);
  // Format data for the pie chart
  const data = Object.entries(budgetByStatus).map(([status, budget]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: budget
  }));
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const textColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';
  const bgColor = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  return <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm h-full`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">Budget Distribution</h3>
      </div>
      {loading ? <div className="animate-pulse flex flex-col space-y-4 h-64">
          <div className="h-full w-full bg-gray-300 rounded"></div>
        </div> : <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
            name,
            percent
          }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={value => [`$${value.toLocaleString()}`, 'Budget']} contentStyle={{
            backgroundColor: bgColor,
            borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
            color: textColor
          }} />
              <Legend formatter={value => <span style={{
            color: textColor
          }}>
                    {value}
                  </span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>}
    </div>;
};
export default BudgetDistributionChart;