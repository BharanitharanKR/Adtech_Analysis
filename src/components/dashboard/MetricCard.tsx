import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  change,
  loading = false
}) => {
  const {
    theme
  } = useTheme();
  return <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-all duration-200 hover:shadow-md`}>
      {loading ? <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div> : <>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium opacity-70">{title}</h3>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {icon}
            </div>
          </div>
          {change && <div className="mt-4 flex items-center">
              <span className={`flex items-center text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {change.isPositive ? <ArrowUpIcon size={16} className="mr-1" /> : <ArrowDownIcon size={16} className="mr-1" />}
                {Math.abs(change.value)}%
              </span>
              <span className="ml-2 text-sm opacity-70">vs last period</span>
            </div>}
        </>}
    </div>;
};
export default MetricCard;