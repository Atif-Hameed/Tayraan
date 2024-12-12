'use client';

import { useState } from "react";
import BestOffer from "./components/website/home/best-offer";
import HeroSection from "./components/website/home/hero-section";
import TopHotels from "./components/website/home/top-hotels";
import TopDeals from "./components/website/home/top-deals";
import Footer from "./components/website/home/Footer";

export default function Home() {
  const [flightFormData, setFlightFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    travelers: "",
    flightType: "round-trip", // default flight type
  });
  const [hotelFormData, setHotelFormData] = useState({
    address: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
  });

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
    console.log("Flight Form Data Submitted:", flightFormData);
  };

  const handleHotelSubmit = () => {
    console.log("Hotel Form Data Submitted:", hotelFormData);
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
      <Footer/>
    </div>
  );
}
