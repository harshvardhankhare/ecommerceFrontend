import axios from "axios";
import { toast } from "react-toastify";
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      window.location.href = "/login"; // 🔥 redirect
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Something went wrong";

    switch (status) {
      case 400:
        toast.error(message || "Bad request");
        break;

      case 401:
        localStorage.removeItem("userToken");
        toast.info("Session expired. Please login again.");
        window.location.href = "/login";
        break;

      case 403:
        toast.error("You are not allowed to perform this action");
        break;

      case 404:
        toast.warn("Requested resource not found");
        break;

      case 409:
        toast.warn(message || "Conflict occurred");
        break;

      case 500:
      case 502:
      case 503:
        toast.error("Server error. Please try again later.");
        break;

      default:
        toast.error("Unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export const fetchAllProducts = async () => {
  try {
    const res = await api.get("/public/getAll");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw error;
  }
};
export const addToCart = async (data) => {
  try {
    const res = await api.post("/users/cart",data);
    return res.data;
  } catch (error) {
    console.error("falid adding cart", error);
    throw error;
  }
};
export const getCart = async (userId) =>{
   try{
    const res = await api.get(`/users/${userId}`)
    return res.data;
   }catch(error){
    console.error("failed to fetch cart"+error)
    throw error
   }
}
export const getMe = async () =>{
  try{
 const res = await api.get("/users/me")
 return res.data
  }catch(error){
console.error("error fetching id "+ error)
  }
}
export const increaseQuantity = (cartItemId) => {
  return api.put(`/users/increase/${cartItemId}`);
};

export const decreaseQuantity = (cartItemId) => {
  return api.put(`/users/decrease/${cartItemId}`);
};
export const removeCartItem = (cartItemId) => {
  return api.delete(`/users/remove/${cartItemId}`);
};

export const getMyOrders = ()=>{
  return api.get("/users/myorder");
}
export const getAllOrder =()=> {
  return api.get("/admin/orders");
}

export const placeOrder=(data)=>{
 return api.post("/users/place",data);
}
export const getOrderById =(id) =>{
  return api.get(`products/product/${id}`)
}
export const getSearch = (query)=>{
  return api.get(`products/search?q=${query}`)
}
export default api;
