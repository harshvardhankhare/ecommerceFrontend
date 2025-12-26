import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Heart, Share2, Shield, Truck, 
  RefreshCw, Star, Check, ArrowLeft, ShoppingBag, Info, 
  Plus, Minus, Tag, Award, Zap, Users, Package
} from 'lucide-react';

const Test = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Product data
  const product = {
    id: 1,
    name: 'Nike Air Max 270 React',
    category: 'Men\'s Running Shoes',
    brand: 'Nike',
    price: 7995,
    originalPrice: 9999,
    discount: 20,
    rating: 4.5,
    reviews: 1247,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w-800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
    ],
    sizes: [
      { size: '6', available: true },
      { size: '7', available: true },
      { size: '8', available: true },
      { size: '9', available: true },
      { size: '10', available: false },
      { size: '11', available: true },
      { size: '12', available: true },
    ],
    colors: [
      { name: 'Black/White', hex: '#000000' },
      { name: 'Red/Black', hex: '#DC2626' },
      { name: 'Blue/White', hex: '#2563EB' },
      { name: 'Gray/Orange', hex: '#6B7280' },
    ],
    selectedColor: 'Black/White',
    highlights: [
      'Max Air unit for maximum cushioning',
      'React foam for responsive comfort',
      'Breathable mesh upper',
      'Rubber outsole for durability',
      'Classic Air Max design'
    ],
    description: 'The Nike Air Max 270 React combines Max Air cushioning with React foam for an incredibly comfortable ride. Perfect for all-day wear with a modern design that pays homage to the Air Max lineage.',
    specifications: [
      { label: 'Product Type', value: 'Running Shoes' },
      { label: 'Closure', value: 'Lace-Up' },
      { label: 'Weight', value: 'Approx 320g' },
      { label: 'Upper Material', value: 'Engineered Mesh' },
      { label: 'Sole Material', value: 'Rubber' },
      { label: 'Technology', value: 'Air Max, React Foam' },
      { label: 'Warranty', value: '3 Months' },
    ],
    deliveryOptions: [
      { type: 'standard', days: '5-7', price: 'Free', freeAbove: 799 },
      { type: 'express', days: '2-3', price: '₹99', freeAbove: 1299 },
      { type: 'next-day', days: '1', price: '₹199', freeAbove: 1999 },
    ],
    returnPolicy: '14 days return policy. Product must be in original condition with tags attached.',
    offers: [
      'Bank Offer: 10% instant discount on ICICI Bank Credit Card',
      'Bank Offer: 5% cashback on Flipkart Axis Bank Card',
      'Special Price: Get extra 10% off (price inclusive of discount)',
      'Partner Offer: Buy this product and get ₹500 off on Nike apparel',
    ]
  };

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: 'Nike Air Max 90',
      price: 6995,
      originalPrice: 8999,
      discount: 22,
      image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop',
      rating: 4.3,
    },
    {
      id: 3,
      name: 'Nike Revolution 6',
      price: 3299,
      originalPrice: 4599,
      discount: 28,
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
      rating: 4.1,
    },
    {
      id: 4,
      name: 'Nike Court Vision',
      price: 4599,
      originalPrice: 6499,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop',
      rating: 4.4,
    },
    {
      id: 5,
      name: 'Nike Air Force 1',
      price: 7499,
      originalPrice: 9999,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
      rating: 4.6,
    },
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const addToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    alert(`Added ${quantity} × ${product.name} (Size: ${selectedSize}) to bag!`);
  };

  const buyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    alert('Proceeding to checkout...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="text-pink-600 font-bold text-2xl">MYNTRA</div>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {['MEN', 'WOMEN', 'KIDS', 'HOME & LIVING', 'BEAUTY', 'STUDIO'].map(item => (
                <a key={item} href="#" className="text-gray-700 hover:text-pink-600 font-medium text-sm">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-pink-600">
                <Heart className="h-6 w-6" />
              </button>
              <button className="text-gray-700 hover:text-pink-600">
                <ShoppingBag className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          Home / Sports Shoes / Running Shoes / Nike / {product.name}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="lg:w-1/2">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded text-sm font-bold">
                {product.discount}% OFF
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-pink-600' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium">Free Delivery</p>
                  <p className="text-xs text-gray-500">Above ₹799</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium">Easy Returns</p>
                  <p className="text-xs text-gray-500">14 Days</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs font-medium">Secure Payment</p>
                  <p className="text-xs text-gray-500">100% Secure</p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                <Package className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs font-medium">Authentic</p>
                  <p className="text-xs text-gray-500">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2">
            {/* Product Header */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-2">{product.category}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-gray-600 ml-1">({product.reviews} ratings)</span>
                </div>
                <button className="text-gray-500 hover:text-pink-600 flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through ml-3">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-pink-600 font-bold ml-3">{product.discount}% off</span>
              </div>
              <p className="text-sm text-gray-600">inclusive of all taxes</p>
              
              {/* EMI Option */}
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="font-medium">EMI starting at ₹1,333/month</p>
                <p className="text-sm text-gray-600">View plans</p>
              </div>
            </div>

            {/* Offers */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-green-600" />
                Available offers
              </h3>
              <ul className="space-y-2">
                {product.offers.map((offer, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">{offer}</span>
                  </li>
                ))}
              </ul>
              <button className="text-pink-600 text-sm font-medium mt-2">
                + 2 more offers
              </button>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">Select Size</h3>
                <button 
                  onClick={() => setShowSizeChart(!showSizeChart)}
                  className="text-pink-600 text-sm font-medium"
                >
                  Size Chart
                </button>
              </div>
              
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-3">
                {product.sizes.map((sizeItem) => (
                  <button
                    key={sizeItem.size}
                    onClick={() => setSelectedSize(sizeItem.size)}
                    disabled={!sizeItem.available}
                    className={`py-3 px-2 rounded-lg border-2 text-center ${selectedSize === sizeItem.size ? 'border-pink-600 bg-pink-50' : 'border-gray-300'} ${!sizeItem.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-pink-600'}`}
                  >
                    <span className={`font-medium ${selectedSize === sizeItem.size ? 'text-pink-600' : ''}`}>
                      {sizeItem.size}
                    </span>
                    {!sizeItem.available && (
                      <div className="text-xs text-red-600 mt-1">Out of stock</div>
                    )}
                  </button>
                ))}
              </div>
              
              {showSizeChart && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                  <h4 className="font-bold mb-3">Size Chart (in cm)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2">UK Size</th>
                          <th className="p-2">Length</th>
                          <th className="p-2">Width</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[6, 7, 8, 9, 10, 11, 12].map(size => (
                          <tr key={size} className="border-b">
                            <td className="p-2 text-center">{size}</td>
                            <td className="p-2 text-center">{24 + size}</td>
                            <td className="p-2 text-center">9.5</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Select Color</h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    className={`p-1 rounded-full border-2 ${product.selectedColor === color.name ? 'border-pink-600' : 'border-transparent'}`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">Only 3 left in stock</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={addToBag}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-lg flex items-center justify-center"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                ADD TO BAG
              </button>
              <button
                onClick={buyNow}
                className="flex-1 border-2 border-pink-600 text-pink-600 hover:bg-pink-50 font-bold py-4 rounded-lg"
              >
                BUY NOW
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-lg border ${isWishlisted ? 'border-pink-600 bg-pink-50 text-pink-600' : 'border-gray-300 hover:border-pink-600'}`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-pink-600' : ''}`} />
              </button>
            </div>

            {/* Delivery Options */}
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Delivery Options
              </h3>
              <div className="space-y-2">
                {product.deliveryOptions.map(option => (
                  <div key={option.type} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <div>
                      <p className="font-medium">{option.type.charAt(0).toUpperCase() + option.type.slice(1)} Delivery</p>
                      <p className="text-sm text-gray-600">Delivery in {option.days} days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{option.price}</p>
                      {option.freeAbove && (
                        <p className="text-sm text-gray-600">Free above ₹{option.freeAbove}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <Info className="h-4 w-4 inline mr-1" />
                Enter pincode for exact delivery date
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-lg shadow-sm">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex">
              {['description', 'specifications', 'reviews', 'qna'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium ${activeTab === tab ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="font-bold text-xl mb-4">Product Description</h3>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <h4 className="font-bold text-lg mb-3">Key Features</h4>
                <ul className="space-y-2 mb-6">
                  {product.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-3">Return Policy</h4>
                    <p className="text-gray-700">{product.returnPolicy}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3">Manufacturer Details</h4>
                    <p className="text-gray-700">Manufactured by Nike, Inc. Oregon, USA. Imported and distributed in India by authorized retailers.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-6">
                {product.specifications.map((spec, index) => (
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
                      <div className="text-3xl font-bold">{product.rating}</div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600">{product.reviews} ratings</p>
                      </div>
                    </div>
                  </div>
                  <button className="bg-pink-600 text-white px-6 py-2 rounded-lg font-medium">
                    WRITE A REVIEW
                  </button>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[1, 2, 3].map(review => (
                    <div key={review} className="border-b pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <p className="font-medium">Rahul Sharma</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm">2 weeks ago</span>
                      </div>
                      <p className="text-gray-700">Very comfortable shoes! Perfect for daily use and long walks. The cushioning is amazing.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Similar Products</h2>
            <button className="text-pink-600 font-medium">VIEW ALL</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-gray-500 line-through text-sm ml-2">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-pink-600 text-sm font-medium ml-2">{product.discount}% off</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Myntra Promise */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">The Myntra Promise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Authentic</h3>
              <p className="text-gray-600">Products sourced directly from brands</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Across 26000+ pin codes in India</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">14 days return and exchange policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;