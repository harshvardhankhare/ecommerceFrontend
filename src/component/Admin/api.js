// API service for products
const API_URL = process.env.REACT_APP_BASE_URL || 'https://api.escuelajs.co/api/v1';

export const productsAPI = {
  // Get all products
  getAllProducts: async () => {
    const response = await fetch(`${API_URL}/products`);
    return await response.json();
  },

  // Get single product
  getProduct: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
  },

  // Create product
  createProduct: async (productData) => {
    const token = localStorage.getItem("userToken");
  
    const response = await fetch(`${API_URL}/admin/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    return  response.text();
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return await response.json();
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  },

  // Get categories
  getCategories: async () => {
    const response = await fetch(`${API_URL}/categories`);
    return await response.json();
  },

  // Upload image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_URL}/files/upload`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  }
};