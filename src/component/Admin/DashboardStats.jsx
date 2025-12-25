import React from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$124,580',
      change: '+12.5%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
      subtitle: 'Last 30 days'
    },
    {
      title: 'Total Orders',
      value: '1,248',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCartIcon,
      color: 'bg-blue-500',
      subtitle: '45 pending'
    },
    {
      title: 'Customers',
      value: '8,942',
      change: '+5.7%',
      trend: 'up',
      icon: UsersIcon,
      color: 'bg-purple-500',
      subtitle: 'Active users'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-1.2%',
      trend: 'down',
      icon: ChartBarIcon,
      color: 'bg-yellow-500',
      subtitle: 'Website visits'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <div className="flex items-center mt-2">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-2">vs last month</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">{stat.subtitle}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;