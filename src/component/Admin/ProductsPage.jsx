import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { productsAPI } from "./api"; // We'll create this
import { toast } from "react-toastify";
import { categories, mockProducts } from "../../mock/mockData";
import { fetchAllProducts ,deleteProduct  } from "../../api/axios";

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

    console.log(res);
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
  const [imageUploading, setImageUploading] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    images: [""],
    stock: 100,
    sku: "",
    discountPercentage: 0,
    rating: 0,
  });

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await fetchAllProducts()
      console.log(res)
  
      // Mock data - replace with actual API call
      setProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.description.length > 255) {
      toast.error("Description must be within 255 characters");
      return;
    }
    try {
      const selectedCategoryObj = categories.find(
        (cat) => cat.id === Number(formData.categoryId)
      );

      if (!selectedCategoryObj) {
        alert("Invalid category selected");
        return;
      }

      if (editingProduct) {
        const updatedProducts = products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                category: selectedCategoryObj, // ✅ FIX
              }
            : p
        );

        setProducts(updatedProducts);
      } else {
        // CREATE PRODUCT
        // const newProduct = {
        //   id: Date.now(),
        //   slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
        //   ...formData,
        //   category: selectedCategoryObj.name, // ✅ FIX
        //   creationAt: new Date().toISOString(),
        //   updatedAt: new Date().toISOString(),
        // };
        console.log(formData);
        const newProduct = {
          name: formData.title,
          desc: formData.description,
          price: formData.price,
          category: selectedCategoryObj.name,
          img: formData.images[0],
          slug: formData.sku,
          discount: formData.discountPercentage,
        };
        console.log(newProduct);
        let res = await productsAPI.createProduct(newProduct);
        toast.success(res);
      }

      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id,
      images: product.images,
      stock: product.stock || 100,
      sku: product.sku || "",
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating || 0,
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    e.preventDefault()
    try {
      console.log("Deleting product:", productId);
      setShowDeleteModal(false);
      const res = await deleteProduct(productId)
      console.log(res)
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: [""],
      stock: 100,
      sku: "",
      discountPercentage: 0,
      rating: 0,
    });
    setEditingProduct(null);
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const updateImageField = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.slug?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
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
                  <tr key={product.productId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.imgLink}
                          alt={product.product_name}
                          className="h-12 w-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.product_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">${product.product_price}</div>
                      {product.discount > 0 && (
                        <div className="text-sm text-green-600">
                          {product.discount}% off
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
                                100
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
                        value={formData.categoryId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categoryId: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
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
                        Stock Quantity
                      </label>
                      <input
                        type="number"
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
                          if (value.length <= 255) {
                            setFormData({ ...formData, description: value });
                          }
                        }}
                        maxLength={255}
                        rows="6"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter product description"
                      />
                      <div className="text-right text-sm text-gray-500 mt-1">
                        {formData.description.length}/255
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Product Images *
                        </label>
                        <button
                          type="button"
                          onClick={addImageField}
                          className="text-sm text-primary hover:text-primary-dark"
                        >
                          Add Image
                        </button>
                      </div>
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;

                              toast.info("Uploading image...");

                              try {
                                setImageUploading(true);
                                const imageUrl = await uploadImageToCloudinary(
                                  file
                                );
                                console.log(imageUrl);
                                updateImageField(index, imageUrl);
                                toast.success("Image uploaded");
                              } catch (err) {
                                toast.error("Image upload failed");
                              } finally {
                                setImageUploading(false);
                              }
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          />

                          {formData.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}
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
                    disabled={imageUploading}
                    className={`px-4 py-2 rounded-lg text-white flex items-center space-x-2
    ${
      imageUploading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span>
                      {imageUploading
                        ? "Uploading Image..."
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
                    {selectedProduct.product_name}
                  </h2>
                  <p className="text-gray-600">{selectedProduct.slug}</p>
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
                      src={selectedProduct.imgLink}
                      alt={selectedProduct.product_name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProduct.imageUrl} ${index + 1}`}
                        className="h-20 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-bold">
                        ${selectedProduct.product_price}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {selectedProduct.category}
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
                        {selectedProduct.discount}%
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">
                      Product Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created</span>
                        <span>{formatDate(selectedProduct.creationAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Updated</span>
                        <span>{formatDate(selectedProduct.updatedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rating</span>
                        <span>{selectedProduct.rating}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Slug</span>
                        <span className="text-primary">
                          {selectedProduct.slug}
                        </span>
                      </div>
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
                  Are you sure you want to delete "{selectedProduct?.title}"?
                  This action cannot be undone.
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
                  onClick={() => handleDelete(selectedProduct.productId)}
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
