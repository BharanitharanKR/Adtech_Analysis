import React from 'react';
interface StatusTagProps {
  status: 'active' | 'paused' | 'completed';
}
const StatusTag: React.FC<StatusTagProps> = ({
  status
}) => {
  let bgColor = '';
  let textColor = '';
  switch (status) {
    case 'active':
      bgColor = 'bg-green-100 dark:bg-green-900/30';
      textColor = 'text-green-800 dark:text-green-300';
      break;
    case 'paused':
      bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
      textColor = 'text-yellow-800 dark:text-yellow-300';
      break;
    case 'completed':
      bgColor = 'bg-blue-100 dark:bg-blue-900/30';
      textColor = 'text-blue-800 dark:text-blue-300';
      break;
    default:
      bgColor = 'bg-gray-100 dark:bg-gray-700';
      textColor = 'text-gray-800 dark:text-gray-300';
  }
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} capitalize`}>
      {status}
    </span>;
};
export default StatusTag;