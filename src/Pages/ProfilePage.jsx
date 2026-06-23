import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  PencilIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  CogIcon,
  BellIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  CheckIcon,
  LogoutIcon,
  CameraIcon,
  PhoneIcon,
  StarIcon,
  TrashIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
  CreditCardIcon,
  GiftIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { getMe, getMyOrders } from '../api/axios';
import Navbar2 from '../component/Navbar2';
import Footer from '../component/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    joinedDate: '2023-01-15',
    membership: 'Gold Member',
    totalOrders: 15,
    totalSpent: '$2,450.75',
    wishlistCount: 8,
    addresses: 3
  });
  const [data, setData] = useState();

  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1590658165737-15a047b8b5e4?w=300&auto=format&fit=crop',
      category: 'Electronics',
      rating: 4.8,
      inStock: true,
      addedDate: '2024-01-10'
    },
    {
      id: 2,
      name: 'Designer Handbag',
      price: 349.99,
      originalPrice: 499.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop',
      category: 'Fashion',
      rating: 4.6,
      inStock: true,
      addedDate: '2024-01-08'
    },
    {
      id: 3,
      name: 'Smart Fitness Tracker',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=300&auto=format&fit=crop',
      category: 'Electronics',
      rating: 4.4,
      inStock: false,
      addedDate: '2024-01-05'
    },
    {
      id: 4,
      name: 'Organic Cotton Bed Sheets',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop',
      category: 'Home',
      rating: 4.7,
      inStock: true,
      addedDate: '2024-01-02'
    }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Home',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'Work',
      address: '456 Office Avenue',
      city: 'Brooklyn',
      state: 'NY',
      zip: '11201',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false
    },
    {
      id: 3,
      type: 'other',
      name: 'Vacation Home',
      address: '789 Beach Road',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'United States',
      phone: '+1 (555) 456-7890',
      isDefault: false
    }
  ]);

  const [recentlyViewed, setRecentlyViewed] = useState([
    { id: 1, name: 'Gaming Laptop', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&auto=format&fit=crop', price: 1299.99, viewed: '2 hours ago' },
    { id: 2, name: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop', price: 89.99, viewed: '1 day ago' },
    { id: 3, name: 'Kitchen Blender', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&auto=format&fit=crop', price: 129.99, viewed: '3 days ago' },
    { id: 4, name: 'Office Chair', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop', price: 299.99, viewed: '1 week ago' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order shipped', message: 'Your order ORD-2024-001 has been shipped', time: '2 hours ago', read: false, icon: '🚚' },
    { id: 2, title: 'Price drop alert', message: 'Wireless Headphones price dropped by 20%', time: '1 day ago', read: true, icon: '💰' },
    { id: 3, title: 'Welcome bonus', message: 'You earned 1000 reward points!', time: '2 days ago', read: true, icon: '🎁' },
    { id: 4, title: 'Password changed', message: 'Your password was changed successfully', time: '1 week ago', read: true, icon: '🔒' }
  ]);

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(userData);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserCircleIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon, count: data?.length },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon, count: wishlist.length },
    { id: 'addresses', name: 'Addresses', icon: MapPinIcon, count: addresses.length },
    { id: 'settings', name: 'Settings', icon: CogIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon, count: notifications.filter(n => !n.read).length }
  ];

  useEffect(() => {
    const getUserOrders = async () => {
      let res = await getMyOrders();
      setData(res.data);
    };
    const getUser = async () => {
      let res = await getMe();
      setUser(res);
    };
    getUser();
    getUserOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleSaveProfile = () => {
    setUserData(profileForm);
    setEditingProfile(false);
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const handleAddToCartFromWishlist = (product) => {
    console.log('Added to cart:', product);
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const handleDeleteAddress = (addressId) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
    } else {
      alert('You must have at least one address');
    }
  };

  const handleAddAddress = () => {
    const newId = Math.max(...addresses.map(a => a.id)) + 1;
    setAddresses([...addresses, { ...newAddress, id: newId }]);
    setShowAddAddress(false);
    setNewAddress({
      type: 'home',
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'United States',
      phone: '',
      isDefault: false
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'processing': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckIcon className="h-4 w-4" />;
      case 'shipped': return <TruckIcon className="h-4 w-4" />;
      case 'processing': return <ClockIcon className="h-4 w-4" />;
      case 'cancelled': return <XCircleIcon className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  let totalSpend = 0;
  for (let i = 0; i < data?.length; i++) {
    totalSpend += data[i].totalPrice;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Card */}
            <motion.div 
              className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h2>
                <p className="text-white/80 mt-2 text-lg">Here's what's happening with your account today</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                    🎯 {userData.membership}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                    🗓️ Member since {formatDate(userData.joinedDate)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', value: data?.length || 0, color: 'from-blue-500 to-cyan-500', icon: ShoppingBagIcon },
                { label: 'Total Spent', value: `₹${totalSpend.toFixed(2)}`, color: 'from-emerald-500 to-teal-500', icon: CreditCardIcon },
                { label: 'Wishlist', value: wishlist.length, color: 'from-rose-500 to-pink-500', icon: HeartIcon },
                { label: 'Addresses', value: addresses.length, color: 'from-indigo-500 to-purple-500', icon: MapPinIcon },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-3`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                  <p className="text-sm text-gray-500">Your latest purchases</p>
                </div>
                <Link to="/user/orders" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center">
                  View All <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {data?.slice(0, 3).map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <ShoppingBagIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Order #{order.id}</div>
                          <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">₹{order.totalPrice.toFixed(2)}</div>
                        <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recently Viewed */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recently Viewed</h3>
                <p className="text-sm text-gray-500">Products you've checked out</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentlyViewed.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -4 }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="font-medium text-sm text-gray-900 truncate">{item.name}</div>
                      <div className="text-indigo-600 font-bold text-sm">${item.price.toFixed(2)}</div>
                      <div className="text-xs text-gray-400">{item.viewed}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'orders':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Order History</h2>
              <p className="text-sm text-gray-500">View and track all your orders</p>
            </div>
            <div className="p-6">
              {data?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBagIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Start Shopping <ChevronRightIcon className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {data?.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                            <ShoppingBagIcon className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">Order #{order.id}</div>
                            <div className="text-sm text-gray-500">
                              {formatDate(order.createdAt)} • {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 md:mt-0">
                          <div className="font-bold text-lg text-gray-900">₹{order.totalPrice.toFixed(2)}</div>
                          <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="px-6 py-4">
                        <div className="flex items-center gap-4 overflow-x-auto pb-2">
                          {order.items?.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-gray-100">
                              <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                            View Details
                          </button>
                          {order.status === 'shipped' && order.tracking && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                              Track Order
                            </button>
                          )}
                          {(order.status === 'delivered' || order.status === 'cancelled') && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
                              Buy Again
                            </button>
                          )}
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium">
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'wishlist':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Wishlist</h2>
                <p className="text-sm text-gray-500">Items you've saved for later</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {wishlist.length} items
              </span>
            </div>
            <div className="p-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">Save items you love for later</p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Start Shopping <ChevronRightIcon className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -4 }}
                      className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {!item.inStock && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                            Out of Stock
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-xl shadow-md transition-colors"
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{item.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                            {item.originalPrice > item.price && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCartFromWishlist(item)}
                            disabled={!item.inStock}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                              item.inStock
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                        <div className="mt-3 text-xs text-gray-400">
                          Added on {formatDate(item.addedDate)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'addresses':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                <p className="text-sm text-gray-500">Manage your delivery addresses</p>
              </div>
              <button
                onClick={() => setShowAddAddress(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                <PlusIcon className="h-5 w-5" />
                Add New Address
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <motion.div
                    key={address.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -2 }}
                    className={`border rounded-xl p-5 transition-all ${
                      address.isDefault ? 'border-indigo-300 bg-indigo-50/30' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className={`h-5 w-5 ${address.isDefault ? 'text-indigo-600' : 'text-gray-400'}`} />
                        <span className="font-bold text-gray-900">{address.name}</span>
                        {address.isDefault && (
                          <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
                          title="Set as default"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete address"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 text-gray-700">
                      <p className="text-sm">{address.address}</p>
                      <p className="text-sm">{address.city}, {address.state} {address.zip}</p>
                      <p className="text-sm">{address.country}</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100 mt-2">
                        <PhoneIcon className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Add Address Modal */}
            <AnimatePresence>
              {showAddAddress && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          <XCircleIcon className="h-6 w-6 text-gray-500" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Address Type
                          </label>
                          <select
                            value={newAddress.type}
                            onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="home">🏠 Home</option>
                            <option value="work">💼 Work</option>
                            <option value="other">📍 Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Address Name
                          </label>
                          <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="e.g., Home, Office"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              City
                            </label>
                            <input
                              type="text"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              State
                            </label>
                            <input
                              type="text"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              value={newAddress.zip}
                              onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={newAddress.phone}
                              onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-700">Set as default address</span>
                        </label>
                      </div>
                      <div className="flex gap-3 mt-8">
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAddress}
                          className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              <p className="text-sm text-gray-500">Manage your account preferences</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                    Profile Information
                  </h3>
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setEditingProfile(false)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={userData.avatar}
                          alt={user?.name}
                          className="h-20 w-20 rounded-full border-2 border-gray-200"
                        />
                        <div>
                          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
                            <CameraIcon className="h-4 w-4" />
                            Change Photo
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                          <div className="font-medium text-gray-900">{user?.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                          <div className="font-medium text-gray-900">{user?.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                          <div className="font-medium text-gray-900">{userData.phone}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                          <div className="font-medium text-gray-900">{formatDate(userData.joinedDate)}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* Security Settings */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                    Security
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">Password</div>
                        <div className="text-sm text-gray-500">Last changed 3 months ago</div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                        Change Password
                      </button>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-500">Add extra security to your account</div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <BellIcon className="h-6 w-6 text-indigo-600" />
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Email Notifications', desc: 'Receive order updates via email', checked: true },
                      { label: 'SMS Notifications', desc: 'Receive order updates via SMS', checked: false },
                      { label: 'Marketing Emails', desc: 'Receive promotional emails', checked: true },
                    ].map((pref, index) => (
                      <label key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                        <div>
                          <div className="font-medium text-gray-900">{pref.label}</div>
                          <div className="text-sm text-gray-500">{pref.desc}</div>
                        </div>
                        <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" defaultChecked={pref.checked} />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50/30">
                  <h3 className="font-bold text-lg text-red-700 mb-4 flex items-center gap-2">
                    <XCircleIcon className="h-6 w-6" />
                    Danger Zone
                  </h3>
                  <div className="bg-white rounded-xl p-4 border border-red-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-red-700">Delete Account</div>
                        <div className="text-sm text-red-600">Permanently delete your account and all data</div>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors text-sm font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">
                  {notifications.filter(n => !n.read).length} unread notifications
                </p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                Mark all as read
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl border transition-all ${
                      !notification.read 
                        ? 'bg-indigo-50 border-indigo-200' 
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        !notification.read ? 'bg-indigo-100' : 'bg-gray-100'
                      }`}>
                        <span className="text-xl">{notification.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">{notification.title}</div>
                            <div className="text-gray-600 text-sm mt-1">{notification.message}</div>
                          </div>
                          <div className="text-xs text-gray-400 flex-shrink-0 ml-4">{notification.time}</div>
                        </div>
                        {!notification.read && (
                          <button className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <div className="flex items-center gap-6">
                <Link to="/products" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Shop
                </Link>
                <Link to="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors relative">
                  <ShoppingBagIcon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                {/* Profile Summary */}
                <div className="text-center mb-6 pb-6 border-b border-gray-100">
                  <div className="relative inline-block">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="h-24 w-24 rounded-full mx-auto border-4 border-white shadow-md"
                    />
                    <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white">
                      <CameraIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mt-3">{user?.name}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full">
                    <GiftIcon className="h-3 w-3" />
                    {userData.membership}
                  </div>
                </div>

                {/* Navigation Tabs */}
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon className={`h-5 w-5 ${
                          activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm">{tab.name}</span>
                      </div>
                      {tab.count !== undefined && tab.count > 0 && (
                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                          activeTab === tab.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Quick Stats</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Total Orders</span>
                      <span className="font-bold text-gray-900">{data?.length || 0}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Total Spent</span>
                      <span className="font-bold text-gray-900">₹{totalSpend.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Wishlist</span>
                      <span className="font-bold text-gray-900">{wishlist.length}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Member Since</span>
                      <span className="font-bold text-gray-900">{formatDate(userData.joinedDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;