import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { productsAPI } from "./api";
import { toast } from "react-toastify";
import { categories, mockProducts } from "../../mock/mockData";
import { fetchAllProducts, deleteProduct } from "../../api/axios";

const ProductsPage = () => {
  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Image upload failed");

    const data = await res.json();
    return data.secure_url;
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [pageLoader, setPageLoader] = useState({
    isLoading: false,
    text: ""
  });
  const [keyFeature, setKeyFeature] = useState("");
  const [sizeOption, setSizeOption] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    stock: 0,
    discountPercentage: 0,
    weight: 0,
    warrantyInformation: "",
    shippingInformation: "",
    returnPolicy: "",
    minimumOrderQuantity: 1,
    tags: [],
    images: [],
    thumbnail: "",
    keyFeatures: [],
    sizes: [],
    colors: [],
    material: "",
    careInstructions: "",
  });

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await fetchAllProducts();
      setProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyFeature = () => {
    if (keyFeature.trim()) {
      setFormData({
        ...formData,
        keyFeatures: [...formData.keyFeatures, keyFeature.trim()]
      });
      setKeyFeature("");
    }
  };

  const handleRemoveKeyFeature = (index) => {
    setFormData({
      ...formData,
      keyFeatures: formData.keyFeatures.filter((_, i) => i !== index)
    });
  };

  const handleAddSize = () => {
    if (sizeOption.trim()) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, sizeOption.trim().toUpperCase()]
      });
      setSizeOption("");
    }
  };

  const handleRemoveSize = (index) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length > 500) {
      toast.error("Description must be within 500 characters");
      return;
    }

    try {
      setPageLoader({
        isLoading: true,
        text: editingProduct ? "Updating Product..." : "Creating Product..."
      });

      // Upload new images if any
      let uploadedUrls = [];
      if (imageFiles.length > 0) {
        uploadedUrls = await Promise.all(imageFiles.map(uploadImageToCloudinary));
      }

      // Combine existing images with new uploads
      const allImageUrls = [...existingImages, ...uploadedUrls];
      
      // Get thumbnail (first image or existing thumbnail)
      const thumbnail = allImageUrls.length > 0 ? allImageUrls[0] : formData.thumbnail;

      // Check if category is clothing/fashion related
      const clothingCategories = ['Fashion', 'Clothing', 'Apparel', 'Wear', 'Fashion & Clothing'];
      const isClothing = clothingCategories.some(cat => 
        formData.category.toLowerCase().includes(cat.toLowerCase())
      );

      // Prepare product data matching the exact structure
      const productData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        discountPercentage: Number(formData.discountPercentage),
        stock: Number(formData.stock),
        tags: JSON.stringify(formData.tags.length > 0 ? formData.tags : [formData.category.toLowerCase()]),
        brand: formData.brand || "",
        sku: formData.sku || "",
        warrantyInformation: formData.warrantyInformation || "",
        shippingInformation: formData.shippingInformation || "",
        availabilityStatus: Number(formData.stock) > 0 ? "In Stock" : "Out of Stock",
        returnPolicy: formData.returnPolicy || "",
        imageUrls: JSON.stringify(allImageUrls.length > 0 ? allImageUrls : [formData.thumbnail]),
        thumbnailImage: thumbnail,
        keyFeatures: JSON.stringify(formData.keyFeatures || []),
        material: formData.material || "",
        careInstructions: formData.careInstructions || "",
      };

      // Add sizes only if it's clothing
      if (isClothing && formData.sizes.length > 0) {
        productData.sizes = formData.sizes;
      }

      // Add colors if provided
      if (formData.colors.length > 0) {
        productData.colors = formData.colors;
      }

      if (editingProduct) {
        // UPDATE PRODUCT
        const updatedProduct = {
          ...productData,
          id: editingProduct.id || editingProduct.productId
        };
        console.log("Updating product:", updatedProduct);
         let res = await productsAPI.updateProduct(updatedProduct.id, updatedProduct);
         toast.success(res.message || "Product updated successfully!");
      } else {
        console.log("Creating product:", productData);
         let res = await productsAPI.createProduct(productData);
         toast.success(res.message || "Product created successfully!");
      }

      await fetchProducts(); // Refresh the list
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setPageLoader({
        isLoading: false,
        text: ""
      });
    }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    
    // Parse existing image URLs
    let parsedImages = [];
    try {
      if (product.images) {
        parsedImages = typeof product.images === 'string' 
          ? JSON.parse(product.images) 
          : product.images;
      } else if (product.imgUrls) {
        parsedImages = typeof product.imgUrls === 'string'
          ? JSON.parse(product.imgUrls)
          : product.imgUrls;
      }
    } catch (e) {
      parsedImages = [];
    }

    setExistingImages(parsedImages);
    setImageFiles([]);
    
    setFormData({
      title: product.title || product.product_name || "",
      price: product.price || product.product_price || "",
      description: product.description || product.desc || "",
      category: product.category || "",
      brand: product.brand || "",
      sku: product.sku || "",
      stock: product.stock || 0,
      discountPercentage: product.discountPercentage || product.discount || 0,
      weight: product.weight || 0,
      warrantyInformation: product.warrantyInformation || "",
      shippingInformation: product.shippingInformation || "",
      returnPolicy: product.returnPolicy || "",
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      tags: product.tags || [],
      images: parsedImages,
      thumbnail: product.thumbnail || product.thumbnailImage || product.imgLink || "",
      keyFeatures: product.keyFeatures || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      material: product.material || "",
      careInstructions: product.careInstructions || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      setPageLoader({
        isLoading: true,
        text: "Deleting Product..."
      });
      setShowDeleteModal(false);
      setSelectedProduct(null);
      await deleteProduct(productId);
      await fetchProducts();
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setPageLoader({
        isLoading: false,
        text: ""
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      brand: "",
      sku: "",
      stock: 0,
      discountPercentage: 0,
      weight: 0,
      warrantyInformation: "",
      shippingInformation: "",
      returnPolicy: "",
      minimumOrderQuantity: 1,
      tags: [],
      images: [],
      thumbnail: "",
      keyFeatures: [],
      sizes: [],
      colors: [],
      material: "",
      careInstructions: "",
    });
    setImageFiles([]);
    setExistingImages([]);
    setEditingProduct(null);
    setKeyFeature("");
    setSizeOption("");
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getProductName = (product) => {
    return product.title || product.product_name || "";
  };

  const getProductPrice = (product) => {
    return product.price || product.product_price || 0;
  };

  const getProductImage = (product) => {
    return product.thumbnail || product.thumbnailImage || product.imgLink || product.images?.[0] || "";
  };

  const getProductCategory = (product) => {
    return product.category || "";
  };

  const getProductDiscount = (product) => {
    return product.discountPercentage || product.discount || 0;
  };

  const getProductId = (product) => {
    return product.id || product.productId;
  };

  // Check if category is clothing
  const isClothingCategory = () => {
    const clothingCategories = ['Fashion', 'Clothing', 'Apparel', 'Wear', 'Fashion & Clothing'];
    return clothingCategories.some(cat => 
      formData.category.toLowerCase().includes(cat.toLowerCase())
    );
  };

  return (
    <div className="p-6">
      {pageLoader?.isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <ArrowPathIcon className="h-10 w-10 animate-spin text-green-500" />
            <p className="mt-3 font-medium">{pageLoader?.text}</p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="mt-4 md:mt-0 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              Export
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
              Bulk Edit
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={getProductId(product)} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={getProductImage(product)}
                          alt={getProductName(product)}
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {getProductName(product)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.sku || product.slug}
                          </div>
                          {product.sizes && product.sizes.length > 0 && (
                            <div className="text-xs text-gray-400 mt-1">
                              Sizes: {product.sizes.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getProductCategory(product)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">
                        ${getProductPrice(product)}
                      </div>
                      {getProductDiscount(product) > 0 && (
                        <div className="text-sm text-green-600">
                          {getProductDiscount(product)}% off
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-16 rounded-full mr-2 ${
                            product.stock > 50
                              ? "bg-green-200"
                              : product.stock > 10
                                ? "bg-yellow-200"
                                : "bg-red-200"
                          }`}
                        >
                          <div
                            className={`h-full rounded-full ${
                              product.stock > 50
                                ? "bg-green-500"
                                : product.stock > 10
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                (product.stock / 200) * 100,
                                100,
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className={`font-medium ${
                            product.stock > 50
                              ? "text-green-700"
                              : product.stock > 10
                                ? "text-yellow-700"
                                : "text-red-700"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          product.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="View"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1 text-yellow-600 hover:text-yellow-800"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter product title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) =>
                          setFormData({ ...formData, brand: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Product brand"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) =>
                          setFormData({ ...formData, sku: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Product SKU"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Percentage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.discountPercentage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discountPercentage: e.target.value,
                            })
                          }
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          %
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.weight}
                        onChange={(e) =>
                          setFormData({ ...formData, weight: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Material - Only for clothing */}
                    {isClothingCategory() && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Material
                        </label>
                        <input
                          type="text"
                          value={formData.material}
                          onChange={(e) =>
                            setFormData({ ...formData, material: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="e.g. 100% Cotton, Polyester Blend"
                        />
                      </div>
                    )}

                    {/* Care Instructions - Only for clothing */}
                    {isClothingCategory() && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Care Instructions
                        </label>
                        <textarea
                          value={formData.careInstructions}
                          onChange={(e) =>
                            setFormData({ ...formData, careInstructions: e.target.value })
                          }
                          rows="2"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="e.g. Machine wash cold, Do not bleach"
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 500) {
                            setFormData({ ...formData, description: value });
                          }
                        }}
                        maxLength={500}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter product description"
                      />
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {formData.description.length}/500
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Features
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={keyFeature}
                          onChange={(e) => setKeyFeature(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Add a key feature"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddKeyFeature()}
                        />
                        <button
                          type="button"
                          onClick={handleAddKeyFeature}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          <PlusCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.keyFeatures.map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyFeature(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sizes - Only for clothing */}
                    {isClothingCategory() && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Available Sizes
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={sizeOption}
                            onChange={(e) => setSizeOption(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g. S, M, L, XL"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddSize()}
                          />
                          <button
                            type="button"
                            onClick={handleAddSize}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            <PlusCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.sizes.map((size, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {size}
                              <button
                                type="button"
                                onClick={() => handleRemoveSize(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. beauty, mascara, makeup"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warranty Information
                      </label>
                      <input
                        type="text"
                        value={formData.warrantyInformation}
                        onChange={(e) =>
                          setFormData({ ...formData, warrantyInformation: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. 1 year warranty"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Shipping Information
                      </label>
                      <input
                        type="text"
                        value={formData.shippingInformation}
                        onChange={(e) =>
                          setFormData({ ...formData, shippingInformation: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. Ships in 3-5 business days"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Return Policy
                      </label>
                      <input
                        type="text"
                        value={formData.returnPolicy}
                        onChange={(e) =>
                          setFormData({ ...formData, returnPolicy: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g. 30 days return policy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Order Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.minimumOrderQuantity}
                        onChange={(e) =>
                          setFormData({ ...formData, minimumOrderQuantity: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Images
                      </label>
                      
                      {/* Existing Images */}
                      {existingImages.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                          <div className="flex flex-wrap gap-2">
                            {existingImages.map((url, index) => (
                              <div key={`existing-${index}`} className="relative">
                                <img
                                  src={url}
                                  alt={`Product ${index + 1}`}
                                  className="w-24 h-24 object-cover rounded border"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeExistingImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* New Images */}
                      {imageFiles.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-2">New Images:</p>
                          <div className="flex flex-wrap gap-2">
                            {imageFiles.map((file, index) => (
                              <div key={`new-${index}`} className="relative">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`New ${index + 1}`}
                                  className="w-24 h-24 object-cover rounded border"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeNewImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImages}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        {existingImages.length + imageFiles.length} image(s) total
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pageLoader?.isLoading}
                    className={`px-4 py-2 rounded-lg text-white flex items-center space-x-2
                    ${
                      pageLoader?.isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }
                  `}
                  >
                    {pageLoader?.isLoading ? (
                      <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    ) : (
                      <CheckIcon className="h-5 w-5" />
                    )}
                    <span>
                      {pageLoader?.isLoading
                        ? "Saving..."
                        : editingProduct
                          ? "Update Product"
                          : "Create Product"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && !showModal && !showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {getProductName(selectedProduct)}
                  </h2>
                  <p className="text-gray-600">{selectedProduct.sku || selectedProduct.slug}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <div className="mb-4">
                    <img
                      src={getProductImage(selectedProduct)}
                      alt={getProductName(selectedProduct)}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(() => {
                      let images = [];
                      try {
                        if (selectedProduct.images) {
                          images = typeof selectedProduct.images === 'string'
                            ? JSON.parse(selectedProduct.images)
                            : selectedProduct.images;
                        } else if (selectedProduct.imgUrls) {
                          images = typeof selectedProduct.imgUrls === 'string'
                            ? JSON.parse(selectedProduct.imgUrls)
                            : selectedProduct.imgUrls;
                        }
                      } catch (e) {
                        images = [];
                      }
                      return images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${getProductName(selectedProduct)} ${index + 1}`}
                          className="h-20 w-full object-cover rounded-lg"
                        />
                      ));
                    })()}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedProduct.description || selectedProduct.desc}
                    </p>
                  </div>

                  {/* Key Features */}
                  {selectedProduct.keyFeatures && selectedProduct.keyFeatures.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedProduct.keyFeatures.map((feature, index) => (
                          <li key={index} className="text-gray-700">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-bold">
                        ${getProductPrice(selectedProduct)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {getProductCategory(selectedProduct)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Stock</p>
                      <p
                        className={`font-medium ${
                          selectedProduct.stock > 0
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {selectedProduct.stock} units
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Discount</p>
                      <p className="text-green-600 font-medium">
                        {getProductDiscount(selectedProduct)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="font-medium">{selectedProduct.brand || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">SKU</p>
                      <p className="font-medium">{selectedProduct.sku || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">{selectedProduct.weight || 0} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Min Order</p>
                      <p className="font-medium">{selectedProduct.minimumOrderQuantity || 1}</p>
                    </div>
                    {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Available Sizes</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedProduct.sizes.map((size, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedProduct.material && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Material</p>
                        <p className="font-medium">{selectedProduct.material}</p>
                      </div>
                    )}
                    {selectedProduct.careInstructions && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Care Instructions</p>
                        <p className="font-medium">{selectedProduct.careInstructions}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">
                      Product Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created</span>
                        <span>{formatDate(selectedProduct.creationAt || selectedProduct.meta?.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Updated</span>
                        <span>{formatDate(selectedProduct.updatedAt || selectedProduct.meta?.updatedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rating</span>
                        <span>{selectedProduct.rating || 0}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Warranty</span>
                        <span>{selectedProduct.warrantyInformation || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span>{selectedProduct.shippingInformation || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Return Policy</span>
                        <span>{selectedProduct.returnPolicy || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Availability</span>
                        <span className={selectedProduct.stock > 0 ? "text-green-600" : "text-red-600"}>
                          {selectedProduct.availabilityStatus || (selectedProduct.stock > 0 ? "In Stock" : "Out of Stock")}
                        </span>
                      </div>
                      {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tags</span>
                          <span className="flex gap-1">
                            {selectedProduct.tags.map((tag, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button
                      onClick={() => {
                        handleEdit(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setShowDeleteModal(true);
                      }}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <TrashIcon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Product
                </h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete "{selectedProduct?.title || selectedProduct?.product_name}"? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(getProductId(selectedProduct))}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;