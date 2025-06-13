// jo starting me ayga sabse first 




import React from 'react'
import { FaRoute } from "react-icons/fa";
import { GiForest } from "react-icons/gi";
import { MdOutlineDinnerDining } from "react-icons/md";


type Featurevalue={
    icon: JSX.Element|any,
    title: string|any,
    description: string|any
}

const Features = () => {
    const data:Featurevalue[] = [
        {
            icon: <FaRoute />,
            title: "Optimal Route Planning",
            description: "Our AI algorithms analyze your preferences to craft the most efficient route, saving you time and effort.",
        },
        {
            icon: <GiForest />,
            title: "Personalize Your Adventure",
            description: "Shape your journey by freely adding, editing, or deleting activities from your itinerary.",
        },
        {
            icon: <MdOutlineDinnerDining />,
            title: "Local Cuisine Recommendations",
            description: "Discover local cuisines and hidden gems recommended by our AI, tailored to your taste buds.",
        },
    ]

    const FeatureCard = ({ icon, title, description }:Featurevalue) => {
        return <div className="bg-secondary/80  p-4 rounded-md py-6 grid gap-2">
            <div className="flex items-center gap-4">

            <div className="w-9 h-9 *:w-full *:h-full ">
                {icon}
            </div>
            <h1 className="font-bold text-xl">{title}</h1>

            </div>
            <div className="flex flex-col ">
                <p className="mt-1 text-gray-400">{description}</p>
            </div>
        </div>
    }


    return (
        <div className='px-8  py-4 my-14'>

            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                The only tool you&apos;ll ever need!
            </h1>
            <p className='text-center text-lg'>Say goodbye to the stress of planning and hello to personalized recommendations, efficient itineraries, and seamless dining experiences.</p>

            <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-6 p-10">
                {data.map((item, index) => (
                    <FeatureCard key={index}
                        icon={item.icon} title={item.title} description={item.description} />
                ))}
            </div>
        </div>
    )
}

export default Features