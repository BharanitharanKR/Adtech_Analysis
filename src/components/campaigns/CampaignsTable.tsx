import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpIcon, ArrowDownIcon, SearchIcon, FilterIcon, MoreHorizontalIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Campaign } from '../../utils/mockData';
import StatusTag from './StatusTag';
interface CampaignsTableProps {
  campaigns: Campaign[];
  loading?: boolean;
}
type SortField = 'name' | 'startDate' | 'endDate' | 'status' | 'budget';
type SortDirection = 'asc' | 'desc';
const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaigns,
  loading = false
}) => {
  const {
    theme
  } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const filteredCampaigns = campaigns.filter(campaign => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortField === 'budget') {
      return sortDirection === 'asc' ? a.budget - b.budget : b.budget - a.budget;
    }
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return <div className={`rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm overflow-hidden`}>
      <div className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="font-medium text-lg">All Campaigns</h3>
        <div className="flex items-center gap-2">
          <div className={`relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={16} className="opacity-50" />
            </div>
            <input type="text" placeholder="Search campaigns..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={`block w-full pl-10 pr-3 py-2 rounded-md border-0 ${theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-blue-500 focus:outline-none`} />
          </div>
          <button className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <FilterIcon size={20} />
          </button>
          <button onClick={() => navigate('/create-campaign')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            New Campaign
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center space-x-1">
                  <span>Campaign Name</span>
                  {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />)}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('startDate')}>
                <div className="flex items-center space-x-1">
                  <span>Start Date</span>
                  {sortField === 'startDate' && (sortDirection === 'asc' ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />)}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('endDate')}>
                <div className="flex items-center space-x-1">
                  <span>End Date</span>
                  {sortField === 'endDate' && (sortDirection === 'asc' ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />)}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {sortField === 'status' && (sortDirection === 'asc' ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />)}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer" onClick={() => handleSort('budget')}>
                <div className="flex items-center space-x-1">
                  <span>Budget</span>
                  {sortField === 'budget' && (sortDirection === 'asc' ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />)}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {loading ? Array(5).fill(0).map((_, index) => <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </td>
                  </tr>) : sortedCampaigns.length > 0 ? sortedCampaigns.map(campaign => <tr key={campaign.id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors cursor-pointer`} onClick={() => {}}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(campaign.startDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(campaign.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusTag status={campaign.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
                      <MoreHorizontalIcon size={18} />
                    </button>
                  </td>
                </tr>) : <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  No campaigns found
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
      <div className={`px-6 py-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-t dark:border-gray-700`}>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            Showing{' '}
            <span className="font-medium">{sortedCampaigns.length}</span> of{' '}
            <span className="font-medium">{campaigns.length}</span> campaigns
          </div>
          <div className="flex items-center space-x-2">
            <button className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
              Previous
            </button>
            <button className={`px-3 py-1 rounded-md ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default CampaignsTable;