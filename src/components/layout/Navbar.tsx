import React from "react";
import { BellIcon, UserIcon, SearchIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggle from "../ui/ThemeToggle";
const Navbar: React.FC = () => {
  const { theme } = useTheme();
  return (
    <header
      className={`sticky top-0 z-10 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      } border-b px-4 py-3 flex items-center justify-between`}
    >
      <div className="flex items-center md:hidden">
        <h1 className="text-xl font-bold ml-8">Campaign Tracker</h1>
      </div>
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div
          className={`relative flex-1 max-w-md ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          } rounded-md`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={16} className="opacity-50" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            className={`block w-full pl-10 pr-3 py-2 rounded-md border-0 ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-gray-100 text-gray-900 placeholder-gray-500"
            } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button
          className={`p-2 rounded-full ${
            theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
        >
          <BellIcon size={20} />
        </button>
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === "dark" ? "bg-blue-500" : "bg-blue-100"
            }`}
          >
            <UserIcon
              size={16}
              className={theme === "dark" ? "text-white" : "text-blue-500"}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
