// app/checkout/payment/page.tsx
"use client";

import { useState } from "react";
import {
  Plane,
  CreditCard,
  Smartphone,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Percent,
  Gift,
  Copy,
  Eye,
  EyeOff,
  Wallet,
  Banknote,
  Landmark,
  QrCode,
  Apple,
  Chrome,
  Globe,
  Truck,
  MapPin,
  Building,
  Home,
  Mail,
  Phone,
  Calendar,
  User,
  Award,
  Sparkles,
  RefreshCw,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  // Card details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // Mobile banking details
  const [mobileBanking, setMobileBanking] = useState({
    provider: "stcpay",
    phoneNumber: "",
  });

  // Billing address
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Currency options
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
    { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
    { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
    { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 151.5 },
    { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
    { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52 },
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: "card",
      name: "Credit / Debit Card",
      icon: CreditCard,
      description: "Pay with Visa, Mastercard, Amex",
      logos: ["visa", "mastercard", "amex"],
    },
    {
      id: "mobile",
      name: "Mobile Banking",
      icon: Smartphone,
      description: "STC Pay, Apple Pay, Google Pay",
      logos: ["stcpay", "applepay", "googlepay"],
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Fast and secure with PayPal",
      logos: ["paypal"],
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Landmark,
      description: "Direct bank transfer",
      logos: ["bank"],
    },
  ];

  // Price breakdown (in USD)
  const priceBreakdown = {
    baseFare: 2697,
    seatSelection: 98,
    addOns: 145,
    taxes: 324.5,
    fees: 89.5,
    discount: promoDiscount,
    total: 0,
  };

  priceBreakdown.total =
    priceBreakdown.baseFare +
    priceBreakdown.seatSelection +
    priceBreakdown.addOns +
    priceBreakdown.taxes +
    priceBreakdown.fees -
    priceBreakdown.discount;

  // Convert price to selected currency
  const convertPrice = (amount: number) => {
    const rate = currencies.find((c) => c.code === selectedCurrency)?.rate || 1;
    return (amount * rate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    return currencies.find((c) => c.code === selectedCurrency)?.symbol || "$";
  };

  const handlePromoApply = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoDiscount(150);
      setPromoApplied(true);
      setShowPromoInput(false);
    } else if (promoCode.toUpperCase() === "SAVE20") {
      setPromoDiscount(200);
      setPromoApplied(true);
      setShowPromoInput(false);
    } else {
      alert("Invalid promo code");
    }
  };

  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {};

    if (!cardDetails.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardDetails.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Invalid card number";
    }

    if (!cardDetails.cardName) {
      newErrors.cardName = "Name on card is required";
    }

    if (!cardDetails.expiry) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = "Invalid format (MM/YY)";
    }

    if (!cardDetails.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (paymentMethod === "card" && !validateCardDetails()) {
      return;
    }

    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success page
      window.location.href = "/booking/confirmation";
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="w-5 h-5 text-gray-900" />
              <span className="text-lg font-light">
                <span className="font-semibold">AETHER</span>
                <span className="text-gray-300 ml-1">wings</span>
              </span>
            </Link>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">
                  1
                </div>
                <span className="text-sm text-gray-900">Passenger Info</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">
                  2
                </div>
                <span className="text-sm text-gray-900">Seat Selection</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">
                  3
                </div>
                <span className="text-sm text-gray-900">Add-ons</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs">
                  4
                </div>
                <span className="text-sm text-gray-900">Payment</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Lock className="w-3 h-3 text-green-500" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Payment Form */}
          <div className="flex-1">
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h1 className="text-xl font-light mb-6">Complete Your Payment</h1>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-3">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border rounded-md transition-all ${
                          paymentMethod === method.id
                            ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 mb-2 ${
                            paymentMethod === method.id
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        />
                        <p className="text-sm font-medium">{method.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {method.description}
                        </p>

                        {/* Card Logos */}
                        <div className="flex items-center space-x-1 mt-2">
                          {method.logos.map((logo, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-4 bg-gray-200 rounded text-[8px] flex items-center justify-center text-gray-500"
                            >
                              {logo.slice(0, 3)}
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Form Based on Method */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-medium mb-3">Card Details</h2>

                  {/* Card Number */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={cardDetails.cardNumber}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors.cardNumber
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                        <div className="w-6 h-4 bg-blue-600 rounded text-[8px] flex items-center justify-center text-white">
                          VISA
                        </div>
                        <div className="w-6 h-4 bg-red-500 rounded text-[8px] flex items-center justify-center text-white">
                          MC
                        </div>
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  {/* Name on Card */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cardName}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                      className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                        errors.cardName
                          ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                      }`}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cardName}
                      </p>
                    )}
                  </div>

                  {/* Expiry and CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: formatExpiry(e.target.value),
                          })
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors.expiry
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      />
                      {errors.expiry && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.expiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        CVV
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cvv: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                            errors.cvv
                              ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                              : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                          }`}
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Info className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      {errors.cvv && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Save Card Option */}
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                    />
                    <span className="text-sm text-gray-600">
                      Save card for future bookings
                    </span>
                  </label>
                </div>
              )}

              {paymentMethod === "mobile" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-medium mb-3">Mobile Banking</h2>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Select Provider
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["stcpay", "applepay", "googlepay"].map((provider) => (
                        <button
                          key={provider}
                          onClick={() =>
                            setMobileBanking({ ...mobileBanking, provider })
                          }
                          className={`p-3 border rounded-md text-center transition-colors ${
                            mobileBanking.provider === provider
                              ? "border-gray-900 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Smartphone className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs font-medium capitalize">
                            {provider}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={mobileBanking.phoneNumber}
                        onChange={(e) =>
                          setMobileBanking({
                            ...mobileBanking,
                            phoneNumber: e.target.value,
                          })
                        }
                        placeholder="5xxxxxxxx"
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md">
                    <div className="flex items-start space-x-2">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          QR Code Payment
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          Scan the QR code with your mobile banking app to
                          complete payment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <Wallet className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">PayPal</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    You'll be redirected to PayPal to complete your payment
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700">
                    Continue with PayPal
                  </button>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-medium mb-3">Bank Transfer</h2>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm font-medium mb-2">Bank Details</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bank</span>
                        <span className="font-medium">First National Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account Name</span>
                        <span className="font-medium">AETHERWings Ltd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account Number</span>
                        <span className="font-medium">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Routing Number</span>
                        <span className="font-medium">021000021</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">SWIFT Code</span>
                        <span className="font-medium">FNBBUS33</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-md">
                    <p className="text-xs text-yellow-700">
                      Please use your booking reference as payment reference.
                      Payment must be completed within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Billing Address */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h2 className="text-sm font-medium mb-3">Billing Address</h2>

                <label className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                  />
                  <span className="text-sm text-gray-600">
                    Same as passenger address
                  </span>
                </label>

                {!sameAsBilling && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        value={billingAddress.addressLine1}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            addressLine1: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        value={billingAddress.addressLine2}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            addressLine2: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={billingAddress.city}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          State
                        </label>
                        <input
                          type="text"
                          value={billingAddress.state}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              state: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={billingAddress.zipCode}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Country
                        </label>
                        <select
                          value={billingAddress.country}
                          onChange={(e) =>
                            setBillingAddress({
                              ...billingAddress,
                              country: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        >
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Australia</option>
                          <option>UAE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                  />
                  <span className="text-sm text-gray-600">
                    I confirm that I have read and agree to the{" "}
                    <button className="text-gray-900 underline">
                      Terms and Conditions
                    </button>{" "}
                    and{" "}
                    <button className="text-gray-900 underline">
                      Privacy Policy
                    </button>
                    . I understand that this booking is subject to the fare
                    rules and cancellation policy.
                  </span>
                </label>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Lock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-500">
                      All transactions are encrypted and secure
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSecurityModal(true)}
                  className="text-xs text-gray-500 hover:text-gray-900 underline"
                >
                  Learn more
                </button>
              </div>

              {/* Security Badges */}
              <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-600">PCI Compliant</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center space-x-1">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-600">256-bit SSL</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-gray-600">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-md border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Order Summary</h2>

                  {/* Currency Selector */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowCurrencySelector(!showCurrencySelector)
                      }
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>{selectedCurrency}</span>
                      <ChevronRight className="w-3 h-3 rotate-90" />
                    </button>

                    {showCurrencySelector && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            onClick={() => {
                              setSelectedCurrency(currency.code);
                              setShowCurrencySelector(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span>{currency.code}</span>
                            <span className="text-gray-400">
                              {currency.symbol}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {/* Flight Summary */}
                <div className="bg-gray-50 rounded-md p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">JFK → DXB</span>
                    </div>
                    <span className="text-xs text-gray-500">12h 15m</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Emirates · EK 202</span>
                    <span className="text-gray-500">Mar 15, 22:30</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Base fare (3 passengers)
                    </span>
                    <span className="font-medium">
                      {getCurrencySymbol()}
                      {convertPrice(priceBreakdown.baseFare)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Seat selection</span>
                    <span className="font-medium">
                      {getCurrencySymbol()}
                      {convertPrice(priceBreakdown.seatSelection)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Add-ons</span>
                    <span className="font-medium">
                      {getCurrencySymbol()}
                      {convertPrice(priceBreakdown.addOns)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes & fees</span>
                    <span className="font-medium">
                      {getCurrencySymbol()}
                      {convertPrice(priceBreakdown.taxes + priceBreakdown.fees)}
                    </span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Promo discount</span>
                      <span>
                        -{getCurrencySymbol()}
                        {convertPrice(promoDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-100 my-2 pt-2">
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>
                        {getCurrencySymbol()}
                        {convertPrice(priceBreakdown.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                {!promoApplied ? (
                  <div className="mb-4">
                    {showPromoInput ? (
                      <div className="space-y-2">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Enter promo code"
                            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                          />
                          <button
                            onClick={handlePromoApply}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
                          >
                            Apply
                          </button>
                        </div>
                        <button
                          onClick={() => setShowPromoInput(false)}
                          className="text-xs text-gray-500 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPromoInput(true)}
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                      >
                        <Gift className="w-4 h-4" />
                        <span>Have a promo code?</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-md p-3 mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        Promo applied: ${promoDiscount} off
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setPromoApplied(false);
                        setPromoDiscount(0);
                      }}
                      className="text-xs text-green-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        Pay {getCurrencySymbol()}
                        {convertPrice(priceBreakdown.total)}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  By completing this purchase, you agree to our terms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-medium">Security & Privacy</h3>
              <button onClick={() => setShowSecurityModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">
                    256-bit SSL Encryption
                  </p>
                  <p className="text-xs text-gray-500">
                    Your data is encrypted using the highest level of security
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">PCI DSS Compliant</p>
                  <p className="text-xs text-gray-500">
                    We adhere to strict payment card industry standards
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Verified & Secure</p>
                  <p className="text-xs text-gray-500">
                    Our payment gateway is regularly audited for security
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-md p-3 mt-4">
                <p className="text-xs text-gray-600">
                  We never store your full card details. All payment information
                  is processed securely by our payment partners.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => setShowSecurityModal(false)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
