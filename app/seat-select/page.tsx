// app/checkout/seat-selection/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Plane,
  Armchair,
  Wifi,
  BatteryCharging,
  Users,
  Info,
  Check,
  X,
  DollarSign,
  Star,
  Heart,
  Users2,
  Baby,
  Luggage,
  Coffee,
  Film,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Shield,
  AlertCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function SeatSelectionPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeDeck, setActiveDeck] = useState("main");
  const [zoom, setZoom] = useState(1);
  const [showSeatPreview, setShowSeatPreview] = useState<string | null>(null);
  const [familyMode, setFamilyMode] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(1);
  const [showLegend, setShowLegend] = useState(true);
  const [seatFilters, setSeatFilters] = useState({
    available: true,
    window: false,
    aisle: false,
    extraLegroom: false,
    nearExit: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock passenger data
  const passengers = [
    { id: 1, name: "John Doe", type: "adult" },
    { id: 2, name: "Jane Doe", type: "adult" },
    { id: 3, name: "Master Doe", type: "child" },
  ];

  // Deterministic seat map data - no random generation
  const seatMap = [
    // Rows 1-5 (Premium seats)
    ...Array.from({ length: 5 }, (_, i) => ({
      row: i + 1,
      seats: [
        {
          id: `${i + 1}A`,
          row: i + 1,
          letter: "A",
          type: "premium",
          status: i === 0 ? "occupied" : i === 1 ? "blocked" : "available",
          price: 39,
          features: ["window", "premium"],
        },
        {
          id: `${i + 1}B`,
          row: i + 1,
          letter: "B",
          type: "premium",
          status: i === 2 ? "occupied" : i === 3 ? "blocked" : "available",
          price: 39,
          features: ["premium"],
        },
        {
          id: `${i + 1}C`,
          row: i + 1,
          letter: "C",
          type: "premium",
          status: i === 1 ? "occupied" : i === 4 ? "blocked" : "available",
          price: 39,
          features: ["premium"],
        },
        {
          id: `${i + 1}D`,
          row: i + 1,
          letter: "D",
          type: "premium",
          status: i === 0 ? "occupied" : i === 2 ? "blocked" : "available",
          price: 39,
          features: ["aisle", "premium"],
        },
        {
          id: `${i + 1}E`,
          row: i + 1,
          letter: "E",
          type: "premium",
          status: "available",
          price: 39,
          features: ["premium"],
        },
        {
          id: `${i + 1}F`,
          row: i + 1,
          letter: "F",
          type: "premium",
          status: i === 3 ? "occupied" : "available",
          price: 39,
          features: ["premium"],
        },
        {
          id: `${i + 1}G`,
          row: i + 1,
          letter: "G",
          type: "premium",
          status: "available",
          price: 39,
          features: ["premium"],
        },
        {
          id: `${i + 1}H`,
          row: i + 1,
          letter: "H",
          type: "premium",
          status: i === 4 ? "occupied" : "available",
          price: 39,
          features: ["aisle", "premium"],
        },
        {
          id: `${i + 1}J`,
          row: i + 1,
          letter: "J",
          type: "premium",
          status: i === 1 ? "occupied" : "available",
          price: 39,
          features: ["premium"],
        },
        {
          id: `${i + 1}K`,
          row: i + 1,
          letter: "K",
          type: "premium",
          status: i === 2 ? "occupied" : "available",
          price: 39,
          features: ["window", "premium"],
        },
      ],
    })),

    // Rows 6-15 (Standard seats)
    ...Array.from({ length: 10 }, (_, i) => ({
      row: i + 6,
      seats: [
        {
          id: `${i + 6}A`,
          row: i + 6,
          letter: "A",
          type: "standard",
          status:
            i % 3 === 0 ? "occupied" : i % 4 === 0 ? "blocked" : "available",
          price: 0,
          features: ["window"],
        },
        {
          id: `${i + 6}B`,
          row: i + 6,
          letter: "B",
          type: "standard",
          status: i % 2 === 0 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 6}C`,
          row: i + 6,
          letter: "C",
          type: "standard",
          status: i % 5 === 0 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 6}D`,
          row: i + 6,
          letter: "D",
          type: "standard",
          status: i === 3 ? "occupied" : "available",
          price: 0,
          features: ["aisle"],
        },
        {
          id: `${i + 6}E`,
          row: i + 6,
          letter: "E",
          type: "standard",
          status: "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 6}F`,
          row: i + 6,
          letter: "F",
          type: "standard",
          status: i === 7 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 6}G`,
          row: i + 6,
          letter: "G",
          type: "standard",
          status: i === 5 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 6}H`,
          row: i + 6,
          letter: "H",
          type: "standard",
          status: i % 6 === 0 ? "occupied" : "available",
          price: 0,
          features: ["aisle"],
        },
        {
          id: `${i + 6}J`,
          row: i + 6,
          letter: "J",
          type: "standard",
          status: i === 2 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 6}K`,
          row: i + 6,
          letter: "K",
          type: "standard",
          status: i === 8 ? "occupied" : "available",
          price: 0,
          features: ["window"],
        },
      ],
    })),

    // Rows 16-20 (Extra legroom seats)
    ...Array.from({ length: 5 }, (_, i) => ({
      row: i + 16,
      seats: [
        {
          id: `${i + 16}A`,
          row: i + 16,
          letter: "A",
          type: "extra-legroom",
          status: i === 0 ? "occupied" : "available",
          price: 49,
          features: ["window", "extra-legroom"],
        },
        {
          id: `${i + 16}B`,
          row: i + 16,
          letter: "B",
          type: "extra-legroom",
          status: i === 2 ? "blocked" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 16}C`,
          row: i + 16,
          letter: "C",
          type: "extra-legroom",
          status: i === 1 ? "occupied" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 16}D`,
          row: i + 16,
          letter: "D",
          type: "extra-legroom",
          status: i === 4 ? "occupied" : "available",
          price: 49,
          features: ["aisle", "extra-legroom"],
        },
        {
          id: `${i + 16}E`,
          row: i + 16,
          letter: "E",
          type: "extra-legroom",
          status: "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 16}F`,
          row: i + 16,
          letter: "F",
          type: "extra-legroom",
          status: i === 3 ? "blocked" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 16}G`,
          row: i + 16,
          letter: "G",
          type: "extra-legroom",
          status: i === 0 ? "occupied" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 16}H`,
          row: i + 16,
          letter: "H",
          type: "extra-legroom",
          status: "available",
          price: 49,
          features: ["aisle", "extra-legroom"],
        },
        {
          id: `${i + 16}J`,
          row: i + 16,
          letter: "J",
          type: "extra-legroom",
          status: i === 2 ? "occupied" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 16}K`,
          row: i + 16,
          letter: "K",
          type: "extra-legroom",
          status: i === 1 ? "blocked" : "available",
          price: 49,
          features: ["window", "extra-legroom"],
        },
      ],
    })),

    // Rows 21-30 (Standard seats)
    ...Array.from({ length: 10 }, (_, i) => ({
      row: i + 21,
      seats: [
        {
          id: `${i + 21}A`,
          row: i + 21,
          letter: "A",
          type: "standard",
          status: i % 7 === 0 ? "occupied" : "available",
          price: 0,
          features: ["window"],
        },
        {
          id: `${i + 21}B`,
          row: i + 21,
          letter: "B",
          type: "standard",
          status: i % 3 === 0 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 21}C`,
          row: i + 21,
          letter: "C",
          type: "standard",
          status: i === 5 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 21}D`,
          row: i + 21,
          letter: "D",
          type: "standard",
          status: "available",
          price: 0,
          features: ["aisle"],
        },
        {
          id: `${i + 21}E`,
          row: i + 21,
          letter: "E",
          type: "standard",
          status: i % 2 === 0 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 21}F`,
          row: i + 21,
          letter: "F",
          type: "standard",
          status: i === 8 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 21}G`,
          row: i + 21,
          letter: "G",
          type: "standard",
          status: i === 2 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 21}H`,
          row: i + 21,
          letter: "H",
          type: "standard",
          status: i % 5 === 0 ? "blocked" : "available",
          price: 0,
          features: ["aisle"],
        },
        {
          id: `${i + 21}J`,
          row: i + 21,
          letter: "J",
          type: "standard",
          status: "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 21}K`,
          row: i + 21,
          letter: "K",
          type: "standard",
          status: i === 3 ? "occupied" : "available",
          price: 0,
          features: ["window"],
        },
      ],
    })),

    // Rows 31-35 (Extra legroom seats)
    ...Array.from({ length: 5 }, (_, i) => ({
      row: i + 31,
      seats: [
        {
          id: `${i + 31}A`,
          row: i + 31,
          letter: "A",
          type: "extra-legroom",
          status: i === 4 ? "occupied" : "available",
          price: 49,
          features: ["window", "extra-legroom"],
        },
        {
          id: `${i + 31}B`,
          row: i + 31,
          letter: "B",
          type: "extra-legroom",
          status: i === 1 ? "blocked" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 31}C`,
          row: i + 31,
          letter: "C",
          type: "extra-legroom",
          status: "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 31}D`,
          row: i + 31,
          letter: "D",
          type: "extra-legroom",
          status: i === 3 ? "occupied" : "available",
          price: 49,
          features: ["aisle", "extra-legroom"],
        },
        {
          id: `${i + 31}E`,
          row: i + 31,
          letter: "E",
          type: "extra-legroom",
          status: i === 0 ? "blocked" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 31}F`,
          row: i + 31,
          letter: "F",
          type: "extra-legroom",
          status: i === 2 ? "occupied" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 31}G`,
          row: i + 31,
          letter: "G",
          type: "extra-legroom",
          status: "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 31}H`,
          row: i + 31,
          letter: "H",
          type: "extra-legroom",
          status: i === 4 ? "blocked" : "available",
          price: 49,
          features: ["aisle", "extra-legroom"],
        },
        {
          id: `${i + 31}J`,
          row: i + 31,
          letter: "J",
          type: "extra-legroom",
          status: i === 1 ? "occupied" : "available",
          price: 49,
          features: ["extra-legroom"],
        },
        {
          id: `${i + 31}K`,
          row: i + 31,
          letter: "K",
          type: "extra-legroom",
          status: i === 3 ? "blocked" : "available",
          price: 49,
          features: ["window", "extra-legroom"],
        },
      ],
    })),

    // Rows 36-40 (Standard seats)
    ...Array.from({ length: 5 }, (_, i) => ({
      row: i + 36,
      seats: [
        {
          id: `${i + 36}A`,
          row: i + 36,
          letter: "A",
          type: "standard",
          status: i === 2 ? "occupied" : "available",
          price: 0,
          features: ["window"],
        },
        {
          id: `${i + 36}B`,
          row: i + 36,
          letter: "B",
          type: "standard",
          status: i === 1 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 36}C`,
          row: i + 36,
          letter: "C",
          type: "standard",
          status: i === 4 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 36}D`,
          row: i + 36,
          letter: "D",
          type: "standard",
          status: i === 3 ? "blocked" : "available",
          price: 0,
          features: ["aisle"],
        },
        {
          id: `${i + 36}E`,
          row: i + 36,
          letter: "E",
          type: "standard",
          status: "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 36}F`,
          row: i + 36,
          letter: "F",
          type: "standard",
          status: i === 0 ? "occupied" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 36}G`,
          row: i + 36,
          letter: "G",
          type: "standard",
          status: i === 2 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 36}H`,
          row: i + 36,
          letter: "H",
          type: "standard",
          status: i === 1 ? "occupied" : "available",
          price: 0,
          features: ["aisle"],
        },
        {
          id: `${i + 36}J`,
          row: i + 36,
          letter: "J",
          type: "standard",
          status: i === 4 ? "blocked" : "available",
          price: 0,
          features: [],
        },
        {
          id: `${i + 36}K`,
          row: i + 36,
          letter: "K",
          type: "standard",
          status: i === 3 ? "occupied" : "available",
          price: 0,
          features: ["window"],
        },
      ],
    })),
  ];

  // Exit rows and special features
  const exitRows = [12, 25, 38];
  const bassinetRows = [1, 16, 31];

  // Add exit row and bassinet features
  seatMap.forEach((row) => {
    if (exitRows.includes(row.row)) {
      row.seats.forEach((seat) => {
        seat.features.push("exit");
      });
    }
    if (bassinetRows.includes(row.row)) {
      // Bassinet available on specific seats
      ["D", "E", "F", "G"].forEach((letter) => {
        const seat = row.seats.find((s) => s.letter === letter);
        if (seat) seat.features.push("bassinet");
      });
    }
  });

  const seatCategories = [
    {
      id: "standard",
      name: "Standard Seat",
      description: "Comfortable standard seat with all amenities",
      price: "Free",
      features: ["Standard legroom", "Recliner", "Personal screen"],
      color: "bg-white border-gray-300",
      icon: Armchair,
    },
    {
      id: "extra-legroom",
      name: "Extra Legroom",
      description: 'Up to 6" additional legroom for more comfort',
      price: "+$49",
      features: ["Extra legroom", "Priority boarding", "Early boarding"],
      color: "bg-blue-50 border-blue-300",
      icon: Armchair,
    },
    {
      id: "premium",
      name: "Premium Seat",
      description: "Premium seats with enhanced features",
      price: "+$39",
      features: ["Extra legroom", "Premium amenities", "Best views"],
      color: "bg-amber-50 border-amber-300",
      icon: Star,
    },
  ];

  const getSeatColor = (seat: any) => {
    if (seat.status === "occupied")
      return "bg-gray-200 border-gray-300 cursor-not-allowed opacity-50";
    if (seat.status === "blocked")
      return "bg-gray-100 border-gray-200 cursor-not-allowed opacity-30";
    if (selectedSeats.includes(seat.id))
      return "bg-green-500 border-green-600 text-white";

    switch (seat.type) {
      case "premium":
        return "bg-amber-50 border-amber-300 hover:bg-amber-100";
      case "extra-legroom":
        return "bg-blue-50 border-blue-300 hover:bg-blue-100";
      default:
        return "bg-white border-gray-300 hover:bg-gray-50";
    }
  };

  const handleSeatClick = (seat: any) => {
    if (seat.status !== "available") return;

    if (familyMode) {
      // Family mode - select adjacent seats
      const familySeats = findFamilySeats(seat);
      if (familySeats) {
        setSelectedSeats(familySeats.map((s) => s.id));
      }
    } else {
      // Normal mode - toggle single seat
      if (selectedSeats.includes(seat.id)) {
        setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
      } else if (selectedSeats.length < passengers.length) {
        setSelectedSeats([...selectedSeats, seat.id]);
      }
    }
  };

  const findFamilySeats = (startSeat: any) => {
    // Simple algorithm to find adjacent seats
    const neededSeats = passengers.length;
    const availableSeats: any[] = [];

    // Look in same row
    const row = seatMap.find((r) => r.row === startSeat.row);
    if (row) {
      const startCol = row.seats.findIndex((s) => s.id === startSeat.id);
      for (let i = 0; i < neededSeats; i++) {
        const seat = row.seats[startCol + i];
        if (seat && seat.status === "available") {
          availableSeats.push(seat);
        } else {
          return null;
        }
      }
    }
    return availableSeats.length === neededSeats ? availableSeats : null;
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      for (const row of seatMap) {
        const seat = row.seats.find((s: any) => s.id === seatId);
        if (seat) return total + (seat.price || 0);
      }
      return total;
    }, 0);
  };

  const getSeatPreview = (seatId: string) => {
    for (const row of seatMap) {
      const seat = row.seats.find((s: any) => s.id === seatId);
      if (seat) return seat;
    }
    return null;
  };

  // During server-side rendering, show a loading state or static version
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-400">Loading seat map...</p>
        </div>
      </div>
    );
  }

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
                <div className="w-6 h-6 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center text-xs">
                  3
                </div>
                <span className="text-sm text-gray-400">Payment</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.min(zoom + 0.1, 1.5))}
                className="p-1.5 hover:bg-gray-100 rounded-md"
              >
                <ZoomIn className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={() => setZoom(Math.max(zoom - 0.1, 0.8))}
                className="p-1.5 hover:bg-gray-100 rounded-md"
              >
                <ZoomOut className="w-4 h-4 text-gray-500" />
              </button>
              <span className="text-sm text-gray-500">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content - Seat Map */}
          <div className="flex-1">
            {/* Aircraft Info */}
            <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h1 className="text-lg font-medium">Select Your Seats</h1>
                    <p className="text-sm text-gray-500">
                      Airbus A380 · 3 passengers
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-600">Available</span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full ml-2"></span>
                    <span className="text-xs text-gray-600">Occupied</span>
                    <span className="w-2 h-2 bg-amber-500 rounded-full ml-2"></span>
                    <span className="text-xs text-gray-600">Premium</span>
                  </div>
                </div>

                {/* Deck Selection */}
                <div className="flex space-x-1 border border-gray-200 rounded-md p-1">
                  <button
                    onClick={() => setActiveDeck("main")}
                    className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                      activeDeck === "main"
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Main Deck
                  </button>
                  <button
                    onClick={() => setActiveDeck("upper")}
                    className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                      activeDeck === "upper"
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Upper Deck
                  </button>
                </div>

                {/* Family Mode Toggle */}
                <button
                  onClick={() => setFamilyMode(!familyMode)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${
                    familyMode
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Users2 className="w-4 h-4" />
                  <span className="text-sm">Family Mode</span>
                  {familyMode && <Check className="w-3 h-3 ml-1" />}
                </button>
              </div>
            </div>

            {/* Seat Map Container */}
            <div className="bg-white rounded-md border border-gray-200 p-6 overflow-x-auto">
              {/* Aircraft Shape */}
              <div className="relative min-w-[800px]">
                {/* Aircraft Nose */}
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-16 bg-gray-100 rounded-t-full border border-gray-300 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                {/* Seat Map Grid */}
                <div
                  className="space-y-1 transition-transform duration-300"
                  style={{ transform: `scale(${zoom})` }}
                >
                  {seatMap.map((row) => (
                    <div key={row.row} className="flex items-center">
                      {/* Row Number */}
                      <div className="w-8 text-xs text-gray-400 font-medium">
                        {row.row}
                      </div>

                      {/* Left Aisle Seats (A-C) */}
                      <div className="flex space-x-1 mr-4">
                        {row.seats.slice(0, 3).map((seat: any) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setShowSeatPreview(seat.id)}
                            onMouseLeave={() => setShowSeatPreview(null)}
                            disabled={seat.status !== "available"}
                            className={`
                              relative w-10 h-10 rounded-md border-2 text-xs font-medium
                              transition-all duration-200
                              ${getSeatColor(seat)}
                              ${seat.features.includes("exit") ? "border-orange-400" : ""}
                              ${seat.features.includes("bassinet") ? "ring-2 ring-blue-300" : ""}
                              hover:scale-105 hover:shadow-md
                              disabled:hover:scale-100 disabled:cursor-not-allowed
                            `}
                            title={`Seat ${seat.id} - ${seat.type} - ${seat.status}`}
                          >
                            {seat.letter}
                            {seat.price > 0 && (
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full text-[8px] text-white flex items-center justify-center">
                                $
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Left Aisle */}
                      <div className="w-6 flex justify-center">
                        <div className="w-1 h-8 bg-gray-200 rounded-full"></div>
                      </div>

                      {/* Middle Seats (D-G) */}
                      <div className="flex space-x-1">
                        {row.seats.slice(3, 7).map((seat: any) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setShowSeatPreview(seat.id)}
                            onMouseLeave={() => setShowSeatPreview(null)}
                            disabled={seat.status !== "available"}
                            className={`
                              relative w-10 h-10 rounded-md border-2 text-xs font-medium
                              transition-all duration-200
                              ${getSeatColor(seat)}
                              ${seat.features.includes("exit") ? "border-orange-400" : ""}
                              ${seat.features.includes("bassinet") ? "ring-2 ring-blue-300" : ""}
                              hover:scale-105 hover:shadow-md
                              disabled:hover:scale-100 disabled:cursor-not-allowed
                            `}
                            title={`Seat ${seat.id} - ${seat.type} - ${seat.status}`}
                          >
                            {seat.letter}
                          </button>
                        ))}
                      </div>

                      {/* Right Aisle */}
                      <div className="w-6 flex justify-center">
                        <div className="w-1 h-8 bg-gray-200 rounded-full"></div>
                      </div>

                      {/* Right Seats (J-K) */}
                      <div className="flex space-x-1 ml-4">
                        {row.seats.slice(7, 10).map((seat: any) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            onMouseEnter={() => setShowSeatPreview(seat.id)}
                            onMouseLeave={() => setShowSeatPreview(null)}
                            disabled={seat.status !== "available"}
                            className={`
                              relative w-10 h-10 rounded-md border-2 text-xs font-medium
                              transition-all duration-200
                              ${getSeatColor(seat)}
                              ${seat.features.includes("exit") ? "border-orange-400" : ""}
                              ${seat.features.includes("bassinet") ? "ring-2 ring-blue-300" : ""}
                              hover:scale-105 hover:shadow-md
                              disabled:hover:scale-100 disabled:cursor-not-allowed
                            `}
                            title={`Seat ${seat.id} - ${seat.type} - ${seat.status}`}
                          >
                            {seat.letter}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Aircraft Tail */}
                <div className="flex justify-center mt-8">
                  <div className="w-32 h-12 bg-gray-100 rounded-b-full border border-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-400">
                      Galley & Lavatory
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Legend */}
            {showLegend && (
              <div className="bg-white rounded-md border border-gray-200 p-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Seat Legend</h3>
                  <button onClick={() => setShowLegend(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
                    <span className="text-xs text-gray-600">
                      Standard (Free)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-50 border-2 border-blue-300 rounded"></div>
                    <span className="text-xs text-gray-600">
                      Extra Legroom (+$49)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-amber-50 border-2 border-amber-300 rounded"></div>
                    <span className="text-xs text-gray-600">
                      Premium (+$39)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded"></div>
                    <span className="text-xs text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded"></div>
                    <span className="text-xs text-gray-600">Occupied</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded"></div>
                    <span className="text-xs text-gray-600">Blocked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 border-2 border-orange-400 rounded"></div>
                    <span className="text-xs text-gray-600">Exit Row</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 ring-2 ring-blue-300 rounded"></div>
                    <span className="text-xs text-gray-600">Bassinet</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Seat Selection & Preview */}
          <div className="lg:w-96 flex-shrink-0">
            {/* Seat Preview */}
            {showSeatPreview && (
              <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
                <h3 className="font-medium mb-3">Seat Preview</h3>
                {(() => {
                  const seat = getSeatPreview(showSeatPreview);
                  if (!seat) return null;
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light">
                          Seat {seat.id}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                          ${
                            seat.type === "premium"
                              ? "bg-amber-100 text-amber-700"
                              : seat.type === "extra-legroom"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {seat.type === "premium"
                            ? "Premium"
                            : seat.type === "extra-legroom"
                              ? "Extra Legroom"
                              : "Standard"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Row</p>
                          <p className="font-medium">{seat.row}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500">Position</p>
                          <p className="font-medium capitalize">
                            {seat.features.includes("window")
                              ? "Window"
                              : seat.features.includes("aisle")
                                ? "Aisle"
                                : "Center"}
                          </p>
                        </div>
                      </div>

                      {seat.price > 0 && (
                        <div className="bg-amber-50 p-3 rounded-md">
                          <p className="text-sm text-amber-700">Seat Price</p>
                          <p className="text-2xl font-light text-amber-700">
                            +${seat.price}
                          </p>
                        </div>
                      )}

                      <div className="border-t border-gray-100 pt-3">
                        <p className="text-xs font-medium mb-2">Features:</p>
                        <div className="flex flex-wrap gap-2">
                          {seat.features
                            .filter(
                              (f: string) =>
                                ![
                                  "window",
                                  "aisle",
                                  "premium",
                                  "extra-legroom",
                                ].includes(f),
                            )
                            .map((feature: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {feature.replace("-", " ")}
                              </span>
                            ))}
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            USB Port
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            12" Screen
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Selected Seats */}
            <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
              <h3 className="font-medium mb-3">Selected Seats</h3>

              {selectedSeats.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  No seats selected yet
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedSeats.map((seatId, index) => {
                    const seat = getSeatPreview(seatId);
                    return (
                      <div
                        key={seatId}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-medium">
                            {seat?.letter}
                          </div>
                          <div>
                            <p className="font-medium">Seat {seatId}</p>
                            <p className="text-xs text-gray-500">
                              Passenger: {passengers[index].name}
                            </p>
                          </div>
                        </div>
                        {seat?.price > 0 && (
                          <span className="text-sm font-medium">
                            +${seat.price}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Passenger Selection Dropdown */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <label className="block text-xs text-gray-500 mb-1.5">
                  Assign seat for
                </label>
                <select
                  value={selectedPassenger}
                  onChange={(e) =>
                    setSelectedPassenger(parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                >
                  {passengers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
              <h3 className="font-medium mb-3">Price Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Base fare (3 passengers)
                  </span>
                  <span className="font-medium">$2,697</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Seat selection</span>
                  <span className="font-medium">+${calculateTotal()}</span>
                </div>
                <div className="border-t border-gray-100 my-2"></div>
                <div className="flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span>${2697 + calculateTotal()}</span>
                </div>
              </div>

              {/* Family Seat Suggestion */}
              {familyMode && selectedSeats.length === 0 && (
                <div className="bg-purple-50 rounded-md p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">
                        Family Seating Available
                      </p>
                      <p className="text-xs text-purple-700 mt-1">
                        We found adjacent seats for your family in rows 22-24
                      </p>
                      <button className="mt-2 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700">
                        View Family Seats
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                disabled={selectedSeats.length !== passengers.length}
                className={`w-full py-3 rounded-md text-sm font-medium transition-colors ${
                  selectedSeats.length === passengers.length
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedSeats.length === passengers.length
                  ? "Continue to Payment"
                  : `Select ${passengers.length - selectedSeats.length} more seat${passengers.length - selectedSeats.length > 1 ? "s" : ""}`}
              </button>
            </div>

            {/* Seat Filters */}
            <div className="bg-white rounded-md border border-gray-200 p-4">
              <h3 className="font-medium mb-3">Filter Seats</h3>

              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seatFilters.available}
                    onChange={(e) =>
                      setSeatFilters({
                        ...seatFilters,
                        available: e.target.checked,
                      })
                    }
                    className="w-4 h-4 border-gray-300 rounded text-gray-900"
                  />
                  <span className="text-sm text-gray-600">
                    Show only available
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seatFilters.window}
                    onChange={(e) =>
                      setSeatFilters({
                        ...seatFilters,
                        window: e.target.checked,
                      })
                    }
                    className="w-4 h-4 border-gray-300 rounded text-gray-900"
                  />
                  <span className="text-sm text-gray-600">Window seats</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seatFilters.aisle}
                    onChange={(e) =>
                      setSeatFilters({
                        ...seatFilters,
                        aisle: e.target.checked,
                      })
                    }
                    className="w-4 h-4 border-gray-300 rounded text-gray-900"
                  />
                  <span className="text-sm text-gray-600">Aisle seats</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seatFilters.extraLegroom}
                    onChange={(e) =>
                      setSeatFilters({
                        ...seatFilters,
                        extraLegroom: e.target.checked,
                      })
                    }
                    className="w-4 h-4 border-gray-300 rounded text-gray-900"
                  />
                  <span className="text-sm text-gray-600">Extra legroom</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seatFilters.nearExit}
                    onChange={(e) =>
                      setSeatFilters({
                        ...seatFilters,
                        nearExit: e.target.checked,
                      })
                    }
                    className="w-4 h-4 border-gray-300 rounded text-gray-900"
                  />
                  <span className="text-sm text-gray-600">Near exits</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
