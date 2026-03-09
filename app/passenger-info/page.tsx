// app/checkout/passenger-info/page.tsx
"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  MapPin,
  CreditCard,
  Award,
  UtensilsCrossed,
  Armchair,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  Save,
  Users,
  Baby,
  Heart,
  HelpCircle,
  X,
  Shield,
  Plane,
  ShipWheel,
  BookA,
} from "lucide-react";
import Link from "next/link";

export default function PassengerInfoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [passengerCount, setPassengerCount] = useState(1);
  const [activePassenger, setActivePassenger] = useState(1);
  const [saveForLater, setSaveForLater] = useState(false);
  const [sameAsLead, setSameAsLead] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    countryCode: "+1",
  });

  // Passenger data
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      type: "adult", // adult, child, infant
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      nationality: "",
      passportNumber: "",
      passportExpiry: "",
      passportCountry: "",
      frequentFlyerNumber: "",
      mealPreference: "",
      seatPreference: "",
      specialAssistance: [],
      specialAssistanceDetails: "",
      emergencyContact: {
        name: "",
        phone: "",
        relationship: "",
      },
    },
  ]);

  // Form errors
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {},
  );

  // Static data options
  const countries = [
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
    "Netherlands",
    "Switzerland",
    "Sweden",
    "Norway",
    "Denmark",
  ];

  const mealPreferences = [
    {
      value: "regular",
      label: "Regular Meal",
      description: "Standard meal service",
    },
    {
      value: "vegetarian",
      label: "Vegetarian",
      description: "Vegetarian meal option",
    },
    { value: "vegan", label: "Vegan", description: "Plant-based meal" },
    { value: "halal", label: "Halal", description: "Halal certified meal" },
    { value: "kosher", label: "Kosher", description: "Kosher meal" },
    {
      value: "gluten-free",
      label: "Gluten Free",
      description: "Gluten-free meal",
    },
    { value: "diabetic", label: "Diabetic", description: "Low sugar meal" },
    { value: "low-sodium", label: "Low Sodium", description: "Low salt meal" },
    { value: "child", label: "Child Meal", description: "Meal for children" },
    {
      value: "infant",
      label: "Infant Meal",
      description: "Baby food & formula",
    },
  ];

  const seatPreferences = [
    {
      value: "window",
      label: "Window Seat",
      description: "Seat by the window",
    },
    { value: "aisle", label: "Aisle Seat", description: "Seat next to aisle" },
    { value: "middle", label: "Middle Seat", description: "Seat between two" },
    {
      value: "extra-legroom",
      label: "Extra Legroom",
      description: "More legroom (fee applies)",
    },
    { value: "front", label: "Front Section", description: "Near the front" },
    {
      value: "exit-row",
      label: "Exit Row",
      description: "Extra space (restrictions apply)",
    },
  ];

  const specialAssistanceOptions = [
    { value: "wheelchair", label: "Wheelchair Assistance", icon: ShipWheel },
    {
      value: "visual-impairment",
      label: "Visual Impairment Assistance",
      icon: HelpCircle,
    },
    {
      value: "hearing-impairment",
      label: "Hearing Impairment Assistance",
      icon: HelpCircle,
    },
    { value: "unaccompanied-minor", label: "Unaccompanied Minor", icon: Baby },
    { value: "medical-conditions", label: "Medical Conditions", icon: Heart },
    { value: "pregnancy", label: "Pregnancy Assistance", icon: Heart },
    { value: "elderly", label: "Senior Assistance", icon: Heart },
    {
      value: "dietary",
      label: "Special Dietary Requirements",
      icon: UtensilsCrossed,
    },
  ];

  const passengerTypes = [
    { value: "adult", label: "Adult (12+ years)", icon: User },
    { value: "child", label: "Child (2-11 years)", icon: Baby },
    { value: "infant", label: "Infant (under 2 years)", icon: Baby },
  ];

  const addPassenger = () => {
    if (passengerCount < 9) {
      const newId = passengerCount + 1;
      setPassengers([
        ...passengers,
        {
          id: newId,
          type: "adult",
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          nationality: "",
          passportNumber: "",
          passportExpiry: "",
          passportCountry: "",
          frequentFlyerNumber: "",
          mealPreference: "",
          seatPreference: "",
          specialAssistance: [],
          specialAssistanceDetails: "",
          emergencyContact: {
            name: "",
            phone: "",
            relationship: "",
          },
        },
      ]);
      setPassengerCount(newId);
      setActivePassenger(newId);
    }
  };

  const removePassenger = (id: number) => {
    if (passengerCount > 1) {
      setPassengers(passengers.filter((p) => p.id !== id));
      setPassengerCount(passengerCount - 1);
      if (activePassenger === id) {
        setActivePassenger(1);
      }
    }
  };

  const updatePassenger = (id: number, field: string, value: any) => {
    setPassengers(
      passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
    // Clear error for this field
    if (errors[id]?.[field]) {
      setErrors({
        ...errors,
        [id]: { ...errors[id], [field]: "" },
      });
    }
  };

  const validatePassenger = (id: number) => {
    const passenger = passengers.find((p) => p.id === id);
    if (!passenger) return true;

    const passengerErrors: Record<string, string> = {};

    if (!passenger.firstName)
      passengerErrors.firstName = "First name is required";
    if (!passenger.lastName) passengerErrors.lastName = "Last name is required";
    if (!passenger.dob) passengerErrors.dob = "Date of birth is required";
    if (!passenger.gender) passengerErrors.gender = "Gender is required";
    if (!passenger.nationality)
      passengerErrors.nationality = "Nationality is required";

    // Passport required for international flights
    if (!passenger.passportNumber)
      passengerErrors.passportNumber = "Passport number is required";
    if (!passenger.passportExpiry)
      passengerErrors.passportExpiry = "Passport expiry is required";
    if (!passenger.passportCountry)
      passengerErrors.passportCountry = "Passport country is required";

    setErrors({
      ...errors,
      [id]: passengerErrors,
    });

    return Object.keys(passengerErrors).length === 0;
  };

  const validateContact = () => {
    const contactErrors: Record<string, string> = {};
    if (!contactInfo.email) contactErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(contactInfo.email))
      contactErrors.email = "Invalid email format";
    if (!contactInfo.phone) contactErrors.phone = "Phone number is required";
    return contactErrors;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      // Validate all passengers
      let allValid = true;
      passengers.forEach((p) => {
        if (!validatePassenger(p.id)) allValid = false;
      });

      if (allValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const contactErrors = validateContact();
      if (Object.keys(contactErrors).length === 0) {
        setCurrentStep(3);
      }
    } else {
      // Proceed to payment
      window.location.href = "/checkout/payment";
    }
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
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 1
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  1
                </div>
                <span
                  className={`text-sm ${currentStep >= 1 ? "text-gray-900" : "text-gray-400"}`}
                >
                  Passenger Info
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 2
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  2
                </div>
                <span
                  className={`text-sm ${currentStep >= 2 ? "text-gray-900" : "text-gray-400"}`}
                >
                  Contact Info
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep >= 3
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  3
                </div>
                <span
                  className={`text-sm ${currentStep >= 3 ? "text-gray-900" : "text-gray-400"}`}
                >
                  Extras
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="text-sm text-gray-500 hover:text-gray-900">
                Save & Exit
              </button>
              <span className="text-sm text-gray-300">|</span>
              <span className="text-sm font-medium">Flight: EK 202</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Passenger Tabs */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-light">Passenger Information</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {passengerCount} of 9 passengers
                  </span>
                  {passengerCount < 9 && (
                    <button
                      onClick={addPassenger}
                      className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Passenger</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Passenger Tabs */}
              <div className="flex space-x-1 border-b border-gray-100">
                {passengers.map((passenger) => (
                  <button
                    key={passenger.id}
                    onClick={() => setActivePassenger(passenger.id)}
                    className={`px-4 py-2 text-sm font-medium relative ${
                      activePassenger === passenger.id
                        ? "text-gray-900"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Passenger {passenger.id}
                    {passenger.id > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePassenger(passenger.id);
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    {activePassenger === passenger.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Passenger Form */}
              {passengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className={
                    activePassenger === passenger.id ? "block mt-6" : "hidden"
                  }
                >
                  {/* Passenger Type */}
                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Passenger Type
                    </label>
                    <div className="flex space-x-3">
                      {passengerTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            onClick={() =>
                              updatePassenger(passenger.id, "type", type.value)
                            }
                            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 border rounded-md transition-colors ${
                              passenger.type === type.value
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <Icon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        First Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "firstName",
                              e.target.value,
                            )
                          }
                          placeholder="As on passport"
                          className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                            errors[passenger.id]?.firstName
                              ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                              : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                          }`}
                        />
                      </div>
                      {errors[passenger.id]?.firstName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Last Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={passenger.lastName}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            "lastName",
                            e.target.value,
                          )
                        }
                        placeholder="As on passport"
                        className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors[passenger.id]?.lastName
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      />
                      {errors[passenger.id]?.lastName && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].lastName}
                        </p>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Date of Birth <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={passenger.dob}
                          onChange={(e) =>
                            updatePassenger(passenger.id, "dob", e.target.value)
                          }
                          className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                            errors[passenger.id]?.dob
                              ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                              : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                          }`}
                        />
                      </div>
                      {errors[passenger.id]?.dob && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].dob}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Gender <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            "gender",
                            e.target.value,
                          )
                        }
                        className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors[passenger.id]?.gender
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors[passenger.id]?.gender && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].gender}
                        </p>
                      )}
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Nationality <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          value={passenger.nationality}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "nationality",
                              e.target.value,
                            )
                          }
                          className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                            errors[passenger.id]?.nationality
                              ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                              : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                          }`}
                        >
                          <option value="">Select nationality</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors[passenger.id]?.nationality && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].nationality}
                        </p>
                      )}
                    </div>

                    {/* Passport Number */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Passport Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <BookA className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={passenger.passportNumber}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "passportNumber",
                              e.target.value.toUpperCase(),
                            )
                          }
                          placeholder="Enter passport number"
                          className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                            errors[passenger.id]?.passportNumber
                              ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                              : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                          }`}
                        />
                      </div>
                      {errors[passenger.id]?.passportNumber && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].passportNumber}
                        </p>
                      )}
                    </div>

                    {/* Passport Expiry */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Passport Expiry <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        value={passenger.passportExpiry}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            "passportExpiry",
                            e.target.value,
                          )
                        }
                        className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors[passenger.id]?.passportExpiry
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      />
                      {errors[passenger.id]?.passportExpiry && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].passportExpiry}
                        </p>
                      )}
                    </div>

                    {/* Passport Country */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Passport Country <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={passenger.passportCountry}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            "passportCountry",
                            e.target.value,
                          )
                        }
                        className={`w-full px-3 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors[passenger.id]?.passportCountry
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:border-gray-400 focus:ring-gray-200"
                        }`}
                      >
                        <option value="">Select country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors[passenger.id]?.passportCountry && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[passenger.id].passportCountry}
                        </p>
                      )}
                    </div>

                    {/* Frequent Flyer Number */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Frequent Flyer Number (Optional)
                      </label>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={passenger.frequentFlyerNumber}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "frequentFlyerNumber",
                              e.target.value,
                            )
                          }
                          placeholder="Enter FF number"
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Same as Lead Passenger for additional passengers */}
                  {passenger.id > 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sameAsLead}
                          onChange={(e) => setSameAsLead(e.target.checked)}
                          className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                        />
                        <span className="text-sm text-gray-600">
                          Same as lead passenger&lsquo;s details
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Step 2: Contact Information */}
            {currentStep >= 2 && (
              <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
                <h2 className="text-lg font-medium mb-4">
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="your@email.com"
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Booking confirmation and updates will be sent here
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex space-x-2">
                      <select
                        value={contactInfo.countryCode}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            countryCode: e.target.value,
                          })
                        }
                        className="w-24 px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                      >
                        <option value="+1">+1 (US)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+61">+61 (AU)</option>
                        <option value="+971">+971 (UAE)</option>
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Phone number"
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                        />
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      For urgent travel updates
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences & Extras */}
            {currentStep >= 3 && (
              <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
                <h2 className="text-lg font-medium mb-4">
                  Preferences & Special Requests
                </h2>

                {passengers.map((passenger) => (
                  <div key={passenger.id} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-medium mb-3">
                      Passenger {passenger.id}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Meal Preference */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <UtensilsCrossed className="w-4 h-4 inline mr-1 text-gray-400" />
                          Meal Preference
                        </label>
                        <select
                          value={passenger.mealPreference}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "mealPreference",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        >
                          <option value="">Standard meal</option>
                          {mealPreferences.map((meal) => (
                            <option key={meal.value} value={meal.value}>
                              {meal.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Seat Preference */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <Armchair className="w-4 h-4 inline mr-1 text-gray-400" />
                          Seat Preference
                        </label>
                        <select
                          value={passenger.seatPreference}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "seatPreference",
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        >
                          <option value="">No preference</option>
                          {seatPreferences.map((seat) => (
                            <option key={seat.value} value={seat.value}>
                              {seat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Special Assistance */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <ShipWheel className="w-4 h-4 inline mr-1 text-gray-400" />
                          Special Assistance
                        </label>
                        <div className="space-y-2">
                          {specialAssistanceOptions.map((option) => (
                            <label
                              key={option.value}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={passenger.specialAssistance?.includes(
                                  option.value,
                                )}
                                onChange={(e) => {
                                  const current =
                                    passenger.specialAssistance || [];
                                  const newAssistance = e.target.checked
                                    ? [...current, option.value]
                                    : current.filter((v) => v !== option.value);
                                  updatePassenger(
                                    passenger.id,
                                    "specialAssistance",
                                    newAssistance,
                                  );
                                }}
                                className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                              />
                              <span className="text-sm text-gray-600">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Assistance Details */}
                      {passenger.specialAssistance &&
                        passenger.specialAssistance.length > 0 && (
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                              Additional Details
                            </label>
                            <textarea
                              value={passenger.specialAssistanceDetails}
                              onChange={(e) =>
                                updatePassenger(
                                  passenger.id,
                                  "specialAssistanceDetails",
                                  e.target.value,
                                )
                              }
                              placeholder="Please provide any additional information about your assistance needs"
                              rows={3}
                              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                            />
                          </div>
                        )}
                    </div>

                    {/* Emergency Contact */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-3">
                        Emergency Contact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Full name"
                          value={passenger.emergencyContact?.name}
                          onChange={(e) =>
                            updatePassenger(passenger.id, "emergencyContact", {
                              ...passenger.emergencyContact,
                              name: e.target.value,
                            })
                          }
                          className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={passenger.emergencyContact?.phone}
                          onChange={(e) =>
                            updatePassenger(passenger.id, "emergencyContact", {
                              ...passenger.emergencyContact,
                              phone: e.target.value,
                            })
                          }
                          className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Relationship"
                          value={passenger.emergencyContact?.relationship}
                          onChange={(e) =>
                            updatePassenger(passenger.id, "emergencyContact", {
                              ...passenger.emergencyContact,
                              relationship: e.target.value,
                            })
                          }
                          className="px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <Link
                  href="/flights/details/1"
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Flight</span>
                </Link>
              )}

              <button
                onClick={handleContinue}
                className="flex items-center space-x-2 px-8 py-3 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800"
              >
                <span>
                  {currentStep === 3 ? "Continue to Payment" : "Continue"}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-md border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium">Your Trip</h2>
              </div>

              {/* Flight Summary */}
              <div className="p-4">
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

                {/* Price Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Base fare ({passengerCount} passenger
                      {passengerCount > 1 ? "s" : ""})
                    </span>
                    <span className="font-medium">${899 * passengerCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes & fees</span>
                    <span className="font-medium">${245 * passengerCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Carrier surcharges</span>
                    <span className="font-medium">${155 * passengerCount}</span>
                  </div>
                  <div className="border-t border-gray-100 my-2"></div>
                  <div className="flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span>${1299 * passengerCount}</span>
                  </div>
                </div>

                {/* Save for Later */}
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="saveForLater"
                    checked={saveForLater}
                    onChange={(e) => setSaveForLater(e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                  />
                  <label
                    htmlFor="saveForLater"
                    className="text-xs text-gray-600"
                  >
                    Save this information for future bookings
                  </label>
                </div>

                {/* Trust Badges */}
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Your information is encrypted and securely stored
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
