// Mock data for the AdTech analytics dashboard
export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}
export interface DailyPerformance {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}
// Generate random campaigns
const generateCampaigns = (count: number): Campaign[] => {
  const statuses: ('active' | 'paused' | 'completed')[] = ['active', 'paused', 'completed'];
  const campaigns: Campaign[] = [];
  for (let i = 1; i <= count; i++) {
    const impressions = Math.floor(Math.random() * 1000000) + 10000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const conversions = Math.floor(clicks * (Math.random() * 0.2 + 0.05));
    const budget = Math.floor(Math.random() * 50000) + 5000;
    const spent = Math.floor(budget * (Math.random() * 0.9 + 0.1));
    const revenue = Math.floor(spent * (Math.random() * 3 + 1.2));
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60) + 30);
    campaigns.push({
      id: `camp-${i}`,
      name: `Campaign ${i}`,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      budget,
      spent,
      impressions,
      clicks,
      conversions,
      revenue
    });
  }
  return campaigns;
};
// Generate performance data for the last 30 days
const generateDailyPerformance = (days: number): DailyPerformance[] => {
  const data: DailyPerformance[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const impressions = Math.floor(Math.random() * 50000) + 10000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const conversions = Math.floor(clicks * (Math.random() * 0.2 + 0.05));
    const revenue = Math.floor(conversions * (Math.random() * 50 + 20));
    data.push({
      date: date.toISOString().split('T')[0],
      impressions,
      clicks,
      conversions,
      revenue
    });
  }
  return data;
};
// Export mock data
export const mockCampaigns = generateCampaigns(20);
export const mockDailyPerformance = generateDailyPerformance(30);
// Calculate summary metrics
export const calculateMetrics = (campaigns: Campaign[]) => {
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);
  const ctr = totalClicks / totalImpressions * 100;
  const roas = totalRevenue / totalSpent;
  return {
    totalImpressions,
    totalClicks,
    totalBudget,
    totalSpent,
    totalRevenue,
    ctr,
    roas,
    budgetUsedPercentage: totalSpent / totalBudget * 100
  };
};