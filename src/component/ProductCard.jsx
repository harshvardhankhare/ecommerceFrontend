import React, { useState } from 'react';
import { 
  IoCartOutline, 
  IoHeartOutline, 
  IoHeart,
  IoStar,
  IoBagAddOutline,
  IoFlashOutline,
  IoShieldCheckmarkOutline 
} from 'react-icons/io5';
import { FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../api/axios';
import { toast } from 'react-toastify';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate discounted price
  const discountedPrice = Math.round(
    product.product_price * (1 - (product.discount || 0) / 100)
  );

  // Format price with commas
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking cart button
    try {
      setLoading(true);
      let res = await addToCart({
        "productId": product.productId,
        "quantity": 1
      });
      console.log(res);
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  const handleProductClick = () => {
    navigate(`/product/${product.productId}`);
  };

  // If viewMode is 'list', return a different layout
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
        onClick={handleProductClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-64 h-64 md:h-auto relative overflow-hidden">
            <img 
              src={product.imgLink} 
              alt={product.product_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Discount Badge */}
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {product.discount}% OFF
              </div>
            )}
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
            >
              {isWishlisted ? (
                <IoHeart className="h-5 w-5 text-red-500 fill-red-500" />
              ) : (
                <IoHeartOutline className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Product Details */}
          <div className="flex-1 p-6">
            <div className="flex justify-between h-full">
              <div className="flex-1">
                {/* Brand & Category */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500">{product.brand || 'Demo Brand'}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                
                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {product.product_name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <IoStar className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">4.5</span>
                    <span className="text-gray-500 text-xs ml-1">(1.2k)</span>
                  </div>
                  <div className="ml-4 text-sm text-green-600 flex items-center">
                    <FaTruck className="h-3 w-3 mr-1" />
                    Free Delivery
                  </div>
                </div>

                {/* Product Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.product_desc || 'Premium quality product with excellent features and durability.'}
                </p>

                {/* Sizes (Mock) */}
                <div className="flex space-x-2 mb-4">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <span key={size} className="px-3 py-1 border border-gray-300 rounded text-sm">
                      {size}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                    Best Seller
                  </span>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    Trending
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="ml-6 flex flex-col items-end">
                {/* Price */}
                <div className="mb-4 text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    ${formatPrice(discountedPrice)}
                  </div>
                  {product.discount > 0 && (
                    <>
                      <div className="text-gray-500 line-through">
                        ${formatPrice(product.product_price)}
                      </div>
                      <div className="text-red-500 font-medium text-sm">
                        {product.discount}% off
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={loading}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center justify-center min-w-[140px] transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      <>
                        <IoCartOutline className="h-5 w-5 mr-2" />
                        ADD TO BAG
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info("Added to Wishlist");
                    }}
                    className="px-6 py-3 border border-gray-300 hover:border-red-500 hover:text-red-500 rounded-lg font-medium flex items-center justify-center min-w-[140px] transition-colors"
                  >
                    <IoHeartOutline className="h-5 w-5 mr-2" />
                    WISHLIST
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer relative"
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        {/* Product Image */}
        <img 
          src={product.imgLink} 
          alt={product.product_name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Fast Delivery Badge */}
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium z-10 flex items-center">
          <IoFlashOutline className="h-3 w-3 mr-1" />
          FAST
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-12 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform ${
            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          }`}
        >
          {isWishlisted ? (
            <IoHeart className="h-5 w-5 text-red-500 fill-red-500" />
          ) : (
            <IoHeartOutline className="h-5 w-5 text-gray-600 hover:text-red-500" />
          )}
        </button>

        {/* Quick Add to Cart (Appears on Hover) */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transform transition-all duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full py-3 text-red-500 font-semibold flex items-center justify-center hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              <>
                <IoBagAddOutline className="h-5 w-5 mr-2" />
                QUICK ADD
              </>
            )}
          </button>
        </div>

        {/* Trust Badge */}
        <div className="absolute bottom-3 left-3 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
          <IoShieldCheckmarkOutline className="h-3 w-3 text-purple-600 mr-1" />
          <span className="font-medium">100% Authentic</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Brand */}
        <div className="text-sm text-gray-500 mb-1">
          {product.brand || 'Demo Brand'}
        </div>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
          {product.product_name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <IoStar className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="font-medium">4.5</span>
            <span className="text-gray-500 text-sm ml-1">(1.2k)</span>
          </div>
          <div className="mx-2 text-gray-300">•</div>
          <div className="text-green-600 text-sm flex items-center">
            <FaTruck className="h-3 w-3 mr-1" />
            Free
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-gray-900">
              ${formatPrice(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-500 line-through text-sm ml-2">
                  ${formatPrice(product.product_price)}
                </span>
                <span className="text-red-500 font-medium text-sm ml-2">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">inclusive of all taxes</div>
        </div>

        {/* Sizes (Mock Data) */}
        <div className="flex flex-wrap gap-1 mb-4">
          {['S', 'M', 'L', 'XL'].slice(0, 3).map(size => (
            <span key={size} className="px-2 py-1 border border-gray-300 text-xs rounded">
              {size}
            </span>
          ))}
          <span className="px-2 py-1 border border-gray-300 text-xs rounded text-gray-500">
            +{Math.max(0, ['S', 'M', 'L', 'XL'].length - 3)} more
          </span>
        </div>

        {/* Primary Action Button (Visible by default) */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          ) : (
            <>
              <IoCartOutline className="h-5 w-5 mr-2" />
              ADD TO BAG
            </>
          )}
        </button>
      </div>

      {/* Hover Overlay Effect */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default ProductCard;