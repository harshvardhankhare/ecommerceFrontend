import { useState, useEffect, Fragment } from "react";
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
  FiArrowRight
} from "react-icons/fi";
import { 
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward,
  IoSparklesOutline,
  IoRocketOutline
} from "react-icons/io5";
import { FaTruck, FaUndo, FaCrown, FaFire, FaGift } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar2 from "../component/Navbar2";
import Footer from "../component/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 45, seconds: 30 });
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Carousel images
  const carouselImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop",
      title: "Summer Collection 2024",
      subtitle: "Up to 70% OFF",
      buttonText: "Shop Now",
      bgColor: "from-purple-600 via-pink-600 to-red-600",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558769132-cb1c458e4222?w=1600&auto=format&fit=crop",
      title: "Brand Festival",
      subtitle: "Top Brands at Best Prices",
      buttonText: "Explore Brands",
      bgColor: "from-blue-600 via-cyan-500 to-teal-500",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&auto=format&fit=crop",
      title: "Weekend Special",
      subtitle: "Extra 20% OFF on Fashion",
      buttonText: "Grab Deals",
      bgColor: "from-red-600 via-orange-500 to-yellow-500",
    },
  ];

  // Categories
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
      description: 'Latest gadgets and devices',
      productCount: 245,
      subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Gaming'],
      icon: '📱',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Fashion',
      slug: 'clothes',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop',
      description: 'Clothing and accessories',
      productCount: 189,
      subcategories: ['Men', 'Women', 'Kids', 'Accessories', 'Shoes'],
      icon: '👕',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 3,
      name: 'Home & Garden',
      slug: 'furniture',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&auto=format&fit=crop',
      description: 'Furniture and decor',
      productCount: 156,
      subcategories: ['Furniture', 'Kitchen', 'Decor', 'Garden', 'Lighting'],
      icon: '🏠',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      name: 'Beauty',
      slug: 'beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop',
      description: 'Cosmetics and skincare',
      productCount: 98,
      subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Tools'],
      icon: '💄',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 5,
      name: 'Sports',
      slug: 'sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop',
      description: 'Sports equipment and gear',
      productCount: 76,
      subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga', 'Cycling'],
      icon: '⚽',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 6,
      name: 'Books',
      slug: 'books',
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop',
      description: 'Books and magazines',
      productCount: 321,
      subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Business'],
      icon: '📚',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 7,
      name: 'Toys & Games',
      slug: 'toys-games',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop',
      description: 'Toys and entertainment',
      productCount: 142,
      subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational', 'Outdoor'],
      icon: '🎮',
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 8,
      name: 'Jewelry',
      slug: 'jewelry',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop',
      description: 'Fine jewelry and watches',
      productCount: 54,
      subcategories: ['Necklaces', 'Rings', 'Watches', 'Bracelets', 'Earrings'],
      icon: '💎',
      color: 'from-cyan-500 to-blue-500'
    },
  ];

  // Featured Brands
  const featuredBrands = [
    { id: 1, name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', category: 'Sports' },
    { id: 2, name: 'Apple', logo: 'https://images.unsplash.com/photo-1546054451-aa264c0c7056?w=200&h=200&fit=crop', category: 'Electronics' },
    { id: 3, name: 'Samsung', logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop', category: 'Electronics' },
    { id: 4, name: 'Adidas', logo: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=200&h=200&fit=crop', category: 'Sports' },
    { id: 5, name: 'Levi\'s', logo: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200&h=200&fit=crop', category: 'Fashion' },
    { id: 6, name: 'Lacoste', logo: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=200&h=200&fit=crop', category: 'Fashion' },
  ];

  // Trust Features
  const trustFeatures = [
    {
      id: 1,
      icon: <FaTruck className="h-8 w-8" />,
      title: "Free Delivery",
      description: "On orders above $50",
      color: "text-green-600",
      bgColor: "bg-green-50",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      icon: <FaUndo className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30 days return policy",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      icon: <IoShieldCheckmarkOutline className="h-8 w-8" />,
      title: "100% Authentic",
      description: "Genuine products",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      id: 4,
      icon: <IoFlashOutline className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Express shipping",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      gradient: "from-yellow-500 to-orange-500"
    },
  ];

  // Trending deals
  const trendingDeals = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      sold: 1234,
      rating: 4.7
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Sports",
      sold: 856,
      rating: 4.5
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      sold: 567,
      rating: 4.8
    },
    {
      id: 4,
      name: "Designer Bag",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category: "Fashion",
      sold: 234,
      rating: 4.6
    },
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

  // Auto slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar2 />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Carousel */}
        <div className="relative overflow-hidden">
          <div className="relative h-[450px] md:h-[550px]">
            {carouselImages.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`} />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 md:px-8">
                    <motion.div 
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="max-w-xl text-white"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-4"
                      >
                        🔥 Limited Offer
                      </motion.div>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-xl mb-8">{slide.subtitle}</p>
                      <motion.button
                        onClick={() => navigate('/products')}
                        className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slide.buttonText} <FiArrowRight className="inline ml-2" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full z-20 transition-all hover:scale-110"
          >
            <FiChevronRight className="h-6 w-6 transform rotate-180" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselImages.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full z-20 transition-all hover:scale-110"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-10' 
                    : 'bg-white/50 w-3 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flash Sale Timer */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white py-8 relative overflow-hidden"
        >
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
              <div className="flex items-center mb-4 md:mb-0">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaFire className="h-10 w-10 mr-4" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold">FLASH SALE</h2>
                  <p className="text-sm opacity-90">Limited time offers - Don't miss out!</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {['hours', 'minutes', 'seconds'].map((unit, index) => (
                  <Fragment key={unit}>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 min-w-[60px]">
                        <div className="text-3xl font-bold tabular-nums">
                          {String(timeLeft[unit]).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase">{unit}</div>
                      </div>
                    </motion.div>
                    {index < 2 && <div className="text-3xl font-light">:</div>}
                  </Fragment>
                ))}
                <motion.button
                  onClick={() => navigate('/products')}
                  className="ml-4 bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SHOP NOW
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <IoSparklesOutline className="h-8 w-8 text-yellow-500 mr-3" />
                  Shop By Category
                </h2>
                <p className="text-gray-600 mt-2">Browse through our wide range of categories</p>
              </div>
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
              >
                View All 
                <motion.span
                  className="ml-1 inline-block group-hover:translate-x-1 transition-transform"
                >
                  <FiChevronRight />
                </motion.span>
              </Link>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHoveredCategory(category.id)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className="relative"
                >
                  <Link
                    to={`/products?category=${category.slug}`}
                    className={`block rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${category.color}`}
                  >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 text-3xl shadow-lg group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <h3 className="font-bold text-white text-shadow mb-1">{category.name}</h3>
                      <p className="text-xs text-white/90 mb-2">{category.productCount} products</p>
                      <motion.div 
                        className="flex items-center text-white/90 text-sm"
                        animate={hoveredCategory === category.id ? { x: [0, 5, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <span>Explore</span>
                        <IoArrowForward className="ml-1 h-4 w-4" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <FaCrown className="h-8 w-8 text-yellow-500 mr-3" />
                  Featured Brands
                </h2>
                <p className="text-gray-600 mt-2">Shop from top brands</p>
              </div>
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
              >
                View All 
                <motion.span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">
                  <FiChevronRight />
                </motion.span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {featuredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onHoverStart={() => setHoveredBrand(brand.id)}
                  onHoverEnd={() => setHoveredBrand(null)}
                  className="relative"
                >
                  <Link
                    to={`/products?brand=${brand.name}`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-2xl transition-all duration-300 block group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 ring-gray-100 group-hover:ring-blue-500 transition-all">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{brand.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{brand.category}</p>
                      {hoveredBrand === brand.id && (
                        <motion.div 
                          className="mt-2 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Deals */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex justify-between items-center mb-8"
            >
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <FiTrendingUp className="h-8 w-8 text-red-500 mr-3" />
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Trending Deals</h2>
                  <p className="text-gray-600 mt-2">Most popular products this week</p>
                </div>
              </div>
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
              >
                View All 
                <motion.span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">
                  <FiChevronRight />
                </motion.span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDeals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      -{product.discount}% OFF
                    </motion.div>
                    {hoveredProduct === product.id && (
                      <motion.div 
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
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
                    <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-sm">
                        <FiStar className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-gray-500 text-xs ml-1">(1.2k)</span>
                      </div>
                      <div className="ml-4 text-xs text-green-600">
                        {product.sold} sold
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-gray-500 line-through text-sm ml-2">${product.originalPrice}</span>
                    </div>
                    <motion.button
                      onClick={() => navigate('/products')}
                      className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg text-white py-2 rounded-lg font-medium transition-all"
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

        {/* Trust Features */}
        <div className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Why Shop With Us?
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div 
                    className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-white text-3xl">
                      {feature.icon}
                    </div>
                  </motion.div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-10"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ repeat: Infinity, duration: 15 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
          </motion.div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Subscribe to get exclusive offers and the latest news
              </p>
            </motion.div>
            <motion.div 
              className="max-w-md mx-auto flex"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <motion.button 
                className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-r-lg font-bold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
            <p className="text-sm mt-4 opacity-80">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* App Download Banner */}
        <div className="py-12 bg-gray-900 text-white relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-5"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ repeat: Infinity, duration: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          </motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-2 flex items-center">
                  <IoRocketOutline className="mr-3 text-blue-400" />
                  Get the App
                </h2>
                <p className="text-gray-400">Experience shopping on the go</p>
              </div>
              <div className="flex space-x-4">
                <motion.button 
                  className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center border border-gray-700 hover:border-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="mr-3 text-3xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </motion.button>
                <motion.button 
                  className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center border border-gray-700 hover:border-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="mr-3 text-3xl">▶️</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
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

export default Home;