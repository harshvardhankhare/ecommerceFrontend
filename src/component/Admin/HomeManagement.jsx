import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, X, Save, RefreshCw } from 'lucide-react';

// --- Data ---
const initialFeaturedBrands = [
  { id: 1, name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop', category: 'Sports' },
  { id: 2, name: 'Apple', logo: 'https://images.unsplash.com/photo-1546054451-aa264c0c7056?w=200&h=200&fit=crop', category: 'Electronics' },
  { id: 3, name: 'Samsung', logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop', category: 'Electronics' },
  { id: 4, name: 'Adidas', logo: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=200&h=200&fit=crop', category: 'Sports' },
  { id: 5, name: 'Levi\'s', logo: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200&h=200&fit=crop', category: 'Fashion' },
  { id: 6, name: 'Lacoste', logo: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=200&h=200&fit=crop', category: 'Fashion' },
];

const initialCategories = [
  { id: 1, name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop', description: 'Latest gadgets and devices', productCount: 245, subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Watches', 'Gaming'], icon: '📱', color: 'bg-blue-50' },
  { id: 2, name: 'Fashion', slug: 'clothes', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop', description: 'Clothing and accessories', productCount: 189, subcategories: ['Men', 'Women', 'Kids', 'Accessories', 'Shoes'], icon: '👕', color: 'bg-pink-50' },
  { id: 3, name: 'Home & Garden', slug: 'furniture', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600&auto=format&fit=crop', description: 'Furniture and decor', productCount: 156, subcategories: ['Furniture', 'Kitchen', 'Decor', 'Garden', 'Lighting'], icon: '🏠', color: 'bg-green-50' },
  { id: 4, name: 'Beauty', slug: 'beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop', description: 'Cosmetics and skincare', productCount: 98, subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare', 'Tools'], icon: '💄', color: 'bg-purple-50' },
  { id: 5, name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop', description: 'Sports equipment and gear', productCount: 76, subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga', 'Cycling'], icon: '⚽', color: 'bg-orange-50' },
  { id: 6, name: 'Books', slug: 'books', image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop', description: 'Books and magazines', productCount: 321, subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Business'], icon: '📚', color: 'bg-yellow-50' },
  { id: 7, name: 'Toys & Games', slug: 'toys-games', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop', description: 'Toys and entertainment', productCount: 142, subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Educational', 'Outdoor'], icon: '🎮', color: 'bg-red-50' },
  { id: 8, name: 'Jewelry', slug: 'jewelry', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop', description: 'Fine jewelry and watches', productCount: 54, subcategories: ['Necklaces', 'Rings', 'Watches', 'Bracelets', 'Earrings'], icon: '💎', color: 'bg-cyan-50' },
];

const initialCarouselImages = [
  { id: 1, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop", title: "Summer Collection 2024", subtitle: "Up to 70% OFF", buttonText: "Shop Now", bgColor: "from-purple-600 to-pink-500" },
  { id: 2, image: "https://images.unsplash.com/photo-1558769132-cb1c458e4222?w=1600&auto=format&fit=crop", title: "Brand Festival", subtitle: "Top Brands at Best Prices", buttonText: "Explore Brands", bgColor: "from-blue-600 to-cyan-500" },
  { id: 3, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&auto=format&fit=crop", title: "Weekend Special", subtitle: "Extra 20% OFF on Fashion", buttonText: "Grab Deals", bgColor: "from-red-600 to-orange-500" },
];

// --- Emoji Picker Component ---
const EmojiPicker = ({ selectedEmoji, onSelect }) => {
  const emojis = ['📱', '👕', '🏠', '💄', '⚽', '📚', '🎮', '💎', '👗', '👟', '👜', '⌚', '💍', '🧸', '🎯', '🎨', '🍳', '🛋️', '🌿', '💡'];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-2xl flex items-center justify-between hover:border-gray-400 transition"
      >
        <span>{selectedEmoji || 'Select emoji'}</span>
        <span className="text-sm text-gray-400">▼</span>
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-xl grid grid-cols-5 gap-2 w-full max-h-60 overflow-y-auto">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => {
                onSelect(emoji);
                setIsOpen(false);
              }}
              className={`text-2xl p-2 hover:bg-gray-100 rounded-lg transition ${selectedEmoji === emoji ? 'bg-blue-50 ring-2 ring-blue-400' : ''}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
        {children}
      </div>
    </div>
  );
};

// --- API Service (simulated) ---
const apiService = {
  async saveBrand(brand) {
    // Simulate API call
    console.log('📤 API: Saving brand', brand);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: brand });
      }, 500);
    });
  },
  async deleteBrand(id) {
    console.log('🗑️ API: Deleting brand', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  async saveCategory(category) {
    console.log('📤 API: Saving category', category);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: category });
      }, 500);
    });
  },
  async deleteCategory(id) {
    console.log('🗑️ API: Deleting category', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },
  async saveCarousel(carousel) {
    console.log('📤 API: Saving carousel', carousel);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data: carousel });
      }, 500);
    });
  },
  async deleteCarousel(id) {
    console.log('🗑️ API: Deleting carousel', id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

// --- Featured Brands Manager ---
const BrandsManager = ({ brands, setBrands }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({ name: '', logo: '', category: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;
    setIsLoading(true);
    try {
      await apiService.deleteBrand(id);
      // Refresh data after successful delete
      setBrands(brands.filter(b => b.id !== id));
      alert('Brand deleted successfully!');
    } catch (error) {
      alert('Failed to delete brand');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingBrand) {
        const updatedBrand = { ...editingBrand, ...formData };
        await apiService.saveBrand(updatedBrand);
        setBrands(brands.map(b => b.id === editingBrand.id ? updatedBrand : b));
        alert('Brand updated successfully!');
      } else {
        const newBrand = { id: Date.now(), ...formData };
        await apiService.saveBrand(newBrand);
        setBrands([...brands, newBrand]);
        alert('Brand added successfully!');
      }
      setIsModalOpen(false);
      setEditingBrand(null);
      setFormData({ name: '', logo: '', category: '' });
    } catch (error) {
      alert('Failed to save brand');
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (brand) => {
    setEditingBrand(brand);
    setFormData({ name: brand.name, logo: brand.logo, category: brand.category });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingBrand(null);
    setFormData({ name: '', logo: '', category: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Featured Brands</h2>
        <button 
          onClick={openAddModal}
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          <Plus size={16} /> Add Brand
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="group relative bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
            <img src={brand.logo} alt={brand.name} className="w-full h-20 object-cover rounded-lg" />
            <p className="text-sm font-medium mt-2 text-center">{brand.name}</p>
            <p className="text-xs text-gray-400 text-center">{brand.category}</p>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button 
                onClick={() => openEditModal(brand)}
                disabled={isLoading}
                className="bg-white/90 p-1 rounded-full shadow hover:bg-white disabled:opacity-50"
              >
                <Edit size={14} className="text-gray-600" />
              </button>
              <button 
                onClick={() => handleDelete(brand.id)}
                disabled={isLoading}
                className="bg-white/90 p-1 rounded-full shadow hover:bg-white disabled:opacity-50"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBrand ? 'Edit Brand' : 'Add New Brand'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input 
              type="url" 
              value={formData.logo} 
              onChange={(e) => setFormData({...formData, logo: e.target.value})}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input 
              type="text" 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
              {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {editingBrand ? 'Update' : 'Add'} Brand
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// --- Categories Manager ---
const CategoriesManager = ({ categories, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', slug: '', image: '', description: '', productCount: 0, subcategories: [], icon: '', color: 'bg-blue-50' });
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    setIsLoading(true);
    try {
      await apiService.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      alert('Category deleted successfully!');
    } catch (error) {
      alert('Failed to delete category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const subcategoriesArray = formData.subcategories.split(',').map(s => s.trim());
      const categoryData = { 
        ...formData, 
        subcategories: subcategoriesArray,
        productCount: Number(formData.productCount),
        id: editingCategory ? editingCategory.id : Date.now() 
      };
      
      await apiService.saveCategory(categoryData);
      
      if (editingCategory) {
        setCategories(categories.map(c => c.id === editingCategory.id ? categoryData : c));
        alert('Category updated successfully!');
      } else {
        setCategories([...categories, categoryData]);
        alert('Category added successfully!');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: '', slug: '', image: '', description: '', productCount: 0, subcategories: [], icon: '', color: 'bg-blue-50' });
    } catch (error) {
      alert('Failed to save category');
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ 
      ...category, 
      subcategories: category.subcategories.join(', '),
      productCount: category.productCount 
    });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', image: '', description: '', productCount: 0, subcategories: [], icon: '', color: 'bg-blue-50' });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Categories</h2>
        <button 
          onClick={openAddModal}
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="group relative bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
            <div className={`${category.color} w-full h-24 rounded-lg flex items-center justify-center text-4xl`}>
              {category.icon}
            </div>
            <p className="font-medium mt-2">{category.name}</p>
            <p className="text-xs text-gray-400 truncate">{category.description}</p>
            <p className="text-xs text-gray-400">{category.productCount} products</p>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => openEditModal(category)} disabled={isLoading} className="bg-white/90 p-1 rounded-full shadow hover:bg-white disabled:opacity-50">
                <Edit size={14} className="text-gray-600" />
              </button>
              <button onClick={() => handleDelete(category.id)} disabled={isLoading} className="bg-white/90 p-1 rounded-full shadow hover:bg-white disabled:opacity-50">
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCategory ? 'Edit Category' : 'Add New Category'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <EmojiPicker 
                selectedEmoji={formData.icon} 
                onSelect={(emoji) => setFormData({...formData, icon: emoji})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color (bg-*)</label>
              <input type="text" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" placeholder="bg-blue-50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Count</label>
            <input type="number" value={formData.productCount} onChange={(e) => setFormData({...formData, productCount: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategories (comma separated)</label>
            <input type="text" value={formData.subcategories} onChange={(e) => setFormData({...formData, subcategories: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Men, Women, Kids" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
              {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {editingCategory ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// --- Carousel Manager ---
const CarouselManager = ({ carousels, setCarousels }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarousel, setEditingCarousel] = useState(null);
  const [formData, setFormData] = useState({ image: '', title: '', subtitle: '', buttonText: '', bgColor: 'from-purple-600 to-pink-500' });
  const [isLoading, setIsLoading] = useState(false);

  const bgColorOptions = [
    'from-purple-600 to-pink-500',
    'from-blue-600 to-cyan-500',
    'from-red-600 to-orange-500',
    'from-green-600 to-teal-500',
    'from-yellow-500 to-red-500',
    'from-indigo-600 to-purple-600',
  ];

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this carousel slide?')) return;
    setIsLoading(true);
    try {
      await apiService.deleteCarousel(id);
      setCarousels(carousels.filter(c => c.id !== id));
      alert('Carousel slide deleted successfully!');
    } catch (error) {
      alert('Failed to delete carousel slide');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingCarousel) {
        const updatedCarousel = { ...editingCarousel, ...formData };
        await apiService.saveCarousel(updatedCarousel);
        setCarousels(carousels.map(c => c.id === editingCarousel.id ? updatedCarousel : c));
        alert('Carousel slide updated successfully!');
      } else {
        const newCarousel = { id: Date.now(), ...formData };
        await apiService.saveCarousel(newCarousel);
        setCarousels([...carousels, newCarousel]);
        alert('Carousel slide added successfully!');
      }
      setIsModalOpen(false);
      setEditingCarousel(null);
      setFormData({ image: '', title: '', subtitle: '', buttonText: '', bgColor: 'from-purple-600 to-pink-500' });
    } catch (error) {
      alert('Failed to save carousel slide');
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (carousel) => {
    setEditingCarousel(carousel);
    setFormData({ ...carousel });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCarousel(null);
    setFormData({ image: '', title: '', subtitle: '', buttonText: '', bgColor: 'from-purple-600 to-pink-500' });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Carousel Images</h2>
        <button 
          onClick={openAddModal}
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
        >
          <Plus size={16} /> Add Slide
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carousels.map((carousel) => (
          <div key={carousel.id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img src={carousel.image} alt={carousel.title} className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <div>
                <h3 className="text-white font-bold text-lg">{carousel.title}</h3>
                <p className="text-white/80 text-sm">{carousel.subtitle}</p>
              </div>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => openEditModal(carousel)} disabled={isLoading} className="bg-white/90 p-1 rounded-full shadow hover:bg-white disabled:opacity-50">
                <Edit size={14} className="text-gray-600" />
              </button>
              <button onClick={() => handleDelete(carousel.id)} disabled={isLoading} className="bg-white/90 p-1 rounded-full shadow hover:bg-white disabled:opacity-50">
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCarousel ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
            {formData.image && (
              <div className="mt-2 w-full h-32 rounded-lg overflow-hidden">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Button Text</label>
            <input type="text" value={formData.buttonText} onChange={(e) => setFormData({...formData, buttonText: e.target.value})} className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Gradient</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {bgColorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({...formData, bgColor: color})}
                  className={`h-10 rounded-lg bg-gradient-to-r ${color} ${formData.bgColor === color ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50">
              {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {editingCarousel ? 'Update' : 'Add'} Slide
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// --- Main App ---
const HomeManagement = () => {
  const [brands, setBrands] = useState(initialFeaturedBrands);
  const [categories, setCategories] = useState(initialCategories);
  const [carousels, setCarousels] = useState(initialCarouselImages);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🟢 Live</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        <div className="space-y-8">
          <BrandsManager brands={brands} setBrands={setBrands} />
          <CategoriesManager categories={categories} setCategories={setCategories} />
          <CarouselManager carousels={carousels} setCarousels={setCarousels} />
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Note:</strong> Each save/delete operation makes an individual API call and refreshes the page state automatically. 
            Check the browser console to see the API calls being made.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeManagement;