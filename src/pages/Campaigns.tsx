import React from 'react';
import CampaignsTable from '../components/campaigns/CampaignsTable';
import { useCampaigns } from '../contexts/CampaignContext';
const Campaigns: React.FC = () => {
  const {
    campaigns,
    loading
  } = useCampaigns();
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Campaigns</h1>
        <p className="text-sm opacity-70">Manage your advertising campaigns</p>
      </div>
      <CampaignsTable campaigns={campaigns} loading={loading} />
    </div>;
};
export default Campaigns;