import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products/Products";
import SingleProduct from "./component/SingleProduct";
import Search from "./Pages/SearchProducts/Search";
import About from "./Pages/About/About";
import Test from "./Pages/Test";
import Admin from "./Pages/Admin";
import Contact from "./Pages/Contact";
import ProductsPage from "./component/Admin/ProductsPage";
import LoginPage from "./Pages/LoginPage";
import SignupUserPage from "./Pages/SignupUserPage";
import LoginUserPage from "./Pages/LoginUserPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./Pages/ProtectedRoute";
import PublicHomePage from "./Pages/PublicHomePage";
import Cart from "./Pages/Cart";
import CategoryProduct from "./Pages/CategoryProduct";
import Categories from "./Pages/Categories";

function App() {
  return (
    <BrowserRouter>
     <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
  toastStyle={{
    background: "#ffffff",
    color: "#1f2937",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  }}
/>

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/register" element={<SignupUserPage />} />
        <Route path="/login/admin" element={<LoginPage />} />
        <Route path="/register/admin" element={<SignupPage />} />
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/test" element={<Test />} />
        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProtectedRoute>
              <SingleProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:category"
          element={
            <ProtectedRoute>
              <CategoryProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
         <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Route
  path="*"
  element={
    <ProtectedRoute>
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        404 – Page Not Found
      </div>
    </ProtectedRoute>
  }
/>

    </BrowserRouter>
  );
}

export default App;
