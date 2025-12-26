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
} from "@heroicons/react/24/outline";

const PublicHomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState();

  const isLoggedIn = localStorage.getItem("userToken");

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
    },
    {
      id: 2,
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop",
      count: 189,
    },
    {
      id: 3,
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&auto=format&fit=crop",
      count: 156,
    },
    {
      id: 4,
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop",
      count: 98,
    },
    {
      id: 5,
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop",
      count: 76,
    },
    {
      id: 6,
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=500&auto=format&fit=crop",
      count: 321,
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
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "New Arrivals Collection",
      subtitle: "Fresh styles just for you",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop",
      buttonText: "Explore New",
      color: "bg-gradient-to-r from-pink-500 to-red-600",
    },
    {
      id: 3,
      title: "Free Shipping Worldwide",
      subtitle: "On orders over $50",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&auto=format&fit=crop",
      buttonText: "Start Shopping",
      color: "bg-gradient-to-r from-green-500 to-teal-600",
    },
  ];

  const features = [
    {
      icon: TruckIcon,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure Payment",
      description: "100% secure & safe",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: ArrowRightIcon,
      title: "Easy Returns",
      description: "30-day return policy",
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: CheckCircleIcon,
      title: "24/7 Support",
      description: "Dedicated support",
      color: "text-orange-600 bg-orange-100",
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

    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleAddToWishlist = (product) => {
    if (!isLoggedIn) {
      showLoginRequiredToast("add items to wishlist");
      return;
    }
    // Implement wishlist functionality
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
    // Implement quick view modal
    console.log("Quick view:", product);
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
    <div className="min-h-screen bg-white">
      {/* Login Toast */}
      {showLoginToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowLoginToast(false)}
              className="ml-4 hover:text-gray-200"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-4">
              <span className="flex items-center">
                <FireIcon className="h-4 w-4 mr-1" />
                Summer Sale: Up to 50% off
              </span>
              <span className="flex items-center">
                <TruckIcon className="h-4 w-4 mr-1" />
                Free shipping on orders over $50
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleLoginClick}
                className="hover:text-yellow-300"
              >
                Sign In
              </button>
              <button
                onClick={handleSignupClick}
                className="text-yellow-300 hover:text-yellow-200"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header/Navbar */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingBagIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Shop<span className="text-primary">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="text-gray-700 hover:text-primary font-medium flex items-center"
              >
                <TagIcon className="h-4 w-4 mr-1" />
                Deals
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary font-medium"
              >
                About
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              {/* Mobile Search */}
              <button className="lg:hidden text-gray-600">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {/* Login/Account */}

              <button
                onClick={handleLoginClick}
                className="text-gray-600 hover:text-primary flex items-center space-x-1"
              >
                <UserIcon className="h-6 w-6" />
                <span className="hidden sm:inline text-sm">Login</span>
              </button>

              {/* Wishlist */}
              {isLoggedIn ? (
                <Link
                  to="/user/wishlist"
                  className="text-gray-600 hover:text-primary relative"
                >
                  <HeartIcon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => showLoginRequiredToast("view wishlist")}
                  className="text-gray-600 hover:text-primary relative"
                >
                  <HeartIcon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
              )}

              {/* Cart */}
              {isLoggedIn ? (
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-primary relative"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => showLoginRequiredToast("view cart")}
                  className="text-gray-600 hover:text-primary relative"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                <Link to="/" className="block text-gray-700 hover:text-primary">
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block text-gray-700 hover:text-primary"
                >
                  Shop
                </Link>
                <Link
                  to="/categories"
                  className="block text-gray-700 hover:text-primary"
                >
                  Categories
                </Link>
                <Link
                  to="/deals"
                  className="block text-gray-700 hover:text-primary"
                >
                  Deals
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-primary"
                >
                  About
                </Link>
                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleLoginClick}
                    className="w-full bg-primary text-white py-2 rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="w-full border border-primary text-primary py-2 rounded-lg"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          )}

          <form
            className="pt-4 block md:hidden "
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </form>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl text-gray-200 mb-8">{slide.subtitle}</p>
                <button
                  onClick={handleShopNow}
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
            <div className={`absolute inset-0 ${slide.color} opacity-20`}></div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-20"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full z-20"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
              >
                <div className={`p-3 rounded-lg ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Shop by Category
            </h2>
            <button
              onClick={() => navigate("/categories")}
              className="text-primary hover:text-primary-dark flex items-center"
            >
              View all <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow text-left"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} items</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-2">
                Most popular products this week
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="text-primary hover:text-primary-dark flex items-center"
            >
              View all <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.isFeatured)
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow group"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{product.discount}%
                      </div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        NEW
                      </div>
                    )}
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="absolute top-3 right-12 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HeartIcon className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleQuickView(product)}
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    >
                      Quick View
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        {product.category}
                      </span>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating}
                        </span>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          {product.reviews} reviews
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
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">New Arrivals</h2>
              <p className="text-gray-600 mt-2">Fresh products just for you</p>
            </div>
            <button
              onClick={() => navigate("/shop?sort=new")}
              className="text-primary hover:text-primary-dark flex items-center"
            >
              View all <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => p.isNew)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow group overflow-hidden"
                >
                  <div className="w-1/3 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      NEW
                    </div>
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                        NEW ARRIVAL
                      </span>
                      <div className="flex items-center text-sm">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1">{product.rating}</span>
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
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Login/Register */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Thousands of Happy Shoppers
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Create an account to enjoy exclusive benefits, faster checkout, and
            personalized recommendations
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleSignupClick}
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Free Account
            </button>
            <button
              onClick={handleLoginClick}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Sign In to Your Account
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-white/90">
              <CheckCircleIcon className="h-6 w-6 inline mr-2" />
              <span>Fast & Secure Checkout</span>
            </div>
            <div className="text-white/90">
              <CheckCircleIcon className="h-6 w-6 inline mr-2" />
              <span>Order Tracking</span>
            </div>
            <div className="text-white/90">
              <CheckCircleIcon className="h-6 w-6 inline mr-2" />
              <span>Exclusive Member Deals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                  <ShoppingBagIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ShopHub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for all shopping needs. Quality
                products at affordable prices.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      {social.charAt(0)}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/shop")}
                    className="text-gray-400 hover:text-white"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/categories")}
                    className="text-gray-400 hover:text-white"
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/deals")}
                    className="text-gray-400 hover:text-white"
                  >
                    Today's Deals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/help")}
                    className="text-gray-400 hover:text-white"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/shipping")}
                    className="text-gray-400 hover:text-white"
                  >
                    Shipping Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/returns")}
                    className="text-gray-400 hover:text-white"
                  >
                    Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/privacy")}
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/terms")}
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">📍</div>
                  123 Street, City, Country
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">📞</div>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">✉️</div>
                  support@shophub.com
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">⏰</div>
                  Mon-Fri: 9AM-6PM
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 ShopHub. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                  alt="Mastercard"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHomePage;
