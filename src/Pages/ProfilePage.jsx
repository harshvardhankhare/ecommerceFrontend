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
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import  { getMe, getMyOrders } from '../api/axios';
import Navbar2 from '../component/Navbar2';
import Footer from '../component/Footer';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const[user,SetUser]=useState()
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
const [data,setData] = useState()

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
    { id: 1, name: 'Gaming Laptop', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w-200&auto=format&fit=crop', price: 1299.99, viewed: '2 hours ago' },
    { id: 2, name: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop', price: 89.99, viewed: '1 day ago' },
    { id: 3, name: 'Kitchen Blender', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&auto=format&fit=crop', price: 129.99, viewed: '3 days ago' },
    { id: 4, name: 'Office Chair', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop', price: 299.99, viewed: '1 week ago' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Order shipped', message: 'Your order ORD-2024-001 has been shipped', time: '2 hours ago', read: false },
    { id: 2, title: 'Price drop alert', message: 'Wireless Headphones price dropped by 20%', time: '1 day ago', read: true },
    { id: 3, title: 'Welcome bonus', message: 'You earned 1000 reward points!', time: '2 days ago', read: true },
    { id: 4, title: 'Password changed', message: 'Your password was changed successfully', time: '1 week ago', read: true }
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
    // Fetch user data from localStorage or API
    const getUserOrders = async() =>{
          let res = await getMyOrders()
  
          setData(res.data)
    } 
    const getUser = async()=>{

       let res = await getMe();
       SetUser(res)
    }
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
    // Add to cart logic
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
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  let totalSpend =0;
  for(let i =0; i<data?.length; i++){
   totalSpend += data[i].totalPrice;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gray-800 text-white rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Welcome back, {user?.name.split(' ')[0]}! 👋</h2>
                  <p className="text-white/80 mt-1">Here's your shopping summary</p>
                </div>
                <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <UserCircleIcon className="h-8 w-8" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-2xl font-bold text-primary">{data?.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-2xl font-bold text-green-600">₹{totalSpend}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-2xl font-bold text-purple-600">{wishlist.length}</div>
                <div className="text-sm text-gray-600">Wishlist Items</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-2xl font-bold text-blue-600">{userData.addresses}</div>
                <div className="text-sm text-gray-600">Saved Addresses</div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow border">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Recent Orders</h3>
                  <Link to="/user/orders" className="text-primary hover:text-primary-dark text-sm">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {data?.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{order.shippingAddress}</div>
                        <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${order.totalPrice.toFixed(2)}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-xl shadow border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-bold">Recently Viewed</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentlyViewed.map(item => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="group text-center"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="font-medium text-sm line-clamp-1">{item.name}</div>
                      <div className="text-primary font-bold">${item.price.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{item.viewed}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Order History</h2>
              <p className="text-gray-600 text-sm mt-1">View and track your orders</p>
            </div>
            <div className="p-6">
              {data?.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                  <Link
                    to="/shop"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {data?.map(order => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      {/* Order Header */}
                      <div className="bg-gray-50 p-4 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <div className="font-bold">Order #{order.id}</div>
                          <div className="text-sm text-gray-600">
                            Placed on {formatDate(order.createdAt)} • {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0 flex items-center space-x-4">
                          <div className="font-bold text-lg"> ₹{order.totalPrice.toFixed(2)}</div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-4">
                        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                          {order.items.map(product => (
                            <div key={product.id} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                              +{order.items.length - 2} more
                            </div>
                          )}
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                            View Details
                          </button>
                          {order.status === 'shipped' && order.tracking && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                              Track Order
                            </button>
                          )}
                          {(order.status === 'delivered' || order.status === 'cancelled') && (
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                              Buy Again
                            </button>
                          )}
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm">
                            Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="bg-white rounded-xl shadow border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">My Wishlist</h2>
                  <p className="text-gray-600 text-sm mt-1">Save items for later</p>
                </div>
                <div className="text-sm text-gray-600">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="p-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <HeartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">Save items you love for later</p>
                  <Link
                    to="/shop"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map(item => (
                    <div key={item.id} className="border rounded-lg overflow-hidden group">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                        {!item.inStock && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold line-clamp-1">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                          <div className="flex items-center text-sm">
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                            <span className="ml-1">{item.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                            {item.originalPrice > item.price && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCartFromWishlist(item)}
                            disabled={!item.inStock}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              item.inStock
                                ? 'bg-primary text-white hover:bg-primary-dark'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          Added on {formatDate(item.addedDate)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-white rounded-xl shadow border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <p className="text-gray-600 text-sm mt-1">Manage your delivery addresses</p>
                </div>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add New Address
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(address => (
                  <div key={address.id} className="border rounded-lg p-5 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="font-bold">{address.name}</span>
                          {address.isDefault && (
                            <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 capitalize">{address.type} Address</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          {address.isDefault ? (
                            <CheckIcon className="h-5 w-5" />
                          ) : (
                            <span className="text-sm">Set Default</span>
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} {address.zip}</p>
                      <p>{address.country}</p>
                      <p className="pt-2 border-t mt-2">
                        <PhoneIcon className="h-4 w-4 inline mr-2" />
                        {address.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {showAddAddress && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Add New Address</h3>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Type
                          </label>
                          <select
                            value={newAddress.type}
                            onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Name
                          </label>
                          <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., Home, Office"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State
                            </label>
                            <input
                              type="text"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              value={newAddress.zip}
                              onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone
                            </label>
                            <input
                              type="tel"
                              value={newAddress.phone}
                              onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                            className="h-4 w-4 text-primary rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                        </label>
                      </div>
                      <div className="flex space-x-4 mt-8">
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAddress}
                          className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Account Settings</h2>
              <p className="text-gray-600 text-sm mt-1">Manage your account preferences</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Profile Information</h3>
                  {editingProfile ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setEditingProfile(false)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={userData.avatar}
                          alt={user?.name}
                          className="h-20 w-20 rounded-full border"
                        />
                        <div>
                          <button className="text-primary hover:text-primary-dark text-sm">
                            <CameraIcon className="h-4 w-4 inline mr-1" />
                            Change Photo
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <div className="font-medium">{user?.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <div className="font-medium">{user?.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <div className="font-medium">{userData.phone}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Member Since
                          </label>
                          <div className="font-medium">{formatDate(userData.joinedDate)}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="text-primary hover:text-primary-dark font-medium flex items-center"
                      >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* Security Settings */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Security</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Password</div>
                        <div className="text-sm text-gray-600">Last changed 3 months ago</div>
                      </div>
                      <button className="text-primary hover:text-primary-dark font-medium">
                        Change Password
                      </button>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add extra security to your account</div>
                      </div>
                      <button className="text-primary hover:text-primary-dark font-medium">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-600">Receive order updates via email</div>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-gray-600">Receive order updates via SMS</div>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </label>
                    <label className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-gray-600">Receive promotional emails</div>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </label>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <h3 className="font-bold text-lg mb-4 text-red-700">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                      <div>
                        <div className="font-medium text-red-700">Delete Account</div>
                        <div className="text-sm text-red-600">Permanently delete your account and all data</div>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="bg-white rounded-xl shadow border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Notifications</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {notifications.filter(n => !n.read).length} unread notifications
                  </p>
                </div>
                <button className="text-primary hover:text-primary-dark text-sm">
                  Mark all as read
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${!notification.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <BellIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{notification.title}</div>
                            <div className="text-gray-600 text-sm mt-1">{notification.message}</div>
                          </div>
                          <div className="text-xs text-gray-500">{notification.time}</div>
                        </div>
                        {!notification.read && (
                          <button className="mt-3 text-primary hover:text-primary-dark text-sm">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
   <Navbar2/>
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">Profile</Link>
            <div className="flex items-center space-x-6">
              <Link to="/products" className="text-gray-600 hover:text-primary">Shop</Link>
              <Link to="/cart" className="text-gray-600 hover:text-primary relative">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 flex items-center"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow border p-6 sticky top-6">
              {/* Profile Summary */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="h-24 w-24 rounded-full mx-auto border-4 border-white shadow"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                    <CameraIcon className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <div className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                  {userData.membership}
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-black'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <tab.icon className="h-5 w-5 mr-3" />
                      <span>{tab.name}</span>
                    </div>
                    {tab.count && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === tab.id
                          ? 'bg-white text-primary'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold text-gray-700 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Orders</span>
                    <span className="font-bold">{userData.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-bold">{totalSpend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wishlist Items</span>
                    <span className="font-bold">{wishlist.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-bold">{formatDate(userData.joinedDate)}</span>
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

     <Footer/>
    </div>

     </>
  );
};

export default ProfilePage;