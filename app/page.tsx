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
    flightType: "round-trip", // default flight type
  });
  const [hotelFormData, setHotelFormData] = useState({
    address: "",
    checkIn: "",
    checkOut: "",
    travelers: "",
  });

  const [airports, setAirports] = useState([]); // State to store airport data

  // Fetch and sort airport data when the component mounts
  useEffect(() => {
    const fetchAirports = async () => {

      try {
        const response = await axios.get('/api/airports');
        // Sort airports alphabetically by airport name
        const sortedAirports = response.data
        setAirports(sortedAirports); // Store sorted data in state
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []); // Run only once when the component mounts


  console.log("airports", airports)


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
    console.log("Flight Form Data Submitted:", flightFormData);
    router.push('/flight-search')
  };

  const handleHotelSubmit = () => {
    console.log("Hotel Form Data Submitted:", hotelFormData);
    router.push('/hotel-search')

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
