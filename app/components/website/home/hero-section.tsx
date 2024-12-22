import React, { useEffect, useState } from "react";
import CustomSelect from "../../shared/customSelect";
import { AiroplanIcon, ArrowCircleIcon, BedIcon } from "@/app/svg";
import { LuSearch } from "react-icons/lu";
import Section from "../../shared/section";
import CustomInput from "../../shared/CustomInput";
import CustomInputSelect from "../../shared/CustomInputSelect";
import AirportSearchField from "../../shared/airport-search-field";

import fromImg from "/public/assets/from.png";
import toImg from "/public/assets/to.png";
type HeroSectionProps = {
  flightFormData: {
    from: string;
    to: string;
    departure: string;
    return: string;
    travelers: string;
    class: string;
    flightType: string;
  };
  hotelFormData: {
    address: string;
    checkIn: string;
    checkOut: string;
    travelers: string;
  };
  loading: boolean;
  searchedAirports: any,
  handleFlightChange: (name: string, value: any) => void;
  handleHotelChange: (name: string, value: any) => void;
  cityOptions: { label: string; value: string }[];
  travelerOptions: { label: string; value: string }[];
  handleFlightSubmit: () => void;
  handleHotelSubmit: () => void;
  GetAirpports: (keyword: string) => Promise<void>;

};

const HeroSection: React.FC<HeroSectionProps> = ({
  flightFormData,
  hotelFormData,
  handleFlightChange,
  handleHotelChange,
  cityOptions,
  travelerOptions,
  handleFlightSubmit,
  handleHotelSubmit,
  GetAirpports,
  searchedAirports,
  loading,

}) => {
  const [isHotel, setIsHotel] = useState(false); // State to control flex row reverse
  const [searchTermFrom, setSearchTermFrom] = useState("");
  const [searchTermTo, setSearchTermTo] = useState("");

  // Function to toggle row-reverse
  const toggleHotlFlight = () => {
    setIsHotel(!isHotel);
  };
  const flightClassOptions = [
    { label: "Economy", value: "ECONOMY" },
    { label: "Premium Economy", value: "PREMIUM_ECONOMY" },
    { label: "Business", value: "BUSINESS" },
    { label: "First Class", value: "FIRST" },
  ];

  useEffect(() => {

    if (searchTermFrom) {
      GetAirpports(searchTermFrom)
    }
    else if (searchTermTo) {
      GetAirpports(searchTermTo)
    }

  }, [searchTermFrom, searchTermTo])

  return (
    <div className="w-full bg-heroBanner min-h-screen 2xl:min-h-auto py-20 lg:py-32 items-center bg-bottom bg-no-repeat bg-cover">
      <Section>
        <div className="gap-8 flex xl:flex-row flex-col ju items-center">
          <div data-aos="zoom-in-up" className="xl:w-1/2 w-full text-white flex flex-col gap-6">
            <h1 className="font-cairo font-bold lg:text-7xl text-5xl">
              Let’s book your next trip!
            </h1>
            <p className="font-montserrat font-bold text-lg">
              Choose from over 1.5 million hotels & 450+ airlines
            </p>
          </div>

          <div data-aos="zoom-in-up" className="relative bg-white rounded-2xl py-5 lg:py-0 bg-top-right lg:h-full px-5 h-auto bg-no-repeat lg:w-1/2 w-full bg-contain">
            {/* Section to toggle row reverse */}
            <div
              className={`flex justify-between gap-4 w-full py-2 ${isHotel ? "flex-row-reverse" : ""
                }`}
            >
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-2">
                  {isHotel ? (
                    <BedIcon color={"#000"} />
                  ) : (
                    <AiroplanIcon color={"#121212"} />
                  )}
                  <h1 className="text-2xl font-[400]">
                    {isHotel ? "Hotels" : "Flights"}
                  </h1>
                </div>
                <div className="cursor-pointer" onClick={toggleHotlFlight}>
                  <ArrowCircleIcon />
                </div>
              </div>

              <button
                className="py-4 px-5 md:text-xl text-base font-semibold rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                onClick={toggleHotlFlight}
              >
                {isHotel ? <AiroplanIcon color={"#fff"} /> : <BedIcon color={"#fff"} />}
                {isHotel ? "Flights" : "Hotels"}
              </button>
            </div>

            {!isHotel ? (
              // Flight form
              <div>

                {/* Flight type and form fields */}
                <div className="flex items-center flex-wrap lg:gap-7 gap-4 py-3 lg:py-3 px-6">
                  {["round-trip", "one-way", "multi-city"].map((type) => (
                    <div className="flex items-center gap-2" key={type}>
                      <input
                        type="radio"
                        name="flightType"
                        value={type}
                        className="h-[17px] w-[17px] custom-input-color"
                        checked={flightFormData.flightType === type}
                        onChange={() => handleFlightChange("flightType", type)}
                      />
                      <p>{type.replace("-", " ")}</p>
                    </div>
                  ))}
                </div>

                {/* Form fields */}
                <div className="border-t border-bordered gap-4 py-4 mt-2 grid lg:grid-cols-2 px-4">
                  {/* <CustomInputSelect
                    options={searchedAirports}
                    searchTerm={searchTermFrom}
                    setSearchTerm={setSearchTermFrom}
                    className="!border-b py-2 border-bordered"
                    placeholder="From"
                    label="From"
                    name="from"
                    loading={loading}
                    value={flightFormData.from}
                    onChange={(value) => handleFlightChange("from", value)}
                  /> */}
                  <AirportSearchField label="From" placeholder="From" className="border-b py-2 !border-borderColor" onSelect={(value) => handleFlightChange("from", value)} icon={fromImg} />
                  <AirportSearchField label="To" placeholder="To" className="border-b py-2 !border-borderColor" onSelect={(value) => handleFlightChange("to", value)} icon={toImg} filterItem={flightFormData.from} />
                  {/* <CustomInputSelect
                    options={searchedAirports.filter((item: any) => item.iataCode !== flightFormData.from)}
                    searchTerm={searchTermTo}
                    setSearchTerm={setSearchTermTo}
                    placeholder="To"
                    className="!border-b py-2 border-bordered"
                    label="To"
                    name="to"
                    loading={loading}
                    value={flightFormData.to}
                    onChange={(value) => handleFlightChange("to", value)}
                  /> */}


                  <div className="flex flex-col g">
                    <label htmlFor="">Departure Date</label>
                    <input type="date"
                      placeholder="Departure Date"
                      name="departure"
                      value={flightFormData.departure}
                      className="border-b py-2 border-bordered"
                      min={new Date().toISOString().split("T")[0]} // Current date as min
                      onChange={(e) => {
                        const value = e.target.value;
                        handleFlightChange("departure", value);

                        // Ensure return date is updated if it's less than departure date
                        if (new Date(flightFormData.return) <= new Date(value)) {
                          handleFlightChange("return", ""); // Clear return date
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col ">
                    <label htmlFor="">Return Date</label>
                    <input type="date"
                      className="border-b py-2 border-bordered"
                      placeholder="Return Date"
                      name="return"
                      value={flightFormData.return}
                      min={flightFormData.departure || new Date().toISOString().split("T")[0]} // Use departure as min if set
                      onChange={(e) => handleFlightChange("return", e.target.value)}
                    />
                  </div>



                  <div className="flex gap-3">
                    <CustomSelect
                      options={travelerOptions}
                      placeholder="Travelers "
                      label="Travelers & Class"
                      name="travelers"
                      value={flightFormData.travelers}
                      onChange={(value) => handleFlightChange("travelers", value)}
                    />
                    <CustomSelect
                      options={flightClassOptions}
                      placeholder="Class"
                      label=" Class"
                      name="class"
                      value={flightFormData.class}
                      onChange={(value) => handleFlightChange("class", value)}
                    />

                  </div>
                  <button
                    onClick={handleFlightSubmit}
                    className="py-4 px-5 w-full md:text-xl mt-2 justify-center text-base rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                  >
                    <LuSearch />
                    Search
                  </button>
                </div>
              </div>
            ) : (
              // Hotel form
              <div>
                <div className="border-t border-bordered gap-4 py-4 mt-2 grid lg:grid-cols-2 px-4">
                  <div className="col-span-2">
                    <CustomSelect
                      options={cityOptions}
                      placeholder="City, Property name or Locations"
                      label="City, Property name or Locations"
                      name="address"
                      value={hotelFormData.address}
                      onChange={(value) => handleHotelChange("address", value)}
                    />
                  </div>



                  <div className="flex flex-col gap-4">
                    <label htmlFor="">Check-In</label>
                    <input type="date"
                      placeholder="Check-In "
                      name="checkIn"
                      value={hotelFormData.checkIn}
                      min={new Date().toISOString().split("T")[0]} // Current date as min
                      onChange={(e) => {
                        const value = e.target.value;
                        handleHotelChange("checkIn", value);

                        // Ensure check-out is updated if it's less than check-in
                        if (new Date(hotelFormData.checkOut) <= new Date(value)) {
                          handleHotelChange("checkOut", ""); // Clear check-out
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <label htmlFor="">Check-Out </label>
                    <input type="date"

                      placeholder="Return Date"

                      name="checkOut"
                      value={hotelFormData.checkOut}
                      min={hotelFormData.checkIn || new Date().toISOString().split("T")[0]} // Use check-in as min if set
                      onChange={(e) => handleHotelChange("checkOut", e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <CustomSelect
                      options={travelerOptions}
                      placeholder="Travelers "
                      label="Travelers & Class"
                      name="travelers"
                      value={flightFormData.travelers}
                      onChange={(value) => handleFlightChange("travelers", value)}
                    />
                    <CustomSelect
                      options={flightClassOptions}
                      placeholder="Class"
                      label=" Class"
                      name="class"
                      value={flightFormData.class}
                      onChange={(value) => handleFlightChange("class", value)}
                    />

                  </div>

                  <button
                    onClick={handleHotelSubmit}
                    className="py-4 px-5 w-full md:text-xl mt-2 justify-center text-base rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                  >
                    <LuSearch />
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HeroSection;
