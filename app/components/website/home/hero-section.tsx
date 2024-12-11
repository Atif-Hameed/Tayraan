import React from "react";
import CustomSelect from "../../shared/customSelect";
import { AiroplanIcon, ArrowCircleIcon, BedIcon } from "@/app/svg";
import { LuSearch } from "react-icons/lu";
import Section from "../../shared/section";

type HeroSectionProps = {
    formData: {
        from: string;
        to: string;
        departure: string;
        return: string;
        travelers: string;
        flightType: string;
    };
    handleChange: (name: string, value: any) => void;
    cityOptions: { label: string; value: string }[];
    travelerOptions: { label: string; value: string }[];
    handleSubmit: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({
    formData,
    handleChange,
    cityOptions,
    travelerOptions,
    handleSubmit,
}) => {
    return (
        <div className=" w-full bg-heroBanner py-20 lg:py-32  items-center bg-no-repeat bg-cover">
            <Section>
                <div className=" gap-8 flex xl:flex-row flex-col ju items-center ">

                    <div className="xl:w-1/2 w-full text-white flex flex-col gap-6">
                        <h1 className="font-cairo font-bold lg:text-7xl text-5xl">Let’s book your next trip!</h1>
                        <p className="font-montserrat font-bold text-lg">
                            Choose from over 1.5 million hotels & 450+ airlines
                        </p>
                    </div>
                    <div className="relative lg:bg-heroCard  bg-white lg:bg-transparent 2xl:bg-white pr-12 rounded-2xl py-5 lg:py-0 bg-top-right lg:h-[390px] px-5 h-auto bg-no-repeat lg:w-1/2 w-full bg-contain">
                        <div className="flex justify-between gap-4 w-full px-4 py-2">
                            <div className="flex items-center gap-2">
                                <AiroplanIcon />
                                <h1 className="text-2xl font-[400]">Flights</h1>
                            </div>
                            <button
                                className="py-4 px-5 md:text-xl text-base font-semibold rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                            >
                                <BedIcon />
                                Hotels
                            </button>
                        </div>

                        <div className="flex items-center flex-wrap lg:gap-7 gap-4 py-3 lg:py-3 px-6  ">
                            {["round-trip", "one-way", "multi-city"].map((type) => (
                                <div className="flex items-center gap-2" key={type}>
                                    <input
                                        type="radio"
                                        name="flightType"
                                        value={type}
                                        className="h-[17px] w-[17px]"
                                        checked={formData.flightType === type}
                                        onChange={() => handleChange("flightType", type)}
                                    />
                                    <p>{type.replace("-", " ")}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-bordered gap-4 py-4 mt-2 grid lg:grid-cols-2 px-4">
                            {/* From */}
                            <CustomSelect
                                options={cityOptions}
                                placeholder="From"
                                label="From"
                                name="from"
                                value={formData.from}
                                onChange={(value) => handleChange("from", value)}
                            />

                            {/* To */}
                            <CustomSelect
                                options={cityOptions}
                                placeholder="To"
                                label="To"
                                name="to"
                                value={formData.to}
                                onChange={(value) => handleChange("to", value)}
                            />

                            {/* Departure */}
                            <CustomSelect
                                options={cityOptions}
                                placeholder="Departure Date"
                                label="Departure"
                                name="departure"
                                value={formData.departure}
                                onChange={(value) => handleChange("departure", value)}
                            />

                            {/* Return */}
                            <CustomSelect
                                options={cityOptions} // Use a date picker ideally
                                placeholder="Return Date"
                                label="Return"
                                name="return"
                                value={formData.return}
                                onChange={(value) => handleChange("return", value)}
                            />

                            {/* Travelers & Class */}
                            <CustomSelect
                                options={travelerOptions}
                                placeholder="Travelers & Class"
                                label="Travelers & Class"
                                name="travelers"
                                value={formData.travelers}
                                onChange={(value) => handleChange("travelers", value)}
                            />

                            {/* Search Button */}
                            <button
                                onClick={handleSubmit}
                                className="py-4 px-5 w-full md:text-xl mt-2 justify-center text-base rounded-full text-white bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all"
                            >
                                <LuSearch />
                                Search
                            </button>
                        </div>
                    </div>
                </div>

            </Section>
        </div>
    );
};

export default HeroSection;
