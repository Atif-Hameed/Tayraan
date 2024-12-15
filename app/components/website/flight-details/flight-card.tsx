import Image from 'next/image'
import React from 'react'
import { Food, Plane, Seat, Time, Wifi, } from '@/app/svg/flight-feature-svg'
import logo from '/public/assets/flights/companyName.png'
import route from '/public/assets/planeRoute.png'

type Props = {}

const FlightCard = (props: Props) => {
    const feature = [<Plane />, <Wifi />, <Time />, <Food />, <Seat />]
    return (
        <div>
            <div className="border p-5 font-cairo text-black border-[#C0C0C0] flex flex-col justify-between  gap-5 rounded-xl ">
                <div className="flex justify-between w-full items-center flex-wrap py-3 gap-4">
                    <div className="flex gap-2 items-center">
                        <Image src={logo} alt='' className='' />
                        <h2 className="text-lg lg:text-xl font-semibold">ABC Airline</h2>
                    </div>
                    <h2 className="text-base lg:text-lg ">Travel Class: <span className="font-bold text-xl">Economy</span></h2>

                </div>

                <div className="flex justify-between items-center text-sm lg:text-base gap-5 flex-wrap">
                    <div className="lg:w-3/4 w-full bg-[#98FFC80A] p-5">
                        <p className="py-2">Sun, 29 Jan 2023</p>

                        <div className="grid lg:grid-cols-3 justify-between grid-cols-1 gap-5">
                            <div className="flex flex-col ">
                                <p className="py-2">14.50</p>
                                <p className="py-2">Moi Intl, Mombasa</p>
                                <p className="py-2">Kenya</p>

                            </div>

                            <div className="flex flex-col justify-center items-center">
                                <p className="py-2">9hr 50min</p>
                                <Image src={route} alt='' className='' />


                            </div>
                            <div className="flex flex-col lg:justify-center lg:items-center">
                                <p className="py-2">14.50</p>
                                <p className="py-2">JFK Terminal, Nairobi,</p>
                                <p className="py-2">Kenya</p>

                            </div>
                        </div>

                    </div>

                    <div className="flex lg:w-1/5 w-full items-center gap-5 flex-col">
                        <p className="py-2">$18,500</p>
                        <button className="py-3 px-6 text-center text-white rounded-lg bg-green">Book Now</button>

                    </div>
                </div>
                <div className="flex justify-between font-medium items-center gap-5 flex-wrap ">
                    <p className="py-2">100 seats remaining</p>
                    <p className="py-2 text-orange">Partially Refundable</p>
                    <div className="flex items-center gap-4">
                        {feature.map((item, i) => (
                            <div key={i} className="py-2 px-4 border-r-2 border-[#D7E2EE]">{item}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightCard