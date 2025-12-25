import React, { useState } from 'react';
import Sidebar from '../component/Admin/Sidebar';
import Header from '../component/Admin/Header';
import DashboardStats from '../component/Admin/DashboardStats';
import RecentOrders from '../component/Admin/RecentOrders';
import TopProducts from '../component/Admin/TopProducts';
import QuickActions from '../component/Admin/QuickActions';

function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Banner */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, Admin!</h1>
            <p className="text-gray-600">Here's what's happening with your store today.</p>
          </div>

          {/* Stats Grid */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RecentOrders />
              
              {/* Chart Placeholder */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Revenue chart will be displayed here</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <TopProducts />
              <QuickActions />
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    'New order #ORD-007 received',
                    'Product "Wireless Earbuds" stock updated',
                    'Customer support ticket resolved',
                    'Monthly sales report generated',
                    'Store maintenance completed'
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                      <p className="text-sm">{activity}</p>
                      <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 ShopAdmin. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Help</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Admin;