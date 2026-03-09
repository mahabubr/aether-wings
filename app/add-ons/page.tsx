// app/checkout/add-ons/page.tsx
"use client";

import { useState } from "react";
import {
  Plane,
  Luggage,
  Shield,
  Zap,
  Coffee,
  Clock,
  Leaf,
  Wifi,
  Briefcase,
  Users,
  ChevronRight,
  Check,
  Info,
  AlertCircle,
  Star,
  Heart,
  Gift,
  Award,
  CreditCard,
  Percent,
  Timer,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  Wine,
  Sofa,
  Bath,
  Scissors,
  Dumbbell,
  Headphones,
  Smartphone,
  ArrowRight,
  ChevronLeft,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AddOnsPage() {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, any>>({});
  const [activeCategory, setActiveCategory] = useState("baggage");
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(
    null,
  );
  const [carbonOffset, setCarbonOffset] = useState(false);
  const [mealSelections, setMealSelections] = useState<Record<string, string>>(
    {},
  );

  // Passenger data
  const passengers = [
    { id: 1, name: "John Doe", type: "adult" },
    { id: 2, name: "Jane Doe", type: "adult" },
    { id: 3, name: "Master Doe", type: "child" },
  ];

  // Extra baggage options
  const baggageOptions = [
    {
      id: "extra-bag-1",
      name: "Extra Checked Bag",
      weight: "23kg",
      price: 45,
      description: "Add one additional checked bag",
      perPerson: true,
      maxPerPerson: 2,
      icon: Luggage,
      color: "blue",
    },
    {
      id: "extra-bag-2",
      name: "Extra Heavy Bag",
      weight: "32kg",
      price: 75,
      description: "Add one additional heavy bag",
      perPerson: true,
      maxPerPerson: 1,
      icon: Luggage,
      color: "purple",
    },
    {
      id: "extra-bag-3",
      name: "Sports Equipment",
      weight: "Up to 23kg",
      price: 60,
      description: "For golf, ski, or surf equipment",
      perPerson: true,
      maxPerPerson: 1,
      icon: Briefcase,
      color: "green",
    },
    {
      id: "extra-bag-4",
      name: "Excess Weight",
      weight: "Per 5kg over limit",
      price: 30,
      description: "Pay for excess weight per 5kg",
      perPerson: true,
      maxPerPerson: 3,
      icon: Luggage,
      color: "orange",
    },
  ];

  // Insurance options
  const insuranceOptions = [
    {
      id: "insurance-basic",
      name: "Basic Protection",
      price: 29,
      perPerson: true,
      coverage: [
        "Trip cancellation up to $1,000",
        "Medical expenses up to $50,000",
        "Baggage delay up to $200",
        "24/7 emergency assistance",
      ],
      excluded: [
        "Pre-existing conditions",
        "Adventure sports",
        "Trip interruption",
      ],
      popular: false,
      icon: Shield,
      color: "gray",
    },
    {
      id: "insurance-premium",
      name: "Premium Protection",
      price: 59,
      perPerson: true,
      coverage: [
        "Trip cancellation up to $5,000",
        "Medical expenses up to $250,000",
        "Baggage loss up to $2,000",
        "Trip interruption up to $3,000",
        "Flight delay coverage",
        "Emergency evacuation",
        "24/7 concierge service",
      ],
      excluded: ["Pre-existing conditions (waiver available)"],
      popular: true,
      icon: Shield,
      color: "blue",
    },
    {
      id: "insurance-comprehensive",
      name: "Comprehensive Plus",
      price: 99,
      perPerson: true,
      coverage: [
        "Trip cancellation up to $10,000",
        "Medical expenses up to $500,000",
        "Baggage loss up to $3,000",
        "Trip interruption up to $5,000",
        "Flight delay coverage",
        "Emergency evacuation",
        "Cancel for any reason (75%)",
        "Pre-existing conditions covered",
        "Adventure sports included",
        "Business equipment coverage",
      ],
      excluded: [],
      popular: false,
      icon: Shield,
      color: "gold",
    },
  ];

  // Priority boarding options
  const priorityOptions = [
    {
      id: "priority-boarding",
      name: "Priority Boarding",
      price: 19,
      perPerson: true,
      description: "Board early and store your luggage first",
      benefits: [
        "Early boarding",
        "Guaranteed overhead bin space",
        "Priority document check",
      ],
      icon: Zap,
      color: "yellow",
    },
    {
      id: "fast-track",
      name: "Fast Track Security",
      price: 25,
      perPerson: true,
      description: "Skip the lines at security checkpoints",
      benefits: [
        "Dedicated security lane",
        "Faster clearance",
        "Available at 50+ airports",
      ],
      icon: Timer,
      color: "green",
    },
    {
      id: "priority-combo",
      name: "Priority Bundle",
      price: 39,
      perPerson: true,
      description: "Complete priority experience",
      benefits: [
        "Priority boarding",
        "Fast track security",
        "Priority check-in",
        "Priority baggage handling",
      ],
      popular: true,
      icon: Star,
      color: "purple",
    },
  ];

  // Lounge access options
  const loungeOptions = [
    {
      id: "lounge-single",
      name: "Single Lounge Pass",
      price: 49,
      perPerson: true,
      description: "One-time access to participating lounges",
      features: [
        "Comfortable seating",
        "Complimentary snacks & drinks",
        "High-speed WiFi",
        "Charging stations",
        "Quiet area",
      ],
      locations: ["JFK Terminal 4", "DXB Terminal 3", "LHR Terminal 5"],
      icon: Coffee,
      color: "blue",
    },
    {
      id: "lounge-multi",
      name: "Multi-Lounge Pass",
      price: 89,
      perPerson: true,
      description: "Access lounges at departure and connection",
      features: [
        "All single pass features",
        "Access at multiple airports",
        "Shower facilities",
        "Business center",
        "Premium food & beverages",
      ],
      locations: ["50+ lounges worldwide"],
      popular: true,
      icon: Coffee,
      color: "amber",
    },
    {
      id: "lounge-premium",
      name: "Premium Lounge Experience",
      price: 129,
      perPerson: true,
      description: "First class lounge access with spa",
      features: [
        "All multi-pass features",
        "Spa & massage services",
        "Private rest suites",
        "A la carte dining",
        "Premium bar",
        "Concierge service",
      ],
      locations: ["Emirates Lounge", "First Class Lounges"],
      icon: Sparkles,
      color: "gold",
    },
  ];

  // Meal options
  const mealOptions = [
    {
      id: "meal-standard",
      name: "Standard Meal",
      price: 0,
      perPerson: true,
      description: "Complimentary meal service",
      options: [
        "Chicken or Pasta choice",
        "Fresh salad",
        "Dessert",
        "Beverages",
      ],
      icon: UtensilsCrossed,
      color: "gray",
    },
    {
      id: "meal-premium",
      name: "Premium Dining",
      price: 29,
      perPerson: true,
      description: "Gourmet meal experience",
      options: [
        "Chef-selected menu",
        "Wine pairing",
        "Premium ingredients",
        "Multi-course service",
      ],
      icon: Wine,
      color: "purple",
    },
    {
      id: "meal-special",
      name: "Special Dietary",
      price: 0,
      perPerson: true,
      description: "Meals for dietary requirements",
      options: [
        "Vegetarian/Vegan",
        "Halal/Kosher",
        "Gluten-free",
        "Diabetic",
        "Child meal",
      ],
      icon: Heart,
      color: "green",
    },
  ];

  // Carbon offset options
  const carbonOptions = {
    id: "carbon-offset",
    name: "Carbon Offset",
    price: 12.5,
    perPerson: false,
    description: "Offset your flight emissions",
    details: [
      "Invest in renewable energy projects",
      "Support forest conservation",
      "Verified carbon credits",
      "Certificate provided",
    ],
    emissionReduction: "2.5 tons CO₂",
    icon: Leaf,
    color: "green",
  };

  // Category tabs
  const categories = [
    { id: "baggage", label: "Extra Baggage", icon: Luggage, count: 4 },
    { id: "insurance", label: "Travel Insurance", icon: Shield, count: 3 },
    { id: "priority", label: "Priority Services", icon: Zap, count: 3 },
    { id: "lounge", label: "Lounge Access", icon: Coffee, count: 3 },
    { id: "meals", label: "In-flight Meals", icon: UtensilsCrossed, count: 3 },
    { id: "carbon", label: "Carbon Offset", icon: Leaf, count: 1 },
  ];

  const handleAddOnToggle = (addOn: any, passengerId?: number) => {
    const key = passengerId ? `${addOn.id}-${passengerId}` : addOn.id;

    setSelectedAddOns((prev) => {
      const newState = { ...prev };
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = {
          ...addOn,
          passengerId,
          quantity: 1,
        };
      }
      return newState;
    });
  };

  const handleMealSelect = (passengerId: number, mealId: string) => {
    setMealSelections((prev) => ({
      ...prev,
      [passengerId]: mealId,
    }));
  };

  const calculateTotal = () => {
    let total = 0;

    // Add up all selected add-ons
    Object.values(selectedAddOns).forEach((addOn: any) => {
      total += addOn.price;
    });

    // Add carbon offset if selected
    if (carbonOffset) {
      total += carbonOptions.price;
    }

    return total;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return null;
    const Icon = category.icon;
    return <Icon className="w-5 h-5" />;
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
                <div className="w-6 h-6 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-xs">
                  4
                </div>
                <span className="text-sm text-gray-400">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="bg-white rounded-md border border-gray-200 p-1 mb-4 overflow-x-auto">
              <div className="flex space-x-1 min-w-max">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full ${
                          activeCategory === category.id
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Baggage Section */}
            {activeCategory === "baggage" && (
              <div className="space-y-4">
                <div className="bg-white rounded-md border border-gray-200 p-4">
                  <h2 className="text-lg font-medium mb-1">Extra Baggage</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Add additional baggage allowance for your journey
                  </p>

                  <div className="space-y-4">
                    {baggageOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = passengers.some(
                        (p) => selectedAddOns[`${option.id}-${p.id}`],
                      );

                      return (
                        <div
                          key={option.id}
                          className="border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`p-2 bg-${option.color}-50 rounded-md`}
                              >
                                <Icon
                                  className={`w-5 h-5 text-${option.color}-600`}
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {option.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Weight: {option.weight}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-light">
                                ${option.price}
                              </p>
                              <p className="text-xs text-gray-400">
                                per person
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              Select passengers:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {passengers.map((passenger) => {
                                const isSelectedForPassenger =
                                  selectedAddOns[
                                    `${option.id}-${passenger.id}`
                                  ];
                                return (
                                  <button
                                    key={passenger.id}
                                    onClick={() =>
                                      handleAddOnToggle(option, passenger.id)
                                    }
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                      isSelectedForPassenger
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                  >
                                    {passenger.name.split(" ")[0]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Insurance Section */}
            {activeCategory === "insurance" && (
              <div className="space-y-4">
                <div className="bg-white rounded-md border border-gray-200 p-4">
                  <h2 className="text-lg font-medium mb-1">Travel Insurance</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Protect your trip against unexpected events
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {insuranceOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = passengers.some(
                        (p) => selectedAddOns[`${option.id}-${p.id}`],
                      );
                      const colorClasses = {
                        gray: "bg-gray-50 border-gray-200",
                        blue: "bg-blue-50 border-blue-200",
                        gold: "bg-amber-50 border-amber-200",
                      };

                      return (
                        <div
                          key={option.id}
                          className={`border rounded-md p-4 cursor-pointer transition-all relative ${
                            isSelected
                              ? "border-gray-900 ring-1 ring-gray-900"
                              : "border-gray-200 hover:border-gray-300"
                          } ${colorClasses[option.color as keyof typeof colorClasses]}`}
                          onClick={() =>
                            passengers.forEach((p) =>
                              handleAddOnToggle(option, p.id),
                            )
                          }
                        >
                          {option.popular && (
                            <span className="absolute -top-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}

                          <div className="flex items-start justify-between mb-3">
                            <Icon
                              className={`w-5 h-5 text-${option.color}-600`}
                            />
                            <span className="text-lg font-light">
                              ${option.price}
                            </span>
                          </div>

                          <h3 className="font-medium mb-2">{option.name}</h3>

                          <div className="space-y-2 mb-3">
                            {option.coverage.slice(0, 3).map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-600">
                                  {item}
                                </span>
                              </div>
                            ))}
                            {option.coverage.length > 3 && (
                              <p className="text-xs text-gray-400">
                                +{option.coverage.length - 3} more benefits
                              </p>
                            )}
                          </div>

                          <button
                            className="text-xs text-gray-500 hover:text-gray-900 underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInsurance(option.id);
                              setShowInsuranceModal(true);
                            }}
                          >
                            View full details
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 bg-blue-50 rounded-md p-3">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        Insurance must be purchased for all passengers in the
                        same booking. Coverage is valid for the entire trip
                        duration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Priority Services Section */}
            {activeCategory === "priority" && (
              <div className="space-y-4">
                <div className="bg-white rounded-md border border-gray-200 p-4">
                  <h2 className="text-lg font-medium mb-1">
                    Priority Services
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Skip the lines and enjoy priority treatment
                  </p>

                  <div className="space-y-4">
                    {priorityOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = passengers.some(
                        (p) => selectedAddOns[`${option.id}-${p.id}`],
                      );

                      return (
                        <div
                          key={option.id}
                          className="border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors relative"
                        >
                          {option.popular && (
                            <span className="absolute -top-2 right-4 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                              Best Value
                            </span>
                          )}

                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`p-2 bg-${option.color}-50 rounded-md`}
                              >
                                <Icon
                                  className={`w-5 h-5 text-${option.color}-600`}
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{option.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {option.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {option.benefits.map((benefit, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                                    >
                                      {benefit}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-light">
                                ${option.price}
                              </p>
                              <p className="text-xs text-gray-400">
                                per person
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              Select passengers:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {passengers.map((passenger) => {
                                const isSelectedForPassenger =
                                  selectedAddOns[
                                    `${option.id}-${passenger.id}`
                                  ];
                                return (
                                  <button
                                    key={passenger.id}
                                    onClick={() =>
                                      handleAddOnToggle(option, passenger.id)
                                    }
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                      isSelectedForPassenger
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                  >
                                    {passenger.name.split(" ")[0]}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Lounge Access Section */}
            {activeCategory === "lounge" && (
              <div className="space-y-4">
                <div className="bg-white rounded-md border border-gray-200 p-4">
                  <h2 className="text-lg font-medium mb-1">
                    Airport Lounge Access
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Relax in comfort before your flight
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {loungeOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = passengers.some(
                        (p) => selectedAddOns[`${option.id}-${p.id}`],
                      );
                      const colorClasses = {
                        blue: "bg-blue-50 border-blue-200",
                        amber: "bg-amber-50 border-amber-200",
                        gold: "bg-yellow-50 border-yellow-200",
                      };

                      return (
                        <div
                          key={option.id}
                          className={`border rounded-md p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "border-gray-900 ring-1 ring-gray-900"
                              : "border-gray-200 hover:border-gray-300"
                          } ${colorClasses[option.color as keyof typeof colorClasses]}`}
                          onClick={() =>
                            passengers.forEach((p) =>
                              handleAddOnToggle(option, p.id),
                            )
                          }
                        >
                          {option.popular && (
                            <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full mb-2 inline-block">
                              Most Popular
                            </span>
                          )}

                          <div className="flex items-start justify-between mb-2">
                            <Icon
                              className={`w-5 h-5 text-${option.color}-600`}
                            />
                            <span className="text-lg font-light">
                              ${option.price}
                            </span>
                          </div>

                          <h3 className="font-medium mb-1">{option.name}</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            {option.description}
                          </p>

                          <div className="space-y-1 mb-2">
                            {option.features.slice(0, 3).map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-1"
                              >
                                <Check className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-gray-600">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-gray-400 mt-2">
                            Available at: {option.locations.join(", ")}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Meals Section */}
            {activeCategory === "meals" && (
              <div className="space-y-4">
                <div className="bg-white rounded-md border border-gray-200 p-4">
                  <h2 className="text-lg font-medium mb-1">In-flight Meals</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Pre-select your meal preferences
                  </p>

                  <div className="space-y-6">
                    {passengers.map((passenger) => (
                      <div
                        key={passenger.id}
                        className="border border-gray-200 rounded-md p-4"
                      >
                        <h3 className="font-medium mb-3">{passenger.name}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {mealOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected =
                              mealSelections[passenger.id] === option.id;

                            return (
                              <div
                                key={`${passenger.id}-${option.id}`}
                                onClick={() =>
                                  handleMealSelect(passenger.id, option.id)
                                }
                                className={`border rounded-md p-3 cursor-pointer transition-all ${
                                  isSelected
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <Icon
                                    className={`w-4 h-4 text-${option.color}-600`}
                                  />
                                  {option.price > 0 && (
                                    <span className="text-sm font-medium">
                                      +${option.price}
                                    </span>
                                  )}
                                  {option.price === 0 && (
                                    <span className="text-xs text-green-600">
                                      Complimentary
                                    </span>
                                  )}
                                </div>
                                <h4 className="text-sm font-medium mb-1">
                                  {option.name}
                                </h4>
                                <p className="text-xs text-gray-500 mb-2">
                                  {option.description}
                                </p>
                                <div className="space-y-1">
                                  {option.options
                                    .slice(0, 2)
                                    .map((item, idx) => (
                                      <p
                                        key={idx}
                                        className="text-xs text-gray-400"
                                      >
                                        • {item}
                                      </p>
                                    ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Carbon Offset Section */}
            {activeCategory === "carbon" && (
              <div className="space-y-4">
                <div className="bg-white rounded-md border border-gray-200 p-4">
                  <h2 className="text-lg font-medium mb-1">Carbon Offset</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Make your flight carbon neutral
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-md p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-green-100 rounded-full">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">
                            {carbonOptions.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {carbonOptions.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500">
                                Emission reduction
                              </p>
                              <p className="font-medium">
                                {carbonOptions.emissionReduction}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Price</p>
                              <p className="text-xl font-light">
                                ${carbonOptions.price}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {carbonOptions.details.map((detail, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCarbonOffset(!carbonOffset)}
                        className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                          carbonOffset
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {carbonOffset ? "Selected" : "Add to booking"}
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-green-200">
                      <p className="text-xs text-gray-500">
                        By selecting carbon offset, you're investing in verified
                        climate projects that reduce CO₂ emissions. You'll
                        receive a certificate with details of your contribution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-md border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium">Your Extras</h2>
              </div>

              <div className="p-4">
                {/* Selected Add-ons List */}
                {Object.keys(selectedAddOns).length === 0 && !carbonOffset && (
                  <div className="text-center py-6">
                    <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-400">
                      No extras selected yet
                    </p>
                  </div>
                )}

                {(Object.keys(selectedAddOns).length > 0 || carbonOffset) && (
                  <div className="space-y-3 mb-4">
                    {Object.entries(selectedAddOns).map(
                      ([key, addOn]: [string, any]) => (
                        <div
                          key={key}
                          className="flex items-start justify-between text-sm"
                        >
                          <div>
                            <p className="font-medium">{addOn.name}</p>
                            {addOn.passengerId && (
                              <p className="text-xs text-gray-400">
                                Passenger:{" "}
                                {
                                  passengers.find(
                                    (p) => p.id === addOn.passengerId,
                                  )?.name
                                }
                              </p>
                            )}
                          </div>
                          <span className="font-medium">${addOn.price}</span>
                        </div>
                      ),
                    )}

                    {carbonOffset && (
                      <div className="flex items-start justify-between text-sm">
                        <div>
                          <p className="font-medium">Carbon Offset</p>
                          <p className="text-xs text-gray-400">
                            For your flight
                          </p>
                        </div>
                        <span className="font-medium">
                          ${carbonOptions.price}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-gray-100 my-2 pt-2">
                      <div className="flex justify-between text-base font-medium">
                        <span>Extras Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Flight Summary */}
                <div className="bg-gray-50 rounded-md p-3 mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    FLIGHT SUMMARY
                  </p>
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
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Base fare (3 pax)</span>
                      <span className="font-medium">$2,697</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Seats</span>
                      <span className="font-medium">$98</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1 font-medium">
                      <span>Total including extras</span>
                      <span>${2697 + 98 + calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <Link
                  href="/checkout/payment"
                  className="block w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors text-center"
                >
                  Continue to Payment
                </Link>

                <p className="text-xs text-gray-400 text-center mt-3">
                  You can modify extras before payment
                </p>
              </div>

              {/* Trust Badges */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-500">
                      Secure checkout
                    </span>
                  </div>
                  <div className="w-px h-3 bg-gray-200"></div>
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-500">
                      Price guarantee
                    </span>
                  </div>
                  <div className="w-px h-3 bg-gray-200"></div>
                  <div className="flex items-center space-x-1">
                    <Headphones className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-gray-500">24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Details Modal */}
      {showInsuranceModal && selectedInsurance && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-medium">Insurance Details</h2>
              <button onClick={() => setShowInsuranceModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {insuranceOptions.find((opt) => opt.id === selectedInsurance) && (
                <div>
                  <h3 className="text-xl font-light mb-4">
                    {
                      insuranceOptions.find(
                        (opt) => opt.id === selectedInsurance,
                      )?.name
                    }
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Coverage Details</h4>
                      <ul className="space-y-2">
                        {insuranceOptions
                          .find((opt) => opt.id === selectedInsurance)
                          ?.coverage.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start space-x-2"
                            >
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">
                                {item}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    {insuranceOptions.find(
                      (opt) => opt.id === selectedInsurance,
                    )?.excluded.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Exclusions</h4>
                        <ul className="space-y-2">
                          {insuranceOptions
                            .find((opt) => opt.id === selectedInsurance)
                            ?.excluded.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">
                                  {item}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-md p-4">
                      <h4 className="font-medium mb-2">
                        Important Information
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                          • Coverage is valid for the entire trip duration
                        </li>
                        <li>• Must be purchased before departure</li>
                        <li>
                          • Pre-existing conditions may require medical
                          screening
                        </li>
                        <li>• 14-day cooling-off period applies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowInsuranceModal(false)}
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
