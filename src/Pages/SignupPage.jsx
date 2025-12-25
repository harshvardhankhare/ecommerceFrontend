import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  MapPinIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    
    // Step 2: Account & Store
    storeName: '',
    storeUrl: '',
    industry: '',
    country: '',
    
    // Step 3: Security
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');

  const industries = [
    'Fashion & Apparel',
    'Electronics',
    'Home & Garden',
    'Health & Beauty',
    'Sports & Outdoors',
    'Food & Beverage',
    'Toys & Games',
    'Books & Media',
    'Automotive',
    'Other'
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
    'Brazil',
    'Other'
  ];

  const validateStep1 = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.company.trim()) errors.company = 'Company name is required';
    
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    
    if (!formData.storeName.trim()) errors.storeName = 'Store name is required';
    if (!formData.storeUrl.trim()) errors.storeUrl = 'Store URL is required';
    if (!formData.industry) errors.industry = 'Please select an industry';
    if (!formData.country) errors.country = 'Please select a country';
    
    return errors;
  };

  const validateStep3 = () => {
    const errors = {};
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must include uppercase, lowercase, and numbers';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!termsAccepted) {
      errors.terms = 'You must accept the terms and conditions';
    }
    
    return errors;
  };

  const handleNext = () => {
    let validationErrors = {};
    
    if (step === 1) {
      validationErrors = validateStep1();
    } else if (step === 2) {
      validationErrors = validateStep2();
    }
    
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateStep3();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSignupError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, send data to backend
      console.log('Signup data:', formData);
      
      // Show success and redirect to login
      navigate('/login?signup=success');
      
    } catch (error) {
      setSignupError('Signup failed. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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

  const generateStoreUrl = (storeName) => {
    if (!storeName) return '';
    return storeName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="text-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2 ${step >= num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > num ? <CheckCircleIcon className="h-5 w-5" /> : num}
                </div>
                <span className={`text-sm ${step >= num ? 'text-primary font-medium' : 'text-gray-500'}`}>
                  {num === 1 ? 'Personal' : num === 2 ? 'Store' : 'Security'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <BuildingStorefrontIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Your Admin Account</h1>
          <p className="text-gray-600 mt-2">Start managing your e-commerce store in minutes</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {signupError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{signupError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Personal Information</h2>
                
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
                      placeholder="john@company.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <BuildingOfficeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="Your Company LLC"
                    />
                  </div>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Store Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={(e) => {
                      handleChange(e);
                      if (!formData.storeUrl || formData.storeUrl === generateStoreUrl(formData.storeName)) {
                        setFormData(prev => ({
                          ...prev,
                          storeUrl: generateStoreUrl(e.target.value)
                        }));
                      }
                    }}
                    className={`w-full px-4 py-3 border ${errors.storeName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                    placeholder="My Awesome Store"
                  />
                  {errors.storeName && (
                    <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store URL *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      https://
                    </span>
                    <input
                      type="text"
                      name="storeUrl"
                      value={formData.storeUrl}
                      onChange={handleChange}
                      className={`flex-1 px-4 py-3 border ${errors.storeUrl ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="my-awesome-store"
                    />
                  </div>
                  {errors.storeUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.storeUrl}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Your store will be accessible at: https://{formData.storeUrl || 'your-store'}.shopadmin.com
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.industry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Account Security</h2>
                
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
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                        At least 8 characters
                      </li>
                      <li className={/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : ''}>
                        One lowercase letter
                      </li>
                      <li className={/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : ''}>
                        One uppercase letter
                      </li>
                      <li className={/(?=.*\d)/.test(formData.password) ? 'text-green-600' : ''}>
                        One number
                      </li>
                    </ul>
                  </div>
                </div>

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

                <div className="pt-4 border-t">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
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
                      . I understand that my data will be processed in accordance with these policies.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Your store will be created instantly
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      You'll get access to the admin dashboard
                    </li>
                    <li className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      We'll send a verification email to activate your account
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  Continue to Step {step + 1}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
              )}
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-8 pt-6 border-t text-center">
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
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BuildingStorefrontIcon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Easy Store Setup</h3>
            <p className="text-sm text-gray-600">Get your store running in minutes with our intuitive setup wizard</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LockClosedIcon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Secure & Reliable</h3>
            <p className="text-sm text-gray-600">Enterprise-grade security with 99.9% uptime guarantee</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Dedicated support team ready to help you succeed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;