import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon, // instead of SearchIcon
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  Bars3Icon, // instead of MenuIcon
  XMarkIcon, // instead of XIcon
} from "@heroicons/react/24/outline";

const Navbar2 = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
     navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <>
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-4">
              <span>🔥 Summer Sale: Up to 50% off</span>
              <span>🚚 Free shipping on orders over $50</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/admin/login" className="hover:text-yellow-300">
                Admin Panel
              </Link>
              <span>Help Center</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/home" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                C<span className="text-primary">herry</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/home"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary font-medium"
              >
                About
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <form
                className="relative w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              {/* Mobile Search */}
              <button className="lg:hidden text-gray-600">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              {/* User Account */}
              <Link to="/profile" className="text-gray-600 hover:text-primary">
                <UserIcon className="h-6 w-6" />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-gray-600 hover:text-primary relative"
              >
                <HeartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="text-gray-600 hover:text-primary relative"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                <Link to="/" className="block text-gray-700 hover:text-primary">
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block text-gray-700 hover:text-primary"
                >
                  Shop
                </Link>
                <Link
                  to="/categories"
                  className="block text-gray-700 hover:text-primary"
                >
                  Categories
                </Link>
                <Link
                  to="/deals"
                  className="block text-gray-700 hover:text-primary"
                >
                  Deals
                </Link>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-primary"
                >
                  About
                </Link>
                <form
                  className="pt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar2;
