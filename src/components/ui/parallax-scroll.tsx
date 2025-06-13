"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
    images,
    className,
}: {
    images: { src: string; name: string; description: string }[];
    className?: string;
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start end", "end start"],
    });

    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

    const third = Math.ceil(images.length / 3);

    const firstPart = images.slice(0, third);
    const secondPart = images.slice(third, 2 * third);
    const thirdPart = images.slice(2 * third);

    return (
        <div className={cn("w-full", className)} ref={scrollRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
                <div className="grid gap-10">
                    {firstPart.map((el, idx) => (
                        <motion.div
                            style={{ y: translateFirst }}
                            key={"grid-1" + idx}
                            className="relative"
                        >
                            <Image
                                src={el.src}
                                className="w-full object-cover rounded-lg"
                                height="400"
                                width="400"
                                alt={el.name}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-lg">
                                <h2 className="text-white text-lg font-semibold">{el.name}</h2>
                                <p className="text-white text-sm">{el.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-10">
                    {secondPart.map((el, idx) => (
                        <motion.div
                            style={{ y: translateSecond }}
                            key={"grid-2" + idx}
                            className="relative"
                        >
                            <Image
                                src={el.src}
                                className="w-full object-cover rounded-lg"
                                height="400"
                                width="400"
                                alt={el.name}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-lg">
                                <h2 className="text-white text-lg font-semibold">{el.name}</h2>
                                <p className="text-white text-sm">{el.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-10">
                    {thirdPart.map((el, idx) => (
                        <motion.div
                            style={{ y: translateThird }}
                            key={"grid-3" + idx}
                            className="relative"
                        >
                            <Image
                                src={el.src}
                                className="w-full object-cover rounded-lg"
                                height="400"
                                width="400"
                                alt={el.name}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 rounded-lg">
                                <h2 className="text-white text-lg font-semibold">{el.name}</h2>
                                <p className="text-white text-sm">{el.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
