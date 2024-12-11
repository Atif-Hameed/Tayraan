'use client';

import { useState } from "react";
import BestOffer from "./components/website/home/best-offer";
import HeroSection from "./components/website/home/hero-section";
import TopHotels from "./components/website/home/top-hotels";

export default function Home() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    travelers: "",
    flightType: "round-trip", // default flight type
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
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
        formData={formData}
        handleChange={handleChange}
        cityOptions={cityOptions}
        travelerOptions={travelerOptions}
        handleSubmit={handleSubmit}
      />
      <BestOffer />
      <TopHotels />
    </div>
  );
}
