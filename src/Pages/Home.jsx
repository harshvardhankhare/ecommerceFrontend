import { useState, useEffect } from "react";
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
  FiHeart
} from "react-icons/fi";
import { 
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoArrowForward
} from "react-icons/io5";
import { FaTruck, FaUndo, FaCrown, FaFire } from "react-icons/fa";
import Navbar2 from "../component/Navbar2";
import Footer from "../component/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 45, seconds: 30 });
  const [trendingProducts, setTrendingProducts] = useState([]);

  // Carousel images
  const carouselImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop",
      title: "Summer Collection 2024",
      subtitle: "Up to 70% OFF",
      buttonText: "Shop Now",
      bgColor: "from-purple-600 to-pink-500",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558769132-cb1c458e4222?w=1600&auto=format&fit=crop",
      title: "Brand Festival",
      subtitle: "Top Brands at Best Prices",
      buttonText: "Explore Brands",
      bgColor: "from-blue-600 to-cyan-500",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&auto=format&fit=crop",
      title: "Weekend Special",
      subtitle: "Extra 20% OFF on Fashion",
      buttonText: "Grab Deals",
      bgColor: "from-red-600 to-orange-500",
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
      color: 'bg-blue-50'
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
      color: 'bg-pink-50'
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
      color: 'bg-green-50'
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
      color: 'bg-purple-50'
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
      color: 'bg-orange-50'
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
      color: 'bg-yellow-50'
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
      color: 'bg-red-50'
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
      color: 'bg-cyan-50'
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
      bgColor: "bg-green-50"
    },
    {
      id: 2,
      icon: <FaUndo className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30 days return policy",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      icon: <IoShieldCheckmarkOutline className="h-8 w-8" />,
      title: "100% Authentic",
      description: "Genuine products",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      icon: <IoFlashOutline className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Express shipping",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
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
      sold: 1234
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Sports",
      sold: 856
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 399.99,
      discount: 25,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      sold: 567
    },
    {
      id: 4,
      name: "Designer Bag",
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
      category: "Fashion",
      sold: 234
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
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Carousel */}
        <div className="relative overflow-hidden">
          <div className="relative h-[400px] md:h-[500px]">
            {carouselImages.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                    <div className="max-w-xl text-white">
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-xl mb-8">{slide.subtitle}</p>
                      <button
                        onClick={() => navigate('/products')}
                        className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                      >
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flash Sale Timer */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <FaFire className="h-8 w-8 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">FLASH SALE</h2>
                  <p className="text-sm opacity-90">Limited time offers</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-xs">HOURS</div>
                  </div>
                </div>
                <div className="text-2xl">:</div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-xs">MINUTES</div>
                  </div>
                </div>
                <div className="text-2xl">:</div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-xs">SECONDS</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/products')}
                  className="ml-4 bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop By Category</h2>
                <p className="text-gray-600 mt-2">Browse through our wide range of categories</p>
              </div>
              <Link
                to="/products"
                className="text-red-500 hover:text-red-600 font-medium flex items-center"
              >
                View All <FiChevronRight className="ml-1" />
              </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className={`group ${category.color} rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-3 text-2xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{category.productCount} products</p>
                    <div className="flex items-center text-red-500 text-sm">
                      <span>Explore</span>
                      <IoArrowForward className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Brands */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Brands</h2>
                <p className="text-gray-600 mt-2">Shop from top brands</p>
              </div>
              <Link
                to="/products"
                className="text-red-500 hover:text-red-600 font-medium flex items-center"
              >
                View All <FiChevronRight className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {featuredBrands.map(brand => (
                <Link
                  key={brand.id}
                  to={`/products?brand=${brand.name}`}
                  className="bg-white rounded-xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{brand.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{brand.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Deals */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <FiTrendingUp className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Deals</h2>
                  <p className="text-gray-600 mt-2">Most popular products this week</p>
                </div>
              </div>
              <Link
                to="/products"
                className="text-red-500 hover:text-red-600 font-medium flex items-center"
              >
                View All <FiChevronRight className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingDeals.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {product.discount}% OFF
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-sm">
                        <FiStar className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">4.5</span>
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
                    <button
                      onClick={() => navigate('/products')}
                      className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      <FiShoppingBag className="inline h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="py-12 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Why Shop With Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustFeatures.map(feature => (
                <div
                  key={feature.id}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <div className={feature.color}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-12 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to get exclusive offers and the latest news
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-r-lg font-bold transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 opacity-80">
              By subscribing, you agree to our Privacy Policy
            </p>
          </div>
        </div>

        {/* App Download Banner */}
        <div className="py-8 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Get the App</h2>
                <p className="text-gray-400">Experience shopping on the go</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center">
                  <div className="mr-3 text-2xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>
                <button className="bg-black hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center">
                  <div className="mr-3 text-2xl">▶️</div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;