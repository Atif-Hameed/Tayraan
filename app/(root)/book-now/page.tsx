'use client'
import BigCustomDropdown from '@/app/components/shared/BigCustomDropDown'
import CustomBookInput from '@/app/components/shared/CustomBookInput'
import ParaHeading from '@/app/components/shared/para-heading'
import Section from '@/app/components/shared/section'
import CustomSelect from '@/app/components/website/book-now/CustomSlecter'
import { FilesIcon } from 'lucide-react'
import React, { useState } from 'react'
import { DayOptions, MonthOptions, NationalityOptions, YearOptions } from '@/utils/index'
import CustomSwitch from '@/app/components/shared/CustomSwitch'
import MidHeading from '@/app/components/shared/MidHeading'
import SubHeading from '@/app/components/shared/subHeading'
import { BaggageTickIcon } from '@/app/svg'
import PaymentOptions from '@/app/components/website/book-now/CustomPaySlect'
import PaymentCard from '@/app/components/website/book-now/PaymentCard'
import Modal from '@/app/components/shared/Modal'
import AddNewCard from '@/app/components/website/book-now/AddnewCard'
import FlightCard from '@/app/components/website/book-now/DepartureCard'
import RulesComponent from '@/app/components/website/book-now/RulesComponent'

const Page = () => {
    // State for form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        callName: '',
        ageSelect: 'Adult',
        dateOfBirth: '',
        day: '',
        month: '',
        year: '',
        hijriCalendar: false,
        nationality: '',
        lookingSomeone: false,
        email: '',
        mobile: '',
        payType: 'full',
        paymentCard: '',
    });

    const [newCardData, setNewCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        name: '',
        country: 'United States',
    });

    const [isModalOpen, setModalOpen] = useState(false);

    // Function to handle opening the modal
    const handleAddCardClick = () => {
        setModalOpen(true);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Options for dropdowns
    const options = ["Adult", "Kid", "Old"];
    const callNames = ['Mr', 'Ms', 'Mrs'];
    const baggageOptions = [
        { name: '7 KG Cabin baggage', quantity: '1 piece' },
        { name: '20kg total checked baggage', quantity: '1 piece' }
    ]

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

    // Function to handle switch toggle
    const handleHijriCalendarToggle = () => {
        setFormData((prev) => ({
            ...prev,
            hijriCalendar: !prev.hijriCalendar,
        }));
    };

    // Function to handle callName selection
    const handleCallNameClick = (name: string) => {
        setFormData((prev) => ({
            ...prev,
            callName: name,
        }));
    };

    // Function to handle day change
    const handleDayChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            day: value,
        }));
    };

    // Function to handle month change
    const handleMonthChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            month: value,
        }));
    };

    // Function to handle year change
    const handleYearChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            year: value,
        }));
    };

    // Function to handle nationality change
    const handleNationalityChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            nationality: value,
        }));
    };


    // Function to handle payment change
    const handlePaymentChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            payType: value,  // Update the payment type in form data
        }));
    };


    // Function to handle country selection change
    const handleNewCardCountrySelect = (country: string) => {
        setNewCardData((prev) => ({
            ...prev,
            country,
        }));
    };

    // Function to handle input changes
    const handleNewCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCardData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Section>
            <div className='mt-14'>
                <ParaHeading>
                    <span className='text-black'>Important flight information</span>
                </ParaHeading>
            </div>

            <div className='w-full flex items-start lg:flex-row flex-col gap-4 mt-6'>
                {/* Left Section */}
                <div className='lg:w-[65%] w-full flex flex-col gap-4'>

                    <div className='border border-bordered p-4 rounded-2xl'>
                        {/* Dropdown for Age */}
                        <BigCustomDropdown
                            value={formData.ageSelect}
                            options={options}
                            onChange={handleAgeChange}
                        />

                        {/* Orange Box */}
                        <div className='bg-orange flex items-center gap-2 border border-[#C0C0C0] my-2 text-white px-4 py-3 rounded-xl'>
                            <div className='flex-shrink-0'>
                            <FilesIcon />
                            </div>
                            <p className='sm:text-base text-sm'>Enter your details as they appear on your passport. Use English only.</p>
                        </div>

                        {/* Title Selection */}
                        <div className='flex items-center gap-4 w-full mt-12 justify-start'>
                            {callNames.map((name, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleCallNameClick(name)}
                                    className={`border border-bordered py-2 sm:w-[20%] w-full rounded-xl flex justify-center items-center cursor-pointer 
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

                        {/* Date of Birth Selection */}
                        <div className="mt-4 w-full grid sm:grid-cols-3 grid-cols-1 gap-6">
                            <div className="">
                                <CustomSelect
                                    options={DayOptions}
                                    value={formData.day}
                                    onChange={handleDayChange}
                                    placeholder="Date of birth"
                                />
                            </div>
                            <div className="">
                                <CustomSelect
                                    label="Month"
                                    options={MonthOptions}
                                    value={formData.month}
                                    onChange={handleMonthChange}
                                    placeholder="Month"
                                />
                            </div>
                            <div className="">
                                <CustomSelect
                                    label="Year"
                                    options={YearOptions}
                                    value={formData.year}
                                    onChange={handleYearChange}
                                    placeholder="Year"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <CustomSwitch
                                isOn={formData.hijriCalendar}
                                handleToggle={handleHijriCalendarToggle}
                                label="Hijri Calendar"
                            />
                        </div>

                        <div className="mt-4">
                            <CustomSelect
                                label="Nationality"
                                options={NationalityOptions}
                                value={formData.nationality}
                                onChange={handleNationalityChange}
                                placeholder="Nationality"
                                style={'justify-between'}
                            />
                        </div>


                        {/* contact  details */}
                        <div className='mt-8'>
                            <ParaHeading>
                                <span className='text-black'>Enter contact details</span>
                            </ParaHeading>

                            <div className="mt-8">
                                <CustomSwitch
                                    isOn={formData.hijriCalendar}
                                    handleToggle={handleHijriCalendarToggle}
                                    label="Im’ booking for someone else"
                                />
                            </div>

                            <div className="mt-4">
                                <CustomBookInput
                                    placeholder='Email to receive e-ticket'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    inputType='email'
                                />
                            </div>

                            <div className="mt-4">
                                <CustomBookInput
                                    placeholder='Mobile number'
                                    name='mobile'
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    inputType='text'
                                />
                            </div>
                        </div>

                        <div className='mt-6 pt-10 bg-[#FBFBFB] p-5 rounded-xl' >
                            <ParaHeading>
                                <span className='text-black'>About your baggage</span>
                            </ParaHeading>

                            <div className='flex justify-between sm:flex-row flex-col w-full mt-8' >
                                <div className='lg:w-[40%] sm:w-[45%] w-full' >
                                    <MidHeading>Kuwait to Jeddah</MidHeading>
                                    <div className='mt-4 bg-white py-6 px-4 rounded-xl' >
                                        <h1 className='text-black lg:text-xl font-bold '  > Baggage allowance </h1>
                                        {
                                            baggageOptions.map((e, i) => (
                                                <div className='flex items-start gap-2 mt-4' >
                                                    <div className='mt-1'>
                                                        <BaggageTickIcon />
                                                    </div>
                                                    <div>
                                                        <h1 className=''>{e.name}</h1>
                                                        <p className='text-[10px]'>{e.quantity}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='lg:w-[40%] sm:w-[45%] w-full' >
                                    <MidHeading>Jeddah to Kuwait</MidHeading>
                                    <div className='mt-4 bg-white py-6 px-4 rounded-xl' >
                                        <h1 className='text-black lg:text-xl font-bold '  > Baggage allowance </h1>
                                        {
                                            baggageOptions.map((e, i) => (
                                                <div className='flex items-start gap-2 mt-4' >
                                                    <div className='mt-1'>
                                                        <BaggageTickIcon />
                                                    </div>
                                                    <div>
                                                        <h1 className=''>{e.name}</h1>
                                                        <p className='text-[10px]'>{e.quantity}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <p className='md:text-lg font-[400] mt-4'>After booking, you can contact a travel advisor to add extra baggage, subject to the airline's availability & rates.</p>
                        </div>

                    </div>

                    <div className='border border-bordered p-4 rounded-2xl'>
                        <PaymentOptions onPaymentChange={handlePaymentChange} />
                    </div>

                    <div className='border border-bordered p-4 rounded-2xl'>
                        <PaymentCard onAddCard={handleAddCardClick} />
                    </div>

                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}
                        children={
                            <AddNewCard
                                onClose={handleCloseModal}
                                cardNumber={newCardData.cardNumber}
                                expiryDate={newCardData.expiryDate}
                                cvc={newCardData.cvc}
                                name={newCardData.name}
                                country={newCardData.country}
                                onInputChange={handleNewCardInputChange}
                                onCountrySelect={handleNewCardCountrySelect}
                            />
                        }
                    />

                </div>

                {/* Right Section */}
                <div className='lg:w-[35%] w-full flex flex-col gap-4'>
                    <FlightCard />
                    <RulesComponent />
                </div>
            </div>
        </Section>
    );
};

export default Page;
