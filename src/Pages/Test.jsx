import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  
  FunnelIcon,
  XMarkIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      originalPrice: 199.99,
      discount: 35,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
      category: 'Electronics',
      brand: 'SoundMax',
      stock: 45,
      isFeatured: true,
      tags: ['Wireless', 'Noise Cancelling', 'Bluetooth 5.0'],
      description: 'Premium noise-canceling headphones with 30-hour battery life'
    },
    {
      id: 2,
      name: 'Premium Leather Jacket',
      price: 199.99,
      originalPrice: 299.99,
      discount: 33,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop',
      category: 'Fashion',
      brand: 'LeatherCraft',
      stock: 23,
      isFeatured: true,
      tags: ['Premium', 'Leather', 'Men\'s Fashion'],
      description: 'Genuine leather jacket with premium stitching'
    },
    {
      id: 3,
      name: 'Smart Watch Series 7',
      price: 349.99,
      originalPrice: 399.99,
      discount: 12,
      rating: 4.7,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
      category: 'Electronics',
      brand: 'TechWear',
      stock: 78,
      isFeatured: true,
      tags: ['Smart', 'Fitness', 'Waterproof'],
      description: 'Advanced smartwatch with health monitoring'
    },
    {
      id: 4,
      name: 'Organic Cotton T-Shirt',
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.3,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop',
      category: 'Fashion',
      brand: 'EcoWear',
      stock: 156,
      isNew: true,
      tags: ['Organic', 'Cotton', 'Sustainable'],
      description: '100% organic cotton, eco-friendly t-shirt'
    },
    {
      id: 5,
      name: 'Ceramic Coffee Mug Set',
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500&auto=format&fit=crop',
      category: 'Home & Garden',
      brand: 'HomeStyle',
      stock: 89,
      tags: ['Ceramic', 'Set of 4', 'Handmade'],
      description: 'Set of 4 handmade ceramic mugs'
    },
    {
      id: 6,
      name: 'Yoga Mat Premium',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.4,
      reviews: 42,
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&auto=format&fit=crop',
      category: 'Sports',
      brand: 'FitLife',
      stock: 34,
      isFeatured: true,
      tags: ['Yoga', 'Non-slip', 'Eco-friendly'],
      description: 'Non-slip yoga mat with carrying strap'
    },
    {
      id: 7,
      name: 'LED Desk Lamp',
      price: 49.99,
      originalPrice: 69.99,
      discount: 29,
      rating: 4.2,
      reviews: 65,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop',
      category: 'Home & Garden',
      brand: 'BrightTech',
      stock: 67,
      tags: ['LED', 'Adjustable', 'Touch Control'],
      description: 'Adjustable LED lamp with touch controls'
    },
    {
      id: 8,
      name: 'Best Seller Novel',
      price: 14.99,
      originalPrice: 24.99,
      discount: 40,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop',
      category: 'Books',
      brand: 'BookWorld',
      stock: 234,
      isNew: true,
      tags: ['Bestseller', 'Fiction', 'Award Winning'],
      description: 'New York Times bestseller novel'
    },
    {
      id: 9,
      name: 'Gaming Laptop',
      price: 1299.99,
      originalPrice: 1599.99,
      discount: 19,
      rating: 4.8,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop',
      category: 'Electronics',
      brand: 'GameMax',
      stock: 15,
      tags: ['Gaming', 'RTX 4070', '16GB RAM'],
      description: 'High-performance gaming laptop with RTX 4070'
    },
    {
      id: 10,
      name: 'Running Shoes',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.5,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop',
      category: 'Sports',
      brand: 'RunFast',
      stock: 56,
      isNew: true,
      tags: ['Running', 'Lightweight', 'Comfort'],
      description: 'Professional running shoes with cushioning'
    },
    {
      id: 11,
      name: 'Bluetooth Speaker',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.3,
      reviews: 93,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop',
      category: 'Electronics',
      brand: 'SoundMax',
      stock: 78,
      tags: ['Portable', 'Waterproof', 'Bass Boost'],
      description: 'Portable Bluetooth speaker with waterproof design'
    },
    {
      id: 12,
      name: 'Designer Sunglasses',
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      rating: 4.6,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop',
      category: 'Fashion',
      brand: 'SunStyle',
      stock: 32,
      tags: ['Designer', 'UV Protection', 'Polarized'],
      description: 'Designer sunglasses with UV protection'
    }
  ]);

  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    ratings: [],
    availability: [],
    features: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [suggestedSearches, setSuggestedSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [location]);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
    
    // Load recent searches
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(recent);
  }, []);

  // Generate suggestions
  useEffect(() => {
    if (searchQuery.length > 0) {
      const suggestions = [
        `${searchQuery} headphones`,
        `${searchQuery} watch`,
        `${searchQuery} sale`,
        `${searchQuery} for men`,
        `${searchQuery} for women`
      ];
      setSuggestedSearches(suggestions);
    } else {
      setSuggestedSearches([]);
    }
  }, [searchQuery]);

  const performSearch = (query) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const results = allProducts.filter(product => {
        const searchText = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          product.brand.toLowerCase().includes(searchText) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchText))
        );
      });
      
      setSearchResults(results);
      setIsLoading(false);
      
      // Save to recent searches
      saveToRecentSearches(query);
    }, 500);
  };

  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;
    
    const updatedRecent = [
      query,
      ...recentSearches.filter(s => s !== query).slice(0, 9)
    ];
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    navigate('/search');
  };

  const handleFilterToggle = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterType]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        };
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      categories: [],
      brands: [],
      ratings: [],
      availability: [],
      features: []
    });
    setPriceRange([0, 2000]);
  };

  // Get unique categories and brands from search results
  const availableCategories = [...new Set(searchResults.map(p => p.category))];
  const availableBrands = [...new Set(searchResults.map(p => p.brand))];

  const filterOptions = {
    categories: availableCategories,
    brands: availableBrands,
    ratings: ['4.5 & up', '4.0 & up', '3.5 & up', '3.0 & up'],
    availability: ['In Stock', 'Out of Stock'],
    features: ['Free Shipping', 'On Sale', 'New Arrival', 'Featured', 'Best Seller']
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'discount', label: 'Best Discount' }
  ];

  // Apply filters to search results
  const filteredResults = searchResults.filter(product => {
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filter by categories
    if (selectedFilters.categories.length > 0 && !selectedFilters.categories.includes(product.category)) {
      return false;
    }

    // Filter by brands
    if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
      return false;
    }

    // Filter by rating
    if (selectedFilters.ratings.length > 0) {
      const ratingMatch = selectedFilters.ratings.some(rating => {
        const minRating = parseFloat(rating.split(' ')[0]);
        return product.rating >= minRating;
      });
      if (!ratingMatch) return false;
    }

    // Filter by availability
    if (selectedFilters.availability.length > 0) {
      if (selectedFilters.availability.includes('In Stock') && product.stock === 0) return false;
      if (selectedFilters.availability.includes('Out of Stock') && product.stock > 0) return false;
    }

    // Filter by features
    if (selectedFilters.features.length > 0) {
      if (selectedFilters.features.includes('On Sale') && product.discount === 0) return false;
      if (selectedFilters.features.includes('New Arrival') && !product.isNew) return false;
      if (selectedFilters.features.includes('Featured') && !product.isFeatured) return false;
    }

    return true;
  });

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id - a.id;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviews - a.reviews;
      case 'discount':
        const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return discountB - discountA;
      default: // relevance
        // For relevance, we could implement more sophisticated logic
        return b.rating - a.rating; // fallback to rating
    }
  });

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length + (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      // Show login required toast
      return;
    }
    // Add to cart logic
    console.log('Added to cart:', product);
  };

  const handleAddToWishlist = (product) => {
    if (!isLoggedIn) {
      // Show login required toast
      return;
    }
    // Add to wishlist logic
    console.log('Added to wishlist:', product);
  };

  const handleSearchSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const FilterSection = ({ title, options, filterType, type = 'checkbox' }) => (
    <div className="mb-6">
      <h4 className="font-bold text-gray-800 mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer group">
            <input
              type={type}
              checked={selectedFilters[filterType].includes(option)}
              onChange={() => handleFilterToggle(filterType, option)}
              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <span className="ml-3 text-gray-700 group-hover:text-primary text-sm">
              {option}
            </span>
            {filterType === 'ratings' && (
              <div className="ml-auto flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-3 w-3 ${i < parseInt(option) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">ShopHub</Link>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
              <Link to="/cart" className="text-gray-600 hover:text-primary">
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, or categories..."
                className="w-full pl-12 pr-32 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-32 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              >
                Search
              </button>
            </form>

            {/* Recent Searches */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700">Recent Searches</h3>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('recentSearches');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSuggestion(search)}
                      className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm hover:border-primary hover:text-primary"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-20">
            <ArrowPathIcon className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Searching for "{searchQuery}"</h3>
            <p className="text-gray-600 mt-2">Finding the best products for you...</p>
          </div>
        ) : (
          <>
            {searchQuery ? (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters - Desktop */}
                <div className="lg:w-1/4 hidden lg:block">
                  <div className="bg-white rounded-xl shadow border p-6 sticky top-6">
                    {/* Results Summary */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        Search Results for "{searchQuery}"
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {filteredResults.length} of {searchResults.length} products
                      </p>
                    </div>

                    {/* Active Filters */}
                    {getActiveFiltersCount() > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium">Active Filters</span>
                          <button
                            onClick={handleClearFilters}
                            className="text-xs text-primary hover:text-primary-dark"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedFilters.categories.map(category => (
                            <span key={category} className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {category}
                              <button
                                onClick={() => handleFilterToggle('categories', category)}
                                className="ml-1"
                              >
                                <XMarkIcon className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                          {priceRange[0] > 0 || priceRange[1] < 2000 && (
                            <span className="inline-flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              ${priceRange[0]} - ${priceRange[1]}
                              <button
                                onClick={() => setPriceRange([0, 2000])}
                                className="ml-1"
                              >
                                <XMarkIcon className="h-3 w-3" />
                              </button>
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3">Price Range</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="0"
                            max="2000"
                            step="10"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                            className="w-full"
                          />
                          <input
                            type="range"
                            min="0"
                            max="2000"
                            step="10"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Filter Sections */}
                    {availableCategories.length > 0 && (
                      <FilterSection title="Categories" options={availableCategories} filterType="categories" />
                    )}
                    {availableBrands.length > 0 && (
                      <FilterSection title="Brands" options={availableBrands} filterType="brands" />
                    )}
                    <FilterSection title="Customer Rating" options={filterOptions.ratings} filterType="ratings" />
                    <FilterSection title="Availability" options={filterOptions.availability} filterType="availability" />
                    <FilterSection title="Features" options={filterOptions.features} filterType="features" />
                  </div>
                </div>

                {/* Main Results */}
                <div className="lg:w-3/4">
                  {/* Results Header */}
                  <div className="bg-white rounded-xl shadow border p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          Search Results for "{searchQuery}"
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                          {filteredResults.length} products found
                          {filteredResults.length !== searchResults.length && ` (${searchResults.length - filteredResults.length} filtered out)`}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Sort Dropdown */}
                        <div className="relative">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          >
                            {sortOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                Sort by: {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
                          >
                            <Squares2X2Icon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
                          >
                            <ViewColumnsIcon className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Mobile Filters Button */}
                        <button
                          onClick={() => setShowMobileFilters(true)}
                          className="lg:hidden flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm"
                        >
                          <FunnelIcon className="h-4 w-4" />
                          <span>Filters</span>
                          {getActiveFiltersCount() > 0 && (
                            <span className="bg-primary text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                              {getActiveFiltersCount()}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Search Suggestions */}
                    {suggestedSearches.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-2">Related searches:</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedSearches.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSearchSuggestion(suggestion)}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Results Grid/List */}
                  {filteredResults.length === 0 ? (
                    <div className="bg-white rounded-xl shadow border p-8 text-center">
                      <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        No products found for "{searchQuery}"
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your search or filters to find what you're looking for
                      </p>
                      <div className="space-y-4">
                        <button
                          onClick={handleClearFilters}
                          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                        >
                          Clear All Filters
                        </button>
                        <p className="text-sm text-gray-500">Suggestions:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Check your spelling</li>
                          <li>• Try more general keywords</li>
                          <li>• Browse by category instead</li>
                          <li>• Check out our featured products</li>
                        </ul>
                      </div>
                    </div>
                  ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedResults.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow border overflow-hidden group hover:shadow-lg transition-shadow">
                          <div className="relative overflow-hidden">
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
                            <div className="absolute top-14 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleAddToWishlist(product)}
                                className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                              >
                                <HeartIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs text-gray-500 uppercase tracking-wide">{product.brand}</span>
                              <div className="flex items-center">
                                <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm font-medium">{product.rating}</span>
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">{product.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {product.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                                {product.originalPrice > product.price && (
                                  <span className="ml-2 text-sm text-gray-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                )}
                                <div className="text-xs text-gray-600">
                                  {product.stock > 0 ? (
                                    <span className="text-green-600">✓ In Stock</span>
                                  ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock === 0}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                  product.stock > 0
                                    ? 'bg-primary text-white hover:bg-primary-dark'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedResults.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition-shadow">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/4">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <div className="flex space-x-2 mt-2">
                                {product.discount > 0 && (
                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                    -{product.discount}%
                                  </span>
                                )}
                                {product.isNew && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                    NEW
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="md:w-3/4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-sm text-gray-500">{product.brand}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-500">{product.category}</span>
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                </div>
                                <div className="flex items-center">
                                  <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 font-bold">{product.rating}</span>
                                  <span className="ml-2 text-gray-500 text-sm">({product.reviews} reviews)</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-4">{product.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {product.tags.map(tag => (
                                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                                    {product.originalPrice > product.price && (
                                      <>
                                        <span className="text-lg text-gray-500 line-through">
                                          ${product.originalPrice.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-green-600">
                                          Save ${(product.originalPrice - product.price).toFixed(2)}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                  <div className="mt-2 text-sm">
                                    {product.stock > 0 ? (
                                      <span className="text-green-600 flex items-center">
                                        <CheckIcon className="h-4 w-4 mr-1" />
                                        {product.stock} in stock
                                      </span>
                                    ) : (
                                      <span className="text-red-600">Out of Stock</span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex space-x-3">
                                  <button
                                    onClick={() => handleAddToWishlist(product)}
                                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center"
                                  >
                                    <HeartIcon className="h-5 w-5 mr-2" />
                                    Wishlist
                                  </button>
                                  <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock === 0}
                                    className={`px-6 py-2 rounded-lg font-medium ${
                                      product.stock > 0
                                        ? 'bg-primary text-white hover:bg-primary-dark'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {filteredResults.length > 0 && (
                    <div className="mt-8 flex justify-center">
                      <nav className="flex items-center space-x-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          Previous
                        </button>
                        {[1, 2, 3].map(page => (
                          <button
                            key={page}
                            className={`px-4 py-2 rounded-lg text-sm ${
                              page === 1
                                ? 'bg-primary text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Search for Products</h2>
                  <p className="text-gray-600 mb-8">
                    Enter keywords to search for products, brands, or categories
                  </p>
                  <div className="bg-white rounded-xl shadow border p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Popular Searches</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['Headphones', 'Smart Watch', 'Laptop', 'T-Shirt', 'Shoes', 'Book', 'Phone'].map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearchSuggestion(term)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {availableCategories.length > 0 && (
                  <FilterSection title="Categories" options={availableCategories} filterType="categories" />
                )}
                {availableBrands.length > 0 && (
                  <FilterSection title="Brands" options={availableBrands} filterType="brands" />
                )}
                <FilterSection title="Rating" options={filterOptions.ratings} filterType="ratings" />
                <FilterSection title="Availability" options={filterOptions.availability} filterType="availability" />
                <FilterSection title="Features" options={filterOptions.features} filterType="features" />

                <div className="sticky bottom-0 bg-white pt-6 border-t">
                  <div className="flex space-x-4">
                    <button
                      onClick={handleClearFilters}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">© 2024 ShopHub. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Test;