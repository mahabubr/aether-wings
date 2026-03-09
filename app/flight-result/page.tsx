// app/flights/results/page.tsx
"use client";

import { useState } from "react";
import {
  Plane,
  Clock,
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Star,
  Wifi,
  Coffee,
  BatteryCharging,
  Film,
  UtensilsCrossed,
  Luggage,
  Info,
  ArrowRight,
  Calendar,
  MapPin,
  Award,
  Clock3,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Gauge,
} from "lucide-react";
import Link from "next/link";

export default function FlightResultsPage() {
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState<string[]>(
    [],
  );
  const [selectedArrivalTime, setSelectedArrivalTime] = useState<string[]>([]);
  const [duration, setDuration] = useState([0, 24]);

  // Static flight data - comprehensive list
  const flights = [
    {
      id: 1,
      airline: "Emirates",
      airlineCode: "EK",
      flightNumber: "EK 202",
      from: "JFK",
      fromCity: "New York",
      to: "DXB",
      toCity: "Dubai",
      departureTime: "22:30",
      departureDate: "2024-03-15",
      arrivalTime: "19:45",
      arrivalDate: "2024-03-16",
      duration: "12h 15m",
      stops: 0,
      stopCities: [],
      aircraft: "Airbus A380",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      cabinClass: "Economy",
      seatsAvailable: 24,
      totalSeats: 48,
      amenities: ["Wi-Fi", "Entertainment", "Meals", "USB Ports"],
      baggage: {
        carryOn: "7kg",
        checked: "30kg",
      },
      fareClass: "Saver",
      fareRules: ["Non-refundable", "Changes allowed for fee"],
      layover: null,
      emissions: 245,
      rating: 4.5,
      reviews: 3452,
    },
    {
      id: 2,
      airline: "Singapore Airlines",
      airlineCode: "SQ",
      flightNumber: "SQ 305",
      from: "JFK",
      fromCity: "New York",
      to: "SIN",
      toCity: "Singapore",
      departureTime: "23:55",
      departureDate: "2024-03-15",
      arrivalTime: "07:40",
      arrivalDate: "2024-03-17",
      duration: "18h 45m",
      stops: 1,
      stopCities: ["FRA - Frankfurt (2h 30m)"],
      aircraft: "Boeing 777-300ER",
      price: 1499,
      originalPrice: 1799,
      discount: 17,
      cabinClass: "Economy",
      seatsAvailable: 18,
      totalSeats: 42,
      amenities: ["Wi-Fi", "Entertainment", "Gourmet Meals", "Power Outlets"],
      baggage: {
        carryOn: "7kg",
        checked: "35kg",
      },
      fareClass: "Flexi",
      fareRules: ["Refundable", "Free changes"],
      layover: {
        city: "Frankfurt",
        duration: "2h 30m",
        airport: "FRA",
        overnight: false,
      },
      emissions: 412,
      rating: 4.8,
      reviews: 5678,
    },
    {
      id: 3,
      airline: "Qatar Airways",
      airlineCode: "QR",
      flightNumber: "QR 704",
      from: "JFK",
      fromCity: "New York",
      to: "DOH",
      toCity: "Doha",
      departureTime: "01:15",
      departureDate: "2024-03-16",
      arrivalTime: "20:45",
      arrivalDate: "2024-03-16",
      duration: "11h 30m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 787-9 Dreamliner",
      price: 1099,
      originalPrice: 1299,
      discount: 15,
      cabinClass: "Economy",
      seatsAvailable: 32,
      totalSeats: 56,
      amenities: ["Wi-Fi", "Entertainment", "Dining", "Charging Ports"],
      baggage: {
        carryOn: "7kg",
        checked: "25kg",
      },
      fareClass: "Saver",
      fareRules: ["Non-refundable", "No changes"],
      layover: null,
      emissions: 228,
      rating: 4.6,
      reviews: 4231,
    },
    {
      id: 4,
      airline: "Etihad Airways",
      airlineCode: "EY",
      flightNumber: "EY 100",
      from: "JFK",
      fromCity: "New York",
      to: "AUH",
      toCity: "Abu Dhabi",
      departureTime: "20:45",
      departureDate: "2024-03-15",
      arrivalTime: "19:30",
      arrivalDate: "2024-03-16",
      duration: "12h 45m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 787-9",
      price: 1199,
      originalPrice: 1399,
      discount: 14,
      cabinClass: "Economy",
      seatsAvailable: 15,
      totalSeats: 52,
      amenities: ["Wi-Fi", "Entertainment", "Meals", "USB"],
      baggage: {
        carryOn: "7kg",
        checked: "30kg",
      },
      fareClass: "Value",
      fareRules: ["Non-refundable", "Changes for fee"],
      layover: null,
      emissions: 238,
      rating: 4.4,
      reviews: 2891,
    },
    {
      id: 5,
      airline: "Turkish Airlines",
      airlineCode: "TK",
      flightNumber: "TK 12",
      from: "JFK",
      fromCity: "New York",
      to: "IST",
      toCity: "Istanbul",
      departureTime: "23:20",
      departureDate: "2024-03-15",
      arrivalTime: "16:35",
      arrivalDate: "2024-03-16",
      duration: "10h 15m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 777-300ER",
      price: 899,
      originalPrice: 1099,
      discount: 18,
      cabinClass: "Economy",
      seatsAvailable: 8,
      totalSeats: 64,
      amenities: ["Entertainment", "Meals", "USB"],
      baggage: {
        carryOn: "8kg",
        checked: "25kg",
      },
      fareClass: "Saver",
      fareRules: ["Non-refundable", "No changes"],
      layover: null,
      emissions: 198,
      rating: 4.3,
      reviews: 3156,
    },
    {
      id: 6,
      airline: "British Airways",
      airlineCode: "BA",
      flightNumber: "BA 178",
      from: "JFK",
      fromCity: "New York",
      to: "LHR",
      toCity: "London",
      departureTime: "19:30",
      departureDate: "2024-03-15",
      arrivalTime: "07:15",
      arrivalDate: "2024-03-16",
      duration: "6h 45m",
      stops: 0,
      stopCities: [],
      aircraft: "Airbus A380",
      price: 699,
      originalPrice: 849,
      discount: 18,
      cabinClass: "Economy",
      seatsAvailable: 42,
      totalSeats: 72,
      amenities: ["Wi-Fi", "Entertainment", "Meals", "USB"],
      baggage: {
        carryOn: "7kg",
        checked: "23kg",
      },
      fareClass: "Saver",
      fareRules: ["Non-refundable", "Changes for fee"],
      layover: null,
      emissions: 156,
      rating: 4.2,
      reviews: 6789,
    },
    {
      id: 7,
      airline: "Lufthansa",
      airlineCode: "LH",
      flightNumber: "LH 401",
      from: "JFK",
      fromCity: "New York",
      to: "FRA",
      toCity: "Frankfurt",
      departureTime: "17:15",
      departureDate: "2024-03-15",
      arrivalTime: "07:05",
      arrivalDate: "2024-03-16",
      duration: "7h 50m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 747-8",
      price: 749,
      originalPrice: 899,
      discount: 17,
      cabinClass: "Economy",
      seatsAvailable: 28,
      totalSeats: 68,
      amenities: ["Wi-Fi", "Entertainment", "Meals", "Power"],
      baggage: {
        carryOn: "8kg",
        checked: "23kg",
      },
      fareClass: "Light",
      fareRules: ["Non-refundable", "No changes"],
      layover: null,
      emissions: 168,
      rating: 4.3,
      reviews: 4456,
    },
    {
      id: 8,
      airline: "Air France",
      airlineCode: "AF",
      flightNumber: "AF 9",
      from: "JFK",
      fromCity: "New York",
      to: "CDG",
      toCity: "Paris",
      departureTime: "23:30",
      departureDate: "2024-03-15",
      arrivalTime: "13:05",
      arrivalDate: "2024-03-16",
      duration: "7h 35m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 777-300ER",
      price: 679,
      originalPrice: 829,
      discount: 18,
      cabinClass: "Economy",
      seatsAvailable: 35,
      totalSeats: 70,
      amenities: ["Entertainment", "Meals", "USB"],
      baggage: {
        carryOn: "7kg",
        checked: "23kg",
      },
      fareClass: "Saver",
      fareRules: ["Non-refundable", "Changes for fee"],
      layover: null,
      emissions: 152,
      rating: 4.1,
      reviews: 3892,
    },
    {
      id: 9,
      airline: "Cathay Pacific",
      airlineCode: "CX",
      flightNumber: "CX 831",
      from: "JFK",
      fromCity: "New York",
      to: "HKG",
      toCity: "Hong Kong",
      departureTime: "10:25",
      departureDate: "2024-03-16",
      arrivalTime: "16:05",
      arrivalDate: "2024-03-17",
      duration: "15h 40m",
      stops: 1,
      stopCities: ["YVR - Vancouver (1h 45m)"],
      aircraft: "Boeing 777-300ER",
      price: 1399,
      originalPrice: 1699,
      discount: 18,
      cabinClass: "Economy",
      seatsAvailable: 22,
      totalSeats: 58,
      amenities: ["Wi-Fi", "Entertainment", "Meals", "USB"],
      baggage: {
        carryOn: "7kg",
        checked: "30kg",
      },
      fareClass: "Value",
      fareRules: ["Refundable", "Free changes"],
      layover: {
        city: "Vancouver",
        duration: "1h 45m",
        airport: "YVR",
        overnight: false,
      },
      emissions: 389,
      rating: 4.5,
      reviews: 5123,
    },
    {
      id: 10,
      airline: "ANA",
      airlineCode: "NH",
      flightNumber: "NH 159",
      from: "JFK",
      fromCity: "New York",
      to: "HND",
      toCity: "Tokyo",
      departureTime: "13:30",
      departureDate: "2024-03-16",
      arrivalTime: "17:15",
      arrivalDate: "2024-03-17",
      duration: "13h 45m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 777-300ER",
      price: 1499,
      originalPrice: 1799,
      discount: 17,
      cabinClass: "Economy",
      seatsAvailable: 12,
      totalSeats: 54,
      amenities: ["Wi-Fi", "Entertainment", "Japanese Meals", "USB"],
      baggage: {
        carryOn: "7kg",
        checked: "30kg",
      },
      fareClass: "Saver",
      fareRules: ["Non-refundable", "Changes for fee"],
      layover: null,
      emissions: 328,
      rating: 4.7,
      reviews: 6341,
    },
    {
      id: 11,
      airline: "Delta Air Lines",
      airlineCode: "DL",
      flightNumber: "DL 276",
      from: "JFK",
      fromCity: "New York",
      to: "LAX",
      toCity: "Los Angeles",
      departureTime: "08:00",
      departureDate: "2024-03-15",
      arrivalTime: "11:30",
      arrivalDate: "2024-03-15",
      duration: "6h 30m",
      stops: 0,
      stopCities: [],
      aircraft: "Airbus A330",
      price: 299,
      originalPrice: 399,
      discount: 25,
      cabinClass: "Economy",
      seatsAvailable: 45,
      totalSeats: 80,
      amenities: ["Wi-Fi", "Entertainment", "Snacks", "USB"],
      baggage: {
        carryOn: "7kg",
        checked: "23kg",
      },
      fareClass: "Basic",
      fareRules: ["Non-refundable", "No changes"],
      layover: null,
      emissions: 98,
      rating: 4.0,
      reviews: 8921,
    },
    {
      id: 12,
      airline: "United Airlines",
      airlineCode: "UA",
      flightNumber: "UA 124",
      from: "JFK",
      fromCity: "New York",
      to: "SFO",
      toCity: "San Francisco",
      departureTime: "10:15",
      departureDate: "2024-03-15",
      arrivalTime: "13:45",
      arrivalDate: "2024-03-15",
      duration: "6h 30m",
      stops: 0,
      stopCities: [],
      aircraft: "Boeing 787-9",
      price: 279,
      originalPrice: 359,
      discount: 22,
      cabinClass: "Economy",
      seatsAvailable: 52,
      totalSeats: 76,
      amenities: ["Wi-Fi", "Entertainment", "Snacks", "Power"],
      baggage: {
        carryOn: "7kg",
        checked: "23kg",
      },
      fareClass: "Economy",
      fareRules: ["Non-refundable", "Changes for fee"],
      layover: null,
      emissions: 95,
      rating: 3.9,
      reviews: 7564,
    },
  ];

  // Filter options
  const airlines = [
    { name: "Emirates", count: 12, code: "EK" },
    { name: "Singapore Airlines", count: 8, code: "SQ" },
    { name: "Qatar Airways", count: 10, code: "QR" },
    { name: "Etihad Airways", count: 6, code: "EY" },
    { name: "Turkish Airlines", count: 15, code: "TK" },
    { name: "British Airways", count: 20, code: "BA" },
    { name: "Lufthansa", count: 18, code: "LH" },
    { name: "Air France", count: 14, code: "AF" },
    { name: "Cathay Pacific", count: 7, code: "CX" },
    { name: "ANA", count: 5, code: "NH" },
    { name: "Delta Air Lines", count: 25, code: "DL" },
    { name: "United Airlines", count: 22, code: "UA" },
  ];

  const stopOptions = [
    { label: "Non-stop", value: "nonstop", count: 8 },
    { label: "1 Stop", value: "1stop", count: 12 },
    { label: "2+ Stops", value: "2plus", count: 5 },
  ];

  const timeSlots = [
    { label: "Early Morning (12am - 6am)", value: "early-morning" },
    { label: "Morning (6am - 12pm)", value: "morning" },
    { label: "Afternoon (12pm - 6pm)", value: "afternoon" },
    { label: "Evening (6pm - 12am)", value: "evening" },
  ];

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "duration", label: "Duration" },
    { value: "departure", label: "Departure Time" },
    { value: "arrival", label: "Arrival Time" },
  ];

  const handleCompare = (flightId: number) => {
    if (compareList.includes(flightId)) {
      setCompareList(compareList.filter((id) => id !== flightId));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, flightId]);
      }
    }
  };

  const getSeatAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600 bg-green-50";
    if (percentage > 20) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getTimeSlot = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 0 && hour < 6) return "Early Morning";
    if (hour >= 6 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 18) return "Afternoon";
    return "Evening";
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

            {/* Search Summary */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="font-medium">JFK</span>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <span className="font-medium">DXB</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Mar 15 - Mar 22</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4 text-gray-400" />
                <span>2 Travelers</span>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-md border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Filters</h2>
                  <button className="text-xs text-gray-500 hover:text-gray-900">
                    Reset all
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Stops */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Stops</h3>
                  <div className="space-y-2">
                    {stopOptions.map((stop) => (
                      <label
                        key={stop.value}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                            checked={selectedStops.includes(stop.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedStops([
                                  ...selectedStops,
                                  stop.value,
                                ]);
                              } else {
                                setSelectedStops(
                                  selectedStops.filter((s) => s !== stop.value),
                                );
                              }
                            }}
                          />
                          <span className="text-sm text-gray-600">
                            {stop.label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {stop.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Airlines */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Airlines</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {airlines.map((airline) => (
                      <label
                        key={airline.code}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                            checked={selectedAirlines.includes(airline.code)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAirlines([
                                  ...selectedAirlines,
                                  airline.code,
                                ]);
                              } else {
                                setSelectedAirlines(
                                  selectedAirlines.filter(
                                    (a) => a !== airline.code,
                                  ),
                                );
                              }
                            }}
                          />
                          <span className="text-sm text-gray-600">
                            {airline.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {airline.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">$0</span>
                      <span className="text-gray-900 font-medium">
                        ${priceRange[1]}
                      </span>
                      <span className="text-gray-600">$2000+</span>
                    </div>
                  </div>
                </div>

                {/* Departure Time */}
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Departure from JFK
                  </h3>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <label
                        key={slot.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                          checked={selectedDepartureTime.includes(slot.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDepartureTime([
                                ...selectedDepartureTime,
                                slot.value,
                              ]);
                            } else {
                              setSelectedDepartureTime(
                                selectedDepartureTime.filter(
                                  (s) => s !== slot.value,
                                ),
                              );
                            }
                          }}
                        />
                        <span className="text-sm text-gray-600">
                          {slot.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Arrival Time */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Arrival at DXB</h3>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <label
                        key={slot.value}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                          checked={selectedArrivalTime.includes(slot.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedArrivalTime([
                                ...selectedArrivalTime,
                                slot.value,
                              ]);
                            } else {
                              setSelectedArrivalTime(
                                selectedArrivalTime.filter(
                                  (s) => s !== slot.value,
                                ),
                              );
                            }
                          }}
                        />
                        <span className="text-sm text-gray-600">
                          {slot.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Max Duration</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="24"
                      step="1"
                      value={duration[1]}
                      onChange={(e) =>
                        setDuration([duration[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">0h</span>
                      <span className="text-gray-900 font-medium">
                        {duration[1]}h
                      </span>
                      <span className="text-gray-600">24h+</span>
                    </div>
                  </div>
                </div>

                {/* Baggage Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Baggage</h3>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded text-gray-900"
                    />
                    <span className="text-sm text-gray-600">
                      Included baggage
                    </span>
                  </label>
                </div>

                {/* Apply Filters */}
                <button className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Sidebar */}
          {showFilters && (
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-medium">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto h-full pb-20">
                  {/* Same filter content as desktop */}
                  <div className="space-y-6">
                    {/* Stops */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Stops</h3>
                      <div className="space-y-2">
                        {stopOptions.map((stop) => (
                          <label
                            key={stop.value}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-600">
                                {stop.label}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {stop.count}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Airlines */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Airlines</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {airlines.map((airline) => (
                          <label
                            key={airline.code}
                            className="flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded"
                              />
                              <span className="text-sm text-gray-600">
                                {airline.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {airline.count}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Price Range</h3>
                      <div className="space-y-3">
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          className="w-full"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>$0</span>
                          <span>$2000+</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    248 flights found
                  </span>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <span className="text-sm text-gray-500">JFK → DXB</span>
                  <span className="w-px h-4 bg-gray-200"></span>
                  <span className="text-sm text-gray-500">Mar 15 - Mar 22</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-gray-400"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                  Non-stop only
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                  $1000
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                  Morning departure
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                  Star Alliance
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                  Oneworld
                </button>
                <button className="px-3 py-1.5 bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors">
                  SkyTeam
                </button>
              </div>
            </div>

            {/* Compare Bar */}
            {compareList.length > 0 && (
              <div className="bg-white rounded-md border border-gray-200 p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">
                    {compareList.length} flights selected
                  </span>
                  <span className="text-xs text-gray-500">
                    (Max 3 for comparison)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCompareList([])}
                    className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900"
                  >
                    Clear
                  </button>
                  {compareList.length >= 2 && (
                    <button
                      onClick={() => setShowCompare(true)}
                      className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
                    >
                      Compare
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Flight List */}
            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-md border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Main Flight Card */}
                  <div className="p-5">
                    {/* Compare Checkbox & Airline */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={compareList.includes(flight.id)}
                            onChange={() => handleCompare(flight.id)}
                            className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-200"
                          />
                          <span className="text-xs text-gray-500">Compare</span>
                        </label>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <div>
                          <span className="font-medium">{flight.airline}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            {flight.flightNumber}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {flight.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({flight.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Flight Route */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Times & Cities */}
                      <div className="flex items-center space-x-6">
                        {/* Departure */}
                        <div className="text-center">
                          <p className="text-2xl font-light">
                            {flight.departureTime}
                          </p>
                          <p className="text-sm font-medium">{flight.from}</p>
                          <p className="text-xs text-gray-400">
                            {flight.fromCity}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {getTimeSlot(flight.departureTime)}
                          </p>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-col items-center">
                          <p className="text-xs text-gray-400 mb-1">
                            {flight.duration}
                          </p>
                          <div className="relative">
                            <div className="w-24 border-t border-gray-300"></div>
                            <Plane className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-90" />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {flight.stops === 0
                              ? "Non-stop"
                              : `${flight.stops} Stop`}
                          </p>
                          {flight.stops > 0 && (
                            <p className="text-xs text-gray-400">
                              {flight.stopCities[0]}
                            </p>
                          )}
                        </div>

                        {/* Arrival */}
                        <div className="text-center">
                          <p className="text-2xl font-light">
                            {flight.arrivalTime}
                          </p>
                          <p className="text-sm font-medium">{flight.to}</p>
                          <p className="text-xs text-gray-400">
                            {flight.toCity}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            +
                            {new Date(flight.arrivalDate).getDate() -
                              new Date(flight.departureDate).getDate()}{" "}
                            day
                          </p>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between lg:justify-end space-x-6">
                        {/* Seat Availability */}
                        <div
                          className={`px-3 py-1.5 rounded-md text-xs font-medium ${getSeatAvailabilityColor(flight.seatsAvailable, flight.totalSeats)}`}
                        >
                          {flight.seatsAvailable} seats left
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {flight.originalPrice > flight.price && (
                            <p className="text-xs text-gray-400 line-through">
                              ${flight.originalPrice}
                            </p>
                          )}
                          <p className="text-3xl font-light text-gray-900">
                            ${flight.price}
                          </p>
                          <p className="text-xs text-gray-400">per person</p>
                          {flight.discount > 0 && (
                            <p className="text-xs text-green-600">
                              {flight.discount}% off
                            </p>
                          )}
                        </div>

                        {/* Select Button */}
                        <button className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
                          Select
                        </button>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          Carry-on: {flight.baggage.carryOn}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Luggage className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          Checked: {flight.baggage.checked}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {flight.fareClass} fare
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Gauge className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {flight.emissions} kg CO₂
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 ml-auto">
                        {flight.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() =>
                        setExpandedFlight(
                          expandedFlight === flight.id ? null : flight.id,
                        )
                      }
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-900 mt-3"
                    >
                      <span>Flight details</span>
                      {expandedFlight === flight.id ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>

                    {/* Expanded Details */}
                    {expandedFlight === flight.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Layover Details */}
                          {flight.layover && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">
                                Layover
                              </h4>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm">
                                  {flight.layover.city} (
                                  {flight.layover.airport})
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Duration: {flight.layover.duration}
                                </p>
                                {flight.layover.overnight && (
                                  <p className="text-xs text-yellow-600 mt-1">
                                    Overnight layover
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Aircraft Info */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Aircraft
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm">{flight.aircraft}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Configuration: {flight.totalSeats} seats
                              </p>
                            </div>
                          </div>

                          {/* Fare Rules */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Fare Rules
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              {flight.fareRules.map((rule, index) => (
                                <p
                                  key={index}
                                  className="text-xs text-gray-600 flex items-center space-x-1"
                                >
                                  <Info className="w-3 h-3 text-gray-400" />
                                  <span>{rule}</span>
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Amenities Detail */}
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Amenities
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="grid grid-cols-2 gap-2">
                                {flight.amenities.map((amenity, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-1"
                                  >
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-gray-600">
                                      {amenity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Fare Breakdown */}
                          <div className="md:col-span-2">
                            <h4 className="text-sm font-medium mb-2">
                              Fare Breakdown
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Base fare</span>
                                <span className="font-medium">
                                  ${Math.round(flight.price * 0.7)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">
                                  Taxes & fees
                                </span>
                                <span className="font-medium">
                                  ${Math.round(flight.price * 0.2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">
                                  Carrier surcharges
                                </span>
                                <span className="font-medium">
                                  ${Math.round(flight.price * 0.1)}
                                </span>
                              </div>
                              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm font-medium">
                                <span>Total</span>
                                <span className="text-gray-900">
                                  ${flight.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                Load More Flights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showCompare && compareList.length >= 2 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-medium">Compare Flights</h2>
              <button onClick={() => setShowCompare(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {/* Headers */}
                <div className="col-span-1"></div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 text-center">
                      <p className="font-medium">{flight?.airline}</p>
                      <p className="text-xs text-gray-400">
                        {flight?.flightNumber}
                      </p>
                    </div>
                  );
                })}

                {/* Price */}
                <div className="col-span-1 py-3 font-medium">Price</div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 py-3 text-center">
                      <p className="text-xl font-light">${flight?.price}</p>
                    </div>
                  );
                })}

                {/* Duration */}
                <div className="col-span-1 py-3 font-medium">Duration</div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 py-3 text-center">
                      <p>{flight?.duration}</p>
                    </div>
                  );
                })}

                {/* Stops */}
                <div className="col-span-1 py-3 font-medium">Stops</div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 py-3 text-center">
                      <p>
                        {flight?.stops === 0
                          ? "Non-stop"
                          : `${flight?.stops} stop`}
                      </p>
                    </div>
                  );
                })}

                {/* Baggage */}
                <div className="col-span-1 py-3 font-medium">Baggage</div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 py-3 text-center">
                      <p className="text-sm">
                        Carry-on: {flight?.baggage.carryOn}
                      </p>
                      <p className="text-sm">
                        Checked: {flight?.baggage.checked}
                      </p>
                    </div>
                  );
                })}

                {/* Aircraft */}
                <div className="col-span-1 py-3 font-medium">Aircraft</div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 py-3 text-center">
                      <p className="text-sm">{flight?.aircraft}</p>
                    </div>
                  );
                })}

                {/* Rating */}
                <div className="col-span-1 py-3 font-medium">Rating</div>
                {compareList.map((id, index) => {
                  const flight = flights.find((f) => f.id === id);
                  return (
                    <div key={id} className="col-span-1 py-3 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{flight?.rating}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
