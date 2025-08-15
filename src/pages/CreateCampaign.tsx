import React from 'react';
import CampaignForm from '../components/campaigns/CampaignForm';
const CreateCampaign: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Create Campaign</h1>
        <p className="text-sm opacity-70">Set up a new advertising campaign</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <CampaignForm />
      </div>
    </div>;
};
export default CreateCampaign;