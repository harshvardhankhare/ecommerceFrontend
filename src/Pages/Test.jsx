import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ChartBarSquareIcon,
  ArchiveBoxArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AcademicCapIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  ArrowRightIcon,
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  
  CheckIcon
} from '@heroicons/react/24/outline';

const Test= () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    ratings: [],
    availability: [],
    features: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Categories data
  const [categories] = useState([
    {
      id: 1,
      name: 'Electronics',
      slug: 'electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
      description: 'Latest gadgets and devices',
      productCount: 245,
      subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Gaming']
    },
    {
      id: 2,
      name: 'Fashion',
      slug: 'fashion',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop',
      description: 'Clothing and accessories',
      productCount: 189,
      subcategories: ['Men', 'Women', 'Kids', 'Accessories', 'Shoes']
    },
    {
      id: 3,
      name: 'Home & Garden',
      slug: 'home-garden',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&auto=format&fit=crop',
      description: 'Furniture and decor',
      productCount: 156,
      subcategories: ['Furniture', 'Kitchen', 'Decor', 'Garden', 'Lighting']
    },
    {
      id: 4,
      name: 'Beauty',
      slug: 'beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop',
      description: 'Cosmetics and skincare',
      productCount: 98,
      subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Tools']
    },
    {
      id: 5,
      name: 'Sports',
      slug: 'sports',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop',
      description: 'Sports equipment and gear',
      productCount: 76,
      subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga', 'Cycling']
    },
    {
      id: 6,
      name: 'Books',
      slug: 'books',
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop',
      description: 'Books and magazines',
      productCount: 321,
      subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Business']
    },
    {
      id: 7,
      name: 'Toys & Games',
      slug: 'toys-games',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop',
      description: 'Toys and entertainment',
      productCount: 142,
      subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational', 'Outdoor']
    },
    {
      id: 8,
      name: 'Automotive',
      slug: 'automotive',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop',
      description: 'Car accessories and parts',
      productCount: 89,
      subcategories: ['Car Care', 'Interior', 'Exterior', 'Tools', 'Electronics']
    },
    {
      id: 9,
      name: 'Health',
      slug: 'health',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop',
      description: 'Health and wellness',
      productCount: 112,
      subcategories: ['Vitamins', 'Medical', 'Personal Care', 'Fitness', 'Wellness']
    },
    {
      id: 10,
      name: 'Office',
      slug: 'office',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop',
      description: 'Office supplies',
      productCount: 67,
      subcategories: ['Stationery', 'Furniture', 'Electronics', 'Storage', 'Supplies']
    },
    {
      id: 11,
      name: 'Jewelry',
      slug: 'jewelry',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop',
      description: 'Fine jewelry and watches',
      productCount: 54,
      subcategories: ['Necklaces', 'Rings', 'Watches', 'Bracelets', 'Earrings']
    },
    {
      id: 12,
      name: 'Food & Beverage',
      slug: 'food-beverage',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&auto=format&fit=crop',
      description: 'Gourmet food and drinks',
      productCount: 203,
      subcategories: ['Snacks', 'Beverages', 'Organic', 'International', 'Specialty']
    }
  ]);

  // Products data
  const [products, setProducts] = useState([
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
      tags: ['Wireless', 'Noise Cancelling', 'Bluetooth 5.0']
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
      tags: ['Premium', 'Leather', 'Men\'s Fashion']
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
      tags: ['Smart', 'Fitness', 'Waterproof']
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
      tags: ['Organic', 'Cotton', 'Sustainable']
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
      tags: ['Ceramic', 'Set of 4', 'Handmade']
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
      tags: ['Yoga', 'Non-slip', 'Eco-friendly']
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
      tags: ['LED', 'Adjustable', 'Touch Control']
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
      tags: ['Bestseller', 'Fiction', 'Award Winning']
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
      tags: ['Gaming', 'RTX 4070', '16GB RAM']
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
      tags: ['Running', 'Lightweight', 'Comfort']
    }
  ]);

  // Filter options
  const filterOptions = {
    brands: ['SoundMax', 'TechWear', 'LeatherCraft', 'EcoWear', 'HomeStyle', 'FitLife', 'BrightTech', 'BookWorld', 'GameMax', 'RunFast'],
    ratings: ['4.5 & up', '4.0 & up', '3.5 & up', '3.0 & up'],
    availability: ['In Stock', 'Out of Stock', 'Pre-order'],
    features: ['Free Shipping', 'On Sale', 'New Arrival', 'Featured', 'Best Seller']
  };

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'discount', label: 'Best Discount' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  const selectedCategory = categoryId 
    ? categories.find(cat => cat.id === parseInt(categoryId) || cat.slug === categoryId)
    : null;

  const filteredProducts = products.filter(product => {
    // Filter by category if selected
    if (selectedCategory && product.category !== selectedCategory.name) {
      return false;
    }

    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filter by selected brands
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

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
      default:
        return b.isFeatured ? 1 : -1;
    }
  });

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
      brands: [],
      ratings: [],
      availability: [],
      features: []
    });
    setPriceRange([0, 1000]);
    setSearchQuery('');
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

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).flat().length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);
  };

  const FilterSection = ({ title, options, filterType }) => (
    <div className="mb-6">
      <h4 className="font-bold text-gray-800 mb-3 flex items-center justify-between">
        <span>{title}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </h4>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedFilters[filterType].includes(option)}
              onChange={() => handleFilterToggle(filterType, option)}
              className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
            />
            <span className="ml-3 text-gray-700 group-hover:text-primary">
              {option}
            </span>
            {filterType === 'ratings' && (
              <div className="ml-auto flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i < parseInt(option) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-2xl font-bold text-primary">ShopHub</Link>
              <span className="text-gray-400">/</span>
              <span className="font-medium">Categories</span>
              {selectedCategory && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="font-medium">{selectedCategory.name}</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
              <Link to="/cart" className="text-gray-600 hover:text-primary">
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedCategory ? selectedCategory.name : 'All Categories'}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {selectedCategory 
                ? selectedCategory.description 
                : 'Browse through our wide range of products and categories'}
            </p>
            <div className="relative max-w-2xl">
              <ChartBarSquareIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="bg-white rounded-xl shadow border p-6 sticky top-6">
              {/* Filters Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                {getActiveFiltersCount() > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-primary hover:text-primary-dark"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.brands.map(brand => (
                      <span key={brand} className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {brand}
                        <button
                          onClick={() => handleFilterToggle('brands', brand)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <AcademicCapIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {priceRange[0] > 0 || priceRange[1] < 1000 && (
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        ${priceRange[0]} - ${priceRange[1]}
                        <button
                          onClick={() => setPriceRange([0, 1000])}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <AcademicCapIcon className="h-3 w-3" />
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
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Filter Sections */}
              <FilterSection title="Brands" options={filterOptions.brands} filterType="brands" />
              <FilterSection title="Customer Rating" options={filterOptions.ratings} filterType="ratings" />
              <FilterSection title="Availability" options={filterOptions.availability} filterType="availability" />
              <FilterSection title="Features" options={filterOptions.features} filterType="features" />

              {/* Results Count */}
              <div className="mt-8 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{filteredProducts.length}</div>
                  <div className="text-sm text-gray-600">Products Found</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Controls Bar */}
            <div className="bg-white rounded-xl shadow border p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Results Count */}
                <div className="text-gray-700">
                  Showing <span className="font-bold">{filteredProducts.length}</span> of{' '}
                  <span className="font-bold">{products.length}</span> products
                  {selectedCategory && (
                    <span> in <span className="font-bold text-primary">{selectedCategory.name}</span></span>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500'}`}
                    >
                      <ViewColumnsIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Mobile Filters Button */}
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <ArchiveBoxArrowDownIcon className="h-5 w-5" />
                    <span>Filters</span>
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-primary text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            {!selectedCategory && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/categories/${category.slug}`}
                      className="group bg-white rounded-xl shadow border overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          <p className="text-sm text-white/80">{category.description}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {category.subcategories.slice(0, 3).map(sub => sub).join(', ')}
                            {category.subcategories.length > 3 && '...'}
                          </div>
                          <div className="text-primary font-semibold">
                            {category.productCount} products
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            <div>
              {selectedCategory && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCategory.name} Products</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCategory.subcategories.map(sub => (
                      <button
                        key={sub}
                        className="px-4 py-2 border border-gray-300 rounded-full hover:border-primary hover:text-primary text-sm"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow border">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow border overflow-hidden group">
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
                          <span className="text-sm text-gray-500">{product.brand}</span>
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
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
                            <div className="text-sm text-gray-600">
                              {product.stock > 0 ? (
                                <span className="text-green-600">In Stock ({product.stock} left)</span>
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
                  {sortedProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow border p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-sm text-gray-500">{product.brand} • {product.category}</span>
                              <h3 className="text-xl font-bold text-gray-800 mt-1">{product.name}</h3>
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              <span className="ml-1 font-bold">{product.rating}</span>
                              <span className="ml-2 text-gray-500">({product.reviews} reviews)</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2">{product.tags.join(' • ')}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                                {product.originalPrice > product.price && (
                                  <>
                                    <span className="text-lg text-gray-500 line-through">
                                      ${product.originalPrice.toFixed(2)}
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-bold">
                                      Save ${(product.originalPrice - product.price).toFixed(2)}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="mt-2 text-sm">
                                {product.stock > 0 ? (
                                  <span className="text-green-600 flex items-center">
                                    <CheckIcon className="h-4 w-4 mr-1" />
                                    In Stock ({product.stock} available)
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
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map(page => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${
                        page === 1
                          ? 'bg-gray-800 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-md bg-white overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <AcademicCapIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Filters Content */}
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
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <FilterSection title="Brands" options={filterOptions.brands} filterType="brands" />
                <FilterSection title="Rating" options={filterOptions.ratings} filterType="ratings" />
                <FilterSection title="Availability" options={filterOptions.availability} filterType="availability" />
                <FilterSection title="Features" options={filterOptions.features} filterType="features" />

                {/* Action Buttons */}
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