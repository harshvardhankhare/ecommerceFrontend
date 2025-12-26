import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart, getOrderById } from "../api/axios";
import Navbar2 from "./Navbar2";
import Breadcrums from "./Breadcrums";
import { 
  IoCartOutline, IoHeartOutline, IoHeart,
  IoShareSocialOutline, IoStar, IoChevronForward,
  IoCheckmarkCircle, IoShieldCheckmarkOutline,
  IoArrowRedoOutline, IoArrowUndoOutline,
  IoBagAddOutline, IoFlashOutline,
  IoInformationCircleOutline
} from 'react-icons/io5';
import { toast } from "react-toastify";
import { FaTruck, FaTag, FaRegCreditCard } from 'react-icons/fa';

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock images for product gallery (in real app, this would come from API)
  const productImages = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop"
  ];

  // Sample sizes (in real app, this would come from API)
  const sizes = [
    { size: 'S', available: true },
    { size: 'M', available: true },
    { size: 'L', available: true },
    { size: 'XL', available: false },
    { size: 'XXL', available: true }
  ];

  // Sample colors (in real app, this would come from API)
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Red', hex: '#DC2626' },
    { name: 'White', hex: '#FFFFFF', border: true }
  ];

  // Sample offers
  const offers = [
    'Bank Offer: 10% instant discount on ICICI Bank Credit Card',
    'Special Price: Get extra 10% off (price inclusive of discount)',
    'Partner Offer: Buy this product and get ₹500 off on next purchase'
  ];

  const handleAddToCart = async () => {
    try {
      let res = await addToCart({
        "productId": product.productId,
        "quantity": quantity,
        "size": selectedSize,
        "color": selectedColor
      });
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    try {
      await handleAddToCart();
      // Navigate to checkout page
      // history.push('/checkout');
      toast.success("Proceeding to checkout...");
    } catch (error) {
      toast.error("Failed to proceed to checkout");
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await getOrderById(productId);
      console.log(res.data);
      setProduct(res.data);
      // Initialize with first color if available
      if (res.data.colors && res.data.colors.length > 0) {
        setSelectedColor(res.data.colors[0].name);
      }
      // Initialize with first size if available
      if (res.data.sizes && res.data.sizes.length > 0) {
        setSelectedSize(res.data.sizes[0].size);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    return Math.round(product.product_price * (1 - product.discount / 100));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) { // Max 10 items
      setQuantity(newQuantity);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <>
        <Navbar2 />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb skeleton */}
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 shimmer"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image gallery skeleton */}
              <div>
                <div className="bg-gray-200 rounded-lg h-96 mb-4 shimmer"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded shimmer"></div>
                  ))}
                </div>
              </div>

              {/* Product details skeleton */}
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 shimmer"></div>
                <div className="h-12 bg-gray-200 rounded shimmer"></div>
                <div className="h-12 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar2 />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice();

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrums title={product.product_name} />
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Product Images */}
            <div>
              {/* Main Image */}
              <div className="relative bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <img
                  src={productImages[selectedImage] || product.imgLink}
                  alt={product.product_name}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}% OFF
                  </div>
                )}
                {/* Navigation Arrows for Image Gallery */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <IoArrowUndoOutline className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <IoArrowRedoOutline className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-red-500' : 'border-transparent'}`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                  <FaTruck className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-500">Above $50</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                  <IoArrowUndoOutline className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-500">30 Days</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                  <IoShieldCheckmarkOutline className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-xs font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% Secure</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                  <IoCheckmarkCircle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-xs font-medium">Authentic</p>
                    <p className="text-xs text-gray-500">Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div>
              {/* Product Header */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.product_name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-gray-600">
                    {product.brand || 'Demo Brand'} / {product.category?.toUpperCase()} / {product.model}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded">
                      <IoStar className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-bold">4.5</span>
                      <span className="text-gray-600 ml-1">(1247)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-gray-900">${discountedPrice}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through ml-3">${product.product_price}</span>
                      <span className="text-red-500 font-bold ml-3">{product.discount}% off</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">inclusive of all taxes</p>
                
                {/* EMI Option */}
                <div className="mt-3 p-3 bg-white rounded-lg border">
                  <div className="flex items-center">
                    <FaRegCreditCard className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium">EMI starting at ${(discountedPrice / 6).toFixed(0)}/month</p>
                      <p className="text-sm text-gray-600">View plans</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offers */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <FaTag className="h-5 w-5 mr-2 text-green-600" />
                  Available offers
                </h3>
                <ul className="space-y-2">
                  {offers.map((offer, index) => (
                    <li key={index} className="flex items-start">
                      <IoCheckmarkCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{offer}</span>
                    </li>
                  ))}
                </ul>
                <button className="text-red-500 text-sm font-medium mt-2">
                  + 2 more offers
                </button>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Select Color</h3>
                <div className="flex space-x-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`p-1 rounded-full border-2 ${selectedColor === color.name ? 'border-red-500' : 'border-transparent'}`}
                      title={color.name}
                    >
                      <div
                        className={`w-10 h-10 rounded-full ${color.border ? 'border border-gray-300' : ''}`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">Select Size</h3>
                  <button 
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-red-500 text-sm font-medium"
                  >
                    Size Chart
                  </button>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-3">
                  {sizes.map((sizeItem) => (
                    <button
                      key={sizeItem.size}
                      onClick={() => setSelectedSize(sizeItem.size)}
                      disabled={!sizeItem.available}
                      className={`py-3 px-2 rounded-lg border-2 text-center ${selectedSize === sizeItem.size ? 'border-red-500 bg-red-50' : 'border-gray-300'} ${!sizeItem.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-red-500'}`}
                    >
                      <span className={`font-medium ${selectedSize === sizeItem.size ? 'text-red-500' : ''}`}>
                        {sizeItem.size}
                      </span>
                      {!sizeItem.available && (
                        <div className="text-xs text-red-600 mt-1">Out of stock</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-100 rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      <span className="text-xl">-</span>
                    </button>
                    <span className="px-6 py-3 font-medium text-lg">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-100 rounded-r-lg"
                      disabled={quantity >= 10}
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">Only 10 left in stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-colors"
                >
                  <IoCartOutline className="h-6 w-6 mr-2" />
                  ADD TO BAG
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-4 rounded-lg transition-colors"
                >
                  BUY NOW
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-4 rounded-lg border ${isWishlisted ? 'border-red-500 bg-red-50 text-red-500' : 'border-gray-300 hover:border-red-500'}`}
                  >
                    {isWishlisted ? <IoHeart className="h-6 w-6 fill-red-500" /> : <IoHeartOutline className="h-6 w-6" />}
                  </button>
                  <button className="p-4 rounded-lg border border-gray-300 hover:border-red-500">
                    <IoShareSocialOutline className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-3 flex items-center">
                  <FaTruck className="h-5 w-5 mr-2" />
                  Delivery Options
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-gray-600">Delivery in 5-7 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Free</p>
                      <p className="text-sm text-gray-600">Free above $50</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium">Express Delivery</p>
                      <p className="text-sm text-gray-600">Delivery in 2-3 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$9.99</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 flex items-center">
                  <IoInformationCircleOutline className="h-4 w-4 inline mr-1" />
                  Enter zipcode for exact delivery date
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12 bg-white rounded-xl shadow-sm">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                {['description', 'specifications', 'reviews', 'qna'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === tab ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-600'}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="font-bold text-xl mb-4">Product Description</h3>
                  <p className="text-gray-700 mb-6">{product.product_desc || 'No description available.'}</p>
                  
                  <h4 className="font-bold text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2 mb-6">
                    {['Premium Quality Material', 'Long Lasting Durability', 'Comfortable Fit', 'Modern Design'].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <IoCheckmarkCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Product Type', value: product.category || 'N/A' },
                    { label: 'Model', value: product.model || 'N/A' },
                    { label: 'Brand', value: product.brand || 'Demo Brand' },
                    { label: 'Material', value: 'Premium Quality' },
                    { label: 'Warranty', value: '1 Year' },
                    { label: 'Color', value: selectedColor || 'Multiple' },
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-xl">Customer Reviews</h3>
                      <div className="flex items-center mt-2">
                        <div className="text-3xl font-bold">4.5</div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <IoStar key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-gray-600">1,247 ratings</p>
                        </div>
                      </div>
                    </div>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors">
                      WRITE A REVIEW
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Add related products here */}
            </div>
          </div>
        </div>
      </div>

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
      `}</style>
    </>
  );
};

export default SingleProduct;