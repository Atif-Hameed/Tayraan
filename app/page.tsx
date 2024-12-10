'use client'
import card from '@/public/assets/images/hero-card.png'
import Image from 'next/image';
import Button from './components/shared/Button';
import { AiroplanIcon, ArrowCircleIcon, BedIcon } from './svg';
import CustomRadio from './components/shared/CustomRadio';
import { useState } from 'react';
import CustomSelect from './components/shared/customSelect';
import { LuSearch } from "react-icons/lu";


export default function Home() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    travelers: "",
    flightType: "round-trip", // default flight type
  });

  // Handle input changes for all form fields
  const handleChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
  };

  // Options for the select inputs
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
      <div className="h-screen w-full bg-heroBanner pt-32 lg:px-24 md:px-16 px-5 gap-8 flex xl:flex-row flex-col items-center bg-no-repeat bg-cover" >
        <div className='xl:w-1/2 w-full text-white flex flex-col gap-6'>
          <h1 className="font-cairo font-bold text-7xl">Let’s book your next trip!</h1>
          <p className="font-montserrat font-bold text-lg">Choose from over 1.5 million hotels & 450+ airlines</p>
        </div>
        <div className=''>
          <div className='relative bg-heroCard md:h-[390px] h-[350px] bg-no-repeat w-[600px] bg-contain'>

            <div className='flex justify-between gap-4 w-full '>

              <div className='flex items-center w-full px-4 justify-between'>
                <div className='flex items-center gap-2'>
                  <AiroplanIcon />
                  <h1 className='text-2xl font-[400]'>Flights</h1>
                </div>
                <div>
                  <ArrowCircleIcon />
                </div>
              </div>

              <button
                className={`py-4 px-5  md:text-xl mt-2 text-base font-semibold rounded-full text-white  bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all`}
              >
                <BedIcon />
                Hotels
              </button>
            </div>

            <div className='flex items-center gap-7 px-6'>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="flightType"
                  value="round-trip"
                  className='h-[17px] w-[17px]'
                  checked={formData.flightType === "round-trip"}
                  onChange={() => handleChange('flightType', 'round-trip')}
                />
                <p>Round-trip</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="flightType"
                  value="one-way"
                  className='h-[17px] w-[17px]'
                  checked={formData.flightType === "one-way"}
                  onChange={() => handleChange('flightType', 'one-way')}
                />
                <p>One way</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="flightType"
                  value="multi-city"
                  className='h-[17px] w-[17px]'
                  checked={formData.flightType === "multi-city"}
                  onChange={() => handleChange('flightType', 'multi-city')}
                />
                <p>Multi-city</p>
              </div>
            </div>

            <div className='border-t border-bordered gap-4 py-4 mt-4 grid grid-cols-2' >
              {/* Grid Layout for Inputs */}
              {/* From */}
              <div className='px-4 py-1' >
                <CustomSelect
                  options={cityOptions}
                  placeholder="Mumbai"
                  label='From'
                  name="from"
                  value={formData.from}
                  onChange={(value) => handleChange('from', value)}
                />
              </div>

              {/* To */}
              <div className='px-4 py-1' >
                <CustomSelect
                  options={cityOptions}
                  placeholder="Mumbai"
                  label='To'
                  name="to"
                  value={formData.to}
                  onChange={(value) => handleChange('to', value)}
                />
              </div>

              {/* Departure */}
              <div className='px-4 py-1' >
                <CustomSelect
                  options={cityOptions}
                  placeholder="Mumbai"
                  label='From'
                  name="from"
                  value={formData.from}
                  onChange={(value) => handleChange('from', value)}
                />
              </div>

              {/* Return */}
              <div className='px-4 py-1' >
                <CustomSelect
                  options={cityOptions} // Use a date picker ideally
                  placeholder="25 Aug '24"
                  label='Return'
                  name="return"
                  value={formData.return}
                  onChange={(value) => handleChange('return', value)}
                />
              </div>

              {/* Travelers & Class */}
              <div className='px-4 py-1' >
                <CustomSelect
                  options={travelerOptions}
                  placeholder="1 Traveler"
                  label='Travelers & Class'
                  name="travelers"
                  value={formData.travelers}
                  onChange={(value) => handleChange('travelers', value)}
                />
              </div>

              {/* Search Button */}
              <div className='px-4 py-1 w-full' >
                <button
                  className={`py-4 px-5 w-full md:text-xl mt-2  justify-center text-base  rounded-full text-white  bg-greenGradient flex gap-2 items-center hover:scale-105 duration-300 transition-all`}
                >
                  <LuSearch />
                  Search
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
