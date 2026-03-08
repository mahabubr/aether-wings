// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Users,
  Plane,
  ChevronDown,
  Search,
  TrendingUp,
  Clock,
  Globe,
  DollarSign,
  Sparkles,
  ArrowRightLeft,
  ChevronRight,
  Star,
  Shield,
  Headphones,
  Wallet,
  MapPin,
  Compass,
  Wind,
  Coffee,
  Wifi,
  Gift,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Heart,
  Share2,
  Info,
  Sun,
  Cloud,
  Clock3,
  Luggage,
  UtensilsCrossed,
  Film,
  BatteryCharging,
  Calendar,
  Users2,
  PlaneLanding,
  PlaneTakeoff,
} from "lucide-react";

export default function HomePage() {
  const [tripType, setTripType] = useState("round-trip");
  const [cabinClass, setCabinClass] = useState("business");
  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showPassengerMenu, setShowPassengerMenu] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("flights");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [passengers, setPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reliable image URLs from unsplash (guaranteed to work)
  const images = {
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    paris:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tokyo:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    dubai:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    sydney:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    london:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rome: "https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    newyork:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cabin:
      "https://images.unsplash.com/photo-1548579143-4880bc8a3e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    lounge:
      "https://images.unsplash.com/photo-1578895107035-3c81e58736c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    dining:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  const destinations = [
    {
      id: 1,
      city: "Paris",
      country: "France",
      code: "CDG",
      price: 449,
      image: images.paris,
      flights: 156,
      weather: "Mild",
      timezone: "CET",
    },
    {
      id: 2,
      city: "Tokyo",
      country: "Japan",
      code: "NRT",
      price: 799,
      image: images.tokyo,
      flights: 89,
      weather: "Moderate",
      timezone: "JST",
    },
    {
      id: 3,
      city: "Dubai",
      country: "UAE",
      code: "DXB",
      price: 699,
      image: images.dubai,
      flights: 234,
      weather: "Warm",
      timezone: "GST",
    },
    {
      id: 4,
      city: "Sydney",
      country: "Australia",
      code: "SYD",
      price: 899,
      image: images.sydney,
      flights: 67,
      weather: "Pleasant",
      timezone: "AEDT",
    },
    {
      id: 5,
      city: "London",
      country: "UK",
      code: "LHR",
      price: 549,
      image: images.london,
      flights: 312,
      weather: "Cool",
      timezone: "GMT",
    },
    {
      id: 6,
      city: "Rome",
      country: "Italy",
      code: "FCO",
      price: 399,
      image: images.rome,
      flights: 178,
      weather: "Mediterranean",
      timezone: "CET",
    },
  ];

  const popularRoutes = [
    {
      id: 1,
      from: "JFK",
      to: "LHR",
      fromCity: "New York",
      toCity: "London",
      price: 599,
      airline: "British Airways",
      duration: "7h 15m",
      stops: "Direct",
      image: images.london,
    },
    {
      id: 2,
      from: "LAX",
      to: "NRT",
      fromCity: "Los Angeles",
      toCity: "Tokyo",
      price: 849,
      airline: "ANA",
      duration: "11h 30m",
      stops: "Direct",
      image: images.tokyo,
    },
    {
      id: 3,
      from: "CDG",
      to: "FCO",
      fromCity: "Paris",
      toCity: "Rome",
      price: 129,
      airline: "Air France",
      duration: "2h 10m",
      stops: "Direct",
      image: images.rome,
    },
    {
      id: 4,
      from: "DXB",
      to: "SYD",
      fromCity: "Dubai",
      toCity: "Sydney",
      price: 1299,
      airline: "Emirates",
      duration: "13h 45m",
      stops: "Direct",
      image: images.sydney,
    },
    {
      id: 5,
      from: "SIN",
      to: "HKG",
      fromCity: "Singapore",
      toCity: "Hong Kong",
      price: 349,
      airline: "Cathay Pacific",
      duration: "3h 55m",
      stops: "Direct",
      image: images.dubai,
    },
    {
      id: 6,
      from: "FRA",
      to: "JFK",
      fromCity: "Frankfurt",
      toCity: "New York",
      price: 679,
      airline: "Lufthansa",
      duration: "8h 30m",
      stops: "Direct",
      image: images.newyork,
    },
  ];

  const flightDeals = [
    {
      id: 1,
      airline: "Emirates",
      from: "DXB",
      to: "JFK",
      price: 1299,
      discount: 20,
      image: images.cabin,
      amenities: ["Wi-Fi", "Meals", "Entertainment"],
    },
    {
      id: 2,
      airline: "Singapore Airlines",
      from: "SIN",
      to: "LHR",
      price: 1499,
      discount: 15,
      image: images.lounge,
      amenities: ["Wi-Fi", "Meals", "Entertainment"],
    },
    {
      id: 3,
      airline: "Qatar Airways",
      from: "DOH",
      to: "SYD",
      price: 1899,
      discount: 25,
      image: images.dining,
      amenities: ["Wi-Fi", "Meals", "Entertainment"],
    },
  ];

  const recentSearches = [
    {
      id: 1,
      from: "JFK",
      to: "LAX",
      fromCity: "New York",
      toCity: "Los Angeles",
      date: "Mar 15 - Mar 22",
      passengers: "2 Adults",
      class: "Business",
    },
    {
      id: 2,
      from: "LHR",
      to: "CDG",
      fromCity: "London",
      toCity: "Paris",
      date: "Apr 10 - Apr 17",
      passengers: "1 Adult",
      class: "First",
    },
    {
      id: 3,
      from: "DXB",
      to: "SYD",
      fromCity: "Dubai",
      toCity: "Sydney",
      date: "May 5 - May 19",
      passengers: "2 Adults, 1 Child",
      class: "Business",
    },
  ];

  const featuredFlights = [
    {
      id: 1,
      airline: "Emirates",
      flightNo: "EK 202",
      from: "DXB",
      to: "JFK",
      departure: "08:30",
      arrival: "14:45",
      duration: "14h 15m",
      price: 1299,
      aircraft: "Airbus A380",
      seats: "12 available",
      amenities: [
        "Lie-flat Seats",
        "Gourmet Dining",
        "Private Suite",
        "Shower Spa",
      ],
      image: images.cabin,
    },
    {
      id: 2,
      airline: "Singapore Airlines",
      flightNo: "SQ 306",
      from: "SIN",
      to: "LHR",
      departure: "23:55",
      arrival: "05:40",
      duration: "13h 45m",
      price: 1499,
      aircraft: "Boeing 777-300ER",
      seats: "8 available",
      amenities: [
        "Double Bed",
        "Givenchy Amenities",
        "Salon Services",
        "Book the Cook",
      ],
      image: images.lounge,
    },
    {
      id: 3,
      airline: "Qatar Airways",
      flightNo: "QR 908",
      from: "DOH",
      to: "SYD",
      departure: "20:15",
      arrival: "17:30",
      duration: "14h 15m",
      price: 1899,
      aircraft: "Airbus A350-1000",
      seats: "6 available",
      amenities: [
        "Qsuite",
        "Private Suite",
        "Dining on Demand",
        "Lounge Access",
      ],
      image: images.dining,
    },
  ];

  const totalPassengers =
    passengers.adult + passengers.child + passengers.infant;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Plane className="w-6 h-6 text-gray-900" />
              <span className="text-xl font-light tracking-tight">
                <span className="font-semibold">AETHER</span>
                <span className="text-gray-400 ml-1">wings</span>
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                Destinations
              </a>
              <a
                href="#"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                Experience
              </a>
              <a
                href="#"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                Offers
              </a>
              <a
                href="#"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                Inspiration
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
                Register
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <DollarSign className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src={images.hero}
          alt="Luxury aircraft interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs mb-6">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-gray-700">Experience the difference</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4 leading-tight">
                Elevate your
                <span className="font-semibold block">journey beyond</span>
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Discover a new standard of air travel with our curated selection
                of premium flights.
              </p>
              <button className="px-8 py-3 bg-white text-gray-900 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center space-x-2">
                <span>Explore destinations</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section - Overlapping Card */}
      <div className="container mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6 border-b border-gray-100">
            {[
              { id: "flights", label: "Flights", icon: Plane },
              { id: "hotels", label: "Hotels", icon: MapPin },
              { id: "experiences", label: "Experiences", icon: Compass },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                  )}
                </button>
              );
            })}
          </div>

          {activeTab === "flights" && (
            <>
              {/* Trip Type */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  {
                    id: "round-trip",
                    label: "Round Trip",
                    icon: ArrowRightLeft,
                  },
                  { id: "one-way", label: "One Way", icon: ArrowRight },
                  { id: "multi-city", label: "Multi-City", icon: Globe },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setTripType(type.id)}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-md transition-colors ${
                        tripType === type.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* From */}
                <div className="lg:col-span-3">
                  <label className="block text-xs text-gray-500 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <PlaneTakeoff className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City or airport"
                      value={fromAirport}
                      onChange={(e) => setFromAirport(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Swap */}
                <div className="lg:col-span-1 flex items-end justify-center pb-2.5">
                  <button className="p-1.5 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <ArrowRightLeft className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* To */}
                <div className="lg:col-span-3">
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <div className="relative">
                    <PlaneLanding className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City or airport"
                      value={toAirport}
                      onChange={(e) => setToAirport(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="lg:col-span-3">
                  <label className="block text-xs text-gray-500 mb-1">
                    Dates
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Depart"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                    </div>
                    {tripType !== "one-way" && (
                      <div className="relative flex-1">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Return"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 transition-colors"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Travelers */}
                <div className="lg:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">
                    Travelers & Cabin
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <button
                      onClick={() => setShowPassengerMenu(!showPassengerMenu)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-md text-left focus:outline-none focus:border-gray-400 transition-colors"
                    >
                      <span className="text-gray-900">{totalPassengers}</span>
                      <span className="text-gray-500 ml-1">•</span>
                      <span className="text-gray-500 ml-1 capitalize">
                        {cabinClass}
                      </span>
                    </button>

                    {/* Passenger Menu */}
                    {showPassengerMenu && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-xl border border-gray-100 p-5 z-50">
                        <h3 className="text-sm font-medium mb-4">
                          Select travelers
                        </h3>

                        {/* Adults */}
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="text-sm">Adults</div>
                            <div className="text-xs text-gray-500">
                              16+ years
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  adult: Math.max(0, passengers.adult - 1),
                                })
                              }
                              className="w-7 h-7 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm">
                              {passengers.adult}
                            </span>
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  adult: passengers.adult + 1,
                                })
                              }
                              className="w-7 h-7 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="text-sm">Children</div>
                            <div className="text-xs text-gray-500">
                              2-15 years
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  child: Math.max(0, passengers.child - 1),
                                })
                              }
                              className="w-7 h-7 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm">
                              {passengers.child}
                            </span>
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  child: passengers.child + 1,
                                })
                              }
                              className="w-7 h-7 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="text-sm">Infants</div>
                            <div className="text-xs text-gray-500">Under 2</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  infant: Math.max(0, passengers.infant - 1),
                                })
                              }
                              className="w-7 h-7 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="w-6 text-center text-sm">
                              {passengers.infant}
                            </span>
                            <button
                              onClick={() =>
                                setPassengers({
                                  ...passengers,
                                  infant: passengers.infant + 1,
                                })
                              }
                              className="w-7 h-7 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Cabin Class */}
                        <div className="border-t border-gray-100 pt-4 mt-2">
                          <label className="block text-xs text-gray-500 mb-3">
                            Cabin class
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {["economy", "business", "first"].map(
                              (classType) => (
                                <button
                                  key={classType}
                                  onClick={() => setCabinClass(classType)}
                                  className={`py-2 text-xs rounded-md capitalize transition-colors ${
                                    cabinClass === classType
                                      ? "bg-gray-900 text-white"
                                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {classType}
                                </button>
                              ),
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => setShowPassengerMenu(false)}
                          className="w-full mt-5 bg-gray-900 text-white text-sm py-2.5 rounded-md hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full mt-5 bg-gray-900 text-white py-3.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Search flights</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "150+", label: "Destinations", icon: Globe },
            { number: "50+", label: "Airlines", icon: Plane },
            { number: "24/7", label: "Support", icon: Headphones },
            { number: "5M+", label: "Happy Customers", icon: Users },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full mb-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-2xl font-light text-gray-900">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Explore
            </span>
            <h2 className="text-3xl font-light text-gray-900 mt-1">
              Popular destinations
            </h2>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group relative overflow-hidden rounded-md cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-light">{dest.city}</h3>
                    <p className="text-sm text-white/80">{dest.country}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        {dest.code}
                      </span>
                      <span className="text-xs">
                        {dest.flights} flights daily
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">From</p>
                    <p className="text-2xl font-light">${dest.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight Routes
              </span>
              <h2 className="text-3xl font-light text-gray-900 mt-1">
                Most popular connections
              </h2>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
              <span>View all routes</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-md p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{route.from}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="font-medium">{route.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {route.fromCity} → {route.toCity}
                    </p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {route.stops}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      <p className="text-gray-500">Airline</p>
                      <p className="font-medium text-sm">{route.airline}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{route.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Starting at</p>
                    <p className="text-xl font-light">${route.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Limited Time
            </span>
            <h2 className="text-3xl font-light text-gray-900 mt-1">
              Special offers
            </h2>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
            <span>All offers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flightDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40">
                <img
                  src={deal.image}
                  alt={deal.airline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-medium">
                  {deal.discount}% OFF
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{deal.airline}</h3>
                    <p className="text-sm text-gray-500">
                      {deal.from} → {deal.to}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 line-through">
                      ${Math.round(deal.price * (1 + deal.discount / 100))}
                    </p>
                    <p className="text-lg font-light">${deal.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {deal.amenities.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-50 px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-light text-gray-900 mb-6">
            Recent searches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentSearches.map((search) => (
              <div
                key={search.id}
                className="bg-white rounded-md p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{search.from}</span>
                      <ArrowRight className="w-3 h-3 text-gray-400" />
                      <span className="font-medium">{search.to}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {search.fromCity} → {search.toCity}
                    </p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">{search.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-gray-600">{search.passengers}</span>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {search.class}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Premium Flights */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Premium Selection
            </span>
            <h2 className="text-3xl font-light text-gray-900 mt-1">
              Featured flights
            </h2>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
            <span>View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {featuredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white border border-gray-100 rounded-md p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                {/* Airline & Flight Info */}
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  <div className="w-12 h-12 bg-gray-50 rounded-md flex items-center justify-center">
                    <Plane className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{flight.airline}</h3>
                      <span className="text-xs text-gray-400">
                        {flight.flightNo}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {flight.aircraft} • {flight.seats}
                    </p>
                  </div>
                </div>

                {/* Flight Route */}
                <div className="flex items-center space-x-6 mb-4 lg:mb-0">
                  <div className="text-center">
                    <p className="text-xl font-light">{flight.departure}</p>
                    <p className="text-xs text-gray-500">{flight.from}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400">
                      {flight.duration}
                    </span>
                    <div className="relative w-24">
                      <div className="border-t border-gray-200 w-full"></div>
                      <Plane className="w-3 h-3 text-gray-400 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-90" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-light">{flight.arrival}</p>
                    <p className="text-xs text-gray-500">{flight.to}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center space-x-2 mb-4 lg:mb-0">
                  {flight.amenities.slice(0, 3).map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-50 px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                  {flight.amenities.length > 3 && (
                    <span className="text-xs text-gray-400">
                      +{flight.amenities.length - 3}
                    </span>
                  )}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between lg:justify-end space-x-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Starting at</p>
                    <p className="text-2xl font-light">${flight.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Secure Booking",
                desc: "Your data is protected",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "We're here to help",
              },
              {
                icon: Wallet,
                title: "Best Price",
                desc: "Price match guarantee",
              },
              {
                icon: Star,
                title: "5 Star Service",
                desc: "Premium experience",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-sm">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="w-5 h-5 text-gray-900" />
                <span className="text-lg font-light">
                  <span className="font-semibold">AETHER</span>
                  <span className="text-gray-300 ml-1">wings</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Experience the pinnacle of air travel with our premium flight
                selection. Curated journeys for the world's most discerning
                travelers.
              </p>
              <div className="flex space-x-3">
                {["T", "F", "I", "L"].map((letter, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 bg-gray-50 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors text-xs text-gray-600"
                  >
                    {letter}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Blog"],
              },
              { title: "Support", links: ["Help", "Contact", "FAQs", "Terms"] },
              {
                title: "Experience",
                links: ["First Class", "Business", "Lounges", "Concierge"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-medium mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2024 AETHERwings. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
