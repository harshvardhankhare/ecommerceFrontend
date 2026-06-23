import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiChevronRight,
  FiClock,
  FiTag,
  FiTruck,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiShoppingBag,
  FiHeart,
  FiArrowRight,
  FiFilter,
  FiGrid,
  FiList,
  FiSliders,
  FiX,
} from "react-icons/fi";
import {
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward,
  IoSparklesOutline,
  IoRocketOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import { FaFire, FaGift, FaCrown, FaTruck, FaUndo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar2 from "../component/Navbar2";
import Footer from "../component/Footer";

const DealsPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("discount");
  const [showFilters, setShowFilters] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Deals data
  const deals = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      rating: 4.7,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      badge: "Best Seller",
      sold: 1234,
      stock: 45,
      isFlashSale: true,
      description: "Premium noise-canceling headphones with 30-hour battery life"
    },
    {
      id: 2,
      name: "Premium Running Shoes",
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      rating: 4.5,
      reviews: 856,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Sports",
      badge: "Trending",
      sold: 856,
      stock: 30,
      isFlashSale: true,
      description: "Lightweight running shoes with superior cushioning"
    },
    {
      id: 3,
      name: "Smart Watch Series 7",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      badge: "Popular",
      sold: 567,
      stock: 20,
      isFlashSale: true,
      description: "Advanced smartwatch with health monitoring features"
    },
    {
      id: 4,
      name: "Designer Handbag",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category: "Fashion",
      badge: "Staff Pick",
      sold: 234,
      stock: 15,
      isFlashSale: false,
      description: "Premium leather handbag with elegant design"
    },
    {
      id: 5,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.3,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "Fashion",
      badge: "Eco-Friendly",
      sold: 456,
      stock: 100,
      isFlashSale: false,
      description: "100% organic cotton, eco-friendly t-shirt"
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.4,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=400&fit=crop",
      category: "Sports",
      badge: "Top Rated",
      sold: 342,
      stock: 50,
      isFlashSale: false,
      description: "Non-slip yoga mat with carrying strap"
    },
    {
      id: 7,
      name: "LED Desk Lamp",
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.2,
      reviews: 265,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
      category: "Home",
      badge: "Sale",
      sold: 265,
      stock: 35,
      isFlashSale: false,
      description: "Adjustable LED lamp with touch controls"
    },
    {
      id: 8,
      name: "Best Seller Novel",
      price: 14.99,
      originalPrice: 24.99,
      discount: 40,
      rating: 4.9,
      reviews: 789,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
      category: "Books",
      badge: "New Release",
      sold: 789,
      stock: 200,
      isFlashSale: false,
      description: "New York Times bestseller novel"
    },
  ];

  // Categories for filter
  const categories = ["all", "Electronics", "Fashion", "Sports", "Home", "Books"];

  // Sort options
  const sortOptions = [
    { value: "discount", label: "Highest Discount" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter and sort deals
  const filteredDeals = deals
    .filter(deal => {
      if (selectedCategory === "all") return true;
      return deal.category === selectedCategory;
    })
    .filter(deal => deal.price >= priceRange[0] && deal.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return b.discount - a.discount;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popular":
          return b.sold - a.sold;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const flashDeals = deals.filter(deal => deal.isFlashSale);
  const maxDiscount = Math.max(...deals.map(d => d.discount));

  return (
    <>
      <Navbar2 />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 animate-pulse"></div>
          </div>
          <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold mb-4"
              >
                🔥 Up to {maxDiscount}% OFF
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Exclusive Deals</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Shop the best deals with up to {maxDiscount}% discount
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[60px]">
                      <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                      <div className="text-xs">HOURS</div>
                    </div>
                  </div>
                  <div className="text-2xl font-light">:</div>
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[60px]">
                      <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                      <div className="text-xs">MINUTES</div>
                    </div>
                  </div>
                  <div className="text-2xl font-light">:</div>
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[60px]">
                      <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                      <div className="text-xs">SECONDS</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Flash Sale Section */}
        {flashDeals.length > 0 && (
          <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex items-center justify-between mb-8"
              >
                <div className="flex items-center">
                  <FaFire className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
                    <p className="text-gray-600">Limited time offers - Hurry up!</p>
                  </div>
                </div>
                <span className="text-sm text-red-500 font-bold animate-pulse">Ending soon!</span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashDeals.map((deal, index) => (
                  <motion.div
                    key={deal.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    onHoverStart={() => setHoveredProduct(deal.id)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-red-100"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        -{deal.discount}% OFF
                      </motion.div>
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🔥 FLASH
                      </div>
                      {hoveredProduct === deal.id && (
                        <motion.div 
                          className="absolute inset-0 bg-black/30 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors">
                            Quick View
                          </button>
                        </motion.div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{deal.category}</div>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{deal.name}</h3>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-sm">
                          <FiStar className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-medium">{deal.rating}</span>
                          <span className="text-gray-500 text-xs ml-1">({deal.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-xl font-bold text-gray-900">${deal.price}</span>
                        <span className="text-gray-500 line-through text-sm ml-2">${deal.originalPrice}</span>
                      </div>
                      <motion.button
                        className="w-full mt-4 bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg text-white py-2 rounded-lg font-medium transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiShoppingBag className="inline h-4 w-4 mr-2" />
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Deals Section */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <IoPricetagOutline className="h-8 w-8 text-green-500 mr-3" />
                  All Deals
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredDeals.length} deals available
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {/* Filter Toggle for Mobile */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <FiFilter />
                  <span>Filters</span>
                </button>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-white text-gray-600"}`}
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 1024) && (
                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="lg:w-64 flex-shrink-0"
                  >
                    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Filters</h3>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="lg:hidden text-gray-500 hover:text-gray-700"
                        >
                          <FiX />
                        </button>
                      </div>

                      {/* Category Filter */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Category</h4>
                        <div className="space-y-2">
                          {categories.map(cat => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                selectedCategory === cat
                                  ? "bg-blue-50 text-blue-600 font-medium"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Price Range</h4>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Sort */}
                      <div>
                        <h4 className="font-medium mb-3">Sort By</h4>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Clear Filters */}
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setPriceRange([0, 1000]);
                          setSortBy("discount");
                        }}
                        className="w-full mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Deals Grid */}
              <div className="flex-1">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDeals.map((deal, index) => (
                      <motion.div
                        key={deal.id}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -10 }}
                        onHoverStart={() => setHoveredProduct(deal.id)}
                        onHoverEnd={() => setHoveredProduct(null)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                      >
                        <div className="relative overflow-hidden">
                          <motion.img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.div 
                            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            -{deal.discount}% OFF
                          </motion.div>
                          {deal.badge && (
                            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              {deal.badge}
                            </div>
                          )}
                          {deal.isFlashSale && (
                            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                              🔥 FLASH
                            </div>
                          )}
                          {hoveredProduct === deal.id && (
                            <motion.div 
                              className="absolute inset-0 bg-black/30 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors">
                                Quick View
                              </button>
                            </motion.div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-gray-500 mb-1">{deal.category}</div>
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{deal.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{deal.description}</p>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center text-sm">
                              <FiStar className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="font-medium">{deal.rating}</span>
                              <span className="text-gray-500 text-xs ml-1">({deal.reviews})</span>
                            </div>
                            <div className="ml-4 text-xs text-green-600">
                              {deal.sold} sold
                            </div>
                          </div>
                          <div className="flex items-baseline">
                            <span className="text-xl font-bold text-gray-900">${deal.price}</span>
                            <span className="text-gray-500 line-through text-sm ml-2">${deal.originalPrice}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-500">
                              {deal.stock} left in stock
                            </span>
                            <motion.button
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg text-white px-4 py-2 rounded-lg font-medium text-sm transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiShoppingBag className="inline h-4 w-4 mr-1" />
                              Add
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDeals.map((deal, index) => (
                      <motion.div
                        key={deal.id}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5 }}
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 p-4 flex flex-col sm:flex-row"
                      >
                        <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <motion.div 
                            className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold"
                            whileHover={{ scale: 1.1 }}
                          >
                            -{deal.discount}% OFF
                          </motion.div>
                        </div>
                        <div className="flex-1 mt-4 sm:mt-0 sm:ml-6">
                          <div className="flex flex-wrap items-start justify-between">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">{deal.category}</div>
                              <h3 className="font-bold text-gray-900 text-lg">{deal.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{deal.description}</p>
                            </div>
                            {deal.isFlashSale && (
                              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                🔥 FLASH SALE
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center mt-3 gap-4">
                            <div className="flex items-center text-sm">
                              <FiStar className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="font-medium">{deal.rating}</span>
                              <span className="text-gray-500 text-xs ml-1">({deal.reviews})</span>
                            </div>
                            <div className="text-xs text-green-600">
                              {deal.sold} sold
                            </div>
                            <div className="text-xs text-gray-500">
                              {deal.stock} left
                            </div>
                            {deal.badge && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                {deal.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">${deal.price}</span>
                              <span className="text-gray-500 line-through text-sm ml-2">${deal.originalPrice}</span>
                            </div>
                            <motion.button
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg text-white px-6 py-2 rounded-lg font-medium transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiShoppingBag className="inline h-4 w-4 mr-2" />
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {filteredDeals.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Deals Found</h3>
                    <p className="text-gray-600">Try adjusting your filters</p>
                    <button
                      onClick={() => {
                        setSelectedCategory("all");
                        setPriceRange([0, 1000]);
                        setSortBy("discount");
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: FaTruck, label: "Free Delivery", sub: "On orders above $50" },
                { icon: FaUndo, label: "Easy Returns", sub: "30 days return policy" },
                { icon: IoShieldCheckmarkOutline, label: "100% Authentic", sub: "Genuine products" },
                { icon: IoFlashOutline, label: "Fast Delivery", sub: "Express shipping" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-xl transition-all"
                >
                  <item.icon className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                  <h3 className="font-bold text-gray-900 text-sm">{item.label}</h3>
                  <p className="text-xs text-gray-600">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
              <p className="mb-6 opacity-90">Subscribe to get exclusive deals and offers</p>
              <div className="max-w-md mx-auto flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <motion.button 
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-r-lg font-bold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DealsPage;