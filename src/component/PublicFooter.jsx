import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBagIcon, } from "@heroicons/react/24/outline";
const PublicFooter = () => {
    const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                  <ShoppingBagIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ShopHub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your one-stop destination for all shopping needs. Quality
                products at affordable prices.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "YouTube"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      {social.charAt(0)}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/shop")}
                    className="text-gray-400 hover:text-white"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/categories")}
                    className="text-gray-400 hover:text-white"
                  >
                    Categories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/deals")}
                    className="text-gray-400 hover:text-white"
                  >
                    Today's Deals
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-gray-400 hover:text-white"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate("/help")}
                    className="text-gray-400 hover:text-white"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/shipping")}
                    className="text-gray-400 hover:text-white"
                  >
                    Shipping Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/returns")}
                    className="text-gray-400 hover:text-white"
                  >
                    Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/privacy")}
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/terms")}
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">📍</div>
                  123 Street, City, Country
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">📞</div>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">✉️</div>
                  support@shophub.com
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 mr-2">⏰</div>
                  Mon-Fri: 9AM-6PM
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2026 ShopHub. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                  alt="Mastercard"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-8"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default PublicFooter