import React from 'react';
import {
  PlusIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  EnvelopeIcon,
  CogIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const QuickActions = () => {
  const actions = [
    { icon: PlusIcon, title: 'Add New Product', description: 'Create new product listing', color: 'bg-blue-500' },
    { icon: ArrowUpTrayIcon, title: 'Update Inventory', description: 'Bulk update stock', color: 'bg-green-500' },
    { icon: ChartBarIcon, title: 'View Reports', description: 'Sales analytics & insights', color: 'bg-purple-500' },
    { icon: EnvelopeIcon, title: 'Send Newsletter', description: 'Email marketing campaign', color: 'bg-yellow-500' },
    { icon: CogIcon, title: 'Store Settings', description: 'Configure store options', color: 'bg-gray-500' },
    { icon: BellIcon, title: 'Notifications', description: 'Manage alert preferences', color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all"
          >
            <div className={`${action.color} p-3 rounded-lg mb-3`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-sm text-center">{action.title}</h3>
            <p className="text-xs text-gray-500 text-center mt-1">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;