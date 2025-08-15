import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
const ThemeToggle: React.FC = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`} aria-label="Toggle theme">
      {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>;
};
export default ThemeToggle;