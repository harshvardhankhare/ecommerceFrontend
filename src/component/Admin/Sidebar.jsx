import React from 'react';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/admin' },
    { name: 'Orders', icon: ShoppingCartIcon, count: 12, path: '/admin/orders' },
    { name: 'Products', icon: TagIcon, count: 156, path: '/admin/add' },
    { name: 'Home Management', icon: UsersIcon, path: '/admin/management' },
    { name: 'Inventory', icon: ClipboardDocumentListIcon, path: '/admin/inventory' },
    { name: 'Analytics', icon: ChartBarIcon, path: '/admin/analytics' },
    { name: 'Revenue', icon: CurrencyDollarIcon, path: '/admin/revenue' },
    { name: 'Settings', icon: CogIcon, path: '/admin/settings' },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    navigate("/login/admin");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 text-gray-900 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-black">Shop<span className="text-gray-600">Admin</span></h1>
            <p className="text-gray-500 text-sm">E-commerce Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`h-5 w-5 ${
                        isActive(item.path) ? 'text-white' : 'text-gray-600'
                      }`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.count && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isActive(item.path)
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin"
                className="h-10 w-10 rounded-full border border-gray-300"
              />
              <div>
                <h3 className="font-semibold text-black">Admin User</h3>
                <p className="text-gray-500 text-sm">admin@shop.com</p>
              </div>
            </div>
            <button 
              onClick={handleLogOut} 
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;