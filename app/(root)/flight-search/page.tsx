import Section from "@/app/components/shared/section";
import FlightCard from "@/app/components/website/flight-details/flight-card";
import FlightFilter from "@/app/components/website/flight-search/flight-filter";
import FlightSearchForm from "@/app/components/website/flight-search/search-form";
import React from "react";

const Page = () => {
    return (
        <Section>
            <div className="py-20">
                <FlightSearchForm
                    defaultTripType="oneway"
                    defaultFrom="New York"
                    defaultTo="London"
                    defaultDepartureDate=""
                />

                <div className="flex flex-wrap justify-between gap-5 py-10">
                    <div className="lg:w-1/5 w-full">
                        {/* <FlightFilter /> */}
                    </div>
                    <div className="lg:w-3/4 w-full space-y-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                            <FlightCard key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Page;
