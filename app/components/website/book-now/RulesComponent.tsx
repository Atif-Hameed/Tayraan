import React from 'react'
import MidHeading from '../../shared/MidHeading'
import { RulesTickIcon } from '@/app/svg'
import jazeeraLogo from '@/public/assets/images/jazeeraLogo.png'
import paypalCard from '@/public/assets/images/paypalCard.png'
import visaCard from '@/public/assets/images/visaCard.png'
import expressCard from '@/public/assets/images/expressCard.png'
import masterCard from '@/public/assets/images/masterCard.png'
import Image from 'next/image'

const RulesComponent = () => {

    const rules = [
        { name: 'If you cancel, you will get a partial amount as credit with the airline' },
        { name: 'Changeable with fees' },
    ]

    const prices = [
        { name: 'traveller ADT 1 ', value: 'SAR 620.85' },
        { name: 'Service fee', value: 'SAR 34.14' },
    ]

    const Cards = [
        { img: paypalCard, src: '#' },
        { img: visaCard, src: '#' },
        { img: expressCard, src: '#' },
        { img: masterCard, src: '#' },
    ]

    return (
        <div>
            <div className="bg-white text-grayDark p-4 border rounded-xl shadow-md  border-bordered">
                <div className='flex w-full items-center justify-between'>
                    <MidHeading><span className='text-black'>Fare rules</span></MidHeading>
                    <p className='text-sm'>Cancel & change</p>
                </div>
                <div className='mt-4 flex flex-col gap-2'>
                    {
                        rules.map((e, i) => (
                            <div key={i} className='flex items-start gap-2 text-sm text-grayDark' >
                                <div className='mt-1'>
                                    <RulesTickIcon />
                                </div>
                                <p>{e.name}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='my-5  border-b-2 border-[#999999] border-dashed w-full ' ></div>

                <MidHeading><span className='text-black'>Price breakdown</span></MidHeading>

                <div className='flex flex-col gap-2 mt-3'>
                    {
                        prices.map((e, i) => (
                            <div key={i} className='flex w-full justify-between items-center' >
                                <p>{e.name}</p>
                                <p>{e.value}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='my-5  border-b-2 border-[#999999] border-dashed w-full ' ></div>

                <div className='flex w-full justify-between items-center' >
                    <h1>Total (incl. VAT)</h1>
                    <h1>SAR 654.99</h1>
                </div>

                <button className="px-4 py-1.5 mt-5 text-sm bg-greenGradient text-white rounded-full  w-full">
                    Continue
                </button>

            </div>

            <div className='grid grid-cols-4 my-4 gap-3'>
                {Cards.map((e, i) => (
                    <Image alt='' src={e.img} />
                ))}
            </div>
        </div>
    )
}

export default RulesComponent