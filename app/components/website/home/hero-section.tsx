import React, { useState } from "react";
import CustomSelect from "../../shared/customSelect";
import { AiroplanIcon, ArrowCircleIcon, BedIcon } from "@/app/svg";
import { LuSearch } from "react-icons/lu";
import Section from "../../shared/section";

type HeroSectionProps = {
  flightFormData: {
    from: string;
    to: string;
    departure: string;
    return: string;
    travelers: string;
    flightType: string;
  };
  hotelFormData: {
    address: string;
    checkIn: string;
    checkOut: string;
    travelers: string;
  };
  handleFlightChange: (name: string, value: any) => void;
  handleHotelChange: (name: string, value: any) => void;
  cityOptions: { label: string; value: string }[];
  travelerOptions: { label: string; value: string }[];
  handleFlightSubmit: () => void;
  handleHotelSubmit: () => void;
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
}) => {
  const [isHotel, setIsHotel] = useState(false); // State to control flex row reverse

  // Function to toggle row-reverse
  const toggleHotlFlight = () => {
    setIsHotel(!isHotel);
  };


  return (
    <div className="w-full bg-heroBanner py-20 lg:py-32 items-center bg-no-repeat bg-cover">
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
                        className="h-[17px] w-[17px]"
                        checked={flightFormData.flightType === type}
                        onChange={() => handleFlightChange("flightType", type)}
                      />
                      <p>{type.replace("-", " ")}</p>
                    </div>
                  ))}
                </div>

                {/* Form fields */}
                <div className="border-t border-bordered gap-4 py-4 mt-2 grid lg:grid-cols-2 px-4">
                  <CustomSelect
                    options={cityOptions}
                    placeholder="From"
                    label="From"
                    name="from"
                    value={flightFormData.from}
                    onChange={(value) => handleFlightChange("from", value)}
                  />

                  <CustomSelect
                    options={cityOptions}
                    placeholder="To"
                    label="To"
                    name="to"
                    value={flightFormData.to}
                    onChange={(value) => handleFlightChange("to", value)}
                  />

                  <CustomSelect
                    options={cityOptions}
                    placeholder="Departure Date"
                    label="Departure"
                    name="departure"
                    value={flightFormData.departure}
                    onChange={(value) => handleFlightChange("departure", value)}
                  />

                  <CustomSelect
                    options={cityOptions} // Use a date picker ideally
                    placeholder="Return Date"
                    label="Return"
                    name="return"
                    value={flightFormData.return}
                    onChange={(value) => handleFlightChange("return", value)}
                  />

                  <CustomSelect
                    options={travelerOptions}
                    placeholder="Travelers & Class"
                    label="Travelers & Class"
                    name="travelers"
                    value={flightFormData.travelers}
                    onChange={(value) => handleFlightChange("travelers", value)}
                  />

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

                  <CustomSelect
                    options={cityOptions}
                    placeholder="Check-In"
                    label="Check-In"
                    name="checkIn"
                    value={hotelFormData.checkIn}
                    onChange={(value) => handleHotelChange("checkIn", value)}
                  />

                  <CustomSelect
                    options={cityOptions}
                    placeholder="Check-Out"
                    label="Check-Out"
                    name="checkOut"
                    value={hotelFormData.checkOut}
                    onChange={(value) => handleHotelChange("checkOut", value)}
                  />

                  <CustomSelect
                    options={travelerOptions}
                    placeholder="Travelers & Class"
                    label="Travelers & Class"
                    name="travelers"
                    value={hotelFormData.travelers}
                    onChange={(value) => handleHotelChange("travelers", value)}
                  />

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
