import React from 'react';

export default function StatCard({ title, value, icon }) {
  const iconMap = {
    total: {
      path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    owned: {
      path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    read: {
      path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    'to-buy': {
      path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    },
  };
  
  const iconData = iconMap[icon] || iconMap.total;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-4">
      <div className={`flex-shrink-0 p-3 ${iconData.color} rounded-full text-white shadow-lg`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {iconData.path}
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}