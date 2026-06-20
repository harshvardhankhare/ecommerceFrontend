import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Save, 
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Package,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

// --- Inventory Data ---
const initialInventory = [
  { id: 1, name: 'Nike Air Max 270', category: 'Sports', price: 149.99, stock: 45, sku: 'NK-AM270-001', status: 'In Stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
  { id: 2, name: 'Apple iPhone 15 Pro', category: 'Electronics', price: 999.99, stock: 23, sku: 'AP-IP15P-002', status: 'In Stock', image: 'https://images.unsplash.com/photo-1546054451-aa264c0c7056?w=200&h=200&fit=crop' },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Electronics', price: 899.99, stock: 8, sku: 'SS-GS24-003', status: 'Low Stock', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop' },
  { id: 4, name: 'Adidas Ultraboost', category: 'Sports', price: 179.99, stock: 0, sku: 'AD-UB-004', status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=200&h=200&fit=crop' },
  { id: 5, name: 'Levi\'s 501 Jeans', category: 'Fashion', price: 89.99, stock: 67, sku: 'LV-501-005', status: 'In Stock', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200&h=200&fit=crop' },
  { id: 6, name: 'Lacoste Polo Shirt', category: 'Fashion', price: 69.99, stock: 34, sku: 'LC-PS-006', status: 'In Stock', image: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=200&h=200&fit=crop' },
  { id: 7, name: 'Sony WH-1000XM5', category: 'Electronics', price: 399.99, stock: 12, sku: 'SY-WH1000-007', status: 'In Stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
  { id: 8, name: 'Dyson V15 Vacuum', category: 'Home & Garden', price: 699.99, stock: 3, sku: 'DY-V15-008', status: 'Low Stock', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&h=200&fit=crop' },
];

// --- API Service (simulated) ---
const apiService = {
  async getInventory() {
    console.log('📊 API: Fetching inventory');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: initialInventory });
      }, 500);
    });
  },
  async saveProduct(product) {
    console.log('📤 API: Saving product', product);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: product });
      }, 500);
    });
  },
  async deleteProduct(id) {
    console.log('🗑️ API: Deleting product', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  async updateStock(id, stock) {
    console.log('📊 API: Updating stock', { id, stock });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

// --- Modal Component ---
const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-black">{title}</h2>
        {children}
      </div>
    </div>
  );
};

// --- Status Badge Component ---
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'In Stock': { icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-300' },
    'Low Stock': { icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    'Out of Stock': { icon: X, color: 'bg-red-100 text-red-800 border-red-300' },
  };

  const config = statusConfig[status] || statusConfig['In Stock'];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon size={12} />
      {status}
    </span>
  );
};

// --- Main Inventory Component ---
const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockUpdateProduct, setStockUpdateProduct] = useState(null);
  const [stockValue, setStockValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    sku: '',
    status: 'In Stock',
    image: ''
  });

  // Categories for filter
  const categories = ['All', 'Sports', 'Electronics', 'Fashion', 'Home & Garden'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  // Load inventory data
  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getInventory();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      alert('Failed to load inventory');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search products
  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'All') {
      result = result.filter(product => product.status === selectedStatus);
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, selectedStatus, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiService.deleteProduct(id);
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  // Handle stock update
  const handleStockUpdate = async () => {
    if (stockValue < 0) {
      alert('Stock cannot be negative');
      return;
    }
    try {
      await apiService.updateStock(stockUpdateProduct.id, stockValue);
      const updatedProducts = products.map(p => 
        p.id === stockUpdateProduct.id 
          ? { 
              ...p, 
              stock: stockValue,
              status: stockValue === 0 ? 'Out of Stock' : stockValue < 10 ? 'Low Stock' : 'In Stock'
            } 
          : p
      );
      setProducts(updatedProducts);
      setIsStockModalOpen(false);
      setStockUpdateProduct(null);
      alert('Stock updated successfully!');
    } catch (error) {
      alert('Failed to update stock');
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        id: editingProduct ? editingProduct.id : Date.now()
      };

      await apiService.saveProduct(productData);

      if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
        alert('Product updated successfully!');
      } else {
        setProducts([...products, productData]);
        alert('Product added successfully!');
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      alert('Failed to save product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      sku: '',
      status: 'In Stock',
      image: ''
    });
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openStockModal = (product) => {
    setStockUpdateProduct(product);
    setStockValue(product.stock);
    setIsStockModalOpen(true);
  };

  // Stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.status === 'Low Stock').length;
  const outOfStockCount = products.filter(p => p.status === 'Out of Stock').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Manage your products, stock, and pricing</p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-black">{totalProducts}</p>
              </div>
              <Package className="text-gray-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Stock</p>
                <p className="text-2xl font-bold text-black">{totalStock}</p>
              </div>
              <CheckCircle className="text-gray-400" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Low Stock Items</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <AlertCircle className="text-yellow-500" size={32} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <X className="text-red-500" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-black"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center gap-1">
                      Category
                      {sortConfig.key === 'category' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-black"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center gap-1">
                      Price
                      {sortConfig.key === 'price' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-black"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center gap-1">
                      Stock
                      {sortConfig.key === 'stock' && (
                        sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <RefreshCw className="animate-spin mx-auto text-gray-400" size={32} />
                      <p className="mt-2 text-gray-500">Loading inventory...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <Package className="mx-auto text-gray-300" size={48} />
                      <p className="mt-2">No products found</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover mr-3" />
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${product.stock < 10 ? 'text-yellow-600' : 'text-gray-900'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{product.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openStockModal(product)}
                            className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition"
                            title="Update Stock"
                          >
                            <Package size={18} />
                          </button>
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition"
                            title="Edit Product"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center gap-2">
                <Save size={16} />
                {editingProduct ? 'Update' : 'Add'} Product
              </button>
            </div>
          </form>
        </Modal>

        {/* Update Stock Modal */}
        <Modal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} title="Update Stock">
          {stockUpdateProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img src={stockUpdateProduct.image} alt={stockUpdateProduct.name} className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-black">{stockUpdateProduct.name}</h3>
                  <p className="text-gray-500 text-sm">Current Stock: {stockUpdateProduct.stock}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Stock Quantity</label>
                <input
                  type="number"
                  value={stockValue}
                  onChange={(e) => setStockValue(Number(e.target.value))}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
                  min="0"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsStockModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={handleStockUpdate} className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center gap-2">
                  <Save size={16} /> Update Stock
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Inventory;