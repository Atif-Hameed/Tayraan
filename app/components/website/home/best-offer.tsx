import React from 'react'
import Section from '../../shared/section'
import SubHeading from '../../shared/subHeading'
import ParaHeading from '../../shared/para-heading'
import CustomLink from '../../shared/customLink'

type Props = {}

const BestOffer = (props: Props) => {
    return (
        <div className='bg-greenGradient lg:py-20 py-10'>
            <Section>
                <div data-aos="zoom-in-up" className="flex justify-between items-center gap-5 flex-wrap">
                    <div className="lg:w-3/5 w-full">
                        <SubHeading>BEST OFFER</SubHeading>
                        <ParaHeading>Members save 10% or more on over 100,000 hotels worldwide when signed in</ParaHeading>
                    </div>
                    <CustomLink label='Sign in now' href='/signup' className="!bg-orange" />
                </div>
            </Section>
        </div>
    )
}

export default BestOffer