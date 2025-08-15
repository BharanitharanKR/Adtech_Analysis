import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, BarChartIcon, SettingsIcon, LineChartIcon, MenuIcon, XIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const Sidebar: React.FC = () => {
  const {
    theme
  } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    name: 'Dashboard',
    path: '/',
    icon: <LayoutDashboardIcon size={20} />
  }, {
    name: 'Campaigns',
    path: '/campaigns',
    icon: <BarChartIcon size={20} />
  }, {
    name: 'Analytics',
    path: '/analytics',
    icon: <LineChartIcon size={20} />
  }, {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon size={20} />
  }];
  const isActive = (path: string) => location.pathname === path;
  const sidebarClasses = theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200';
  return <>
      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Sidebar for desktop */}
      <div className={`hidden md:flex flex-col w-64 ${sidebarClasses} border-r`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">PromptMagic</h1>
          <p className="text-sm opacity-70">AdTech Analytics</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive(item.path) ? theme === 'dark' ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-50 text-blue-700' : 'hover:bg-gray-700/10'}`}>
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>)}
        </nav>
        <div className="p-4">
          <div className="px-4 py-3 text-sm opacity-50">
            <p>v1.0.0</p>
          </div>
        </div>
      </div>
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setIsMobileMenuOpen(false)} />}
      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-20 w-64 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out ${sidebarClasses} border-r`}>
        <div className="p-4">
          <h1 className="text-xl font-bold">PromptMagic</h1>
          <p className="text-sm opacity-70">AdTech Analytics</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(item => <Link key={item.path} to={item.path} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive(item.path) ? theme === 'dark' ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-50 text-blue-700' : 'hover:bg-gray-700/10'}`} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>)}
        </nav>
      </div>
    </>;
};
export default Sidebar;