'use client'
import BigCustomDropdown from '@/app/components/shared/BigCustomDropDown'
import CustomBookInput from '@/app/components/shared/CustomBookInput'
import ParaHeading from '@/app/components/shared/para-heading'
import Section from '@/app/components/shared/section'
import { FilesIcon } from 'lucide-react'
import React, { useState } from 'react'

const Page = () => {
    // State for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        callName: '', // State for selected callName
        ageSelect: 'Adult', // Initial value for age dropdown
    });

    // Options for dropdowns
    const options = ["Adult", "Kid", "Old"];
    const callNames = ['Mr', 'Ms', 'Mrs'];

    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle age dropdown change
    const handleAgeChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            ageSelect: value,
        }));
    };

    // Function to handle callName selection
    const handleCallNameClick = (name: string) => {
        setFormData((prev) => ({
            ...prev,
            callName: name,
        }));
    };

    return (
        <Section>
            <div className='mt-14'>
                <ParaHeading>
                    <span className='text-black'>Important flight information</span>
                </ParaHeading>
            </div>

            <div className='w-full flex items-start gap-4 mt-6'>
                {/* Left Section */}
                <div className='w-[65%]'>
                    <div className='border border-bordered p-4 rounded-2xl'>
                        {/* Dropdown for Age */}
                        <BigCustomDropdown
                            value={formData.ageSelect}
                            options={options}
                            onChange={handleAgeChange}
                        />

                        {/* Orange Box */}
                        <div className='bg-orange flex items-center gap-2 border border-[#C0C0C0] my-2 text-white px-4 py-3 rounded-xl'>
                            <FilesIcon />
                            <p>Enter your details as they appear on your passport. Use English only.</p>
                        </div>

                        {/* Title Selection */}
                        <div className='flex items-center gap-4 w-full mt-12 justify-start'>
                            {callNames.map((name, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleCallNameClick(name)}
                                    className={`border border-bordered py-2 w-[20%] rounded-xl flex justify-center items-center cursor-pointer 
                                        ${formData.callName == name ? 'bg-greenGradient text-white' : 'bg-white text-black'}`}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>

                        {/* Input Fields */}
                        <div className="mt-6">
                            <CustomBookInput
                                placeholder='First name'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                                inputType='text'
                            />
                        </div>

                        <div className="mt-6">
                            <CustomBookInput
                                placeholder='Middle name'
                                name='middleName'
                                value={formData.middleName}
                                onChange={handleInputChange}
                                inputType='text'
                            />
                        </div>

                        <div className="mt-4">
                            <CustomBookInput
                                placeholder='Last name'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleInputChange}
                                inputType='text'
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className='w-[35%]'></div>
            </div>
        </Section>
    );
};

export default Page;
