import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronDown, 
  FiChevronLeft,
  FiStar,
  FiHeart,
  FiShoppingBag,
  FiSearch,
  FiX,
  FiSliders
} from "react-icons/fi";
import { 
  IoFlashOutline,
  IoShieldCheckmarkOutline
} from "react-icons/io5";
import { FaTruck, FaTag } from "react-icons/fa";
import { getSearch } from "../../api/axios";
import Navbar2 from "../../component/Navbar2";
import ProductCard from "../../component/ProductCard";
import Loading from "../../extras/Loading4.webm";
import Footer from "../../component/Footer";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const query = new URLSearchParams(location.search).get("q");

  // Extract categories and brands from data
  const categories = [...new Set(data.map(item => item.category).filter(Boolean))];
  const brands = [...new Set(data.map(item => item.brand).filter(Boolean))];

  // Sort options
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "discount", label: "Discount" },
    { value: "rating", label: "Customer Rating" },
  ];

  // Fetch search results
  useEffect(() => {
    const getProducts = async () => {
      if (!query) return;
      
      setLoading(true);
      setError("");
      try {
        let res = await getSearch(query);
        setData(res.data || []);
        if (res.data.length === 0) {
          setError("No products found");
        }
      } catch (error) {
        setError("Something went wrong");
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [query]);

  // Apply filters and sorting
  const filteredAndSortedData = React.useMemo(() => {
    let result = [...data];

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(item => 
        item.category && selectedCategories.includes(item.category)
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(item => 
        item.brand && selectedBrands.includes(item.brand)
      );
    }

    // Apply price filter
    result = result.filter(item => 
      item.product_price >= priceRange[0] && 
      item.product_price <= priceRange[1]
    );

    // Apply sorting
    switch(sortBy) {
      case "price-low":
        result.sort((a, b) => a.product_price - b.product_price);
        break;
      case "price-high":
        result.sort((a, b) => b.product_price - a.product_price);
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        // Assuming there's a date field
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        // Relevance - already sorted by API
        break;
    }

    return result;
  }, [data, selectedCategories, selectedBrands, priceRange, sortBy]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 50000000]);
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar2 />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            {/* Search header skeleton */}
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 shimmer mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 shimmer"></div>
            </div>

            {/* Results skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-64 bg-gray-200 shimmer"></div>
                  <div className="p-4">
                    <div className="h-3 bg-gray-200 rounded shimmer mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded shimmer mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded shimmer w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      
      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <FiChevronLeft className="h-5 w-5 mr-1" />
                Back
              </button>
              
              <div className="flex-1 max-w-2xl mx-4">
                <div className="relative">
                  <input
                    type="text"
                    value={query || ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                  <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <FiFilter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>

            {/* Search Info */}
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredAndSortedData.length} {filteredAndSortedData.length === 1 ? 'item' : 'items'} found
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters (Desktop) */}
            <div className={`hidden lg:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
              <div className="sticky top-6">
                {/* Filter Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">FILTERS</h2>
                  <button
                    onClick={clearAllFilters}
                    className="text-red-500 text-sm font-medium"
                  >
                    CLEAR ALL
                  </button>
                </div>

                {/* Category Filter */}
                {categories.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h3 className="font-bold mb-3">CATEGORIES</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {categories.map(category => (
                        <label key={category} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="mr-3 h-4 w-4 text-red-500 rounded"
                          />
                          <span className="text-gray-700">{category}</span>
                          <span className="ml-auto text-gray-500 text-sm">
                            ({data.filter(item => item.category === category).length})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brand Filter */}
                {brands.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h3 className="font-bold mb-3">BRANDS</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                            className="mr-3 h-4 w-4 text-red-500 rounded"
                          />
                          <span className="text-gray-700">{brand}</span>
                          <span className="ml-auto text-gray-500 text-sm">
                            ({data.filter(item => item.brand === brand).length})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h3 className="font-bold mb-3">PRICE</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">${priceRange[0]}</span>
                      <span className="text-gray-600">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-24 px-3 py-2 border rounded-lg"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-24 px-3 py-2 border rounded-lg"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>

                {/* Popular Searches */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h3 className="font-bold mb-3">Related Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['shoes', 'clothing', 'accessories', 'electronics'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => navigate(`/search?q=${tag}`)}
                        className="px-3 py-1 bg-white border rounded-full text-sm hover:border-red-500 hover:text-red-500"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Search Results */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center px-4 py-2 border rounded-lg"
                    >
                      <FiSliders className="h-4 w-4 mr-2" />
                      {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    
                    {/* Active Filters */}
                    {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
                      <div className="hidden md:flex flex-wrap gap-2">
                        {selectedCategories.map(cat => (
                          <span key={cat} className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                            {cat}
                            <button
                              onClick={() => handleCategoryToggle(cat)}
                              className="ml-2"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                        {selectedBrands.map(brand => (
                          <span key={brand} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                            {brand}
                            <button
                              onClick={() => handleBrandToggle(brand)}
                              className="ml-2"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* View Mode Toggle */}
                    <div className="flex border rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-3 py-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                      >
                        <FiGrid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`px-3 py-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                      >
                        <FiList className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Mobile Active Filters */}
                {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
                  <div className="mt-4 flex md:hidden flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <span key={cat} className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                        {cat}
                        <button
                          onClick={() => handleCategoryToggle(cat)}
                          className="ml-2"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    {selectedBrands.map(brand => (
                      <span key={brand} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {brand}
                        <button
                          onClick={() => handleBrandToggle(brand)}
                          className="ml-2"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Results */}
              {error ? (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{error}</h3>
                    <p className="text-gray-600 mb-6">
                      Try searching with different keywords
                    </p>
                    <button
                      onClick={() => navigate('/products')}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Browse All Products
                    </button>
                  </div>
                </div>
              ) : filteredAndSortedData.length > 0 ? (
                <>
                  {/* Grid View */}
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredAndSortedData.map((product) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  ) : (
                    // List View
                    <div className="space-y-4">
                      {filteredAndSortedData.map((product) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                          viewMode="list"
                        />
                      ))}
                    </div>
                  )}

                  {/* Results Info */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Showing {filteredAndSortedData.length} of {data.length} results</span>
                      <button
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Back to top
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">😕</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No matching products</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters or search different keywords
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={clearAllFilters}
                        className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => navigate('/products')}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Browse Products
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              {filteredAndSortedData.length > 0 && categories.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">Popular Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.slice(0, 6).map(category => (
                      <button
                        key={category}
                        onClick={() => navigate(`/products?category=${category}`)}
                        className="px-4 py-2 bg-white border rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Section */}
              <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6 text-center">Why Shop With Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <FaTruck className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-bold mb-2">Free Delivery</h4>
                    <p className="text-sm text-gray-600">On orders above $50</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <IoShieldCheckmarkOutline className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold mb-2">100% Authentic</h4>
                    <p className="text-sm text-gray-600">Genuine products guaranteed</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <IoFlashOutline className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h4 className="font-bold mb-2">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">Express shipping available</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                      <FaTag className="h-8 w-8 text-red-600" />
                    </div>
                    <h4 className="font-bold mb-2">Best Prices</h4>
                    <p className="text-sm text-gray-600">Price match guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">FILTERS</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Filter Content */}
                <div className="space-y-6">
                  {/* Categories */}
                  {categories.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-3">CATEGORIES</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {categories.map(category => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="mr-2"
                            />
                            <span>{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brands */}
                  {brands.length > 0 && (
                    <div>
                      <h3 className="font-bold mb-3">BRANDS</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {brands.map(brand => (
                          <label key={brand} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => handleBrandToggle(brand)}
                              className="mr-2"
                            />
                            <span>{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Range */}
                  <div>
                    <h3 className="font-bold mb-3">PRICE RANGE</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-24 px-3 py-2 border rounded-lg"
                          placeholder="Min"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-24 px-3 py-2 border rounded-lg"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={clearAllFilters}
                    className="w-full py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50"
                  >
                    CLEAR ALL FILTERS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* CSS for shimmer effect */}
      <style jsx>{`
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Search;