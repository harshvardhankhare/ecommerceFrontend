import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

const SignupUserPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');

  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    else if (formData.firstName.trim().length < 2) errors.firstName = 'First name must be at least 2 characters';
    
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      if (!passwordRequirements.minLength) errors.password = 'Password must be at least 8 characters';
      else if (!passwordRequirements.hasUppercase) errors.password = 'Password must contain at least one uppercase letter';
      else if (!passwordRequirements.hasLowercase) errors.password = 'Password must contain at least one lowercase letter';
      else if (!passwordRequirements.hasNumber) errors.password = 'Password must contain at least one number';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSignupError('');

    try {
      // Simulate API call
      
      // Create user object
      // name: formData.firstName.trim(),
        // lastName: formData.lastName.trim(),
        // email: formData.email.trim(),
        // password: formData.password,
        // phone: formData.phone.trim(),
        // subscribeNewsletter: formData.subscribeNewsletter,
        // role: 'customer',
        // createdAt: new Date().toISOString()
      const userData = {
        name: formData.firstName.trim()+ formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };
      
      let res = axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, userData);
           
      // Show success and redirect
      navigate('/login?signup=success');
      
    } catch (error) {
      setSignupError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    setSignupError('');
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signing up with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Signup Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
                <p className="text-gray-600 mt-2">Join thousands of happy shoppers</p>
              </div>

              {signupError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">{signupError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">Optional - for order updates and support</p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                  
                  {/* Password Requirements */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      {passwordRequirements.minLength ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                      )}
                      <span className={`text-xs ${passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                        8+ characters
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordRequirements.hasUppercase ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                      )}
                      <span className={`text-xs ${passwordRequirements.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        Uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordRequirements.hasLowercase ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                      )}
                      <span className={`text-xs ${passwordRequirements.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        Lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center">
                      {passwordRequirements.hasNumber ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                      )}
                      <span className={`text-xs ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                        Number
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms & Newsletter */}
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                  )}

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Subscribe to our newsletter for exclusive offers and updates
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('google')}
                    className="flex items-center justify-center space-x-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Google</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleSocialSignup('facebook')}
                    className="flex items-center  justify-center space-x-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </button>
                </div>

                {/* Already have account */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary font-semibold hover:text-primary-dark"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Security Note */}
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Your information is secured with 256-bit SSL encryption</p>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="lg:pl-8">
            <div className="bg-green-500 text-white rounded-2xl p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Why Join Our Community?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Exclusive Deals</h3>
                    <p className="text-white/80">Get access to members-only sales, early access to new arrivals, and special discounts.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <TruckIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Fast & Free Shipping</h3>
                    <p className="text-white/80">Enjoy free shipping on orders over $50 and expedited delivery options.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <ShieldCheckIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Secure Checkout</h3>
                    <p className="text-white/80">Your payment information is protected with bank-level security.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <CreditCardIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Easy Returns</h3>
                    <p className="text-white/80">Hassle-free returns within 30 days for most items.</p>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="font-bold text-lg mb-4">What Our Customers Say</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p className="italic text-white/90">"Signing up was quick and easy. I love the exclusive member discounts!"</p>
                    <p className="mt-2 text-white/70 text-sm">- Sarah M.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <p className="italic text-white/90">"Best shopping experience ever. The fast shipping is amazing!"</p>
                    <p className="mt-2 text-white/70 text-sm">- Michael T.</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8  grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-yellow-500 font-bold">500K+</div>
                  <div className="text-white-800 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-yellow-500 font-bold">4.8/5</div>
                  <div className="text-white-800 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 ShopEase. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="hover:text-gray-700">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-700">Privacy Policy</Link>
            <Link to="/help" className="hover:text-gray-700">Help Center</Link>
            <Link to="/contact" className="hover:text-gray-700">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupUserPage;