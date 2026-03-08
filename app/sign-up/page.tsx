// app/register/page.tsx
"use client";

import { useState } from "react";
import {
  Plane,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Phone,
  Calendar,
  CheckCircle,
  X,
  AlertCircle,
  Shield,
  Globe,
  Gift,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    nationality: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    nationality: "",
  });

  // Mock background image
  const backgroundImage =
    "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Must include uppercase, lowercase, and number";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    } else {
      const age =
        new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
        isValid = false;
      }
    }

    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 3 && acceptedTerms) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to success page or dashboard
        window.location.href = "/registration-success";
      }, 2000);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 2) return { text: "Weak", color: "text-red-500" };
    if (strength <= 4) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const nationalities = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Singapore",
    "UAE",
    "India",
    "China",
    "Brazil",
    "Mexico",
    "South Africa",
    "Italy",
    "Spain",
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
        <img
          src={backgroundImage}
          alt="Luxury flight experience"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Branding */}
        <div className="absolute top-8 left-8 flex items-center space-x-2 text-white">
          <Plane className="w-6 h-6" />
          <span className="text-lg font-light">
            <span className="font-semibold">AETHER</span>
            <span className="text-white/60 ml-1">wings</span>
          </span>
        </div>

        {/* Benefits */}
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h3 className="text-2xl font-light mb-6">
            Join our premium community
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Gift className="w-3 h-3" />
              </div>
              <div>
                <p className="text-sm font-medium">Welcome bonus</p>
                <p className="text-xs text-white/60">
                  Get 2,500 bonus miles on signup
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-3 h-3" />
              </div>
              <div>
                <p className="text-sm font-medium">Instant Silver Status</p>
                <p className="text-xs text-white/60">
                  Enjoy priority boarding and lounge access
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-3 h-3" />
              </div>
              <div>
                <p className="text-sm font-medium">Exclusive member rates</p>
                <p className="text-xs text-white/60">
                  Save up to 15% on all bookings
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current text-yellow-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-light italic text-white/80">
              "The benefits are incredible. I've already saved enough on my
              first two trips to cover the membership."
            </p>
            <p className="text-xs text-white/60 mt-2">
              — Michael Chen, Member since 2023
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center space-x-2 mb-8">
            <Plane className="w-6 h-6 text-gray-900" />
            <span className="text-lg font-light">
              <span className="font-semibold">AETHER</span>
              <span className="text-gray-300 ml-1">wings</span>
            </span>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentStep >= step
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        currentStep > step ? "bg-gray-900" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Personal Info</span>
              <span>Security</span>
              <span>Review</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {currentStep === 1 && "Create your account"}
              {currentStep === 2 && "Set up security"}
              {currentStep === 3 && "Review & submit"}
            </h1>
            <p className="text-sm text-gray-500">
              {currentStep === 1 &&
                "Tell us a bit about yourself to get started"}
              {currentStep === 2 &&
                "Choose a strong password to protect your account"}
              {currentStep === 3 &&
                "Please review your information before submitting"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      First name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          });
                          setErrors({ ...errors, firstName: "" });
                        }}
                        placeholder="John"
                        className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                          errors.firstName
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        setErrors({ ...errors, lastName: "" });
                      }}
                      placeholder="Doe"
                      className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.lastName
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setErrors({ ...errors, email: "" });
                      }}
                      placeholder="john.doe@example.com"
                      className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.email
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Phone number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setErrors({ ...errors, phone: "" });
                      }}
                      placeholder="+1 234 567 8900"
                      className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.phone
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Security */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                {/* Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setErrors({ ...errors, password: "" });
                      }}
                      placeholder="Create a strong password"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.password
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full ${
                              level <= passwordStrength()
                                ? level <= 2
                                  ? "bg-red-400"
                                  : level <= 4
                                    ? "bg-yellow-400"
                                    : "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-xs ${getPasswordStrengthText().color}`}
                      >
                        {getPasswordStrengthText().text} password
                      </p>
                    </div>
                  )}
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        });
                        setErrors({ ...errors, confirmPassword: "" });
                      }}
                      placeholder="Re-enter your password"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Date of birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => {
                        setFormData({ ...formData, dob: e.target.value });
                        setErrors({ ...errors, dob: "" });
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.dob
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  {errors.dob && (
                    <p className="mt-1 text-xs text-red-500">{errors.dob}</p>
                  )}
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Nationality
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => {
                      setFormData({ ...formData, nationality: e.target.value });
                      setErrors({ ...errors, nationality: "" });
                    }}
                    className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                      errors.nationality
                        ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                        : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                    }`}
                  >
                    <option value="">Select nationality</option>
                    {nationalities.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.nationality && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.nationality}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-gray-50 rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Name:</span>
                      <span className="text-gray-900">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Phone:</span>
                      <span className="text-gray-900">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date of birth:</span>
                      <span className="text-gray-900">{formData.dob}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Nationality:</span>
                      <span className="text-gray-900">
                        {formData.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                    />
                    <span className="text-xs text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-gray-900 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-gray-900 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-0.5 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                    />
                    <span className="text-xs text-gray-600">
                      I'd like to receive exclusive offers and updates
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex space-x-3 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !acceptedTerms}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-gray-900 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-400">Secure registration</span>
            </div>
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-400">GDPR compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
