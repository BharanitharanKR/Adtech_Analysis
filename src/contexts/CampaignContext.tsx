import React, { useEffect, useState, createContext, useContext } from 'react';
import { Campaign, mockCampaigns } from '../utils/mockData';
interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Omit<Campaign, 'id' | 'spent' | 'impressions' | 'clicks' | 'conversions' | 'revenue'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  loading: boolean;
}
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);
export const CampaignProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  // Simulate API fetch
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setCampaigns(mockCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'spent' | 'impressions' | 'clicks' | 'conversions' | 'revenue'>) => {
    // Generate mock metrics for the new campaign
    const impressions = Math.floor(Math.random() * 100000) + 5000;
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01));
    const conversions = Math.floor(clicks * (Math.random() * 0.2 + 0.05));
    const spent = Math.floor(campaignData.budget * (Math.random() * 0.3));
    const revenue = Math.floor(spent * (Math.random() * 3 + 1.2));
    const newCampaign: Campaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      spent,
      impressions,
      clicks,
      conversions,
      revenue
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  };
  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => campaign.id === id ? {
      ...campaign,
      ...updates
    } : campaign));
  };
  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };
  return <CampaignContext.Provider value={{
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    loading
  }}>
      {children}
    </CampaignContext.Provider>;
};
export const useCampaigns = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};