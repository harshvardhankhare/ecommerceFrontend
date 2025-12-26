import { useEffect, useState, useMemo } from "react";
import { 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiChevronDown, 
  FiChevronUp,
  FiStar,
  FiHeart,
  FiShoppingBag,
  FiSearch,
  FiX
} from "react-icons/fi";
import { 
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoArrowRedoOutline
} from "react-icons/io5";
import { FaTruck, FaUndo } from "react-icons/fa";
import Lottie from "lottie-react";
import notFound from "../../extras/notFound.json";
import { fetchAllProducts } from "../../api/axios";
import Footer from "../../component/Footer";
import Navbar2 from "../../component/Navbar2";
import { useDebounce } from "../../hooks/useDebounce";
import ProductCard from "../../component/ProductCard";
import Pagination from "../../component/Pagination";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("recommended");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedBrands, setExpandedBrands] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);   
      try {
        const res = await fetchAllProducts();
        setData(res);
      } catch (e) {
        console.log("Error fetching products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Categories and brands from data
  const categories = useMemo(() => {
    const allCategories = data.map(item => item.category).filter(Boolean);
    return ["All", ...new Set(allCategories)];
  }, [data]);

  const brands = useMemo(() => {
    const allBrands = data.map(item => item.brand).filter(Boolean);
    return ["All", ...new Set(allBrands)];
  }, [data]);

  // Sort options
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "discount", label: "Discount" },
  ];

  // Filter data
  const filteredData = useMemo(() => {
    let result = data.filter(item => 
      item.product_name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
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
      case "newest":
        // Assuming there's a date field
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Recommended (default)
        break;
    }

    return result;
  }, [data, debouncedSearch, category, brand, priceRange, sortBy]);

  // Pagination
  const ITEMS_PER_PAGE = 12;
  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  // Toggle category expansion
  const toggleCategory = (cat) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Toggle brand expansion
  const toggleBrand = (brand) => {
    setExpandedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 50000000]);
    setSearch("");
    setSortBy("recommended");
  };

  // Loading skeleton
  if (loading) {
    return (
      <>
        <Navbar2 />
        <div className="min-h-screen bg-gray-50">
          {/* Header Skeleton */}
          <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 shimmer mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 shimmer"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              {/* Filter Sidebar Skeleton */}
              <div className="hidden lg:block w-64">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-4 bg-gray-200 rounded w-1/2 shimmer mb-3"></div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="h-3 bg-gray-200 rounded shimmer"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Grid Skeleton */}
              <div className="flex-1">
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
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Filter Overlay */}
        {openFilter && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setOpenFilter(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">FILTERS</h2>
                  <button 
                    onClick={() => setOpenFilter(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search for products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Mobile Filters */}
                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <h3 className="font-bold mb-3">CATEGORIES</h3>
                    <div className="space-y-2">
                      {categories.slice(0, 5).map(cat => (
                        <label key={cat} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={category === cat}
                            onChange={() => setCategory(cat)}
                            className="mr-2"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <h3 className="font-bold mb-3">BRANDS</h3>
                    <div className="space-y-2">
                      {brands.slice(0, 5).map(b => (
                        <label key={b} className="flex items-center">
                          <input
                            type="radio"
                            name="brand"
                            checked={brand === b}
                            onChange={() => setBrand(b)}
                            className="mr-2"
                          />
                          <span>{b}</span>
                        </label>
                      ))}
                    </div>
                  </div>

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
                      <input
                        type="range"
                        min="0"
                        max="50000000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <button
                    onClick={resetFilters}
                    className="w-full py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50"
                  >
                    CLEAR ALL FILTERS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Discover Amazing Products
            </h1>
            <p className="text-gray-600">
              {filteredData.length} items found {category !== "All" ? `in ${category}` : ""}
            </p>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-6">
                {/* Filter Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">FILTERS</h2>
                  <button
                    onClick={resetFilters}
                    className="text-red-500 text-sm font-medium"
                  >
                    CLEAR ALL
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">CATEGORIES</h3>
                    <button
                      onClick={() => toggleCategory("all")}
                      className="text-gray-500"
                    >
                      {expandedCategories.includes("all") ? (
                        <FiChevronUp className="h-4 w-4" />
                      ) : (
                        <FiChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(expandedCategories.includes("all") ? categories : categories.slice(0, 5)).map(cat => (
                      <label key={cat} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="category"
                          checked={category === cat}
                          onChange={() => setCategory(cat)}
                          className="mr-3 h-4 w-4 text-red-500"
                        />
                        <span className="text-gray-700">{cat}</span>
                        <span className="ml-auto text-gray-500 text-sm">
                          ({data.filter(item => item.category === cat).length})
                        </span>
                      </label>
                    ))}
                    {categories.length > 5 && (
                      <button
                        onClick={() => toggleCategory("all")}
                        className="text-red-500 text-sm font-medium w-full text-left pt-2"
                      >
                        {expandedCategories.includes("all") ? "Show Less" : `+${categories.length - 5} more`}
                      </button>
                    )}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">BRANDS</h3>
                    <button
                      onClick={() => toggleBrand("all")}
                      className="text-gray-500"
                    >
                      {expandedBrands.includes("all") ? (
                        <FiChevronUp className="h-4 w-4" />
                      ) : (
                        <FiChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(expandedBrands.includes("all") ? brands : brands.slice(0, 5)).map(b => (
                      <label key={b} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="brand"
                          checked={brand === b}
                          onChange={() => setBrand(b)}
                          className="mr-3 h-4 w-4 text-red-500"
                        />
                        <span className="text-gray-700">{b}</span>
                        <span className="ml-auto text-gray-500 text-sm">
                          ({data.filter(item => item.brand === b).length})
                        </span>
                      </label>
                    ))}
                    {brands.length > 5 && (
                      <button
                        onClick={() => toggleBrand("all")}
                        className="text-red-500 text-sm font-medium w-full text-left pt-2"
                      >
                        {expandedBrands.includes("all") ? "Show Less" : `+${brands.length - 5} more`}
                      </button>
                    )}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h3 className="font-bold mb-3">PRICE RANGE</h3>
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

                {/* Trust Badges */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h3 className="font-bold mb-3 text-center">Why Shop With Us?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaTruck className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm">Free Delivery</span>
                    </div>
                    <div className="flex items-center">
                      <FaUndo className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm">Easy Returns</span>
                    </div>
                    <div className="flex items-center">
                      <IoShieldCheckmarkOutline className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm">100% Authentic</span>
                    </div>
                    <div className="flex items-center">
                      <IoFlashOutline className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="text-sm">Express Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  {/* Results count and mobile filter button */}
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <button
                      onClick={() => setOpenFilter(true)}
                      className="lg:hidden flex items-center px-4 py-2 border rounded-lg"
                    >
                      <FiFilter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                    <span className="text-gray-600">{filteredData.length} items</span>
                  </div>

                  {/* View mode and sort */}
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

                {/* Active Filters */}
                {(category !== "All" || brand !== "All" || search) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {category !== "All" && (
                      <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                        {category}
                        <button
                          onClick={() => setCategory("All")}
                          className="ml-2"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {brand !== "All" && (
                      <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                        {brand}
                        <button
                          onClick={() => setBrand("All")}
                          className="ml-2"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    {search && (
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                        Search: {search}
                        <button
                          onClick={() => setSearch("")}
                          className="ml-2"
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Products Grid/List */}
              {filteredData.length > 0 ? (
                <>
                  {/* Grid View */}
                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {paginatedData.map((product) => (
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
                      {paginatedData.map((product) => (
                        <div
                          key={product.productId}
                          className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row">
                            {/* Product Image */}
                            <div className="md:w-64 h-64 md:h-auto">
                              <img
                                src={product.imgLink}
                                alt={product.product_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex-1 p-4">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-bold text-lg">{product.product_name}</h3>
                                  <p className="text-gray-600 text-sm mt-1">{product.brand || 'Demo Brand'}</p>
                                  <div className="flex items-center mt-2">
                                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                                      <FiStar className="h-3 w-3 text-yellow-500 mr-1" />
                                      <span className="text-sm font-medium">4.5</span>
                                      <span className="text-gray-500 text-xs ml-1">(1247)</span>
                                    </div>
                                  </div>
                                  <p className="text-gray-700 mt-3 line-clamp-2">
                                    {product.product_desc}
                                  </p>
                                </div>
                                
                                {/* Price and Actions */}
                                <div className="text-right">
                                  <div className="mb-4">
                                    <div className="text-2xl font-bold">
                                      ${Math.round(product.product_price * (1 - (product.discount || 0) / 100))}
                                    </div>
                                    {product.discount > 0 && (
                                      <>
                                        <div className="text-gray-500 line-through">
                                          ${product.product_price}
                                        </div>
                                        <div className="text-red-500 font-medium">
                                          {product.discount}% off
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                                      <FiShoppingBag className="h-4 w-4" />
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                      <FiHeart className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination
                        pageHandler={pageHandler}
                        page={page}
                        dynamicPage={totalPages}
                      />
                    </div>
                  )}
                </>
              ) : (
                // No Results
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <Lottie animationData={notFound} className="w-64 h-64 mx-auto" />
                    <h3 className="text-xl font-bold text-gray-800 mt-4">No products found</h3>
                    <p className="text-gray-600 mt-2 mb-6">
                      Try adjusting your filters or search term
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        {filteredData.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-2">SUPER DEALS</h2>
                  <p className="text-lg">Up to 70% OFF on selected items</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100">
                  SHOP NOW
                </button>
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
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default Products;