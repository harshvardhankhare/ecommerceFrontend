import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart, getProductById } from "../api/axios";
import Navbar2 from "./Navbar2";
import Breadcrums from "./Breadcrums";
import { 
  IoCartOutline, IoHeartOutline, IoHeart,
  IoShareSocialOutline, IoStar,
  IoCheckmarkCircle, IoShieldCheckmarkOutline,
  IoArrowRedoOutline, IoArrowUndoOutline,
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
  const [productImages, setProductImages] = useState([]);

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
        "productId": product.id || product.productId,
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
      toast.success("Proceeding to checkout...");
    } catch (error) {
      toast.error("Failed to proceed to checkout");
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductById(productId);
      console.log(res.data);
      setProduct(res.data);
      
      // Parse images from the new data structure
      let images = [];
      try {
        if (res.data.imageUrls) {
          images = typeof res.data.imageUrls === 'string' 
            ? JSON.parse(res.data.imageUrls) 
            : JSON.parse(res.data.imageUrls);
        } else if (res.data.imageUrls) {
          images = typeof res.data.imageUrls === 'string'
            ? JSON.parse(res.data.imageUrls)
            : res.data.imageUrls;
        }
      } catch (e) {
        images = [];
      }
      
      // If no images found, use thumbnail or default
      if (images.length === 0 && res.data.thumbnailImage) {
        images = [res.data.thumbnail];
      } else if (images.length === 0) {
        images = [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop"
        ];
      }
      
      setProductImages(images);
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
    const price = product.price || product.product_price || 0;
    const discount = product.discountPercentage || product.discount || 0;
    return Math.round(price * (1 - discount / 100));
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Get product details with fallbacks
  const getProductName = () => {
    return product?.title || product?.product_name || "Product";
  };

  const getProductPrice = () => {
    return product?.price || product?.product_price || 0;
  };

  const getProductDiscount = () => {
    return product?.discountPercentage || product?.discount || 0;
  };

  const getProductDescription = () => {
    return product?.description || product?.product_desc || "No description available.";
  };

  const getProductCategory = () => {
    return product?.category || "N/A";
  };

  const getProductBrand = () => {
    return product?.brand || "Demo Brand";
  };

  const getProductSku = () => {
    return product?.sku || product?.slug || "N/A";
  };

  const getProductStock = () => {
    return product?.stock || 0;
  };

  const getProductRating = () => {
    return product?.rating || 0;
  };

  const getProductTags = () => {
    return JSON.parse(product?.tags || []);
  };

  const getProductWarranty = () => {
    return product?.warrantyInformation || "1 Year";
  };

  const getProductShipping = () => {
    return product?.shippingInformation || "Ships in 3-5 business days";
  };

  const getProductReturnPolicy = () => {
    return product?.returnPolicy || "30 days return policy";
  };

  const getProductAvailability = () => {
    return product?.availabilityStatus || (getProductStock() > 0 ? "In Stock" : "Out of Stock");
  };

  const getProductMinOrder = () => {
    return product?.minimumOrderQuantity || 1;
  };

  const getProductWeight = () => {
    return product?.weight || 0;
  };

  const getFeatures = () => {
    return JSON.parse(product?.keyFeatures || []);
  }
  // Loading skeleton
  if (loading) {
    return (
      <>
        <Navbar2 />
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 shimmer"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="bg-gray-200 rounded-lg h-96 mb-4 shimmer"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded shimmer"></div>
                  ))}
                </div>
              </div>

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
  const productName = getProductName();
  const productPrice = getProductPrice();
  const productDiscount = getProductDiscount();
  const productDescription = getProductDescription();
  const productCategory = getProductCategory();
  const productBrand = getProductBrand();
  const productSku = getProductSku();
  const productStock = getProductStock();
  const productRating = getProductRating();
  const productTags = getProductTags();
  const productWarranty = getProductWarranty();
  const productShipping = getProductShipping();
  const productReturnPolicy = getProductReturnPolicy();
  const productAvailability = getProductAvailability();
  const productMinOrder = getProductMinOrder();
  const productWeight = getProductWeight();
  const features = getFeatures();

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrums title={productName} />
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Product Images */}
            <div>
              {/* Main Image */}
              <div className="relative bg-white rounded-xl shadow-sm overflow-hidden mb-4">
                <img
                  src={productImages[selectedImage] || product?.thumbnailImage || product?.imgLink}
                  alt={productName}
                  className="w-full h-auto max-h-[500px] object-contain"
                />
                {/* Discount Badge */}
                {productDiscount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {productDiscount}% OFF
                  </div>
                )}
                {/* Navigation Arrows for Image Gallery */}
                {productImages?.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + productImages?.length) % productImages?.length)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <IoArrowUndoOutline className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % productImages?.length)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                    >
                      <IoArrowRedoOutline className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages?.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {productImages?.map((img, index) => (
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{productName}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-gray-600">
                    {productBrand} / {productCategory?.toUpperCase()} / {productSku}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded">
                      <IoStar className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-bold">{productRating || 4.5}</span>
                      <span className="text-gray-600 ml-1">(1247)</span>
                    </div>
                  </div>
                </div>
                {productTags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {productTags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-gray-900">${discountedPrice}</span>
                  {productDiscount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through ml-3">${productPrice}</span>
                      <span className="text-red-500 font-bold ml-3">{productDiscount}% off</span>
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
                  {offers?.map((offer, index) => (
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
                  {colors?.map((color) => (
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
                  {sizes?.map((sizeItem) => (
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
                  <span className="text-sm text-gray-600">Only {productStock} left in stock</span>
                </div>
                {productMinOrder > 1 && (
                  <p className="text-xs text-gray-500 mt-1">Minimum order quantity: {productMinOrder}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-colors"
                  disabled={productStock === 0}
                >
                  <IoCartOutline className="h-6 w-6 mr-2" />
                  {productStock === 0 ? 'OUT OF STOCK' : 'ADD TO BAG'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-4 rounded-lg transition-colors"
                  disabled={productStock === 0}
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

              {/* Product Information */}
              <div className="mb-8 bg-white p-4 rounded-xl border">
                <h3 className="font-bold text-lg mb-3">Product Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Brand</span>
                    <span className="font-medium">{productBrand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium">{productCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">SKU</span>
                    <span className="font-medium">{productSku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-medium">{productWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Warranty</span>
                    <span className="font-medium">{productWarranty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability</span>
                    <span className={`font-medium ${productStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {productAvailability}
                    </span>
                  </div>
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
                      <p className="text-sm text-gray-600">{productShipping}</p>
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
                  <p className="text-gray-700 mb-6">{productDescription}</p>
                  
                  <h4 className="font-bold text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2 mb-6">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <IoCheckmarkCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Return Policy */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-bold mb-2">Return Policy</h4>
                    <p className="text-gray-700">{productReturnPolicy}</p>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Product Type', value: productCategory },
                    { label: 'Brand', value: productBrand },
                    { label: 'SKU', value: productSku },
                    { label: 'Material', value: 'Premium Quality' },
                    { label: 'Warranty', value: productWarranty },
                    { label: 'Weight', value: `${productWeight} kg` },
                    { label: 'Color', value: selectedColor || 'Multiple' },
                    { label: 'Minimum Order', value: productMinOrder },
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
                        <div className="text-3xl font-bold">{productRating || 4.5}</div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <IoStar key={i} className={`h-5 w-5 ${i < Math.round(productRating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}`} />
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
                  {product?.reviews && product.reviews.length > 0 && (
                    <div className="space-y-4">
                      {product.reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <IoStar key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="ml-2 font-medium">{review.reviewerName}</span>
                            </div>
                            <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'qna' && (
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-4">Questions & Answers</h3>
                  <p className="text-gray-600 mb-6">Have questions about this product?</p>
                  <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
                    ASK A QUESTION
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Add related products here */}
              <p className="text-gray-500 col-span-full text-center py-8">Related products will be shown here</p>
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