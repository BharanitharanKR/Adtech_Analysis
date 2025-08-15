import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { ThemeProvider } from './contexts/ThemeContext';
import { CampaignProvider } from './contexts/CampaignContext';
export function App() {
  return <ThemeProvider>
      <CampaignProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </CampaignProvider>
    </ThemeProvider>;
}