// app/login/page.tsx
"use client";

import { useState } from "react";
import {
  Plane,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  X,
  AlertCircle,
  Fingerprint,
  Smartphone,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Mock background images
  const backgroundImage =
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setShowTwoFactor(true);
      }, 1500);
    }
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
        <img
          src={backgroundImage}
          alt="Luxury aircraft interior"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Branding Overlay */}
        <div className="absolute top-8 left-8 flex items-center space-x-2 text-white">
          <Plane className="w-6 h-6" />
          <span className="text-lg font-light">
            <span className="font-semibold">AETHER</span>
            <span className="text-white/60 ml-1">wings</span>
          </span>
        </div>

        {/* Testimonial */}
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <div className="max-w-md">
            <div className="flex items-center space-x-1 mb-4">
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
            <p className="text-xl font-light leading-relaxed mb-4">
              "The most seamless booking experience I've ever had. The attention
              to detail and premium service is unmatched."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium">James Davidson</p>
                <p className="text-xs text-white/60">
                  Frequent Flyer • 50+ flights
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center space-x-2 mb-8">
            <Plane className="w-6 h-6 text-gray-900" />
            <span className="text-lg font-light">
              <span className="font-semibold">AETHER</span>
              <span className="text-gray-300 ml-1">wings</span>
            </span>
          </div>

          {!showTwoFactor ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                  Welcome back
                </h1>
                <p className="text-sm text-gray-500">
                  Please enter your details to access your account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: "" });
                      }}
                      placeholder="Enter your email"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.email
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                      }}
                      placeholder="Enter your password"
                      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.password
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                    />
                    <span className="text-xs text-gray-600">
                      Remember me for 30 days
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 py-2.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 py-2.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"
                      />
                    </svg>
                    <span className="text-xs text-gray-600">Facebook</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-xs text-gray-500 mt-6">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </form>
            </>
          ) : (
            /* Two-Factor Authentication */
            <div className="animate-fadeIn">
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gray-900" />
                </div>
                <h2 className="text-2xl font-light text-gray-900 mb-2">
                  Two-factor authentication
                </h2>
                <p className="text-sm text-gray-500">
                  Please enter the verification code sent to your email
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  j***@example.com
                </p>
              </div>

              {/* Verification Code Input */}
              <div className="space-y-5">
                <div className="flex justify-center space-x-2">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) =>
                        handleVerificationChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowTwoFactor(false)}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Back to login
                  </button>
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Resend code
                  </button>
                </div>

                {/* Verify Button */}
                <button
                  className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 mt-4"
                  disabled={verificationCode.some((digit) => !digit)}
                >
                  Verify and continue
                </button>
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-6">
              <button className="flex items-center space-x-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                <Fingerprint className="w-4 h-4" />
                <span>Biometric login</span>
              </button>
              <button className="flex items-center space-x-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                <Smartphone className="w-4 h-4" />
                <span>Use SMS</span>
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-400">Secure connection</span>
            </div>
            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-400">Privacy protected</span>
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
