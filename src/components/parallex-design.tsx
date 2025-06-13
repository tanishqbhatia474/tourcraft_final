"use client";
import { ParallaxScroll } from "./ui/parallax-scroll";

export function ParallaxScrollDemo() {
    return <ParallaxScroll images={images} />;
}

const images = [
    {
        src: "https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5ldyUyMHlvcmt8ZW58MHx8MHx8fDA%3D",
        name: "Trip To New York",
        description: "The city that never sleeps.",
    },
    {
        src: "https://images.unsplash.com/photo-1543579596-2c11997c7706?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGR1YmFpfGVufDB8fDB8fHww",
        name: "Trip To Dubai",
        description: "A modern oasis in the desert.",
    },
    {
        src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D",
        name: "Trip To Rome",
        description: "A historical treasure trove.",
    },
    {
        src: "https://images.unsplash.com/photo-1554072675-66db59dba46f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdlcm1hbnl8ZW58MHx8MHx8fDA%3D",
        name: "Trip To Germany",
        description: "A blend of tradition and innovation.",
    },
    {
        src: "https://images.unsplash.com/photo-1543579596-2c11997c7706?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGR1YmFpfGVufDB8fDB8fHww",
        name: "Trip To Dubai",
        description: "A modern oasis in the desert.",
    },
    {
        src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D",
        name: "Trip To Rome",
        description: "A historical treasure trove.",
    },
    {
        src: "https://images.unsplash.com/photo-1554072675-66db59dba46f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdlcm1hbnl8ZW58MHx8MHx8fDA%3D",
        name: "Trip To Germany",
        description: "A blend of tradition and innovation.",
    },
];