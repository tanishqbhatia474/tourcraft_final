"use client"
import React from 'react'
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

// import required modules
import { EffectCards } from "swiper/modules";
type Props = {}
type dataval = {
    message: string,
    customer: string,
    owner: string
}[]

const data: dataval = [
    {
        message: "This AI trip planner made my vacation stress-free and unforgettable. I can't recommend it enough!",
        customer: "Priya Sharma",
        owner: "Travel Enthusiast",
    },
    {
        message: "From planning to execution, everything was flawless. The AI truly understood my preferences.",
        customer: "Ankit Verma",
        owner: "Freelancer",
    },
    {
        message: "The personalized itinerary was spot on! I discovered hidden gems I would have missed otherwise.",
        customer: "Chaitanya Anand",
        owner: "Photographer",
    },
    {
        message: "A fantastic tool for anyone looking to simplify their travel planning. Highly impressed!",
        customer: "Vyom",
        owner: "Entrepreneur",
    },
];


const FeatureCard = ({ message, customer, owner }: { message: string, customer: string, owner: string }) => {
    return (
        <div className=" flex p-8 flex-col gap-4">
            <h1 className="lg:text-4xl text-lg lg:line-clamp-3 line-clamp-4">&quot;{message}&quot;</h1>
            <div >
                <p className="">{customer}</p>
                <p className="lg:text-sm ">{owner}</p>
            </div>
        </div>
    );
};
const Testimonial = (props: Props) => {
    return (
        <div className='my-14  grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 max-w-screen overflow-hidden lg:gap-24 items-center justify-center lg:px-24 px-8'>          
            <div className='space-y-3'>
                <h1 className=' text-4xl md:text-4xl lg:text-6xl '>What do others say?</h1>
                <div className=''>
                    <p className='text-gray-300 lg:text-lg'>
See why travelers around the world are choosing us for their <span className='text-gray-300 py-px bg-secondary px-1'>perfect getaways.</span> Explore the honest reviews from those who&apos;ve made their dream trips a reality with our AI-powered planning. Discover how we&apos;ve transformed journeys into <span className='text-gray-300 py-px bg-secondary px-1'>unforgettable experiences</span> for our customers.
                    </p>
                </div>
            </div>
            <div className='relative'>

                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    className="mySwiper w-full h-64"
                    loop={true}

                    modules={[EffectCards, Pagination, Scrollbar, Autoplay]}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}

                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index} className="bg-secondary rounded-lg ">
                            <FeatureCard
                                message={item.message}
                                customer={item.customer}
                                owner={item.owner}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute -bottom-7 w-full z-20 justify-center items-center grid">
                    <div className="pagination space-x-2"></div>
                </div>
            </div>
            
        </div>
    )
}

export default Testimonial


