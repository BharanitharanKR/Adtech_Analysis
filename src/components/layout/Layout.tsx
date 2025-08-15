import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    theme
  } = useTheme();
  return <div className={`flex h-screen w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>;
};
export default Layout;