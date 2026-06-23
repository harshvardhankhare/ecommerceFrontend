import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FireIcon,
  TagIcon,
  ClockIcon,
  ShoppingBagIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  SparklesIcon,
  GiftIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import PublicFooter from "../component/PublicFooter";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const PublicHomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState();
  const [isHovered, setIsHovered] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [countdown, setCountdown] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  const isLoggedIn = localStorage.getItem("userToken");

  // Countdown timer for flash sale
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const [categories] = useState([
    {
      id: 1,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop",
      count: 245,
      color: "from-blue-500 to-cyan-500",
      icon: "📱",
    },
    {
      id: 2,
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop",
      count: 189,
      color: "from-pink-500 to-rose-500",
      icon: "👗",
    },
    {
      id: 3,
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&auto=format&fit=crop",
      count: 156,
      color: "from-green-500 to-emerald-500",
      icon: "🏠",
    },
    {
      id: 4,
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop",
      count: 98,
      color: "from-purple-500 to-violet-500",
      icon: "💄",
    },
    {
      id: 5,
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop",
      count: 76,
      color: "from-orange-500 to-red-500",
      icon: "⚽",
    },
    {
      id: 6,
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=500&auto=format&fit=crop",
      count: 321,
      color: "from-yellow-500 to-amber-500",
      icon: "📚",
    },
  ]);

  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      rating: 4.5,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
      category: "Electronics",
      isNew: true,
      isFeatured: true,
      description:
        "Premium noise-canceling headphones with 30-hour battery life",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Premium Leather Jacket",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      rating: 4.8,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop",
      category: "Fashion",
      isFeatured: true,
      description: "Genuine leather jacket with premium stitching",
      badge: "Trending",
    },
    {
      id: 3,
      name: "Smart Watch Series 7",
      price: 349.99,
      originalPrice: 399.99,
      discount: 12,
      rating: 4.7,
      reviews: 256,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
      category: "Electronics",
      isFeatured: true,
      description: "Advanced smartwatch with health monitoring",
      badge: "Popular",
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.3,
      reviews: 56,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
      category: "Fashion",
      isNew: true,
      description: "100% organic cotton, eco-friendly t-shirt",
      badge: "Eco-Friendly",
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.6,
      reviews: 78,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&auto=format&fit=crop",
      category: "Home",
      description: "Set of 4 handmade ceramic mugs",
      badge: "Staff Pick",
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.4,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&auto=format&fit=crop",
      category: "Sports",
      isFeatured: true,
      description: "Non-slip yoga mat with carrying strap",
      badge: "Top Rated",
    },
    {
      id: 7,
      name: "LED Desk Lamp",
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.2,
      reviews: 65,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop",
      category: "Home",
      description: "Adjustable LED lamp with touch controls",
      badge: "Sale",
    },
    {
      id: 8,
      name: "Best Seller Novel",
      price: 14.99,
      originalPrice: 24.99,
      discount: 40,
      rating: 4.9,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop",
      category: "Books",
      isNew: true,
      description: "New York Times bestseller novel",
      badge: "New Release",
    },
  ]);

  const heroSlides = [
    {
      id: 1,
      title: "Summer Sale Up to 50% Off",
      subtitle: "Discover amazing products at unbeatable prices",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop",
      buttonText: "Shop Now",
      color: "from-blue-600 via-purple-600 to-pink-600",
      badge: "🔥 Hot Deal",
    },
    {
      id: 2,
      title: "New Arrivals Collection",
      subtitle: "Fresh styles just for you",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop",
      buttonText: "Explore New",
      color: "from-pink-600 via-red-600 to-orange-600",
      badge: "✨ New Collection",
    },
    {
      id: 3,
      title: "Free Shipping Worldwide",
      subtitle: "On orders over $50",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&auto=format&fit=crop",
      buttonText: "Start Shopping",
      color: "from-green-600 via-teal-600 to-cyan-600",
      badge: "🚚 Free Shipping",
    },
  ];

  const features = [
    {
      icon: TruckIcon,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "text-blue-600 bg-blue-100",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Payment",
      description: "100% secure & safe",
      color: "text-green-600 bg-green-100",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: ArrowRightIcon,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "text-purple-600 bg-purple-100",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      icon: CheckCircleIcon,
      title: "24/7 Support",
      description: "Dedicated support",
      color: "text-orange-600 bg-orange-100",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const showLoginRequiredToast = (action) => {
    setToastMessage(`Please login to ${action}`);
    setShowLoginToast(true);
    setTimeout(() => setShowLoginToast(false), 3000);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      showLoginRequiredToast("add items to cart");
      return;
    }
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleAddToWishlist = (product) => {
    if (!isLoggedIn) {
      showLoginRequiredToast("add items to wishlist");
      return;
    }
    toast.success(`${product.name} added to wishlist!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
    console.log("Added to wishlist:", product);
  };

  const handleViewProduct = (product) => {
    if (!isLoggedIn) {
      showLoginRequiredToast("view product details");
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleQuickView = (product) => {
    if (!isLoggedIn) {
      showLoginRequiredToast("view product details");
      return;
    }
    toast.info(`Quick view: ${product.name}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleShopNow = () => {
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Login Toast */}
      <AnimatePresence>
        {showLoginToast && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span>{toastMessage}</span>
              <button
                onClick={() => setShowLoginToast(false)}
                className="ml-4 hover:text-gray-200"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar - Animated */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-sm py-2 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-6">
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <FireIcon className="h-4 w-4 mr-1 text-yellow-400 animate-pulse" />
                Summer Sale: Up to 50% off
              </motion.span>
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <TruckIcon className="h-4 w-4 mr-1 text-green-400" />
                Free shipping on orders over $50
              </motion.span>
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <ClockIcon className="h-4 w-4 mr-1 text-blue-400 animate-pulse" />
                Flash Sale: {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
              </motion.span>
            </div>
            <div className="flex space-x-4">
              <motion.button
                onClick={handleLoginClick}
                className="hover:text-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={handleSignupClick}
                className="text-yellow-300 hover:text-yellow-200 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Create Account
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header/Navbar */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBagIcon className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Shop<span className="text-gray-800">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'Shop', 'Categories', 'Deals', 'About'].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                  >
                    {item === 'Deals' && <TagIcon className="h-4 w-4 inline mr-1 text-red-500" />}
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <motion.div 
                className="relative w-full"
                whileHover={{ scale: 1.02 }}
              >
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </motion.div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <motion.button 
                className="lg:hidden text-gray-600"
                whileHover={{ scale: 1.1 }}
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </motion.button>

              <motion.button
                onClick={handleLoginClick}
                className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <UserIcon className="h-6 w-6" />
                <span className="hidden sm:inline text-sm">Login</span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }}>
                {isLoggedIn ? (
                  <Link to="/user/wishlist" className="text-gray-600 hover:text-red-500 relative">
                    <HeartIcon className="h-6 w-6" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                      3
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => showLoginRequiredToast("view wishlist")}
                    className="text-gray-600 hover:text-red-500 relative"
                  >
                    <HeartIcon className="h-6 w-6" />
                  </button>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                {isLoggedIn ? (
                  <Link to="/cart" className="text-gray-600 hover:text-blue-600 relative">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <motion.span 
                      className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      {cartItems.length}
                    </motion.span>
                  </Link>
                ) : (
                  <button
                    onClick={() => showLoginRequiredToast("view cart")}
                    className="text-gray-600 hover:text-blue-600 relative"
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                  </button>
                )}
              </motion.div>

              <motion.button
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden border-t border-gray-200 py-4"
              >
                <div className="space-y-4">
                  {['Home', 'Shop', 'Categories', 'Deals', 'About'].map((item) => (
                    <Link
                      key={item}
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="block text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                  <motion.div 
                    className="pt-4 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <button
                      onClick={handleLoginClick}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleSignupClick}
                      className="w-full border-2 border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Create Account
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            className="pt-4 block md:hidden"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </motion.form>
        </div>
      </motion.header>

      {/* Hero Slider */}
      <section className="relative overflow-hidden">
        <div className="relative h-[500px] md:h-[600px]">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-20 z-10`}></div>
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                  >
                    <motion.span 
                      className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {slide.badge}
                    </motion.span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/90 mb-8">{slide.subtitle}</p>
                    <motion.button
                      onClick={handleShopNow}
                      className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {slide.buttonText} →
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full z-20 transition-all hover:scale-110"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full z-20 transition-all hover:scale-110"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? "bg-white w-10" 
                    : "bg-white/50 w-3 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features - Animated Cards */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} text-white`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <SparklesIcon className="h-8 w-8 text-yellow-500 mr-2" />
                Shop by Category
              </h2>
              <p className="text-gray-600 mt-1">Find exactly what you're looking for</p>
            </div>
            <motion.button
              onClick={() => navigate("/categories")}
              className="text-blue-600 hover:text-blue-700 flex items-center font-medium"
              whileHover={{ x: 5 }}
            >
              View all <ArrowRightIcon className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setActiveCategory(category.id)}
                onHoverEnd={() => setActiveCategory(null)}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all text-left"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-3xl mb-1">{category.icon}</div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} items</p>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                  </div>
                </div>
                {activeCategory === category.id && (
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <FireIcon className="h-8 w-8 text-orange-500 mr-2" />
                Featured Products
              </h2>
              <p className="text-gray-600 mt-1">Most popular products this week</p>
            </div>
            <motion.button
              onClick={() => navigate("/shop")}
              className="text-blue-600 hover:text-blue-700 flex items-center font-medium"
              whileHover={{ x: 5 }}
            >
              View all <ArrowRightIcon className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.isFeatured)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100"
                  onMouseEnter={() => setIsHovered(product.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    {product.discount > 0 && (
                      <motion.div 
                        className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        -{product.discount}%
                      </motion.div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        NEW
                      </div>
                    )}
                    {product.badge && (
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    <motion.button
                      onClick={() => handleAddToWishlist(product)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      <HeartIcon className="h-5 w-5 text-gray-700" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleQuickView(product)}
                      className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all text-sm shadow-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      Quick View
                    </motion.button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600 font-medium">
                          {product.rating}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          {product.reviews}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ repeat: Infinity, duration: 10 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400"></div>
        </motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold flex items-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <GiftIcon className="h-8 w-8 mr-3" />
                Flash Sale! Up to 70% Off
              </motion.h2>
              <p className="text-white/90 mt-2">Limited time offer - Grab your favorites before they're gone!</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.div 
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="text-xs uppercase">Hours</div>
              </motion.div>
              <motion.div 
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="text-xs uppercase">Minutes</div>
              </motion.div>
              <motion.div 
                className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="text-xs uppercase">Seconds</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <RocketLaunchIcon className="h-8 w-8 text-blue-500 mr-2" />
                New Arrivals
              </h2>
              <p className="text-gray-600 mt-1">Fresh products just for you</p>
            </div>
            <motion.button
              onClick={() => navigate("/shop?sort=new")}
              className="text-blue-600 hover:text-blue-700 flex items-center font-medium"
              whileHover={{ x: 5 }}
            >
              View all <ArrowRightIcon className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => p.isNew)
              .map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100"
                >
                  <div className="w-1/3 relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded text-xs shadow-lg">
                      NEW
                    </div>
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded">
                        NEW ARRIVAL
                      </span>
                      <div className="flex items-center text-sm">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Login/Register */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ repeat: Infinity, duration: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </motion.div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Join Thousands of Happy Shoppers
          </motion.h2>
          <motion.p 
            className="text-white/80 mb-8 max-w-2xl mx-auto text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create an account to enjoy exclusive benefits, faster checkout, and
            personalized recommendations
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={handleSignupClick}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Free Account
            </motion.button>
            <motion.button
              onClick={handleLoginClick}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In to Your Account
            </motion.button>
          </motion.div>
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              'Fast & Secure Checkout',
              'Order Tracking',
              'Exclusive Member Deals'
            ].map((text, index) => (
              <motion.div 
                key={index} 
                className="text-white/90 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircleIcon className="h-5 w-5 inline mr-2 text-green-400" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter/>
      
    </div>
  );
};

export default PublicHomePage;