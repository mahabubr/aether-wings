// app/booking/confirmation/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Plane,
  CheckCircle,
  Download,
  Mail,
  Calendar,
  Share2,
  QrCode,
  MapPin,
  Clock,
  Users,
  Luggage,
  Briefcase,
  Printer,
  Copy,
  ChevronRight,
  ArrowRight,
  Award,
  Gift,
  Star,
  Phone,
  Globe,
  Shield,
  Clock3,
  AlertCircle,
  Info,
  Smartphone,
  FileText,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  X,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import QRCode from "qrcode";

export default function BookingConfirmationPage() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Booking data
  const booking = {
    reference: "A7B9K2X5",
    pnr: "EK2N3M4P",
    status: "confirmed",
    bookingDate: "March 10, 2024",
    paymentMethod: "Visa •••• 4242",
    totalPaid: "$3,254.50",

    flight: {
      airline: "Emirates",
      flightNumber: "EK 202",
      operatingCarrier: "Emirates",
      from: {
        code: "JFK",
        city: "New York",
        airport: "John F. Kennedy International Airport",
        terminal: "4",
        gate: "B23",
      },
      to: {
        code: "DXB",
        city: "Dubai",
        airport: "Dubai International Airport",
        terminal: "3",
        gate: "C12",
      },
      departureTime: "22:30",
      departureDate: "March 15, 2024",
      arrivalTime: "19:45",
      arrivalDate: "March 16, 2024",
      duration: "12h 15m",
      aircraft: "Airbus A380-800",
      class: "Business Class",
    },

    returnFlight: {
      airline: "Emirates",
      flightNumber: "EK 201",
      from: {
        code: "DXB",
        city: "Dubai",
        airport: "Dubai International Airport",
        terminal: "3",
      },
      to: {
        code: "JFK",
        city: "New York",
        airport: "John F. Kennedy International Airport",
        terminal: "4",
      },
      departureTime: "08:15",
      departureDate: "March 22, 2024",
      arrivalTime: "14:30",
      arrivalDate: "March 22, 2024",
      duration: "13h 15m",
      aircraft: "Airbus A380-800",
      class: "Business Class",
    },

    passengers: [
      {
        id: 1,
        name: "John Doe",
        type: "Adult",
        seat: "3A",
        passport: "US123456",
        ffNumber: "EK1234567",
        checkedIn: false,
      },
      {
        id: 2,
        name: "Jane Doe",
        type: "Adult",
        seat: "3B",
        passport: "US123457",
        ffNumber: "EK1234568",
        checkedIn: false,
      },
      {
        id: 3,
        name: "Master Doe",
        type: "Child",
        seat: "3C",
        passport: "US123458",
        ffNumber: "",
        checkedIn: false,
      },
    ],

    addOns: [
      { name: "Extra Baggage (23kg)", quantity: 2, price: 90 },
      { name: "Travel Insurance (Premium)", quantity: 3, price: 177 },
      { name: "Priority Boarding", quantity: 3, price: 57 },
      { name: "Lounge Access", quantity: 3, price: 147 },
    ],

    baggage: {
      carryOn: "7kg each",
      checked: "30kg each",
      total: "90kg",
    },

    timeline: [
      { time: "22:30", action: "Departure from JFK", status: "completed" },
      { time: "19:45", action: "Arrival at DXB", status: "pending" },
      { time: "08:15", action: "Departure from DXB", status: "pending" },
      { time: "14:30", action: "Arrival at JFK", status: "pending" },
    ],

    importantInfo: [
      "Check-in opens 48 hours before departure",
      "Visa requirements - Check destination entry requirements",
      "Baggage allowance includes cabin baggage",
      "Special meals must be requested 24 hours in advance",
    ],

    contactInfo: {
      email: "john.doe@email.com",
      phone: "+1 234 567 8900",
      emergencyContact: "Jane Smith: +1 234 567 8901",
    },
  };

  // Generate QR code
  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = JSON.stringify({
          pnr: booking.pnr,
          flight: booking.flight.flightNumber,
          passengers: booking.passengers.map((p) => p.name),
          date: booking.flight.departureDate,
        });
        const url = await QRCode.toDataURL(qrData);
        setQrCodeUrl(url);
      } catch (err) {
        console.error("Error generating QR code", err);
      }
    };
    generateQR();
  }, []);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(booking.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadETicket = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
    // Simulate download
    alert("E-ticket download started");
  };

  const handleEmailTicket = () => {
    setShowEmailModal(true);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowEmailModal(false);
    }, 2000);
  };

  const handleAddToCalendar = () => {
    setAddedToCalendar(true);
    setTimeout(() => setAddedToCalendar(false), 3000);
    // Simulate calendar addition
    alert("Flight added to calendar");
  };

  const handleShare = (platform: string) => {
    // Simulate sharing
    alert(`Shared on ${platform}`);
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Banner */}
      <div className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h1 className="text-lg font-medium">Booking Confirmed!</h1>
                <p className="text-sm text-green-100">
                  Your flight has been successfully booked
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-white text-green-700 rounded-md text-sm font-medium hover:bg-green-50 transition-colors"
            >
              Book Another Flight
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Main Details */}
          <div className="flex-1">
            {/* Booking Reference Card */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Booking Reference (PNR)
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-mono font-light">
                        {booking.reference}
                      </span>
                      <button
                        onClick={handleCopyReference}
                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors relative"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      PNR: {booking.pnr}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleDownloadETicket}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloaded ? "Downloaded!" : "E-Ticket"}</span>
                  </button>
                  <button
                    onClick={handleEmailTicket}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={handleAddToCalendar}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{addedToCalendar ? "Added!" : "Calendar"}</span>
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Flight Summary - Outbound */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Outbound Flight</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {booking.flight.class}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between">
                {/* Departure */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plane className="w-5 h-5 text-gray-600 transform rotate-45" />
                    </div>
                    <div>
                      <p className="text-2xl font-light">
                        {booking.flight.departureTime}
                      </p>
                      <p className="font-medium">{booking.flight.from.code}</p>
                      <p className="text-xs text-gray-400">
                        {booking.flight.from.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Terminal {booking.flight.from.terminal} · Gate{" "}
                        {booking.flight.from.gate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-400 mb-1">
                    {booking.flight.duration}
                  </p>
                  <div className="relative">
                    <div className="border-t border-gray-200 w-full"></div>
                    <Plane className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-90" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Direct</p>
                </div>

                {/* Arrival */}
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      <p className="text-2xl font-light">
                        {booking.flight.arrivalTime}
                      </p>
                      <p className="font-medium">{booking.flight.to.code}</p>
                      <p className="text-xs text-gray-400">
                        {booking.flight.to.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Terminal {booking.flight.to.terminal} · Gate{" "}
                        {booking.flight.to.gate}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plane className="w-5 h-5 text-gray-600 transform -rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Flight Info */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {booking.flight.airline} · {booking.flight.flightNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {booking.flight.departureDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {booking.flight.aircraft}
                  </span>
                </div>
              </div>
            </div>

            {/* Return Flight */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Return Flight</h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {booking.returnFlight.class}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between">
                {/* Departure */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plane className="w-5 h-5 text-gray-600 transform rotate-45" />
                    </div>
                    <div>
                      <p className="text-2xl font-light">
                        {booking.returnFlight.departureTime}
                      </p>
                      <p className="font-medium">
                        {booking.returnFlight.from.code}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.returnFlight.from.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Terminal {booking.returnFlight.from.terminal}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-400 mb-1">
                    {booking.returnFlight.duration}
                  </p>
                  <div className="relative">
                    <div className="border-t border-gray-200 w-full"></div>
                    <Plane className="w-4 h-4 text-gray-400 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-90" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Direct</p>
                </div>

                {/* Arrival */}
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    <div>
                      <p className="text-2xl font-light">
                        {booking.returnFlight.arrivalTime}
                      </p>
                      <p className="font-medium">
                        {booking.returnFlight.to.code}
                      </p>
                      <p className="text-xs text-gray-400">
                        {booking.returnFlight.to.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Terminal {booking.returnFlight.to.terminal}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plane className="w-5 h-5 text-gray-600 transform -rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Flight Info */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {booking.returnFlight.airline} ·{" "}
                    {booking.returnFlight.flightNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {booking.returnFlight.departureDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plane className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {booking.returnFlight.aircraft}
                  </span>
                </div>
              </div>
            </div>

            {/* Passenger List */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h2 className="font-medium mb-4">Passenger Details</h2>

              <div className="space-y-3">
                {booking.passengers.map((passenger, index) => (
                  <div
                    key={passenger.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {passenger.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{passenger.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{passenger.type}</span>
                          <span>•</span>
                          <span>Seat {passenger.seat}</span>
                          {passenger.ffNumber && (
                            <>
                              <span>•</span>
                              <span>FF: {passenger.ffNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          passenger.checkedIn
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {passenger.checkedIn ? "Checked In" : "Check-in closed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Summary */}
            {booking.addOns.length > 0 && (
              <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
                <h2 className="font-medium mb-4">Additional Services</h2>

                <div className="space-y-2">
                  {booking.addOns.map((addon, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {addon.name} x{addon.quantity}
                      </span>
                      <span className="font-medium">${addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="bg-blue-50 rounded-md border border-blue-100 p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-2">
                    Important Information
                  </h3>
                  <ul className="space-y-2">
                    {booking.importantInfo.map((info, index) => (
                      <li
                        key={index}
                        className="text-sm text-blue-700 flex items-start space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - QR & Summary */}
          <div className="lg:w-80 flex-shrink-0">
            {/* QR Code Card */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4 text-center">
              <h3 className="font-medium mb-3">Boarding Pass</h3>

              {qrCodeUrl && (
                <div className="mb-3">
                  <img
                    src={qrCodeUrl}
                    alt="Boarding Pass QR Code"
                    className="w-32 h-32 mx-auto"
                  />
                </div>
              )}

              <p className="text-xs text-gray-500 mb-3">
                Scan QR code at the airport for quick check-in
              </p>

              <div className="flex justify-center space-x-2">
                <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Printer className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h3 className="font-medium mb-4">Booking Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Booking Date</span>
                  <span className="font-medium">{booking.bookingDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium">{booking.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Paid</span>
                  <span className="text-lg font-light">
                    {booking.totalPaid}
                  </span>
                </div>

                <div className="border-t border-gray-100 my-2 pt-2">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    BAGGAGE ALLOWANCE
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Carry-on</span>
                      <span>{booking.baggage.carryOn}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Checked</span>
                      <span>{booking.baggage.checked}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Total</span>
                      <span className="font-medium">
                        {booking.baggage.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-md border border-gray-200 p-6 mb-4">
              <h3 className="font-medium mb-3">Contact Information</h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{booking.contactInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{booking.contactInfo.phone}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Emergency Contact
                  </p>
                  <p className="text-sm">
                    {booking.contactInfo.emergencyContact}
                  </p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-50 rounded-md p-4">
              <div className="flex items-start space-x-3">
                <Headphones className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium mb-1">Need help?</p>
                  <p className="text-xs text-gray-500 mb-2">
                    Our support team is available 24/7
                  </p>
                  <Link
                    href="/support"
                    className="text-xs text-blue-600 hover:underline inline-flex items-center"
                  >
                    Contact Support
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-white rounded-md border border-gray-200 p-6">
          <h2 className="font-medium mb-4">Next Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-blue-600">1</span>
              </div>
              <div>
                <p className="text-sm font-medium">Check-in Online</p>
                <p className="text-xs text-gray-500 mt-1">
                  Opens 48 hours before departure
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-blue-600">2</span>
              </div>
              <div>
                <p className="text-sm font-medium">Select Meals</p>
                <p className="text-xs text-gray-500 mt-1">
                  Pre-order special meals
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-blue-600">3</span>
              </div>
              <div>
                <p className="text-sm font-medium">Arrive at Airport</p>
                <p className="text-xs text-gray-500 mt-1">
                  3 hours before departure
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-blue-600">4</span>
              </div>
              <div>
                <p className="text-sm font-medium">Have a Great Flight!</p>
                <p className="text-xs text-gray-500 mt-1">Enjoy your journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-medium">Share Itinerary</h3>
              <button onClick={() => setShowShareModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleShare("Facebook")}
                  className="text-center hover:opacity-75"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare("Twitter")}
                  className="text-center hover:opacity-75"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Twitter className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="text-xs">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare("LinkedIn")}
                  className="text-center hover:opacity-75"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Linkedin className="w-6 h-6 text-blue-700" />
                  </div>
                  <span className="text-xs">LinkedIn</span>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleCopyReference()}
                  className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <Link2 className="w-4 h-4" />
                  <span className="text-sm">Copy link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-medium">Email Itinerary</h3>
              <button onClick={() => setShowEmailModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSendEmail} className="p-6">
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={booking.contactInfo.email}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Include
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    <span className="text-sm">E-ticket (PDF)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    <span className="text-sm">Receipt</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    <span className="text-sm">Add to calendar</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 flex items-center justify-center space-x-2"
              >
                {emailSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Email</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
