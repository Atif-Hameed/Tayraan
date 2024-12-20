'use client';

import { useEffect, useState } from "react";
import BestOffer from "./components/website/home/best-offer";
import HeroSection from "./components/website/home/hero-section";
import TopHotels from "./components/website/home/top-hotels";
import TopDeals from "./components/website/home/top-deals";
import Footer from "./components/website/home/Footer";
import TopFlights from "./components/website/home/popular-fligts";
import MobileAppSection from "./components/website/home/mobile-app-section";
import Navbar from "./components/shared/navbar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [flightFormData, setFlightFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    travelers: "",
    class: "",
    flightType: "round-trip", // default flight type
  });
  const [hotelFormData, setHotelFormData] = useState({
    address: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
  });




  const router = useRouter()
  const handleFlightChange = (name: string, value: any) => {
    setFlightFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleHotelChange = (name: string, value: any) => {
    setHotelFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFlightSubmit = () => {
    const { from, to, departure, return: returnDate, travelers, class: flightClass } = flightFormData;


    console.log("Flight Form Data Submitted:", flightFormData);

    router.push(
      `/flight-search?origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&departureDate=${encodeURIComponent(departure)}&returnDate=${encodeURIComponent(returnDate)}&travelers=${encodeURIComponent(travelers)}&class=${encodeURIComponent(flightClass)}`
    );
  };

  // Handle hotel form submission
  const handleHotelSubmit = () => {
    const { address, checkIn, checkOut, travelers } = hotelFormData;

    if (!address || !checkIn || !checkOut || !travelers) {
      alert("Please fill in all required fields for the hotel search.");
      return;
    }

    console.log("Hotel Form Data Submitted:", hotelFormData);

    router.push(
      `/hotel-search?address=${encodeURIComponent(address)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&travelers=${encodeURIComponent(travelers)}`
    );
  };
  const cityOptions = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Riyadh", value: "Riyadh" },
    { label: "New York", value: "New York" },
  ];

  const travelerOptions = [
    { label: "1 Traveler", value: "1" },
    { label: "2 Travelers", value: "2" },
    { label: "3 Travelers", value: "3" },
  ];



  return (
    <div>
      <div className="sticky top-0 left-0 z-50">
        <Navbar />
      </div>
      <HeroSection
        flightFormData={flightFormData}
        hotelFormData={hotelFormData}
        handleFlightChange={handleFlightChange}
        cityOptions={cityOptions}
        travelerOptions={travelerOptions}
        handleFlightSubmit={handleFlightSubmit}
        handleHotelChange={handleHotelChange}
        handleHotelSubmit={handleHotelSubmit}
      />
      <BestOffer />
      <TopHotels />
      <TopDeals />
      <TopFlights />
      <MobileAppSection />
      <Footer />
    </div>
  );
}
