import React from 'react'
import Section from '../../shared/section'
import SubHeading from '../../shared/subHeading'
import Button from '../../shared/Button'
import mobile from '/public/assets/images/mobile-app.png'
import appstore from '/public/assets/images/appstore.png'
import playstore from '/public/assets/images/aystore.png'
import Image from 'next/image'
import ParaHeading from '../../shared/para-heading'

type Props = {}

const MobileAppSection = (props: Props) => {
    return (
        <div>
            <Section>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 items-center justify-between">
                    <div className="space-y-5 lg:w-3/4">
                        <SubHeading className='!text-grayText'>Get Our Mobile App!</SubHeading>
                        <ParaHeading className='!text-black !font-bold'>Experience Convenience at Your Fingertips</ParaHeading>
                        <SubHeading className='!text-grayText'>Explore our curated list of the best countries to visit in 2024 and discover incredible destinations waiting to be explored</SubHeading>
                        <Button label='Download Now' style="!bg-orange" />
                        <div className="flex gap-5 items-center">
                            <button className="hover:scale-105 duration-300 transition-all">
                                <Image src={appstore} alt='' className='' />
                            </button>

                            <button className="hover:scale-105 duration-300 transition-all">
                                <Image src={playstore} alt='' className='' />
                            </button>
                        </div>

                    </div>
                    <Image src={mobile} alt='' className='' />

                </div>
            </Section>
        </div>
    )
}

export default MobileAppSection