import React from 'react';
import { 
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-600"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders, products, customers..."
              className="bg-transparent border-none outline-none px-3 w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Today's Revenue</p>
              <p className="font-semibold">$12,458</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Orders</p>
              <p className="font-semibold">48</p>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
              alt="Admin"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;