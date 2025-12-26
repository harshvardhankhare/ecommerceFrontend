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
import { Link, useNavigate,useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, active: true,path:'/admin' },
    { name: 'Orders', icon: ShoppingCartIcon, count: 12 },
    { name: 'Products', icon: TagIcon, count: 156 ,path:"/add"},
    { name: 'Customers', icon: UsersIcon, count: 892 },
    { name: 'Inventory', icon: ClipboardDocumentListIcon },
    { name: 'Analytics', icon: ChartBarIcon },
    { name: 'Revenue', icon: CurrencyDollarIcon },
    { name: 'Settings', icon: CogIcon },
  ];
  const handleLogOut = ()=>{
localStorage.removeItem("userToken")
navigate("/login/admin")
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-dark text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-red-700">
            <h1 className="text-2xl font-bold text-gray-800">Shop<span className="text-gray-800">Admin</span></h1>
            <p className="text-green-400 text-sm">E-commerce Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
           <ul className="space-y-2">
  {menuItems.map((item) => (
    <li key={item.name}>
      {item.path ? (
        <Link
          to={item.path}
          className={`flex items-center justify-between p-3 rounded-lg transition-colors
            ${
              location.pathname === item.path
                ? "bg-green-500 text-white"
                : "bg-gray-800 hover:bg-orange-500"
            }`}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </div>
          {item.count && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {item.count}
            </span>
          )}
        </Link>
      ) : (
        <div className="flex items-center p-3 bg-gray-800 rounded-lg opacity-50 cursor-not-allowed">
          <item.icon className="h-5 w-5 mr-3" />
          {item.name}
        </div>
      )}
    </li>
  ))}
</ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Admin"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">Admin User</h3>
                <p className="text-gray-400 text-sm">admin@shop.com</p>
              </div>
            </div>
            <button onClick={handleLogOut} className="mt-4 flex items-center space-x-2 text-gray-800 hover:text-black transition-colors">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;