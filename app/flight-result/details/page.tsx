// app/flights/details/[id]/page.tsx
"use client";

import { useState } from "react";
import {
  Plane,
  Clock,
  Briefcase,
  Luggage,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  ArrowRight,
  Calendar,
  MapPin,
  Award,
  Users,
  Wifi,
  Coffee,
  BatteryCharging,
  Film,
  UtensilsCrossed,
  Wind,
  Gift,
  Star,
  ChevronDown,
  ChevronUp,
  CreditCard,
  RefreshCw,
  Percent,
  Wallet,
  Headphones,
  Globe,
  ThumbsUp,
  AlertTriangle,
  Share2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function FlightDetailsPage() {
  const [selectedFare, setSelectedFare] = useState("economy");
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);

  // Static flight data
  const flight = {
    id: 1,
    airline: "Emirates",
    airlineCode: "EK",
    flightNumber: "EK 202",
    operatingCarrier: "Emirates",

    // Route info
    from: {
      code: "JFK",
      city: "New York",
      airport: "John F. Kennedy International Airport",
      terminal: "Terminal 4",
      gate: "B23",
      country: "USA",
    },
    to: {
      code: "DXB",
      city: "Dubai",
      airport: "Dubai International Airport",
      terminal: "Terminal 3",
      gate: "C12",
      country: "UAE",
    },

    // Times
    departureTime: "22:30",
    departureDate: "2024-03-15",
    arrivalTime: "19:45",
    arrivalDate: "2024-03-16",
    duration: "12h 15m",

    // Aircraft
    aircraft: {
      model: "Airbus A380-800",
      registration: "A6-EOT",
      age: "3.5 years",
      seats: 517,
      configuration: "4-class",
      wifi: true,
      power: true,
      entertainment: "ICE System",
      amenities: ["Shower Spa", "Onboard Lounge", "First Class Suites"],
    },

    // Airline info
    airlineInfo: {
      founded: 1985,
      hub: "DXB",
      alliance: "None",
      rating: 4.5,
      reviews: 12453,
      slogan: "Fly Better",
      lounge: "Emirates Lounge Available",
    },

    // Segments for timeline
    segments: [
      {
        from: "JFK",
        to: "DXB",
        departureTime: "22:30",
        arrivalTime: "19:45",
        duration: "12h 15m",
        aircraft: "Airbus A380",
        flightNumber: "EK 202",
        seat: "Business Class",
        meal: "Dinner & Breakfast",
        entertainment: '15" Screen',
      },
    ],

    // Layover if any
    layover: null,

    // Baggage policies
    baggage: {
      carryOn: {
        allowance: "1 piece",
        weight: "7kg",
        dimensions: "55 x 38 x 20 cm",
        details: "1 personal item + 1 carry-on",
      },
      checked: {
        economy: "25kg",
        economyFlex: "30kg",
        business: "40kg",
        first: "50kg",
        excess: "$50 per additional 5kg",
      },
      sports: "Ski equipment allowed",
      musical: "Musical instruments allowed in cabin",
    },

    // Fare classes
    fares: {
      economy: {
        name: "Economy Saver",
        price: 1299,
        originalPrice: 1599,
        seatsAvailable: 24,
        cancellation: "Non-refundable",
        changes: "$200 fee",
        baggage: "25kg",
        seatSelection: "Paid",
        meals: "Complimentary",
        refundable: false,
      },
      economyFlex: {
        name: "Economy Flex",
        price: 1699,
        originalPrice: 1899,
        seatsAvailable: 18,
        cancellation: "Refundable with fee",
        changes: "Free",
        baggage: "30kg",
        seatSelection: "Free",
        meals: "Complimentary",
        refundable: true,
      },
      business: {
        name: "Business Class",
        price: 4299,
        originalPrice: 4999,
        seatsAvailable: 8,
        cancellation: "Fully refundable",
        changes: "Free",
        baggage: "40kg",
        seatSelection: "Free",
        meals: "Gourmet Dining",
        lounge: "Included",
        refundable: true,
      },
      first: {
        name: "First Class",
        price: 8999,
        originalPrice: 9999,
        seatsAvailable: 2,
        cancellation: "Fully refundable",
        changes: "Free",
        baggage: "50kg",
        seatSelection: "Free",
        meals: "Private Chef",
        lounge: "First Class Lounge",
        chauffeur: "Included",
        refundable: true,
      },
    },

    // Upgrade options
    upgrades: [
      {
        id: "extra-legroom",
        name: "Extra Legroom Seat",
        price: 89,
        description: 'Seats with up to 6" additional legroom',
        availability: 12,
      },
      {
        id: "priority-boarding",
        name: "Priority Boarding",
        price: 29,
        description: "Board first with priority access",
        availability: 50,
      },
      {
        id: "lounge-access",
        name: "Airport Lounge Access",
        price: 79,
        description: "Access to Emirates Lounge",
        availability: 25,
      },
      {
        id: "extra-baggage",
        name: "Extra Baggage (5kg)",
        price: 45,
        description: "Additional 5kg checked baggage",
        availability: 100,
      },
      {
        id: "meal-upgrade",
        name: "Premium Meal",
        price: 35,
        description: "Upgrade to gourmet meal selection",
        availability: 30,
      },
      {
        id: "wifi-pass",
        name: "Wi-Fi Pass",
        price: 19,
        description: "Full flight Wi-Fi access",
        availability: 100,
      },
    ],

    // Price breakdown
    priceBreakdown: {
      baseFare: 899,
      taxes: 245,
      carrierSurcharges: 155,
      total: 1299,
    },

    // Fare rules
    fareRules: {
      cancellation: [
        "Cancellations within 24 hours of booking: Full refund",
        "Cancellations 30+ days before departure: $200 fee",
        "Cancellations 14-29 days before departure: $300 fee",
        "Cancellations 0-13 days before departure: Non-refundable",
        "No-show: 100% cancellation fee",
      ],
      changes: [
        "Changes allowed up to 3 hours before departure",
        "Change fee: $200 plus fare difference",
        "Name changes not permitted",
        "Date changes allowed with fee",
      ],
      refunds: [
        "Refunds processed within 7-10 business days",
        "Refunds to original payment method",
        "Non-refundable fares not eligible for refund",
      ],
    },

    // Cancellation policy summary
    cancellationPolicy: {
      freeCancellation: "Until Mar 8, 2024",
      penalty1: "Mar 9 - Mar 14: $200 fee",
      penalty2: "After Mar 14: Non-refundable",
      note: "24-hour risk-free cancellation on all bookings",
    },

    // Seat map info
    seatMap: {
      economy: {
        total: 399,
        available: 24,
        price: "From $1299",
      },
      business: {
        total: 76,
        available: 8,
        price: "From $4299",
      },
      first: {
        total: 14,
        available: 2,
        price: "From $8999",
      },
    },

    // Reviews
    reviews: {
      overall: 4.5,
      comfort: 4.6,
      service: 4.7,
      food: 4.4,
      entertainment: 4.8,
      count: 3452,
    },
  };

  const handleUpgradeToggle = (upgradeId: string) => {
    if (selectedUpgrades.includes(upgradeId)) {
      setSelectedUpgrades(selectedUpgrades.filter((id) => id !== upgradeId));
    } else {
      setSelectedUpgrades([...selectedUpgrades, upgradeId]);
    }
  };

  const calculateTotal = () => {
    const farePrice =
      flight.fares[selectedFare as keyof typeof flight.fares].price;
    const upgradesPrice = selectedUpgrades.reduce((total, id) => {
      const upgrade = flight.upgrades.find((u) => u.id === id);
      return total + (upgrade?.price || 0);
    }, 0);
    return farePrice + upgradesPrice;
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

            {/* Breadcrumb */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                href="/flights/results"
                className="text-gray-500 hover:text-gray-900"
              >
                Search Results
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Flight Details</span>
            </div>

            <button className="px-4 py-1.5 border border-gray-200 rounded-md text-sm hover:bg-gray-50">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Flight Header */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    <Plane className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-xl font-medium">{flight.airline}</h1>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {flight.flightNumber}
                      </span>
                      <span className="text-xs text-gray-400">
                        Operated by {flight.operatingCarrier}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {flight.reviews.overall}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({flight.reviews.count} reviews)
                        </span>
                      </div>
                      <span className="w-px h-3 bg-gray-200"></span>
                      <span className="text-xs text-gray-500">
                        {flight.aircraft.model}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Flight Timeline */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-medium mb-6">Flight Timeline</h2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200"></div>

                {/* Departure */}
                <div className="relative pl-14 pb-8">
                  <div className="absolute left-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        Departure
                      </p>
                      <p className="text-xl font-light mt-1">
                        {flight.departureTime}
                      </p>
                      <p className="text-lg font-medium">
                        {flight.departureDate}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {flight.from.airport}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {flight.from.terminal}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Gate {flight.from.gate}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-sm text-gray-500">
                        {flight.from.city}, {flight.from.country}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Check-in closes 60 min before departure
                      </p>
                    </div>
                  </div>
                </div>

                {/* Flight Duration */}
                <div className="relative pl-14 pb-8">
                  <div className="absolute left-4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      In Flight
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-lg font-light">{flight.duration}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {flight.aircraft.model}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        Flight {flight.flightNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="relative pl-14">
                  <div className="absolute left-4 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 font-medium">
                        Arrival
                      </p>
                      <p className="text-xl font-light mt-1">
                        {flight.arrivalTime}
                      </p>
                      <p className="text-lg font-medium">
                        {flight.arrivalDate}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {flight.to.airport}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {flight.to.terminal}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Gate {flight.to.gate}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-sm text-gray-500">
                        {flight.to.city}, {flight.to.country}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Local time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Info */}
              <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Total Duration</p>
                  <p className="text-sm font-medium">{flight.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Time Difference</p>
                  <p className="text-sm font-medium">+9 hours</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Layover</p>
                  <p className="text-sm font-medium">Direct flight</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Distance</p>
                  <p className="text-sm font-medium">6,850 miles</p>
                </div>
              </div>
            </div>

            {/* Fare Classes */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-medium mb-4">Select Fare Class</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(flight.fares).map(([key, fare]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedFare(key)}
                    className={`border rounded-md p-4 cursor-pointer transition-all ${
                      selectedFare === key
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{fare.name}</h3>
                      {key === "economyFlex" && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                      {key === "business" && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                          Best Value
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-light mb-3">${fare.price}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Cancellation</span>
                        <span className="font-medium">{fare.cancellation}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Changes</span>
                        <span className="font-medium">{fare.changes}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Baggage</span>
                        <span className="font-medium">{fare.baggage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Seats</span>
                        <span className="font-medium">
                          {fare.seatsAvailable} left
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Options */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-medium mb-4">
                Upgrade Your Experience
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Add these options to enhance your flight
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {flight.upgrades.map((upgrade) => (
                  <div
                    key={upgrade.id}
                    className={`border rounded-md p-4 cursor-pointer transition-all ${
                      selectedUpgrades.includes(upgrade.id)
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleUpgradeToggle(upgrade.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{upgrade.name}</h3>
                      <span className="text-xs text-gray-400">
                        {upgrade.availability} left
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {upgrade.description}
                    </p>
                    <p className="text-lg font-light">${upgrade.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Baggage Policy */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-medium mb-4">Baggage Policy</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carry-on */}
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium">Carry-on Allowance</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Allowance</span>
                      <span className="font-medium">
                        {flight.baggage.carryOn.allowance}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Weight</span>
                      <span className="font-medium">
                        {flight.baggage.carryOn.weight}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Dimensions</span>
                      <span className="font-medium">
                        {flight.baggage.carryOn.dimensions}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {flight.baggage.carryOn.details}
                    </p>
                  </div>
                </div>

                {/* Checked baggage */}
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Luggage className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium">Checked Baggage</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Economy</span>
                      <span className="font-medium">
                        {flight.baggage.checked.economy}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Economy Flex</span>
                      <span className="font-medium">
                        {flight.baggage.checked.economyFlex}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Business</span>
                      <span className="font-medium">
                        {flight.baggage.checked.business}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">First</span>
                      <span className="font-medium">
                        {flight.baggage.checked.first}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Excess: {flight.baggage.checked.excess}
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Items */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-500">Special items:</span>
                  <span className="text-gray-700">{flight.baggage.sports}</span>
                  <span className="w-px h-3 bg-gray-200"></span>
                  <span className="text-gray-700">
                    {flight.baggage.musical}
                  </span>
                </div>
              </div>
            </div>

            {/* Fare Rules & Policies */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-medium mb-4">
                Fare Rules & Policies
              </h2>

              {/* Cancellation Policy */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
                  Cancellation Policy
                </h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Free cancellation</span>
                      <span className="font-medium text-green-600">
                        {flight.cancellationPolicy.freeCancellation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Partial refund</span>
                      <span className="font-medium text-yellow-600">
                        {flight.cancellationPolicy.penalty1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">No refund</span>
                      <span className="font-medium text-red-600">
                        {flight.cancellationPolicy.penalty2}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    {flight.cancellationPolicy.note}
                  </p>
                </div>
              </div>

              {/* Detailed Fare Rules */}
              <div>
                <button
                  onClick={() => setShowFullPolicy(!showFullPolicy)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <span>View detailed fare rules</span>
                  {showFullPolicy ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showFullPolicy && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Cancellation Rules
                      </h4>
                      <ul className="space-y-1">
                        {flight.fareRules.cancellation.map((rule, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-start space-x-2"
                          >
                            <XCircle className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Change Rules</h4>
                      <ul className="space-y-1">
                        {flight.fareRules.changes.map((rule, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-start space-x-2"
                          >
                            <RefreshCw className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Refund Policy
                      </h4>
                      <ul className="space-y-1">
                        {flight.fareRules.refunds.map((rule, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-start space-x-2"
                          >
                            <RefreshCw className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Aircraft Information */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="text-lg font-medium mb-4">Aircraft Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <h3 className="font-medium mb-3">
                      {flight.aircraft.model}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Registration</span>
                        <span className="font-medium">
                          {flight.aircraft.registration}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Age</span>
                        <span className="font-medium">
                          {flight.aircraft.age}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Seats</span>
                        <span className="font-medium">
                          {flight.aircraft.seats}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Configuration</span>
                        <span className="font-medium">
                          {flight.aircraft.configuration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-md p-4">
                    <h3 className="font-medium mb-3">Onboard Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Wifi className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {flight.aircraft.wifi
                            ? "Wi-Fi Available"
                            : "No Wi-Fi"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BatteryCharging className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Power Outlets</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Film className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          {flight.aircraft.entertainment}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <UtensilsCrossed className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Meals Included</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium">Special Features:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {flight.aircraft.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs bg-white px-2 py-1 rounded border border-gray-200"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Airline Information */}
            <div className="bg-white rounded-md border border-gray-200 p-6">
              <h2 className="text-lg font-medium mb-4">
                About {flight.airline}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Award className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium">Airline Details</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Founded</span>
                      <span className="font-medium">
                        {flight.airlineInfo.founded}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hub</span>
                      <span className="font-medium">
                        {flight.airlineInfo.hub}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Alliance</span>
                      <span className="font-medium">
                        {flight.airlineInfo.alliance}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Slogan</span>
                      <span className="font-medium">
                        {flight.airlineInfo.slogan}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Star className="w-5 h-5 text-gray-600" />
                    <h3 className="font-medium">Ratings</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Overall</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">
                          {flight.reviews.overall}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(flight.reviews.overall) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Comfort</span>
                      <span className="font-medium">
                        {flight.reviews.comfort}/5
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Service</span>
                      <span className="font-medium">
                        {flight.reviews.service}/5
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Food</span>
                      <span className="font-medium">
                        {flight.reviews.food}/5
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Entertainment</span>
                      <span className="font-medium">
                        {flight.reviews.entertainment}/5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Headphones className="w-5 h-5 text-gray-600" />
                      <h3 className="font-medium">Services</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Online Check-in</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Mobile Boarding Pass</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">
                          {flight.airlineInfo.lounge}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Special Meals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Unaccompanied Minor</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Pet Policy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Price Summary & Booking */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-md border border-gray-200 sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-medium">Price Summary</h2>
              </div>

              {/* Selected Fare */}
              <div className="p-4">
                <div className="bg-gray-50 rounded-md p-3 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">
                        {
                          flight.fares[
                            selectedFare as keyof typeof flight.fares
                          ].name
                        }
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Selected fare class
                      </p>
                    </div>
                    <p className="text-lg font-light">
                      $
                      {
                        flight.fares[selectedFare as keyof typeof flight.fares]
                          .price
                      }
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Base fare</span>
                    <span className="font-medium">
                      ${flight.priceBreakdown.baseFare}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes</span>
                    <span className="font-medium">
                      ${flight.priceBreakdown.taxes}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Carrier surcharges</span>
                    <span className="font-medium">
                      ${flight.priceBreakdown.carrierSurcharges}
                    </span>
                  </div>

                  {selectedUpgrades.length > 0 && (
                    <>
                      <div className="border-t border-gray-100 my-2"></div>
                      <p className="text-xs font-medium text-gray-500">
                        Selected Upgrades
                      </p>
                      {selectedUpgrades.map((id) => {
                        const upgrade = flight.upgrades.find(
                          (u) => u.id === id,
                        );
                        return (
                          <div
                            key={id}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-500">
                              {upgrade?.name}
                            </span>
                            <span className="font-medium">
                              ${upgrade?.price}
                            </span>
                          </div>
                        );
                      })}
                    </>
                  )}

                  <div className="border-t border-gray-100 my-2"></div>
                  <div className="flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                {/* Seat Availability */}
                <div className="bg-yellow-50 rounded-md p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Only{" "}
                        {
                          flight.fares[
                            selectedFare as keyof typeof flight.fares
                          ].seatsAvailable
                        }{" "}
                        seats left at this price
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Book soon to secure this fare
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gray-900 text-white py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors mb-3">
                  Book Now
                </button>

                {/* Hold Option */}
                <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Hold for $5.99</span>
                </button>

                {/* Trust Badges */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-400">
                        Secure payment
                      </span>
                    </div>
                    <div className="w-px h-3 bg-gray-200"></div>
                    <div className="flex items-center space-x-1">
                      <RefreshCw className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-400">
                        Free changes
                      </span>
                    </div>
                    <div className="w-px h-3 bg-gray-200"></div>
                    <div className="flex items-center space-x-1">
                      <Headphones className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-gray-400">
                        24/7 support
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-md">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Flight number</span>
                    <span className="font-medium">{flight.flightNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Aircraft</span>
                    <span className="font-medium">{flight.aircraft.model}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Operating carrier</span>
                    <span className="font-medium">
                      {flight.operatingCarrier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Seat pitch</span>
                    <span className="font-medium">32-34 inches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
